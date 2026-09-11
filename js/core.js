// BG3 Build Planner — Data normalisation, character rules, skills, backgrounds, multiclassing, feats, persistence and tabs.
//
// Loaded as a classic script, like the generated data files: these share one
// global scope, in the order index.html lists them. Not ES modules, because
// those are blocked over file:// and the page has to keep opening by itself.
"use strict";

// PowerShell's ConvertTo-Json writes a one-element list as a bare scalar and an
// empty one as null, so every generated file has fields that are sometimes arrays
// and sometimes not. Left alone .forEach throws, and .includes() silently does a
// substring match instead of a membership test. Normalise once, on load.
const LIST_FIELDS = ["armour", "weapons", "weaponExceptions", "resistances", "saves",
  "skills", "items", "classes", "special", "details", "damageTypes", "feats", "traits", "riders", "subclasses", "races", "features", "available", "notes", "scaling", "progression", "choices", "options", "grants"];

function normaliseLists(collection) {
  (collection || []).forEach((entry) => {
    if (!entry || typeof entry !== "object") return;
    LIST_FIELDS.forEach((field) => {
      if (!(field in entry)) return;
      const value = entry[field];
      if (value == null) entry[field] = [];
      else if (!Array.isArray(value)) entry[field] = [value];
    });
    // class data nests its multiclass grants one level down
    if (entry.multiclass && typeof entry.multiclass === "object") normaliseLists([entry.multiclass]);
  });
  return collection;
}

[typeof ITEMS !== "undefined" && ITEMS, typeof SPELLS !== "undefined" && SPELLS,
 typeof SUBCLASSES !== "undefined" && SUBCLASSES, typeof RACES !== "undefined" && RACES,
 typeof SETS !== "undefined" && SETS, typeof CLASS_DATA !== "undefined" && CLASS_DATA,
 typeof COMPANIONS !== "undefined" && COMPANIONS
].filter(Boolean).forEach(normaliseLists);

const RARITY_LABELS = {
  common: "Common", uncommon: "Uncommon", rare: "Rare",
  veryrare: "Very rare", legendary: "Legendary", artifact: "Artifact", unknown: "Rarity ?"
};

const TYPE_LABELS = {
  weapon: "Weapon", armor: "Armor", shield: "Shield", head: "Head", cloak: "Cloak",
  gloves: "Gloves", boots: "Boots", amulet: "Amulet", ring: "Ring", artifact: "Artifact"
};

// Bows, crossbows and slings go in the ranged slots; everything else is melee.
// Javelins/darts are thrown but still equip as melee weapons in game.
const RANGED_SUBTYPES = ["Longbow", "Shortbow", "Light Crossbow", "Heavy Crossbow", "Hand Crossbow", "Sling"];

const isRangedWeapon = (it) => it.type === "weapon" && RANGED_SUBTYPES.includes(it.subtype);

function slotAccepts(def, it) {
  if (!def.types.includes(it.type)) return false;
  if (it.type !== "weapon") return true;
  return def.ranged ? isRangedWeapon(it) : !isRangedWeapon(it);
}

// The 12 BG3 equipment slots, laid out around the paper doll
const SLOT_DEFS = [
  { key: "head", label: "Head", col: "left", types: ["head"] },
  { key: "cloak", label: "Cloak", col: "left", types: ["cloak"] },
  { key: "chest", label: "Chest", col: "left", types: ["armor"] },
  { key: "gloves", label: "Gloves", col: "left", types: ["gloves"] },
  { key: "boots", label: "Boots", col: "left", types: ["boots"] },
  { key: "amulet", label: "Amulet", col: "right", types: ["amulet"] },
  { key: "ring1", label: "Ring 1", col: "right", types: ["ring"] },
  { key: "ring2", label: "Ring 2", col: "right", types: ["ring"] },
  { key: "weapon1", label: "Melee main", col: "bottom", types: ["weapon", "shield"] },
  { key: "weapon2", label: "Melee off-hand", col: "bottom", types: ["weapon", "shield"] },
  { key: "ranged1", label: "Ranged", col: "bottom", types: ["weapon"], ranged: true },
  { key: "ranged2", label: "Ranged off-hand", col: "bottom", types: ["weapon"], ranged: true }
];

