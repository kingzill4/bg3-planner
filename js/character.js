// BG3 Build Planner — Origin companions, derived stats and fighting styles.
//
// Loaded as a classic script, like the generated data files: these share one
// global scope, in the order index.html lists them. Not ES modules, because
// those are blocked over file:// and the page has to keep opening by itself.
"use strict";

// ---------------------------------------------------------------
// Origin companions: start from the stats the game ships, then respec
// ---------------------------------------------------------------
const SUBCLASS_LIST = typeof SUBCLASSES !== "undefined" ? SUBCLASSES : [];
const subclassById = {};
SUBCLASS_LIST.forEach((s) => (subclassById[s.id] = s));
// BG3 has no mechanical set bonuses; these are the wiki's thematic groupings,
// which happen to be exactly the synergy families people build around.
const SET_LIST = typeof SETS !== "undefined" ? SETS : [];
const setsByItem = {};
SET_LIST.forEach((s) => {
  (s.items || []).forEach((id) => {
    if (!setsByItem[id]) setsByItem[id] = [];
    setsByItem[id].push(s);
  });
});

const RACE_LIST = typeof RACES !== "undefined" ? RACES : [];
const raceById = {};
RACE_LIST.forEach((r) => (raceById[r.id] = r));
const COMPANION_LIST = typeof COMPANIONS !== "undefined" ? COMPANIONS : [];
const companionById = {};
COMPANION_LIST.forEach((c) => (companionById[c.id] = c));

// ---------------------------------------------------------------
// Starter builds
// ---------------------------------------------------------------
// A blank sheet is a bad first screen: twelve classes, fifty-eight subclasses and
// thirty-three races, and nothing to react to. These give someone a complete,
// legal character to look at and then pull apart.
//
// They are worked examples, not recommendations, and the difference matters here.
// Everything this tool states is checked on bg3.wiki, and "this is a strong build"
// is not the kind of claim a wiki can settle — it documents rules, not opinions.
// So each of these is chosen to *demonstrate a mechanic the tool computes*, and
// the UI says so rather than implying a tier list.
//
// Nothing in them is invented either:
//   - every class, subclass, race and background id is checked against the data
//     by a self-test, so a renamed subclass fails loudly instead of silently
//     producing a broken sheet
//   - ability scores come from presetScores(), which applies the game's own
//     recommended array in the class's scraped priority order — not numbers typed
//     from memory
const STARTER_BUILDS = [
  {
    id: "greatsword-fighter",
    name: "Greatsword Fighter",
    shows: "Extra Attack, critical range and the −5/+10 trade",
    cls: "fighter", subclass: "champion", race: "human", background: "soldier",
    feats: ["greatWeaponMaster"],
    // The kit is a shape, not a shopping list: the best weapon of this type and
    // the best armour of this category that the character may legally wear are
    // resolved from the data at build time. Accessories stay empty — rings,
    // amulet and gloves are where the decisions worth making live.
    kit: { weapon: "Greatsword", armour: "Heavy Armour", style: "great-weapon-fighting" }
  },
  {
    id: "dual-wield-rogue",
    name: "Dual-wielding Rogue",
    shows: "the bonus-action off-hand attack and Sneak Attack dice",
    cls: "rogue", subclass: "thief", race: "wood-elf", background: "urchin",
    feats: [],
    // both hands Light, so it dual-wields without the Dual Wielder feat
    kit: { weapon: "Shortsword", offhand: "Dagger", armour: "Light Armour",
           style: "two-weapon-fighting" }
  },
  {
    id: "evocation-wizard",
    name: "Evocation Wizard",
    shows: "spell projection, save DCs and target resistances",
    cls: "wizard", subclass: "evocation-school", race: "high-elf", background: "sage",
    feats: [],
    kit: { weapon: "Quarterstaff", armour: "Clothing" }
  },
  {
    id: "vengeance-paladin",
    name: "Vengeance Paladin",
    shows: "Divine Smite spending a spell slot for damage",
    cls: "paladin", subclass: "oath-of-vengeance", race: "zariel-tiefling",
    background: "noble", feats: [],
    kit: { weapon: "Longsword", armour: "Heavy Armour", shield: true, style: "duelling" }
  },
  {
    id: "life-cleric",
    name: "Life Cleric",
    shows: "a build the damage figures deliberately say little about",
    cls: "cleric", subclass: "life-domain", race: "gold-dwarf", background: "acolyte",
    feats: [],
    kit: { weapon: "Mace", armour: "Heavy Armour", shield: true }
  }
];