const SLOT_GLYPHS = {
  head: "🪖", cloak: "🧥", chest: "🛡", gloves: "🧤", boots: "🥾",
  amulet: "📿", ring1: "💍", ring2: "💍",
  weapon1: "⚔", weapon2: "🗡", ranged1: "🏹", ranged2: "🛡"
};

const SILHOUETTE_SVG =
  '<svg viewBox="0 0 100 170" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
  '<circle cx="50" cy="24" r="17"/>' +
  '<path d="M50 44c-16 0-27 9-29 24l-5 34 12 3 4-24v85h13l3-52 2 0 3 52h13V81l4 24 12-3-5-34c-2-15-13-24-29-24z"/>' +
  '</svg>';

// ---------------------------------------------------------------
// Character rules (classes, abilities, proficiency)
// ---------------------------------------------------------------
const ABILITIES = [
  { key: "str", label: "Strength", short: "STR" },
  { key: "dex", label: "Dexterity", short: "DEX" },
  { key: "con", label: "Constitution", short: "CON" },
  { key: "int", label: "Intelligence", short: "INT" },
  { key: "wis", label: "Wisdom", short: "WIS" },
  { key: "cha", label: "Charisma", short: "CHA" }
];

// Simple weapons per the 5e/BG3 list; anything else martial.
const SIMPLE_WEAPONS = ["Club", "Dagger", "Greatclub", "Handaxe", "Javelin", "Light Hammer",
  "Mace", "Quarterstaff", "Sickle", "Spear", "Light Crossbow", "Dart", "Shortbow", "Sling"];

// Class rules are scraped from bg3.wiki (scripts/scrape-classes.ps1), not taken
// from tabletop 5e — BG3 differs in places. Only the ability priority used to
// seed the recommended spread stays hand-written.
const ABILITY_PRIORITY = {
  barbarian: ["str", "con", "dex", "wis", "cha", "int"],
  bard: ["cha", "dex", "con", "wis", "int", "str"],
  cleric: ["wis", "con", "str", "dex", "cha", "int"],
  druid: ["wis", "con", "dex", "int", "cha", "str"],
  fighter: ["str", "con", "dex", "wis", "cha", "int"],
  monk: ["dex", "wis", "con", "str", "cha", "int"],
  paladin: ["str", "cha", "con", "dex", "wis", "int"],
  ranger: ["dex", "wis", "con", "str", "int", "cha"],
  rogue: ["dex", "con", "wis", "int", "cha", "str"],
  sorcerer: ["cha", "con", "dex", "wis", "int", "str"],
  warlock: ["cha", "con", "dex", "wis", "int", "str"],
  wizard: ["int", "con", "dex", "wis", "cha", "str"]
};

const CLASSES = {};
(typeof CLASS_DATA !== "undefined" ? CLASS_DATA : []).forEach((c) => {
  CLASSES[c.id] = {
    label: c.name,
    priority: ABILITY_PRIORITY[c.id] || ["str", "dex", "con", "int", "wis", "cha"],
    armour: c.armour || [],
    weapons: c.weapons || [],
    weaponExceptions: c.weaponExceptions || [],
    saves: c.saves || [],
    hpLevel1: c.hpLevel1 || 8,
    hpOnLevelUp: c.hpOnLevelUp || 5,
    spellAbility: c.spellAbility || null,
    skillPicks: c.skillPicks || 2,
    skills: c.skills || [], progression: c.progression || [], icon: c.icon || null,
    multiclass: c.multiclass || { armour: [], weapons: [], weaponExceptions: [] }
  };
});