// The best item this character may legally wear, by a criterion we can defend.
// Deriving beats listing ids: sixty hand-written ids would be sixty things to
// re-check every time the scrapers run, and "highest AC I am proficient with" is
// a rule rather than an opinion.
// Level 5, not 12. The first version of these sat at 12 with Helldusk Armour and
// Balduran's Giantslayer, which is the opposite of a starter — nobody starts
// there. Five is where a character has just come into its own: Extra Attack for
// the martials, third-level spells for the casters, and still Act 1.
const STARTER_LEVEL = 5;

// Only gear you could actually be holding at that point. "Act 1, common or
// uncommon" is a rule the data can answer; "what a guide recommends" is not
// something the wiki could settle, and this tool does not make claims it cannot
// check. Items whose act the wiki never records are left out rather than guessed
// at — an unknown act is not evidence of an early one.
const isEarlyGame = (i) =>
  i.act === 1 && (i.rarity === "common" || i.rarity === "uncommon");

function bestItemFor(member, filter, score) {
  const usable = ITEMS.filter((i) => {
    try { return filter(i) && isEarlyGame(i) && !proficiencyIssue(member, i); }
    catch (e) { return false; }
  });
  if (!usable.length) return null;
  return usable.sort((a, b) => score(b) - score(a) || a.name.localeCompare(b.name))[0];
}

const itemHasProp = (i, p) =>
  (i.details || []).some((d) => new RegExp("\\b" + p + "\\b", "i").test(d));

// Fill the sheet the way a player would before they start tuning it: armour they
// can actually wear, a weapon of the shape the build is about, the fighting style
// and feats that make it that build, and the class's own skills. The accessory
// slots stay empty on purpose — rings, amulet, cloak and gloves are where the
// interesting decisions live, and handing over a finished optimisation would skip
// the part of the tool worth using.
function equipStarter(member, build) {
  const gear = {};
  const spec = build.kit || {};

  if (spec.weapon) {
    const w = bestItemFor(member,
      (i) => i.type === "weapon" && i.damage && (i.subtype || "") === spec.weapon,
      (i) => enchantmentBonus(i));
    if (w) gear.weapon1 = w.id;
  }
  if (spec.offhand) {
    const off = bestItemFor(member,
      (i) => i.type === "weapon" && i.damage && (i.subtype || "") === spec.offhand &&
             itemHasProp(i, "Light") && i.id !== gear.weapon1,
      (i) => enchantmentBonus(i));
    if (off) gear.weapon2 = off.id;
  }
  if (spec.ranged) {
    const r = bestItemFor(member,
      (i) => i.type === "weapon" && i.damage && (i.subtype || "") === spec.ranged,
      (i) => enchantmentBonus(i));
    if (r) gear.ranged1 = r.id;
  }
  if (spec.armour) {
    // Fall back down the categories: the Life Cleric asked for Heavy Armour and
    // got nothing, because the base class is not proficient with it and the
    // starter then stood there in its shirt. Ask for the heaviest wanted, take
    // the heaviest allowed.
    const ladder = ["Heavy Armour", "Medium Armour", "Light Armour", "Clothing"];
    const from = Math.max(0, ladder.indexOf(spec.armour));
    for (const cat of ladder.slice(from)) {
      const a = bestItemFor(member,
        (i) => i.type === "armor" && i.ac && (i.subtype || "") === cat,
        (i) => i.ac || 0);
      if (a) { gear.chest = a.id; break; }
    }
  }
  // A shield only helps a hand that is free, so it is skipped for a two-handed
  // weapon or a second weapon — the same rule the damage panel already applies.
  if (spec.shield && !gear.weapon2) {
    const main = itemsById[gear.weapon1];
    const twoHanded = main && itemHasProp(main, "Two-Handed");
    if (!twoHanded) {
      const s = bestItemFor(member, (i) => i.type === "shield", (i) => i.ac || 0);
      if (s) gear.weapon2 = s.id;
    }
  }
  return gear;
}

// Build a full member from a starter. Kept beside the data so the shape stays in
// one place: a starter that forgets a field would otherwise produce a sheet that
// looks fine and misbehaves later.
function memberFromStarter(build, id) {
  const cls = CLASSES[build.cls];
  const priority = (cls && cls.priority) || ["str", "dex", "con", "int", "wis", "cha"];
  const m = {
    id: id || ("m" + Date.now()),
    name: build.name,
    notes: "",
    cls: build.cls,
    subclass: build.subclass || null,
    level: STARTER_LEVEL,
    classes: [{ cls: build.cls, levels: STARTER_LEVEL, subclass: build.subclass || null }],
    scores: presetScores(build.cls),
    // the racial +2/+1 go on what the class leads with, the same order the
    // recommended spread uses
    racial2: priority[0],
    racial1: priority[1],
    race: build.race,
    raceFamily: raceById[build.race] ? raceFamilyOf(raceById[build.race]) : null,
    background: build.background,
    skills: [], expertise: [],
    feats: [...(build.feats || [])], featBoosts: {},
    styles: [],
    subChoices: {},
    loadouts: { 1: {}, 2: {}, 3: {} },
    companion: null, useOrigin: false, originScores: null
  };

  // Everything below needs the member to exist first: proficiency depends on the
  // class, and the class's own skill list depends on the class too.

  // A fighting style only if the class actually grants one. Writing the kit's
  // style in unconditionally gave the Rogue a style it has no slot for — an
  // illegal sheet that still rendered, which is the worst kind.
  //
  // A Champion Fighter at 10 has two slots and the kit names one, so the starter
  // shipped reading "1 / 2 fighting styles" — the same half-built sheet the skills
  // and feats below exist to avoid. The rest are filled from what this build can
  // actually take, skipping anything already chosen.
  const styleRoom = styleSlots(m);
  if (styleRoom > 0 && build.kit && build.kit.style) {
    m.styles = [build.kit.style];
    availableStyles(m).forEach((s) => {
      if (m.styles.length >= styleRoom) return;
      if (!m.styles.includes(s.id)) m.styles.push(s.id);
    });
  }

  // Skills from this class's list, up to its budget. A starter that arrives with
  // "0 / 4 skill picks" is not a character, it is a form to fill in.
  const classSkills = (cls && cls.skills) || [];
  const budget = skillPickBudget(m);
  m.skills = classSkills.slice(0, budget);

  // Remaining feat slots go to Ability Improvement, which the calculator actually
  // uses. Leaving them empty left four of five starters with "3 feat slots empty"
  // on a level 12 sheet.
  const slots = featSlots(m);
  while (m.feats.length < slots) {
    m.feats.push("abilityImprovement");
    if (m.feats.length > 8) break;
  }
  m.featBoosts = {};
  m.feats.forEach((f, i) => {
    if (f === "abilityImprovement") m.featBoosts[i] = priority[i % 2];
  });

  // Gear is derived from the kit spec, and the whole set lives in every act: a
  // level 12 character carrying an Act 1 starter blade was the incoherence — the
  // sheet said endgame and the hands said tutorial.
  const gear = equipStarter(m, build);
  m.loadouts = { 1: { ...gear }, 2: { ...gear }, 3: { ...gear } };
  return m;
}

// ---------------------------------------------------------------
// Race families, for the two-step picker
// ---------------------------------------------------------------
// BG3's character creation asks for a race and then an ancestry, and the flat
// list stopped scaling once Dragonborn brought ten colour subraces: thirty-three
// rows, ten of them ending in the same word.
//
// The grouping is not guesswork. The companion infoboxes record exactly this
// split — Astarion is race "Elf", subrace "High elf"; Karlach is "Tiefling" /
// "Zariel tiefling"; Minthara is "Drow" / "Lolth-sworn drow". That is the game's
// own answer to which families exist and that Drow is a race in its own right
// rather than a kind of Elf. Names that carry their family as a suffix are split
// on it; the handful that do not are listed, because "Duergar" does not contain
// the word "Dwarf" and no rule could infer that it is one.
const RACE_FAMILY_OVERRIDES = {
  "duergar": "Dwarf",
  "githyanki": "Githyanki",
  "human": "Human",
  "half-orc": "Half-Orc",
  "dragonborn": "Dragonborn"
};