// Feats. `effects` are the parts this tool can actually model; the rest are
// listed so a build can be recorded faithfully even when the maths is manual.
// Feat text comes from the wiki (data/feats.js); what the tool computes with — the
// ability points, proficiency grants and combat switches — stays here, because that
// is an interpretation of the text rather than the text itself. The keys stay
// camelCase so parties saved or shared before this change keep working.
const FEAT_MECHANICS = {
  abilityImprovement: { wiki: "ability-improvement", ability: 2 },
  actor: { wiki: "actor", abilities: { cha: 1 } },
  alert: { wiki: "alert", initiative: 5 },
  athlete: { wiki: "athlete", abilities: { str: 1 } },
  charger: { wiki: "charger" },
  crossbowExpert: { wiki: "crossbow-expert" },
  defensiveDuellist: { wiki: "defensive-duellist" },
  dualWielder: { wiki: "dual-wielder", ac: 1 },
  dungeonDelver: { wiki: "dungeon-delver" },
  durable: { wiki: "durable", abilities: { con: 1 } },
  elementalAdept: { wiki: "elemental-adept" },
  greatWeaponMaster: { wiki: "great-weapon-master", gwm: true },
  heavilyArmoured: { wiki: "heavily-armoured", abilities: { str: 1 }, armour: ["Heavy Armour"] },
  heavyArmourMaster: { wiki: "heavy-armour-master", abilities: { str: 1 } },
  lightlyArmoured: { wiki: "lightly-armoured", abilities: { dex: 1 }, armour: ["Light Armour"] },
  lucky: { wiki: "lucky" },
  mageSlayer: { wiki: "mage-slayer" },
  magicInitiateBard: { wiki: "magic-initiate-bard" },
  magicInitiateCleric: { wiki: "magic-initiate-cleric" },
  magicInitiateDruid: { wiki: "magic-initiate-druid" },
  magicInitiateSorcerer: { wiki: "magic-initiate-sorcerer" },
  magicInitiateWarlock: { wiki: "magic-initiate-warlock" },
  magicInitiateWizard: { wiki: "magic-initiate-wizard" },
  martialAdept: { wiki: "martial-adept" },
  mediumArmourMaster: { wiki: "medium-armour-master", armour: ["Medium Armour"] },
  mobile: { wiki: "mobile" },
  moderatelyArmoured: { wiki: "moderately-armoured", abilities: { dex: 1 }, armour: ["Medium Armour", "Shields"] },
  performer: { wiki: "performer", abilities: { cha: 1 } },
  polearmMaster: { wiki: "polearm-master" },
  resilient: { wiki: "resilient", ability: 1 },
  ritualCaster: { wiki: "ritual-caster" },
  savageAttacker: { wiki: "savage-attacker", savage: true },
  sentinel: { wiki: "sentinel" },
  sharpshooter: { wiki: "sharpshooter", sharpshooter: true },
  shieldMaster: { wiki: "shield-master" },
  skilled: { wiki: "skilled" },
  // the wiki is explicit that Spell Sniper lowers the threshold "while attacking
  // with a Spell", so it must not touch weapon criticals
  spellSniper: { wiki: "spell-sniper", spellCrit: 1 },
  tavernBrawler: { wiki: "tavern-brawler", abilities: { str: 1 } },
  tough: { wiki: "tough", tough: true },
  warCaster: { wiki: "war-caster" },
  weaponMaster: { wiki: "weapon-master", abilities: { str: 1 }, weapons: ["martial"] }
};

const FEAT_WIKI = {};
(typeof FEAT_DATA !== "undefined" ? FEAT_DATA : []).forEach((f) => (FEAT_WIKI[f.id] = f));

const FEATS = {};
Object.entries(FEAT_MECHANICS).forEach(([key, mech]) => {
  const w = FEAT_WIKI[mech.wiki] || {};
  FEATS[key] = {
    ...mech,
    label: w.name || key,
    desc: w.desc || "",
    grants: w.grants || [],
    wikiUrl: w.wiki || null
  };
});

// Feats land at 4/8/12, with Fighter gaining extras at 6 and 12 and Rogue at 10.
// Multiclassing counts each class's own levels, not the character total.
function featSlotsForClass(cls, levels) {
  const at = [4, 8, 12];
  if (cls === "fighter") at.push(6);
  if (cls === "rogue") at.push(10);
  return at.filter((l) => l <= levels).length;
}

const featSlots = (m) =>
  memberClasses(m).reduce((n, c) => n + featSlotsForClass(c.cls, c.levels), 0);

const memberFeats = (m) => (m.feats || []).filter(Boolean);