function raceFamilyOf(race) {
  if (!race) return "";
  const byId = RACE_FAMILY_OVERRIDES[race.id];
  if (byId) return byId;
  // "Drow Half-Elf" is a Half-Elf, not a Drow, so the *longest* trailing family
  // name wins — matching on the first hit would file it under Drow.
  const families = ["Half-Elf", "Half-Orc", "Dragonborn", "Tiefling", "Halfling",
    "Dwarf", "Gnome", "Drow", "Elf"];
  const hit = families.find((f) => new RegExp("\\b" + f + "$", "i").test(race.name));
  return hit || race.name;
}

function raceFamilies() {
  const seen = [];
  RACE_LIST.forEach((r) => {
    const f = raceFamilyOf(r);
    if (!seen.includes(f)) seen.push(f);
  });
  return seen;
}

function raceFamilyMembers(family) {
  return RACE_LIST.filter((r) => raceFamilyOf(r) === family);
}

const CLASS_KEY_BY_LABEL = {};
Object.entries(CLASSES).forEach(([k, c]) => (CLASS_KEY_BY_LABEL[c.label.toLowerCase()] = k));

// Minthara's infobox carries no background, but the Backgrounds article lists
// her under Noble. This fallback covers only what the companion page omits;
// everything else now comes from the scraped data.
const ORIGIN_BACKGROUND_FALLBACK = { minthara: "Noble" };

const BACKGROUND_KEY_BY_LABEL = {};
Object.entries(BACKGROUNDS).forEach(([k, b]) =>
  (BACKGROUND_KEY_BY_LABEL[b.label.toLowerCase()] = k));
const SUBCLASS_ID_BY_NAME = {};
SUBCLASS_LIST.forEach((s) => (SUBCLASS_ID_BY_NAME[s.name.toLowerCase()] = s.id));

// Returns the shipped baseline without touching the member, so the sheet can
// always be rebuilt from it: COMPANIONS is static data, never overwritten by
// edits, which is what makes "reset to origin" reliable at any point.
function originBaseline(companionId) {
  const c = companionById[companionId];
  if (!c) return null;
  const clsKey = CLASS_KEY_BY_LABEL[(c.class || "").toLowerCase()] || null;
  // The subrace is what carries traits, darkvision and cantrips — "Elf" alone
  // carries none of them — so it wins over the broad race when the wiki has it.
  const wanted = c.subrace || c.race;
  const race = wanted
    ? (RACE_LIST.find((r) => r.name.toLowerCase() === wanted.toLowerCase()) || {}).id || null
    : null;
  const bgLabel = c.background || ORIGIN_BACKGROUND_FALLBACK[companionId] || null;
  return {
    name: c.name, cls: clsKey, race,
    subclass: SUBCLASS_ID_BY_NAME[(c.subclass || "").toLowerCase()] || null,
    background: bgLabel ? BACKGROUND_KEY_BY_LABEL[bgLabel.toLowerCase()] || null : null,
    scores: c.scores ? { ...c.scores } : null
  };
}

// reset=false keeps whatever the player has already built on top (skills,
// feats, subclass, levels); reset=true rebuilds the whole sheet from the
// baseline, the way starting over from the companion's own version would.
function applyCompanion(member, companionId, reset) {
  const base = originBaseline(companionId);
  member.companion = companionId || null;
  if (!base) return;
  member.name = base.name;
  if (base.cls) {
    member.cls = base.cls;
    const levels = reset ? MAX_LEVEL : (totalLevel(member) || MAX_LEVEL);
    member.classes = [{ cls: base.cls, subclass: base.subclass, levels }];
    member.subclass = base.subclass;
    member.level = levels;
  }
  member.race = base.race;
  member.background = base.background;
  if (base.scores) {
    // the shipped array already includes racial bonuses, so hold it as-is
    member.originScores = { ...base.scores };
    member.useOrigin = true;
  } else {
    member.originScores = null;
    member.useOrigin = false;
    member.scores = presetScores(member.cls);
  }
  member.racial2 = null;
  member.racial1 = null;
  if (reset) {
    member.skills = [];
    member.expertise = [];
    member.feats = [];
    member.featBoosts = {};
    member.notes = "";
  }
}