// ---------------------------------------------------------------
// Skills and backgrounds
// ---------------------------------------------------------------
const SKILLS = [
  { key: "acrobatics", label: "Acrobatics", ability: "dex" },
  { key: "animalHandling", label: "Animal Handling", ability: "wis" },
  { key: "arcana", label: "Arcana", ability: "int" },
  { key: "athletics", label: "Athletics", ability: "str" },
  { key: "deception", label: "Deception", ability: "cha" },
  { key: "history", label: "History", ability: "int" },
  { key: "insight", label: "Insight", ability: "wis" },
  { key: "intimidation", label: "Intimidation", ability: "cha" },
  { key: "investigation", label: "Investigation", ability: "int" },
  { key: "medicine", label: "Medicine", ability: "wis" },
  { key: "nature", label: "Nature", ability: "int" },
  { key: "perception", label: "Perception", ability: "wis" },
  { key: "performance", label: "Performance", ability: "cha" },
  { key: "persuasion", label: "Persuasion", ability: "cha" },
  { key: "religion", label: "Religion", ability: "int" },
  { key: "sleightOfHand", label: "Sleight of Hand", ability: "dex" },
  { key: "stealth", label: "Stealth", ability: "dex" },
  { key: "survival", label: "Survival", ability: "wis" }
];

// Each background grants proficiency in exactly two skills, as in character
// creation, plus an inspiration condition (narrative, no stat effect).
// Taken from bg3.wiki/wiki/Backgrounds, not from the 5e handbook: BG3's
// Haunted One grants Intimidation where tabletop gives Survival, and the wiki
// flags it as the one background that diverges.
const BACKGROUNDS = {
  acolyte: { label: "Acolyte", skills: ["insight", "religion"],
    desc: "A life in service to a temple, learning sacred rites and providing sacrifices to your god.",
    inspiration: "Serving the gods and discovering their sacred works." },
  charlatan: { label: "Charlatan", skills: ["deception", "sleightOfHand"],
    desc: "An expert in manipulation, prone to exaggeration and happy to profit from it.",
    inspiration: "Bending the truth and turning allies against each other." },
  criminal: { label: "Criminal", skills: ["deception", "stealth"],
    desc: "A history of breaking the law, surviving on less-than-legal connections.",
    inspiration: "Profiting from criminal enterprise." },
  entertainer: { label: "Entertainer", skills: ["acrobatics", "performance"],
    desc: "You live to sway and subvert your audience, common crowds and high society alike.",
    inspiration: "Preserving art and bringing joy to the downtrodden." },
  folkHero: { label: "Folk Hero", skills: ["animalHandling", "survival"],
    desc: "A champion of the common people, challenging tyrants and monsters to protect the helpless.",
    inspiration: "Saving innocents in imminent danger." },
  guildArtisan: { label: "Guild Artisan", skills: ["insight", "persuasion"],
    desc: "Your craft earned you membership in a mercantile guild, with its privileges and protection.",
    inspiration: "Repairing and discovering rare crafts." },
  haunted: { label: "Haunted One", skills: ["medicine", "intimidation"], darkUrge: true,
    desc: "Something that cannot be slain by sword or spell haunts your mind. Dark Urge only.",
    inspiration: "Confronting what carries you." },
  noble: { label: "Noble", skills: ["history", "persuasion"],
    desc: "Raised among the social elite, accustomed to power and privilege.",
    inspiration: "Accumulating renown, power and loyalty." },
  outlander: { label: "Outlander", skills: ["athletics", "survival"],
    desc: "You grew up in the wilds, far from the comforts of civilisation.",
    inspiration: "Surviving unusual hazards of the wild." },
  sage: { label: "Sage", skills: ["arcana", "history"],
    desc: "Curious and well-read, with an unending thirst for knowledge.",
    inspiration: "Learning rare lore of the world." },
  soldier: { label: "Soldier", skills: ["athletics", "intimidation"],
    desc: "Trained in battlefield tactics and combat, in a militia, mercenary company or officer corps.",
    inspiration: "Smart tactics and bravery on the battlefield." },
  urchin: { label: "Urchin", skills: ["sleightOfHand", "stealth"],
    desc: "A poor and bleak childhood taught you to make the most out of very little.",
    inspiration: "Using your street smarts." }
};