// ---------------------------------------------------------------
// Derived character stats (AC, HP, DCs) — what a build is judged on
// ---------------------------------------------------------------
// BG3 states hit points directly rather than as a die: "At level 1: 10, on level
// up: 6". Using the wiki's own numbers avoids re-deriving them from a die size.
const hpAtLevel1 = (clsKey) => (CLASSES[clsKey] || {}).hpLevel1 || 8;
const hpPerLevel = (clsKey) => (CLASSES[clsKey] || {}).hpOnLevelUp || 5;
const spellAbilityOf = (clsKey) => (CLASSES[clsKey] || {}).spellAbility || null;

const equippedItems = (m) =>
  SLOT_DEFS.map((s) => itemsById[gear(m)[s.key]]).filter(Boolean);

// Armour caps how much Dexterity reaches your AC, exactly as in the game
function armourCategory(item) {
  if (!item) return null;
  const req = (item.details || []).find((d) => /^Required Proficiency:/i.test(d));
  if (req) {
    if (/Heavy/i.test(req)) return "heavy";
    if (/Medium/i.test(req)) return "medium";
    if (/Light/i.test(req)) return "light";
  }
  return "clothing";
}

// ---------------------------------------------------------------
// Fighting styles — permanently active class features
// ---------------------------------------------------------------
const STYLE_LIST = typeof FIGHTING_STYLES !== "undefined" ? FIGHTING_STYLES : [];
const styleById = {};
STYLE_LIST.forEach((s) => (styleById[s.id] = s));

// A style is offered when one of the character's class entries has reached the
// level the wiki records for it. Champion appears as its own source because a
// Champion Fighter picks a *second* style at level 10 — the only way to have two
// without multiclassing (bg3.wiki/wiki/Fighting_Style).
function styleSources(member) {
  const out = [];
  memberClasses(member).forEach((entry) => {
    const clsLabel = (CLASSES[entry.cls] || {}).label;
    const subName = (subclassById[entry.subclass] || {}).name;
    if (clsLabel) out.push({ name: clsLabel, levels: entry.levels });
    if (subName) out.push({ name: subName, levels: entry.levels });
  });
  return out;
}

function availableStyles(member) {
  const sources = styleSources(member);
  return STYLE_LIST.filter((style) =>
    (style.available || []).some((a) =>
      sources.some((s) => s.name === a.source && s.levels >= a.level)));
}

// How many a character may pick: one per class that grants any style, plus one
// more for a Champion Fighter at level 10.
function styleSlots(member) {
  const sources = styleSources(member);
  let slots = 0;
  memberClasses(member).forEach((entry) => {
    const clsLabel = (CLASSES[entry.cls] || {}).label;
    const subName = (subclassById[entry.subclass] || {}).name;
    const grantsAt = (name) => STYLE_LIST
      .flatMap((s) => s.available || [])
      .filter((a) => a.source === name)
      .reduce((min, a) => Math.min(min, a.level), 99);
    if (clsLabel && entry.levels >= grantsAt(clsLabel)) slots += 1;
    // the subclass slot is the extra one, and only when the class already gave one
    if (subName && entry.levels >= grantsAt(subName) && grantsAt(subName) < 99) {
      if (subName !== clsLabel) slots += 1;
    }
  });
  void sources;
  return slots;
}

const memberStyles = (member) =>
  (member.styles || []).filter((s) => s && styleById[s]);

const hasStyle = (member, id) => memberStyles(member).includes(id);

// Rerolling changes what a die is worth, so the distribution is built once and
// reused: Great Weapon Fighting rerolls 1s and 2s, Savage Attacker keeps the best
// of two rolls, and a character can have both.
function dieDistribution(size, rerollLowTwo) {
  const p = new Array(size + 1).fill(0);
  for (let v = 1; v <= size; v++) {
    p[v] = (v >= 3 || !rerollLowTwo ? 1 / size : 0) +
      (rerollLowTwo ? (2 / size) * (1 / size) : 0);
  }
  return p;
}