// Which skills a class may pick from, and how many. The list is scraped per class
// ("Skills proficiencies (Choose 2): Acrobatics, Animal Handling, …"), so a Fighter
// can only take 2 of 8 rather than any of the 18.
const SKILL_KEY_BY_LABEL = {};
SKILLS.forEach((s) => (SKILL_KEY_BY_LABEL[s.label.toLowerCase()] = s.key));

// Multiclassing grants far less than a first class does. bg3.wiki's multiclass
// table lists a skill only for Bard, Cleric, Ranger and Rogue — the wiki notes
// Cleric's two is likely a game bug, but records it as what actually happens, and
// this tool follows the game rather than tidying it up.
const MULTICLASS_SKILL_GRANTS = {
  bard: 1, cleric: 2, ranger: 1, rogue: 1,
  barbarian: 0, druid: 0, fighter: 0, monk: 0, paladin: 0,
  sorcerer: 0, warlock: 0, wizard: 0
};

const classSkillList = (clsKey) =>
  ((CLASSES[clsKey] || {}).skills || [])
    .map((label) => SKILL_KEY_BY_LABEL[String(label).toLowerCase()])
    .filter(Boolean);

// The union of what every class entry can offer, first class included.
function availableSkillKeys(member) {
  const set = new Set();
  memberClasses(member).forEach((entry, i) => {
    if (i > 0 && !MULTICLASS_SKILL_GRANTS[entry.cls]) return;
    classSkillList(entry.cls).forEach((k) => set.add(k));
  });
  return set;
}

// Picks available: the first class gives its full allowance, each later class only
// what the multiclass table grants.
function skillPickBudget(member) {
  return memberClasses(member).reduce((sum, entry, i) => {
    if (i === 0) return sum + ((CLASSES[entry.cls] || {}).skillPicks || 2);
    return sum + (MULTICLASS_SKILL_GRANTS[entry.cls] || 0);
  }, 0);
}

// How many skills each class picks at character creation, per the wiki

// Rogue and Bard can double their proficiency on chosen skills
const canTakeExpertise = (m) =>
  memberClasses(m).some((c) => (c.cls === "rogue" && c.levels >= 1) || (c.cls === "bard" && c.levels >= 3));

function skillProficiencies(m) {
  const set = new Set(m.skills || []);
  const bg = BACKGROUNDS[m.background];
  if (bg) bg.skills.forEach((s) => set.add(s));
  return set;
}

function skillModifier(m, skill, finals, prof) {
  const base = abilityModifier(finals[skill.ability]);
  const proficient = skillProficiencies(m).has(skill.key);
  const expert = (m.expertise || []).includes(skill.key);
  return base + (proficient ? prof : 0) + (expert && proficient ? prof : 0);
}

// ---------------------------------------------------------------
// Multiclassing
// ---------------------------------------------------------------
const MAX_LEVEL = 12;

const memberClasses = (m) =>
  (m.classes && m.classes.length ? m.classes : [{ cls: m.cls || "fighter", subclass: m.subclass || null, levels: m.level || 1 }])
    .filter((c) => c && c.cls && c.levels > 0);

const totalLevel = (m) =>
  Math.min(MAX_LEVEL, memberClasses(m).reduce((n, c) => n + c.levels, 0));

const primaryClass = (m) => memberClasses(m)[0] || { cls: "fighter", levels: 1 };

// Taking a class as your first gives full proficiencies; multiclassing into it
// grants only the subset the wiki lists under "Multiclass Proficiencies".
const multiclassProficiencies = (clsKey) =>
  (CLASSES[clsKey] || {}).multiclass || { armour: [], weapons: [], weaponExceptions: [] };

// BG3 point buy: 8 is free, +1 per point up to 13, then 2 points each for 14 and 15.
const POINT_POOL = 27;
const ABILITY_MIN = 8;
const ABILITY_MAX = 15;
const abilityCost = (score) => (score <= 13 ? score - ABILITY_MIN : 5 + (score - 13) * 2);
const spentPoints = (scores) => ABILITIES.reduce((sum, a) => sum + abilityCost(scores[a.key]), 0);
const abilityModifier = (score) => Math.floor((score - 10) / 2);

// The array BG3 uses for its recommended spreads, applied in class priority order
const PRESET_ARRAY = [15, 14, 13, 12, 10, 8];

function presetScores(classKey) {
  const cls = CLASSES[classKey];
  const scores = { str: 8, dex: 8, con: 8, int: 8, wis: 8, cha: 8 };
  if (!cls) return scores;
  cls.priority.forEach((ab, i) => { scores[ab] = PRESET_ARRAY[i]; });
  return scores;
}

function finalScores(member) {
  const out = {};
  ABILITIES.forEach((a) => {
    // an origin companion's shipped array already bakes in their racial bonuses
    if (member.useOrigin && member.originScores) {
      out[a.key] = member.originScores[a.key];
      return;
    }
    let v = member.scores[a.key];
    if (member.racial2 === a.key) v += 2;
    if (member.racial1 === a.key) v += 1;
    out[a.key] = v;
  });
  // feats that hand out fixed ability points
  memberFeats(member).forEach((key) => {
    const f = FEATS[key];
    if (f && f.abilities) {
      Object.entries(f.abilities).forEach(([ab, n]) => { out[ab] += n; });
    }
  });
  // Ability Improvement / Resilient: the player picks where the points go
  const boosts = member.featBoosts || {};
  Object.entries(boosts).forEach(([ab, n]) => { out[ab] = (out[ab] || 0) + n; });
  ABILITIES.forEach((a) => { out[a.key] = Math.min(out[a.key], 20); });
  return out;
}

// Everything the character is proficient with: first class in full, multiclassed
// classes at the reduced rate, plus race and feat grants.
function memberProficiencies(member) {
  const armour = new Set();
  const weapons = new Set();
  const exceptions = new Set();

  memberClasses(member).forEach((entry, index) => {
    const source = index === 0 ? CLASSES[entry.cls] : multiclassProficiencies(entry.cls);
    if (!source) return;
    (source.armour || []).forEach((a) => armour.add(a));
    (source.weapons || []).forEach((w) => weapons.add(w));
    const ex = index === 0 ? (CLASSES[entry.cls] || {}).weaponExceptions : source.weaponExceptions;
    (ex || []).forEach((w) => exceptions.add(w));

    // a few subclasses widen what you can wear — Hexblade, College of Valour,
    // Bladesinging — and the wiki states those grants explicitly
    const sub = subclassById[entry.subclass];
    if (sub) {
      (sub.armour || []).forEach((a) => armour.add(a));
      (sub.weapons || []).forEach((w) => weapons.add(w));
    }
  });

  const race = raceById[member.race];
  if (race) {
    (race.armour || []).forEach((a) => armour.add(a));
    (race.weapons || []).forEach((w) => exceptions.add(w));
  }

  memberFeats(member).forEach((key) => {
    const f = FEATS[key];
    if (!f) return;
    (f.armour || []).forEach((a) => armour.add(a));
    (f.weapons || []).forEach((w) => weapons.add(w));
  });
  return { armour, weapons, exceptions };
}

// Mirrors the game's own "you are not proficient with this" warning
function proficiencyIssue(member, item) {
  if (!memberClasses(member).length) return null;
  const prof = memberProficiencies(member);

  const req = (item.details || []).find((d) => /^Required Proficiency:/i.test(d));
  if (req) {
    const need = req.replace(/^Required Proficiency:\s*/i, "").trim();
    if (need !== "Musical Instruments" && !prof.armour.has(need)) return "No " + need + " proficiency";
  }

  if (item.type === "weapon" && item.subtype && item.subtype !== "Musical Instrument") {
    const category = SIMPLE_WEAPONS.includes(item.subtype) ? "simple" : "martial";
    if (!prof.weapons.has(category) && !prof.exceptions.has(item.subtype)) {
      return "Not proficient with " + item.subtype;
    }
  }
  return null;
}

const STORAGE_CURRENT = "bg3planner.current.v3";
const STORAGE_BUILDS = "bg3planner.builds.v3";
const STORAGE_PICKUP = "bg3planner.pickup";
const MAX_MEMBERS = 4;