// P(even) − P(odd) for one die. It is the quantity that multiplies cleanly: for a
// sum of independent dice the whole sum's bias is the product of theirs, so a
// single unbiased die drags the total to exactly even odds.
//
// Every BG3 die has an even number of faces, so a plain d4…d12 has bias exactly 0
// — and Great Weapon Fighting's reroll preserves that. Savage Attacker does not:
// keeping the best of two skews towards the high half, which is uneven.
function dieParityBias(size, rerollLowTwo, bestOfTwo) {
  if (!size) return 1;                       // no die: parity is fixed, bias 1
  const p = dieDistribution(size, rerollLowTwo);
  let probs = p;
  if (bestOfTwo) {
    probs = [];
    let cum = 0, prev = 0;
    for (let v = 1; v <= size; v++) {
      cum += p[v];
      probs[v] = cum * cum - prev * prev;
      prev = cum;
    }
  }
  let bias = 0;
  for (let v = 1; v <= size; v++) bias += (v % 2 === 0 ? 1 : -1) * probs[v];
  return bias;
}

function dieExpected(size, rerollLowTwo, bestOfTwo) {
  if (!size) return 0;
  const p = dieDistribution(size, rerollLowTwo);
  if (!bestOfTwo) {
    let e = 0;
    for (let v = 1; v <= size; v++) e += v * p[v];
    return e;
  }
  // E[max of two] from the cumulative distribution
  let cum = 0, prev = 0, e = 0;
  for (let v = 1; v <= size; v++) {
    cum += p[v];
    e += v * (cum * cum - prev * prev);
    prev = cum;
  }
  return e;
}

const diceExpected = (count, size, rerollLowTwo, bestOfTwo) =>
  count * dieExpected(size, rerollLowTwo, bestOfTwo);