const itemsById = {};
ITEMS.forEach((it) => (itemsById[it.id] = it));

let idCounter = 1;
const nextMemberId = () => "m" + idCounter++;

function freshMember(index) {
  return {
    id: nextMemberId(), name: "Character " + index, notes: "",
    cls: "fighter", subclass: null, level: 12,
    loadouts: { 1: {}, 2: {}, 3: {} },
    scores: presetScores("fighter"),
    racial2: null, racial1: null,
    feats: [], featBoosts: {}
  };
}

function serialiseMember(m) {
  return {
    name: m.name, notes: m.notes, cls: m.cls, subclass: m.subclass || null,
    race: m.race || null, background: m.background || null, skills: [...(m.skills || [])], expertise: [...(m.expertise || [])], classes: memberClasses(m).map((c) => ({ cls: c.cls, subclass: c.subclass || null, levels: c.levels })), level: m.level, scores: { ...m.scores }, racial2: m.racial2, racial1: m.racial1,
    feats: [...(m.feats || [])], featBoosts: { ...(m.featBoosts || {}) }, styles: [...(m.styles || [])],
    subChoices: { ...(m.subChoices || {}) },
    companion: m.companion || null, useOrigin: !!m.useOrigin,
    originScores: m.originScores ? { ...m.originScores } : null,
    loadouts: JSON.parse(JSON.stringify(m.loadouts || {}))
  };
}

// Older saved parties predate the character layer, per-act loadouts and multiclassing
function ensureCharacterFields(m) {
  if (!m.cls) m.cls = "fighter";
  if (!m.level) m.level = 12;
  if (!Array.isArray(m.classes) || !m.classes.length) {
    m.classes = [{ cls: m.cls, subclass: m.subclass || null, levels: m.level }];
  }
  m.classes = m.classes.filter((c) => c && CLASSES[c.cls] && c.levels > 0);
  if (!m.classes.length) m.classes = [{ cls: "fighter", subclass: null, levels: 12 }];
  if (!("race" in m)) m.race = null;
  if (!("background" in m)) m.background = null;
  if (!Array.isArray(m.skills)) m.skills = [];
  if (!Array.isArray(m.expertise)) m.expertise = [];
  if (!m.scores) m.scores = presetScores(m.cls);
  ABILITIES.forEach((a) => { if (typeof m.scores[a.key] !== "number") m.scores[a.key] = 8; });
  if (!("racial2" in m)) m.racial2 = null;
  if (!("racial1" in m)) m.racial1 = null;
  if (!Array.isArray(m.feats)) m.feats = [];
  if (!Array.isArray(m.styles)) m.styles = [];
  if (!m.subChoices) m.subChoices = {};
  if (!m.featBoosts) m.featBoosts = {};
  if (!m.loadouts) {
    // a single pre-act loadout becomes the Act 1 set
    m.loadouts = { 1: m.loadout ? { ...m.loadout } : {}, 2: {}, 3: {} };
    delete m.loadout;
  }
  ACTS.forEach((a) => { if (!m.loadouts[a]) m.loadouts[a] = {}; });
  return m;
}

let state = { party: [freshMember(1)], activeMemberId: null, activeAct: 1 };
state.activeMemberId = state.party[0].id;

// ---------------------------------------------------------------
// Persistence
// ---------------------------------------------------------------
function loadCurrent() {
  try {
    const raw = localStorage.getItem(STORAGE_CURRENT);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.party) && parsed.party.length) {
      parsed.party.forEach(ensureCharacterFields);
      state = parsed;
      state.party.forEach((m) => {
        const n = parseInt(String(m.id).replace(/\D/g, ""), 10);
        if (!isNaN(n) && n >= idCounter) idCounter = n + 1;
      });
    }
  } catch (e) { /* corrupt state, keep defaults */ }
}

function saveCurrent() {
  try { localStorage.setItem(STORAGE_CURRENT, JSON.stringify(state)); } catch (e) { /* no storage */ }
}