function derivedStats(member) {
  const finals = finalScores(member);
  const dexMod = abilityModifier(finals.dex);
  const conMod = abilityModifier(finals.con);
  const items = equippedItems(member);
  const chest = itemsById[gear(member).chest];
  const category = armourCategory(chest);

  let ac;
  let acFormula;
  if (chest && chest.ac) {
    // Medium armour caps Dexterity at +2, raised to +3 by Medium Armour Master;
    // heavy ignores it entirely (bg3.wiki/wiki/Armour_Class). Four "Exotic
    // Material" medium armours lift the cap altogether — they say so in their
    // own text, so the item is read rather than a list of ids maintained here.
    const exotic = /full Dexterity Modifier|adds? (?:the wearer's|your) Dexterity Modifier|does(?:n't| not) limit/i
      .test(itemStatText(chest));
    if (category === "heavy") {
      ac = chest.ac;
      acFormula = "Heavy armour " + chest.ac + " (Dexterity ignored)";
    } else if (category === "medium" && !exotic) {
      const cap = memberFeats(member).includes("mediumArmourMaster") ? 3 : 2;
      ac = chest.ac + Math.min(cap, dexMod);
      acFormula = "Medium armour " + chest.ac + " + Dex " + fmtSigned(Math.min(cap, dexMod)) +
        " (capped at +" + cap + ")";
    } else {
      ac = chest.ac + dexMod;
      acFormula = (exotic ? "Exotic medium armour " : "Light armour ") + chest.ac +
        " + Dex " + fmtSigned(dexMod);
    }
  } else {
    // Unarmoured, a character uses whichever formula they have access to gives
    // the highest AC (bg3.wiki/wiki/Armour_Class § Other formulas). Barbarian and
    // Monk Unarmoured Defence and Draconic Resilience are the ones BG3 lists.
    const classKeys = memberClasses(member).map((c) => c.cls);
    const subNames = memberClasses(member)
      .map((c) => (subclassById[c.subclass] || {}).name || "").join(" ");
    const options = [{ v: 10 + dexMod, label: "Unarmoured 10 + Dex " + fmtSigned(dexMod) }];
    if (classKeys.includes("barbarian")) {
      options.push({ v: 10 + conMod + dexMod,
        label: "Unarmoured Defence 10 + Con " + fmtSigned(conMod) + " + Dex " + fmtSigned(dexMod) });
    }
    // The Monk formula also stops working while a shield is carried.
    const carriesShield = OFF_HAND_SLOTS
      .some((k) => (itemsById[gear(member)[k]] || {}).type === "shield");
    if (classKeys.includes("monk") && !carriesShield) {
      options.push({ v: 10 + abilityModifier(finals.wis) + dexMod,
        label: "Unarmoured Defence 10 + Wis " + fmtSigned(abilityModifier(finals.wis)) +
               " + Dex " + fmtSigned(dexMod) });
    }
    if (/Draconic/i.test(subNames)) {
      options.push({ v: 13 + dexMod, label: "Draconic Resilience 13 + Dex " + fmtSigned(dexMod) });
    }
    const best = options.reduce((a, b) => (b.v > a.v ? b : a));
    ac = best.v;
    acFormula = best.label;
  }

  // flat AC bonuses printed on gear (shields, rings, cloaks…)
  let acBonus = 0;
  items.forEach((it) => {
    const text = itemStatText(it);
    const re = /\+\s*(\d+)\s*(?:bonus\s*)?to\s*(?:your\s*)?Armou?r Class/gi;
    let m;
    while ((m = re.exec(text)) !== null) acBonus += parseInt(m[1], 10);
    const acLine = (it.details || []).find((d) => /^Armou?r Class \+\d/i.test(d));
    if (acLine) {
      const n = /\+(\d+)/.exec(acLine);
      if (n) acBonus += parseInt(n[1], 10);
    }
  });
  // a shield's own AC value is its bonus (2 for a plain one, 3 when enchanted)
  const shield = [gear(member).weapon2, gear(member).ranged2]
    .map((id) => itemsById[id]).find((it) => it && it.type === "shield");
  if (shield) acBonus += shield.ac || 2;
  if (memberFeats(member).includes("dualWielder")) acBonus += 1;
  // Defence: "+1 bonus to Armour Class while wearing Armour". The wiki's own note
  // widens that to anything marked light, medium or heavy armour in ANY slot, so
  // a helmet with an armour proficiency requirement is enough — not just a chest.
  if (hasStyle(member, "defence") &&
      items.some((it) => ["light", "medium", "heavy"].includes(armourCategory(it)))) {
    acBonus += 1;
  }

  // hit points accumulate per class: a full die for the very first level,
  // then the class average for every level after
  const level = totalLevel(member);
  let hp = 0;
  let first = true;
  memberClasses(member).forEach((entry) => {
    // le wiki donne directement les PV par niveau, pas un de
    for (let i = 0; i < entry.levels; i++) {
      hp += (first ? hpAtLevel1(entry.cls) : hpPerLevel(entry.cls)) + conMod;
      first = false;
    }
  });
  if (memberFeats(member).includes("tough")) hp += 2 * level;

  // The highest-level casting class drives the printed DC. A subclass can cast
  // when its class does not — Arcane Trickster and Eldritch Knight both use
  // Intelligence — so the subclass ability wins for that entry.
  let spellAb = null;
  let best = 0;
  memberClasses(member).forEach((entry) => {
    const sub = subclassById[entry.subclass];
    const ab = (sub && sub.spellAbility) || spellAbilityOf(entry.cls);
    if (ab && entry.levels > best) { best = entry.levels; spellAb = ab; }
  });
  const spellMod = spellAb ? abilityModifier(finals[spellAb]) : null;
  const prof = proficiencyBonus(level);

  // gear that boosts spellcasting has to reach the tile and the spell projection,
  // not just the build summary
  let spellDcBonus = 0;
  let spellAttackBonus = 0;
  items.forEach((it) => {
    const text = itemStatText(it);
    let m;
    const dcRe = /\+\s*(\d+)\s*(?:bonus\s*)?to\s*(?:your\s*)?Spell Save DC/gi;
    while ((m = dcRe.exec(text)) !== null) spellDcBonus += parseInt(m[1], 10);
    const atkRe = /\+\s*(\d+)\s*(?:bonus\s*)?to\s*(?:your\s*)?Spell Attack(?:\s*Rolls?)?/gi;
    while ((m = atkRe.exec(text)) !== null) spellAttackBonus += parseInt(m[1], 10);
  });

  let initiative = dexMod;
  if (memberFeats(member).includes("alert")) initiative += 5;
  items.forEach((it) => {
    const m = /\+\s*(\d+)\s*(?:bonus\s*)?to\s*Initiative/i.exec(itemStatText(it));
    if (m) initiative += parseInt(m[1], 10);
  });

  return {
    ac: ac + acBonus, acFormula, acBonus, hp, initiative, prof,
    spellAbility: spellAb,
    spellDc: spellMod === null ? null : 8 + prof + spellMod + spellDcBonus,
    spellAttack: spellMod === null ? null : prof + spellMod + spellAttackBonus,
    passiveArmour: category
  };
}