// Small per-viewer preferences — which sections are folded open, nothing that
// belongs to a build. They live only in this browser, and a browser that refuses
// storage (a private window, site data blocked) must still render the page, so
// every read falls back to the default rather than throwing.
function readPref(key, fallback) {
  try {
    const raw = localStorage.getItem("bg3-planner:" + key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch (e) { return fallback; }
}

function writePref(key, value) {
  try { localStorage.setItem("bg3-planner:" + key, JSON.stringify(value)); }
  catch (e) { /* no storage */ }
}

function loadBuilds() {
  try { return JSON.parse(localStorage.getItem(STORAGE_BUILDS) || "{}"); }
  catch (e) { return {}; }
}

function saveBuilds(b) {
  try { localStorage.setItem(STORAGE_BUILDS, JSON.stringify(b)); } catch (e) { /* no storage */ }
}

const activeMember = () =>
  state.party.find((m) => m.id === state.activeMemberId) || state.party[0];

// Gear is tracked per act: what you wear in Act 1 is rarely what you end on.
const ACTS = [1, 2, 3];
const gear = (m, act) => {
  if (!m.loadouts) m.loadouts = { 1: {}, 2: {}, 3: {} };
  const a = act || state.activeAct || 1;
  if (!m.loadouts[a]) m.loadouts[a] = {};
  return m.loadouts[a];
};

const slotsForItem = (it) =>
  SLOT_DEFS.filter((s) => slotAccepts(s, it)).map((s) => s.key);

// Natively interactive elements the browser already makes keyboard-operable.
const NATIVE_INTERACTIVE = ["BUTTON", "A", "INPUT", "SELECT", "TEXTAREA", "LABEL", "SUMMARY"];

function el(tag, attrs, children) {
  const node = document.createElement(tag);
  if (attrs) {
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === "class") node.className = v;
      else if (k === "html") node.innerHTML = v;
      else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
      else node.setAttribute(k, v);
    });
    // A div that behaves like a button has to be reachable and firable from the
    // keyboard, or the tool cannot be used without a mouse at all. Doing it here
    // rather than at each call site means it cannot be forgotten later.
    if (typeof attrs.onclick === "function" && !NATIVE_INTERACTIVE.includes(node.tagName)) {
      if (!node.hasAttribute("tabindex")) node.setAttribute("tabindex", "0");
      if (!node.hasAttribute("role")) node.setAttribute("role", "button");
      node.addEventListener("keydown", (e) => {
        if (e.key !== "Enter" && e.key !== " ") return;
        e.preventDefault();
        attrs.onclick(e);
      });
    }
  }
  (children || []).forEach((c) => {
    if (c == null) return;
    node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  });
  return node;
}

// ---------------------------------------------------------------
// Tabs
// ---------------------------------------------------------------
function initTabs() {
  // Only the buttons that name a panel: nav.tabs also holds the scroll-mode
  // toggle, which has no data-tab and must not be treated as a tab.
  const tabs = document.querySelectorAll("nav.tabs button[data-tab]");

  // These are the app's primary navigation, and to a screen reader they were five
  // unrelated buttons: no tablist, no tab role, nothing saying which one is current
  // or which panel it controls. The roles are applied here rather than written into
  // the HTML so the selected state stays in step with the click handler below — an
  // aria-selected set once and never updated is worse than none at all.
  const nav = document.querySelector("nav.tabs");
  if (nav) nav.setAttribute("role", "tablist");
  tabs.forEach((btn) => {
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-controls", btn.dataset.tab);
    btn.setAttribute("aria-selected", btn.classList.contains("active") ? "true" : "false");
    const panel = document.getElementById(btn.dataset.tab);
    if (panel) {
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("aria-labelledby", btn.id || (btn.id = "tabbtn-" + btn.dataset.tab));
    }
  });

  tabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabs.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      document.querySelectorAll(".tab-panel").forEach((p) => (p.hidden = true));
      document.getElementById(btn.dataset.tab).hidden = false;
      if (btn.dataset.tab === "tab-library") renderEquipTargetBar();
      if (btn.dataset.tab === "tab-planner") renderPlanner();
      if (btn.dataset.tab === "tab-pickup") renderPickupList();
      if (btn.dataset.tab === "tab-spells") renderSpells();
      if (btn.dataset.tab === "tab-party") renderPartyOverview();
    });
  });
}

