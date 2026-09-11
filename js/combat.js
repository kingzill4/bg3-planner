// BG3 Build Planner — Combat maths, conditions, number transitions, spell slots and spell projection.
//
// Loaded as a classic script, like the generated data files: these share one
// global scope, in the order index.html lists them. Not ES modules, because
// those are blocked over file:// and the page has to keep opening by itself.
"use strict";

// ---------------------------------------------------------------
// Combat maths: attack bonus, hit chance, average damage
// ---------------------------------------------------------------
const proficiencyBonus = (level) => 2 + Math.floor((Math.max(1, level) - 1) / 4);

// Which ability drives the attack: ranged uses Dexterity, and a Finesse weapon
// takes the better of Strength and Dexterity (bg3.wiki/wiki/Attack_roll).
// Finesse is read from the weapon's own property list rather than from a list of
// weapon families kept here: Flame Blade is a Scimitar that is not Finesse, so
// assuming by family got it wrong.
function attackAbility(item, finals) {
  if (isRangedWeapon(item)) return "dex";
  const finesse = (item.details || []).some((d) => /^Finesse$/i.test(d));
  if (finesse) return abilityModifier(finals.dex) > abilityModifier(finals.str) ? "dex" : "str";
  return "str";
}

// The wiki writes a weapon's damage as dot-separated segments, e.g.
//   "1H 1d8 + 1 (2~9) + Strength modifier Slashing · 2H 1d10 + 1 (2~11) ... ·
//    Extra 1d4 (1~4) Fire"
// Reading the dice notation rather than only the (min~max) span matters: a
// critical hit doubles the *dice* and not the flat bonuses (bg3.wiki/wiki/Critical_Hit),
// so the dice average has to be known separately from the enchantment.
function parseDamageSegment(seg) {
  const s = seg.trim();
  if (!s) return null;
  const hands = /^1H\b/.test(s) ? 1 : /^2H\b/.test(s) ? 2 : null;
  const extra = /^Extra\b/i.test(s);
  const dice = /(\d+)\s*d\s*(\d+)/.exec(s);
  const count = dice ? parseInt(dice[1], 10) : 0;
  const size = dice ? parseInt(dice[2], 10) : 0;
  // "+ 1" after the dice is the enchantment; "Extra 3 Poison" is a flat rider
  let flat = 0;
  if (dice) {
    const after = s.slice(dice.index + dice[0].length);
    const plus = /^\s*\+\s*(\d+)/.exec(after);
    if (plus) flat = parseInt(plus[1], 10);
  } else {
    const lone = /^(?:Extra\s+)?(\d+)\s/.exec(s);
    if (lone) flat = parseInt(lone[1], 10);
  }
  if (!count && !flat) return null;
  // the damage type is the trailing capitalised word
  const typeM = /([A-Z][a-z]+)\s*$/.exec(s);
  const type = typeM ? typeM[1] : null;
  const diceAvg = count * (size + 1) / 2;
  return { hands, extra, count, size, flat, type, diceAvg, avg: diceAvg + flat };
}

// Returns the segment actually rolled in the given grip plus every rider.
function parseWeaponDamage(damage, twoHanded) {
  if (!damage) return null;
  const segs = damage.split("·").map(parseDamageSegment).filter(Boolean);
  if (!segs.length) return null;
  const riders = segs.filter((s) => s.extra);
  const mains = segs.filter((s) => !s.extra);
  if (!mains.length) return null;
  // a versatile weapon lists both grips; a fixed one lists a single unlabelled segment
  let main = mains.find((s) => s.hands === (twoHanded ? 2 : 1));
  if (!main) main = mains[0];
  return { main, riders };
}

function enchantmentBonus(item) {
  const d = (item.details || []).find((x) => /^Enchantment:/i.test(x));
  if (!d) return 0;
  const m = /\+\s*(\d+)/.exec(d);
  return m ? parseInt(m[1], 10) : 0;

}
// P(normal hit) and P(critical) on one d20, given the attack bonus, the target's
// AC and the critical threshold. A natural 1 always misses and a roll at or above
// the threshold is a critical, which lands regardless of AC
// (bg3.wiki/wiki/Attack_roll, bg3.wiki/wiki/Critical_Hit).
// Halfling Luck rerolls a natural 1; since a natural 1 is never a success, every
// favourable outcome simply gains its own probability over 20.
function rollOdds(bonus, ac, critThreshold, luck) {
  const T = Math.max(2, Math.min(20, critThreshold));
  let crit = (21 - T) / 20;
  const lowest = Math.max(2, ac - bonus);
  const highest = T - 1;
  let hit = highest < lowest ? 0 : (highest - lowest + 1) / 20;
  if (luck) { crit *= 21 / 20; hit *= 21 / 20; }
  return { crit, hit, miss: Math.max(0, 1 - crit - hit) };
}

// Advantage rolls two d20 and keeps the best, so a critical happens if either die
// crits and the attack lands unless both miss. Disadvantage is the exact mirror:
// two dice, keep the worst, so it lands only if both would have landed and crits
// only if both would have critted. Each die rerolls its own natural 1, which is
// what Halfling Luck does, so the single-die odds combine directly.
//
// `roll` is +1 Advantage, -1 Disadvantage, 0 a straight d20. In BG3 holding both
// at once cancels to a normal roll, so the caller resolves them to one number.
//
// The control offers the three states rather than two checkboxes, because two
// checkboxes would let you tick a combination the game collapses anyway.
function attackOdds(bonus, ac, critThreshold, roll, luck) {
  // A missing AC used to propagate as NaN through hit chance and DPR without
  // anything failing loudly. 15 matches the default the combat panel shows.
  if (!Number.isFinite(ac)) ac = 15;
  const o = rollOdds(bonus, ac, critThreshold, luck);
  if (roll > 0) {
    const crit = 1 - (1 - o.crit) * (1 - o.crit);
    const any = 1 - o.miss * o.miss;
    return { crit, hit: Math.max(0, any - crit), miss: o.miss * o.miss };
  }
  if (roll < 0) {
    const crit = o.crit * o.crit;
    const any = (1 - o.miss) * (1 - o.miss);
    return { crit, hit: Math.max(0, any - crit), miss: 1 - any };
  }
  return o;
}
// Sources that lower the critical threshold all subtract 1 and stack. The subclass
// side is now read from the scraped feature list rather than a hardcoded subclass
// name, so any subclass the wiki gives Improved Critical Hit to is picked up, at
// the level the wiki records.
function critThresholdOf(member) {
  let threshold = 20;
  memberClasses(member).forEach((entry) => {
    const sub = subclassById[entry.subclass];
    if (!sub) return;
    (sub.features || []).forEach((f) => {
      if (!/Improved Critical/i.test(f.n || "")) return;
      if (f.level == null || entry.levels >= f.level) threshold -= 1;
    });
  });
  equippedItems(member).forEach((it) => {
    const text = itemStatText(it) + " " + (it.special || []).map((s) => s.n).join(" ");
    if (/Improved Critical|Organ Rearranger/i.test(text)) threshold -= 1;
  });
  return Math.max(2, threshold);
}

// Attacks per Attack action. Extra Attack does not stack across classes: a
// Ranger 5 / Fighter 5 still has one extra attack. Improved Extra Attack
// (Fighter 11) replaces it with two (bg3.wiki/wiki/Extra_Attack).
const EXTRA_ATTACK_AT_5 = ["barbarian", "fighter", "monk", "paladin", "ranger"];
const EXTRA_ATTACK_SUBCLASSES_AT_6 = ["College of Swords", "College of Valour", "Bladesinging"];

function attacksPerAction(member) {
  let attacks = 1;
  memberClasses(member).forEach((entry) => {
    const sub = (subclassById[entry.subclass] || {}).name;
    if (EXTRA_ATTACK_AT_5.includes(entry.cls) && entry.levels >= 5) attacks = Math.max(attacks, 2);
    if (sub && EXTRA_ATTACK_SUBCLASSES_AT_6.includes(sub) && entry.levels >= 6) attacks = Math.max(attacks, 2);
    if (entry.cls === "fighter" && entry.levels >= 11) attacks = Math.max(attacks, 3);
  });
  return attacks;
}

// Does this build have a class feature by name? Read from the scraped per-class
// progression rather than a hand-written level table, so it stays true to the wiki.
function hasClassFeature(member, name) {
  return memberClasses(member).some((entry) => {
    const cls = CLASSES[entry.cls];
    return cls && (cls.progression || []).some((step) =>
      step.level <= entry.levels && (step.features || []).includes(name));
  });
}

// Sneak Attack: a Rogue's once-per-turn rider, 1d6 at level 1 and another d6 every
// two rogue levels, capped at 6d6 at level 11. It needs a Finesse melee weapon or a
// ranged one, plus Advantage (or an ally beside the target and no Disadvantage).
function sneakAttackDice(member) {
  const rogue = memberClasses(member).filter((c) => c.cls === "rogue")
    .reduce((sum, c) => sum + c.levels, 0);
  if (!rogue) return 0;
  return Math.min(6, Math.ceil(rogue / 2));
}

const sneakAttackEligible = (item) =>
  isRangedWeapon(item) || (item.details || []).some((d) => /^Finesse$/i.test(d));

// Divine Smite: 2d8 Radiant on a melee hit, +1d8 per slot level above 1st, capped
// at 5d8 — a slot above 4th adds nothing (bg3.wiki/wiki/Divine_Smite).
function divineSmiteDice(member, slotLevel) {
  const paladin = memberClasses(member).filter((c) => c.cls === "paladin")
    .reduce((sum, c) => sum + c.levels, 0);
  if (paladin < 2) return 0;
  return Math.min(5, 2 + Math.max(0, (slotLevel || 1) - 1));
}

// Improved Divine Smite, the Paladin's level 11 passive: "Melee weapon attacks
// deal an additional 1d8 Radiant damage." No slot and no choice — it is simply
// on, and it was missing from every Paladin 11+ figure this tool produced.
// The wiki names the restriction when there is one — Brutal Critical says "main
// hand melee weapon attacks or unarmed" — and here it says only "melee weapon
// attacks", so the off-hand swing carries it too.
const improvedSmiteDice = (member) =>
  hasClassFeature(member, "Improved Divine Smite") ? 1 : 0;

// Rage: "Deals an additional 2 (increased to 3 at level 9) damage with melee and
// improvised weapons, unarmed strikes, and while throwing objects." The step is
// read off the wiki's own Rage Damage column rather than remembered: +2 through
// level 8, +3 from 9.
//
// Heavy armour cancels it. Rage Impeded: "Until the armour is removed, Raging
// won't grant extra damage, resistance to physical damage, or Advantage on
// Strength Checks and Saving Throws."
function rageDamage(member) {
  const barb = memberClasses(member).filter((c) => c.cls === "barbarian")
    .reduce((sum, c) => sum + c.levels, 0);
  if (!barb) return 0;
  const chest = itemsById[gear(member).chest];
  if (chest && armourCategory(chest) === "heavy") return 0;
  return barb >= 9 ? 3 : 2;
}

// An extra die of weapon damage on a critical hit. Two sources, one shape:
//   Brutal Critical (Barbarian 9) — "you roll an extra damage die as well as the
//     normal additional critical die", limited by its own notes to "main hand
//     melee weapon attacks or unarmed melee attacks".
//   Savage Attacks (Half-Orc)     — "you deal an extra die of weapon damage",
//     which the same notes say covers melee main hand or off-hand.
// One die either way, whatever the weapon's dice count. bg3.wiki/wiki/Critical_Hit:
// "an attack dealing 1d10 Bludgeoning will critically deal 2d10 + 1d10", and the
// Brutal Critical page spells out that a greatsword's 2d6 gains a single d6.
function extraCritDice(member, offHand) {
  let dice = 0;
  if (!offHand && hasClassFeature(member, "Brutal Critical")) dice += 1;
  const race = raceById[member.race];
  if (race && (race.traits || []).some((t) => /^Savage Attacks$/i.test(t.n || ""))) dice += 1;
  return dice;
}

// GWM's "All In" is narrower in BG3 than the 5e feat: bg3.wiki words it as
// "attacking with a Two-Handed or Versatile melee weapon (in both hands) that
// you are Proficient with". A Heavy one-handed weapon does not qualify, and a
// versatile weapon does — but only while the off-hand is free.
function gwmEligible(item, twoHanded) {
  if (isRangedWeapon(item)) return false;
  const details = item.details || [];
  if (details.some((d) => /^Two-Handed$/i.test(d))) return true;
  return twoHanded && details.some((d) => /^Versatile$/i.test(d));
}

// Lightfoot and Strongheart Halflings reroll natural 1s (Halfling Luck).
const hasHalflingLuck = (member) => {
  const race = raceById[member.race];
  return !!(race && (race.traits || []).some((t) => /Halfling Luck/i.test(t.n || "")));
};

// A versatile weapon is held in both hands whenever its matching off-hand is empty
const OFF_HAND_OF = { weapon1: "weapon2", ranged1: "ranged2" };
const OFF_HAND_SLOTS = ["weapon2", "ranged2"];
const isTwoHanded = (member, slotKey) => {
  const off = OFF_HAND_OF[slotKey];
  return off ? !gear(member)[off] : false;
};

// The scraped infobox lists a weapon's properties as plain entries in `details`
// ("Light", "Two-Handed", "Versatile", "Finesse"). Matching on a word boundary
// keeps "Light" from being found inside "Light Crossbow" or "Lightning".
function weaponHas(item, prop) {
  if (!item) return false;
  return (item.details || []).some((d) => new RegExp("\\b" + prop + "\\b", "i").test(d));
}

// Can these two actually be dual-wielded? bg3.wiki/wiki/Dual_Wielder:
//   "Normally, a character can only dual-wield two weapons with the Light property."
//   The feat: "You can use Two-Weapon Fighting even if the weapons you are wielding
//   aren't Light. You cannot dual-wield Two-Handed weapons." — and its notes add
//   that it covers One-Handed and Versatile weapons.
// Without this the tool happily added a bonus-action attack for two greatswords,
// inflating the headline damage by a whole swing the game never offers.
function dualWieldCheck(member, mainItem, offItem) {
  if (!mainItem || !offItem) return { ok: true };
  const feat = memberFeats(member).includes("dualWielder");
  const twoHanded = [mainItem, offItem].filter((i) => weaponHas(i, "Two-Handed"));
  if (twoHanded.length) {
    return { ok: false, reason: twoHanded.length > 1
      ? "Two-Handed weapons cannot be dual-wielded — neither of these can be an off-hand."
      : twoHanded[0].name + " is Two-Handed, and a Two-Handed weapon cannot be dual-wielded — " +
        "not even with the Dual Wielder feat." };
  }
  const heavy = [mainItem, offItem].filter((i) => !weaponHas(i, "Light"));
  if (!heavy.length) return { ok: true };
  if (feat) return { ok: true, viaFeat: true };
  return { ok: false, reason: heavy.map((i) => i.name).join(" and ") +
    (heavy.length > 1 ? " are not Light" : " is not Light") +
    ", so this needs the Dual Wielder feat. Without it only two Light weapons can be dual-wielded." };
}

// The target's resistances change which weapon is best more than almost anything
// else, so they belong in the calculator rather than in a caveat. The wiki's
// multipliers: vulnerability doubles, resistance halves, immunity zeroes.
// They do not stack, and a component only takes the multiplier if its damage type
// matches — which is why the damage is kept split by type rather than merged.
function targetDefence() {
  const typeSel = document.getElementById("combat-defence-type");
  const stateSel = document.getElementById("combat-defence-state");
  const type = typeSel ? typeSel.value : "";
  const mult = stateSel ? parseFloat(stateSel.value) : NaN;
  const manual = (type && !isNaN(mult) && mult !== 1) ? { type, mult } : null;
  // Wet is a condition on the target, but what it changes is the target's
  // defences, so it is resolved here with them rather than as an attack bonus.
  const wet = !!conditionState.wet;
  if (!manual && !wet) return null;
  return { type: manual ? manual.type : "", mult: manual ? manual.mult : 1, wet };
}

// Wet (Condition): "Resistant to Fire damage. Vulnerable to Lightning and Cold
// damage." Plus the note that decides the awkward cases:
//   "Wet entities who are resistant to Lightning or Cold damage have their
//    resistances negated instead of becoming vulnerable."
// So it is not a flat doubling. A Lightning-resistant target that gets Wet takes
// normal damage, not double — getting that backwards would overstate a
// lightning build against exactly the enemies it is meant to counter.
// Immunity is untouched: the note negates resistances, and says nothing about
// immunity, so an immune target stays immune.
function defenceMult(defence, damageType) {
  if (!defence || !damageType) return 1;
  const t = damageType.toLowerCase();
  let mult = (defence.type && t === defence.type.toLowerCase()) ? defence.mult : 1;
  if (!defence.wet) return mult;
  if (mult === 0) return 0;
  if (t === "fire") {
    // resistance and vulnerability cancel rather than compound
    return mult > 1 ? 1 : Math.min(mult, 0.5);
  }
  if (t === "lightning" || t === "cold") {
    return mult < 1 ? 1 : 2;
  }
  return mult;
}

function weaponAttack(member, item, opts) {
  const o = opts || {};
  const finals = finalScores(member);
  const ability = attackAbility(item, finals);
  const abilityMod = abilityModifier(finals[ability]);
  const ench = enchantmentBonus(item);
  const proficient = !proficiencyIssue(member, item);
  const profBonus = proficient ? proficiencyBonus(totalLevel(member)) : 0;
  const ranged = isRangedWeapon(item);

  const feats = memberFeats(member);
  // Both All-In feats require proficiency with the weapon, per their wiki text.
  const gwmActive = o.powerAttack && proficient && feats.includes("greatWeaponMaster") &&
    gwmEligible(item, o.twoHanded);
  const ssActive = o.powerAttack && proficient && feats.includes("sharpshooter") && ranged;
  const powerAttack = gwmActive || ssActive;

  // High ground is ±2 on any attack roll; Sharpshooter cancels the low-ground
  // penalty for ranged weapons only (Sharpshooter: Low Ground).
  let ground = o.ground || 0;
  if (ground < 0 && feats.includes("sharpshooter") && ranged) ground = 0;

  // Archery: "+2 bonus to Attack Rolls you make with ranged Weapons".
  const archery = hasStyle(member, "archery") && ranged;

  // Conditions in play feed the same roll: Bless and Lightning Charges add to it,
  // Prone and Restrained hand it Advantage.
  const cond = conditionTotals(null);
  const attackBonus = abilityMod + profBonus + ench + ground + cond.attack +

    (archery ? 2 : 0) - (powerAttack ? 5 : 0);
  const parsed = parseWeaponDamage(item.damage, o.twoHanded);
  const main = parsed ? parsed.main : null;
  const riders = parsed ? parsed.riders : [];
  const offHand = !!o.offHand;

  // Off-hand attacks apply only the weapon dice; Two-Weapon Fighting is what adds
  // the ability modifier back (bg3.wiki/wiki/Off-Hand_Attack_(Melee)).
  const twoWeapon = offHand && hasStyle(member, "two-weapon-fighting");
  const damageAbilityMod = (!offHand || twoWeapon) ? abilityMod : 0;

  // Duelling: a melee weapon that is not Two-Handed, held in one hand with no
  // weapon in the other. The wiki notes a shield in the free hand still counts.
  const offItem = itemsById[gear(member)[OFF_HAND_OF[o.slotKey] || ""]];
  const freeOffHand = !offItem || offItem.type === "shield";
  const notTwoHanded = !(item.details || []).some((d) => /^Two-Handed$/i.test(d));
  const duelling = hasStyle(member, "duelling") && !ranged && !offHand &&
    notTwoHanded && freeOffHand;

  // Great Weapon Fighting rerolls 1s and 2s on damage dice for a Two-Handed melee
  // weapon — and, per the wiki's own note, for a Versatile one held in both hands.
  // BG3 also rerolls added dice from other sources, unlike 5e, so riders count.
  const gwf = hasStyle(member, "great-weapon-fighting") && !ranged &&
    gwmEligible(item, o.twoHanded);
  // Savage Attacker is melee only and rerolls the damage dice, keeping the best.
  const savage = feats.includes("savageAttacker") && !ranged && !!main;

  // Each component takes the multiplier only if its own damage type is the one the
  // target resists. Power attack, Duelling and the ability modifier ride on the
  // weapon's own type, so they follow the main component.
  const defence = o.defence !== undefined ? o.defence : targetDefence();
  const mainMult = defenceMult(defence, main ? main.type : null);

  const mainDice = (main ? diceExpected(main.count, main.size, gwf, savage) : 0) * mainMult;
  const riderDice = riders.reduce((sum, r) =>
    sum + diceExpected(r.count, r.size, gwf, savage) * defenceMult(defence, r.type), 0);
  const riderFlat = riders.reduce((sum, r) => sum + r.flat * defenceMult(defence, r.type), 0);

  // Rage is a flat rider on the weapon's own damage type, so it rides the main
  // component's multiplier like the ability modifier does.
  const rage = o.rage ? rageDamage(member) : 0;
  const rageOn = rage && !ranged;

  let flatOnMain = (main ? main.flat : 0) + damageAbilityMod + cond.damage;
  if (powerAttack) flatOnMain += 10;
  if (duelling) flatOnMain += 2;
  if (rageOn) flatOnMain += rage;

  // Improved Divine Smite rides every melee hit, and it is a die, so it doubles
  // on a critical like any other damage die.
  const impSmiteDice = !ranged ? improvedSmiteDice(member) : 0;
  const impSmiteAvg = diceExpected(impSmiteDice, 8, gwf, savage) *
    defenceMult(defence, "Radiant");

  let avgDamage = mainDice + flatOnMain * mainMult + riderDice + riderFlat + impSmiteAvg;

  const luck = hasHalflingLuck(member);
  const critThreshold = critThresholdOf(member);
  // Advantage can come from the control or from a condition on the target
  // (Restrained, Prone). Disadvantage only comes from the control. Holding both
  // cancels to a straight d20, which is what BG3 does.
  const advantage = o.advantage || cond.advantage;
  const disadvantage = !!o.disadvantage;
  const roll = (advantage ? 1 : 0) - (disadvantage ? 1 : 0);
  const odds = attackOdds(attackBonus, o.targetAc, critThreshold, roll, luck);
  const chance = odds.hit + odds.crit;
  // "Any dice that are rolled for damage, including additional dice such as those
  // from smites or combat manoeuvres, are rolled twice. Flat modifiers and bonuses
  // to damage – including one's relevant ability score modifier and proficiency
  // bonus – are not doubled." (bg3.wiki/wiki/Critical_Hit)
  //
  // Brutal Critical and Savage Attacks then add one more die of weapon damage on
  // top of that doubling — the same page's example is "an attack dealing 1d10
  // Bludgeoning will critically deal 2d10 + 1d10".
  const critDice = !ranged ? extraCritDice(member, offHand) : 0;
  const critBonusAvg = main
    ? diceExpected(critDice, main.size, gwf, savage) * mainMult
    : 0;
  const critExtra = mainDice + riderDice + impSmiteAvg + critBonusAvg;

  // Extra Attack multiplies the whole attack; the off-hand attack is a bonus
  // action and is not repeated by it.
  const attacks = offHand ? 1 : (o.attacks || attacksPerAction(member));
  // The game shows a weapon's damage as a span, not an average, and a span is what
  // a player can check against the tooltip in front of them. Rerolling styles are
  // deliberately ignored here: Great Weapon Fighting and Savage Attacker shift the
  // distribution but not what the dice can physically roll.
  const flatTotal = (main ? main.flat : 0) + damageAbilityMod +
    (powerAttack ? 10 : 0) + (duelling ? 2 : 0) + (rageOn ? rage : 0);
  const radiantMult = defenceMult(defence, "Radiant");
  const minDamage = main
    ? Math.max(0, (main.count + flatTotal) * mainMult + impSmiteDice * radiantMult +
        riders.reduce((s, x) => s + (x.count + x.flat) * defenceMult(defence, x.type), 0))
    : 0;
  const maxDamage = main
    ? Math.max(0, (main.count * main.size + flatTotal) * mainMult + impSmiteDice * 8 * radiantMult +
        riders.reduce((s, x) => s + (x.count * x.size + x.flat) * defenceMult(defence, x.type), 0))
    : 0;

  const perAttack = chance * avgDamage + odds.crit * critExtra;

  // Sneak Attack and Divine Smite land once per turn, on the first attack that
  // hits — so they are weighted by the chance that any attack of the turn hits.
  const anyHit = 1 - Math.pow(odds.miss, attacks);
  const critOnce = 1 - Math.pow(1 - odds.crit, attacks);
  const sneakDice = (o.sneakAttack && !offHand && sneakAttackEligible(item))
    ? sneakAttackDice(member) : 0;
  const smiteDice = (o.divineSmite && !ranged && !offHand)
    ? divineSmiteDice(member, o.smiteSlot) : 0;
  // Sneak Attack deals the weapon's own damage type; Divine Smite is always Radiant.
  const sneakAvg = diceExpected(sneakDice, 6, gwf, savage) * mainMult;
  const smiteAvg = diceExpected(smiteDice, 8, gwf, savage) * defenceMult(defence, "Radiant");
  // Brutal Critical and Savage Attacks add their extra die to Divine Smite too:
  // "Additional damage dice, like those from battle manoeuvres, are not subject to
  // this additive bonus, with the exception of Divine Smite."
  // (bg3.wiki/wiki/Critical_Hit)
  const smiteCritBonus = smiteDice
    ? diceExpected(critDice, 8, gwf, savage) * defenceMult(defence, "Radiant")
    : 0;
  // Both land once per turn, and both are the player's choice after a hit lands —
  // so an optimal turn spends them on a critical when the turn produces one. The
  // first term is the rider landing at all, the second the doubling it gets when
  // that hit was a critical.
  const riderTurn = anyHit * (sneakAvg + smiteAvg) +
    critOnce * (sneakAvg + smiteAvg + smiteCritBonus);


  return {
    ability, abilityMod, damageAbilityMod, profBonus, ench, proficient, powerAttack,
    gwmActive, ssActive, savage, luck, ground, offHand, ranged, advantage, disadvantage,
    archery, duelling, gwf, twoWeapon,
    main, riders, riderAvg: riderDice + riderFlat, critExtra,
    critChance: odds.crit, critThreshold, odds, attacks,
    sneakDice, smiteDice, sneakAvg, smiteAvg,
    rage: rageOn ? rage : 0, impSmiteDice, impSmiteAvg, critDice, critBonusAvg,
    attackBonus, avgDamage: Math.max(0, avgDamage),
    perAttack, minDamage, maxDamage,
    hitChance: chance,
    dpr: Math.max(0, attacks * perAttack + riderTurn)
  };
}


// ---------------------------------------------------------------
// Conditions: the stacking mechanics BG3 builds are actually made of
// ---------------------------------------------------------------
// Each of these was read off its own wiki page. Most of them move a number here;
// the ones that do not are still offered, and say so plainly instead of pretending.
// Radiating Orb is the clearest case — it changes how often *you* get hit, which
// this calculator does not project.
//
//   Arcane Acuity  "+1 bonus to its spell Attack Rolls and spell save DC for each
//                   remaining turn", maximum 10 turns.
//   Reverberation  "-1 penalty to Strength, Dexterity, and Constitution Saving
//                   Throws per remaining turn"; at 5 it detonates and clears, so
//                   5 is reachable and is where it pays out.
//   Radiating Orb  "-1 to Attack Rolls per remaining turn", on the affected
//                   creature — i.e. on the enemy, against attacks aimed at you.
//                   Capped at 10 turns, "a maximum effect of -10 to Attack Rolls".
// Each entry carries what it actually does, so the calculators read the effect
// rather than special-casing a name. Every wording below is quoted from the
// condition's own wiki page; anything that does not move a number this tool
// computes is still offered, but says plainly that it changes nothing here.
//
//   attack(n)      added to weapon and spell attack rolls
//   damage(n)      flat damage added on a hit, of `damageType`
//   targetSave(n)  subtracted from the target's saving throw
//   advantage      grants Advantage on attacks against the target
const CONDITIONS = [
  { key: "acuity", label: "Arcane Acuity", max: 10, on: "you",
    spellAttack: (n) => n, spellDc: (n) => n,
    effect: (n) => "+" + n + " to spell attack rolls and spell save DC",
    wiki: "https://bg3.wiki/wiki/Arcane_Acuity_(Condition)" },

  // "Gains a +1d4 bonus to Attack Rolls and Saving Throws" — a die, so the
  // calculator uses its average and the label says so.
  { key: "bless", label: "Bless", max: 1, on: "you",
    attack: () => 2.5, spellAttack: () => 2.5,
    effect: () => "+1d4 to attack rolls (averaged as +2.5)",
    wiki: "https://bg3.wiki/wiki/Bless_(Condition)" },

  // "You have +1 to Attack Rolls and deal an additional 1 Lightning damage. If
  // you gain 5 charges, they are consumed the next time you deal damage, and you
  // deal an additional 1d8 Lightning DRS damage. You lose 1 charge per turn."
  // The flat +1/+1 does NOT scale with the count — but the count is real, and
  // reaching 5 adds a one-off 1d8, so this is a stepper, not a toggle.
  // The 1d8 is deliberately NOT added to `damage`: that runs per attack, and the
  // wiki says the charges are consumed "the next time you deal damage" — once,
  // not on every swing. Adding it would inflate a two-attack turn by 9.
  { key: "charges", label: "Lightning Charges", max: 5, on: "you",
    attack: () => 1, damage: () => 1, damageType: "Lightning",
    effect: (n) => n >= 5
      ? "+1 to attack rolls and +1 Lightning damage. At 5 the charges are consumed " +
        "the next time you deal damage for one extra 1d8 Lightning (avg 4.5) — once " +
        "for the turn, not per attack, so it is not folded into the numbers below"
      : "+1 to attack rolls and +1 Lightning damage — flat at any count; the one-off " +
        "1d8 only fires once you hold 5",
    wiki: "https://bg3.wiki/wiki/Lightning_Charges" },

  // "-1 penalty to Strength, Dexterity, and Constitution Saving Throws per
  // remaining turn. When the entity has 5 or more turns of Reverberation, it
  // takes 1d4 Thunder DRS damage and must succeed a DC 10 Constitution Saving
  // Throw or fall Prone. The condition is removed afterward." So 5 is reachable,
  // and it is where the condition pays out.
  { key: "reverb", label: "Reverberation", max: 5, on: "the target",
    targetSave: (n) => n, saves: ["STR", "DEX", "CON"],
    effect: (n) => "−" + n + " to the target's STR, DEX and CON saves" + (n >= 5
      ? ", and at 5 it detonates for 1d4 Thunder with a DC 10 CON save or fall Prone, then clears"
      : ""),
    wiki: "https://bg3.wiki/wiki/Reverberation_(Condition)" },

  // "Has a -1d4 penalty to Attack Rolls and Saving Throws" — all saves, not
  // only the three Reverberation touches.
  { key: "bane", label: "Bane", max: 1, on: "the target",
    targetSave: () => 2.5,
    effect: () => "−1d4 to every saving throw the target makes (averaged as −2.5)",
    wiki: "https://bg3.wiki/wiki/Bane_(Condition)" },

  // "Cannot move. Attack Rolls against the affected entity have Advantage, while
  // the entity's Attack Rolls and Dexterity Saving Throws have Disadvantage."
  // Nothing counts turns, so this is on or off. The DEX-save Disadvantage is
  // stated rather than folded into a number — a re-roll is not a flat modifier.
  { key: "restrained", label: "Restrained", max: 1, on: "the target",
    advantage: true,
    effect: () => "attacks against the target have Advantage, and its DEX saves " +
      "have Disadvantage (rolled twice, worse kept — not a flat number, so it is " +
      "not folded into the save DC below)",
    wiki: "https://bg3.wiki/wiki/Restrained" },
  // "Attacks against a Prone creature have Advantage if they're made within
  // 3 m (10 ft)." Also no turn count, so on or off.
  { key: "prone", label: "Prone", max: 1, on: "the target",
    advantage: true,
    effect: () => "attacks within 3 m (10 ft) have Advantage — assumed here",
    wiki: "https://bg3.wiki/wiki/Prone" },

  // "Resistant to Fire damage. Vulnerable to Lightning and Cold damage."
  // Nothing counts turns, so it is on or off. The multipliers are applied in
  // defenceMult alongside the manual defence picker, because Wet changes what the
  // target resists rather than what you roll — see the note there about the
  // resistance-negation rule, which stops this being a plain doubling.
  { key: "wet", label: "Wet", max: 1, on: "the target",
    effect: () => "the target resists Fire, and is Vulnerable to Lightning and Cold — " +
      "unless it already resisted them, in which case that resistance is negated instead",
    wiki: "https://bg3.wiki/wiki/Wet_(Condition)" },

  // "Takes 2 Slashing DRS damage at the start of each turn and has Disadvantage on
  // Constitution Saving Throws." Nothing counts turns, so it is on or off. The
  // Disadvantage is stated rather than folded into the save DC for the same reason
  // as Restrained: a re-roll is not a flat modifier, and inventing one would be a
  // number nobody could check.
  { key: "bleeding", label: "Bleeding", max: 1, on: "the target",
    effect: () => "the target takes 2 Slashing at the start of its turn, and its CON " +
      "saves have Disadvantage (rolled twice, worse kept — not a flat number, so it " +
      "is not folded into the save below)",
    wiki: "https://bg3.wiki/wiki/Bleeding_(Condition)" },

  // "Takes 1d4 Fire damage per turn." That is damage on the target's own turn, not
  // part of your attack, so it changes nothing in the figures above and says so.
  // The Wet interaction is worth stating because the two are commonly stacked and
  // they cancel: the page says Burning is "Immune from if Wet".
  { key: "burning", label: "Burning", max: 1, on: "the target",
    effect: () => "the target takes 1d4 Fire at the start of its turn — its own turn, " +
      "so it is not part of your damage below. A Wet target cannot be Burning at all",
    wiki: "https://bg3.wiki/wiki/Burning_(Condition)" },

  { key: "orb", label: "Radiating Orb", max: 10, on: "the target", defensive: true,
    effect: (n) => "−" + n + " to the target's attack rolls — that protects you, and " +
      "this calculator projects the damage you deal, so no number here moves",
    wiki: "https://bg3.wiki/wiki/Radiating_Orb_(Condition)" }
];

const conditionState = {};
CONDITIONS.forEach((c) => (conditionState[c.key] = 0));

// Everything the active conditions add up to, read once per render.
function conditionTotals(saveAbility) {
  const t = { attack: 0, spellAttack: 0, spellDc: 0, damage: 0, targetSave: 0, advantage: false };
  CONDITIONS.forEach((c) => {
    const n = conditionState[c.key];
    if (!n) return;
    if (c.attack) t.attack += c.attack(n);
    if (c.spellAttack) t.spellAttack += c.spellAttack(n);
    if (c.spellDc) t.spellDc += c.spellDc(n);
    if (c.damage) t.damage += c.damage(n);
    if (c.advantage) t.advantage = true;
    // a save penalty that names abilities only applies to those
    if (c.targetSave) {
      if (!c.saves || !saveAbility || c.saves.includes(String(saveAbility).toUpperCase())) {
        t.targetSave += c.targetSave(n);
      }
    }
  });
  return t;
}

function renderConditions() {
  const box = document.getElementById("combat-conditions");
  const wasOpen = box.querySelector("details") ? box.querySelector("details").open : false;
  box.innerHTML = "";

  // Eight conditions as always-open rows pushed the damage figures off the screen,
  // which is the one thing this layout exists to prevent. Folded away by default,
  // with whatever is active named in the summary so nothing hides silently.
  const active = CONDITIONS.filter((c) => conditionState[c.key]);
  const wrap = el("details", { class: "cond-wrap" });
  if (wasOpen || active.length) wrap.open = wasOpen || false;
  const summary = el("summary", {});
  summary.appendChild(el("span", { class: "cond-head" }, ["Conditions in play"]));
  summary.appendChild(el("span", { class: "cond-summary" }, [
    active.length
      ? active.map((c) => c.label + (c.max > 1 ? " ×" + conditionState[c.key] : "")).join(", ")
      : "none"
  ]));
  wrap.appendChild(summary);

  const list = el("div", { class: "cond-list" });
  CONDITIONS.forEach((c) => {
    const n = conditionState[c.key];
    const binary = c.max === 1;
    const row = el("div", { class: "cond-row" + (n ? " on" : "") + (binary ? " binary" : "") });

    if (binary) {
      // Nothing to count, so nothing to step through: it is on or it is not. Same
      // pill as the Advantage toggle, so the panel reads as one thing.
      const label = el("label", { class: "combat-toggle cond-toggle" });
      const cb = el("input", {
        type: "checkbox", "aria-label": c.label,
        onchange: () => setCondition(c.key, cb.checked ? 1 : 0)
      });
      cb.checked = !!n;
      label.appendChild(cb);
      label.appendChild(el("a", {
        class: "cond-name", href: c.wiki, target: "_blank", rel: "noopener",
        title: "Read " + c.label + " on bg3.wiki",
        onclick: (e) => e.stopPropagation()
      }, [c.label]));
      row.appendChild(label);
    } else {
      const top = el("div", { class: "cond-top" });
      top.appendChild(el("a", {
        class: "cond-name", href: c.wiki, target: "_blank", rel: "noopener",
        title: "Read " + c.label + " on bg3.wiki"
      }, [c.label]));
      top.appendChild(el("span", { class: "cond-count" }, [n ? "×" + n : "—"]));
      row.appendChild(top);

      // A stepper rather than a bare slider: these go up to 4 or 10, so clicking a
      // precise value matters more than sweeping a range. The pips show the scale
      // and are clickable themselves.
      const control = el("div", { class: "cond-control" });
      control.appendChild(el("button", {
        class: "cond-step", type: "button", "aria-label": "One less " + c.label,
        disabled: n === 0,
        onclick: () => setCondition(c.key, n - 1)
      }, ["−"]));

      const pips = el("div", { class: "cond-pips", role: "group", "aria-label": c.label + " stacks" });
      for (let i = 1; i <= c.max; i++) {
        pips.appendChild(el("button", {
          class: "cond-pip" + (i <= n ? " filled" : ""),
          type: "button",
          title: i + " turn" + (i === 1 ? "" : "s"),
          "aria-label": "Set " + c.label + " to " + i,
          onclick: () => setCondition(c.key, i === n ? i - 1 : i)
        }));
      }
      control.appendChild(pips);

      control.appendChild(el("button", {
        class: "cond-step", type: "button", "aria-label": "One more " + c.label,
        disabled: n === c.max,
        onclick: () => setCondition(c.key, n + 1)
      }, ["+"]));
      row.appendChild(control);
    }

    row.appendChild(el("span", { class: "cond-effect" + (c.defensive ? " defensive" : "") },
      [n ? c.effect(n) : "not applied"]));
    list.appendChild(row);
  });
  wrap.appendChild(list);
  box.appendChild(wrap);
}

function setCondition(key, value) {
  const c = CONDITIONS.find((x) => x.key === key);
  conditionState[key] = Math.max(0, Math.min(c.max, value));
  renderConditions();
  renderCombat();
  renderSpellProjection();
}

// Sneak Attack and Divine Smite are conditional: one needs Advantage or an ally
// beside the target, the other spends a spell slot. Both are offered only to a
// character who actually has them, so the panel stays honest about what applies.

// What a full turn actually deals: the Attack action with the main weapon (already
// multiplied by Extra Attack) plus the off-hand attack, which costs a Bonus Action.
// Sneak Attack and Divine Smite land once per turn, so they are counted on the main
// action only — summing the two cards would apply them twice.
function turnSummary(member, opts) {
  const mainKey = itemsById[gear(member).weapon1] ? "weapon1"
    : itemsById[gear(member).ranged1] ? "ranged1" : null;
  if (!mainKey) return null;
  const mainItem = itemsById[gear(member)[mainKey]];
  if (!mainItem || mainItem.type !== "weapon" || !mainItem.damage) return null;

  const main = weaponAttack(member, mainItem, {
    ...opts, offHand: false, slotKey: mainKey,
    twoHanded: isTwoHanded(member, mainKey)
  });

  const offKey = OFF_HAND_OF[mainKey];
  const offItem = offKey ? itemsById[gear(member)[offKey]] : null;
  const offIsWeapon = !!(offItem && offItem.type === "weapon" && offItem.damage);
  // An off-hand attack the game will not let you make must not be added to the
  // turn: the bonus-action swing only exists if the pair may be dual-wielded.
  const dualWield = offIsWeapon ? dualWieldCheck(member, mainItem, offItem) : { ok: true };
  const off = (offIsWeapon && dualWield.ok)
    ? weaponAttack(member, offItem, {
        // Rage stays: it is a state the character is in, not a choice made on one
        // swing, and its wording covers melee weapon attacks without qualifying
        // which hand. Sneak Attack and Divine Smite are once-per-turn choices and
        // are already spent on the main hand.
        ...opts, offHand: true, slotKey: offKey,
        sneakAttack: false, divineSmite: false,
        twoHanded: false
      })
    : null;

  return {
    mainKey, mainItem, offItem, main, off,
    // surfaced so the panel can say why the bonus-action line is missing rather
    // than silently dropping damage the user was expecting to see
    dualWield: offIsWeapon ? dualWield : null,
    total: main.dpr + (off ? off.dpr : 0)
  };
}
// Every version of the turn at once, rather than a checkbox you have to toggle to
// find out. Power attack, Sneak Attack and Divine Smite are all conditional and
// all worth comparing against the plain attack — seeing 32.3 next to 39.2 answers
// "is −5/+10 worth it here" without touching anything.
function turnVariants(member, opts) {
  const base = turnSummary(member, {
    ...opts, powerAttack: false, sneakAttack: false, divineSmite: false, rage: false
  });
  if (!base) return null;
  const out = { base, rows: [] };

  // The roll state is not tied to a feat, so the states you are not currently in
  // are always worth comparing against. Both are offered so the swing is visible
  // in either direction: from a straight d20 you see what each is worth, and from
  // Disadvantage you see what getting out of it is worth.
  const plain = { powerAttack: false, sneakAttack: false, divineSmite: false, rage: false };
  if (!opts.advantage) {
    const adv = turnSummary(member, { ...opts, ...plain, advantage: true, disadvantage: false });
    if (adv) out.rows.push({ label: "With Advantage", total: adv.total, rollState: true });
  }
  if (!opts.disadvantage) {
    const dis = turnSummary(member, { ...opts, ...plain, advantage: false, disadvantage: true });
    // the Sneak Attack caveat is only worth saying to a build that has it
    const losesSneak = sneakAttackDice(member) && sneakAttackEligible(base.mainItem);
    if (dis) out.rows.push({
      label: "With Disadvantage",
      total: dis.total,
      rollState: true,
      note: losesSneak ? "Sneak Attack is off here" : null,
      detail: "Two d20, worst kept." + (losesSneak
        ? " Sneak Attack needs Advantage, or an adjacent ally \"provided you aren't " +
          "attacking with Disadvantage\", so it cannot apply."
        : "")
    });
  }

  const feats = memberFeats(member);
  const canPower = feats.includes("greatWeaponMaster") || feats.includes("sharpshooter");
  if (canPower) {
    const t = turnSummary(member, { ...opts, powerAttack: true, sneakAttack: false, divineSmite: false });
    // only worth a line if the feat actually applies to the weapon in hand
    if (t && t.main.powerAttack) {
      out.rows.push({ label: "Power attack (−5 / +10)", total: t.total, feat: true });
    }
  }
  // Sneak Attack (Melee): "Deal extra damage to a foe you have Advantage against.
  // Also works if you have an ally within 1.5 m (5 ft) of the target and you don't
  // have Disadvantage." So a Disadvantaged attack cannot Sneak Attack at all, and
  // offering the row would be offering a turn the game will not let you take.
  if (sneakAttackDice(member) && sneakAttackEligible(base.mainItem) && !opts.disadvantage) {
    const t = turnSummary(member, { ...opts, powerAttack: false, sneakAttack: true, divineSmite: false });
    if (t) out.rows.push({ label: "Sneak Attack " + sneakAttackDice(member) + "d6", total: t.total });
  }
  // Rage is a Bonus Action the Barbarian is either in or not, so it belongs beside
  // the other conditional riders rather than folded into the base figure. It is
  // melee only, and heavy armour cancels the damage entirely (Rage Impeded), which
  // rageDamage already accounts for — so a heavy-armoured Barbarian gets no row,
  // which is the honest answer rather than a row worth nothing.
  if (rageDamage(member) && !base.main.ranged) {
    const t = turnSummary(member, { ...opts, ...plain, rage: true });
    if (t) out.rows.push({
      label: "Raging (+" + rageDamage(member) + " melee)",
      total: t.total,
      detail: "Bonus Action. Deals an additional " + rageDamage(member) + " damage with " +
        "melee and improvised weapons, unarmed strikes, and while throwing objects. " +
        "Heavy armour cancels it."
    });
  }

  const smiteSlots = spellSlotInfo(member);
  if (divineSmiteDice(member, 1)) {
    const slot = Math.min(Math.max(1, smiteSlots.maxSlot), 4);
    const t = turnSummary(member, {
      ...opts, powerAttack: false, sneakAttack: false, divineSmite: true, smiteSlot: slot
    });
    if (t) out.rows.push({
      label: "Divine Smite (L" + slot + ", " + divineSmiteDice(member, slot) + "d8)",
      total: t.total
    });
  }
  // and the whole lot together, when there is genuinely something to combine.
  // The two roll-state rows do not count: they are alternatives to each other, not
  // riders, and counting them made "All of the above" appear on a build with no
  // feats at all, where it only ever repeated the Advantage figure.
  // This is the ceiling, so it takes Advantage — which also clears Disadvantage,
  // and with it the block on Sneak Attack.
  if (out.rows.some((r) => !r.rollState)) {
    const t = turnSummary(member, {
      ...opts, advantage: true, disadvantage: false,
      powerAttack: true, sneakAttack: true, divineSmite: true, rage: true,
      smiteSlot: Math.min(Math.max(1, smiteSlots.maxSlot), 4)
    });
    if (t) out.rows.push({ label: "All of the above", total: t.total, combined: true });
  }

  // An Opportunity Attack is a single melee swing taken as a Reaction when an enemy
  // leaves your reach — it is not part of your own turn, so folding it into the turn
  // total would inflate every figure. It gets its own line, last and marked apart,
  // and only for a melee weapon since the reaction is a melee attack roll.
  // (bg3.wiki/wiki/Opportunity_Attack)
  // ---- extra Actions -------------------------------------------------------
  // An extra Action is another Attack action, so it is worth exactly what the
  // main action is worth: base.main.dpr. The off-hand is not repeated — that
  // costs a Bonus Action, and you only get one of those.
  //
  // Action Surge: "Immediately gain an extra Action to use this turn. Available
  // only in combat." (bg3.wiki/wiki/Action_Surge) Fighter 2 in the scraped
  // progression. Nothing restricts Extra Attack, so the full action applies.
  if (hasClassFeature(member, "Action Surge")) {
    out.rows.push({
      label: "Action Surge (extra Action)",
      total: base.total + base.main.dpr,
      note: "Once per Short rest",
      detail: "Immediately gain an extra Action to use this turn. Recharges on a " +
        "Short rest, so this is once per fight, not every turn."
    });
  }

  // Haste: "can take one additional Action per turn", Concentration, level 3 slot.
  // "When the condition ends, the creature becomes Lethargic" — and Lethargic is
  // "Can't move or take Actions, Bonus Actions, or Reactions", a whole turn gone.
  // That cost is real, so it is stated rather than hidden behind a bigger number.
  // (bg3.wiki/wiki/Haste, /wiki/Hastened_(Condition), /wiki/Lethargic_(Condition))
  //
  // "A Hastened creature can not use Extra Attack with its additional action" sits
  // under the Hastened page's *Honour mode* heading, so it applies only there. The
  // tool projects normal play by default and the Honour toggle switches this one
  // rule — the only rule of that mode touching anything modelled here.
  const honourSingleSwing = opts.honour && attacksPerAction(member) > 1;
  const hasteAction = honourSingleSwing
    ? weaponAttack(member, base.mainItem, {
        ...opts, offHand: false, slotKey: base.mainKey, attacks: 1,
        powerAttack: false, sneakAttack: false, divineSmite: false,
        twoHanded: isTwoHanded(member, base.mainKey)
      }).dpr
    : base.main.dpr;
  out.rows.push({
    label: "Hasted (extra Action)",
    total: base.total + hasteAction,
    note: honourSingleSwing
      ? "Concentration · Lethargic after · Honour: 1 swing"
      : "Concentration · Lethargic after",
    detail: "Haste grants one additional Action per turn and needs Concentration. " +
      "When it ends the creature becomes Lethargic: can't move or take Actions, " +
      "Bonus Actions, or Reactions — a whole turn gone." +
      (honourSingleSwing
        ? " In Honour mode the additional Action cannot use Extra Attack, so it is a " +
          "single attack instead of " + attacksPerAction(member) + "."
        : "")
  });

  const mainIsMelee = base.mainItem && !isRangedWeapon(base.mainItem);
  if (mainIsMelee) {
    const one = weaponAttack(member, base.mainItem, {
      ...opts, offHand: false, slotKey: base.mainKey, attacks: 1,
      twoHanded: isTwoHanded(member, base.mainKey)
    });
    out.rows.push({
      label: "+ an Opportunity Attack",
      total: base.total + one.dpr,
      reaction: true
    });
  }
  return out;
}


// ---------------------------------------------------------------
// Number transitions: make cause and effect visible
// ---------------------------------------------------------------
// Swapping a weapon used to snap 10.8 into 32.3 with no sense that one caused the
// other. Counting between the two, and tinting the direction, is what makes the
// tool feel like it is answering you. Respects prefers-reduced-motion, and falls
// back to the final value the moment anything re-renders.
const lastNumbers = new Map();
const reduceMotion = window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function animateNumber(node, key, value, digits, prefix) {
  const target = Number(value);
  const p = prefix || "";
  const shown = (n) => p + n.toFixed(digits);
  if (reduceMotion || !isFinite(target)) { node.textContent = shown(target); return; }
  const from = lastNumbers.has(key) ? lastNumbers.get(key) : target;
  lastNumbers.set(key, target);
  if (from === target) { node.textContent = shown(target); return; }

  node.classList.add(target > from ? "num-up" : "num-down");
  const start = performance.now();
  const span = 380;
  const step = (now) => {
    const t = Math.min(1, (now - start) / span);
    // ease-out so it settles rather than stopping dead
    const eased = 1 - Math.pow(1 - t, 3);
    node.textContent = shown(from + (target - from) * eased);
    if (t < 1) requestAnimationFrame(step);
    else {
      node.textContent = shown(target);
      setTimeout(() => node.classList.remove("num-up", "num-down"), 420);
    }
  };
  requestAnimationFrame(step);
}

// +1 Advantage, -1 Disadvantage, 0 straight d20 — read from the one control that
// owns all three, so every calculator on the page agrees on the roll.
function rollState() {
  const sel = document.getElementById("combat-roll");
  return sel ? (parseInt(sel.value, 10) || 0) : 0;
}

function renderCombat() {
  const box = document.getElementById("combat-panel");
  box.innerHTML = "";
  const m = activeMember();
  renderConditions();

  const weapons = ["weapon1", "weapon2", "ranged1", "ranged2"]
    .map((k) => ({ slot: SLOT_DEFS.find((s) => s.key === k), item: itemsById[gear(m)[k]] }))
    .filter((w) => w.item && w.item.type === "weapon" && w.item.damage);

  if (!weapons.length) {
    box.appendChild(el("div", { class: "empty-hint" }, ["Equip a weapon to see attack rolls, hit chance and damage."]));
    return;
  }

  const targetAc = parseInt(document.getElementById("target-ac").value, 10) || 15;
  // The roll state stays a control because it is a battlefield state, not a build
  // choice. Power attack, Sneak Attack and Divine Smite are shown as variants
  // beside the base figure instead of toggles, so nothing here reads them.
  const roll = rollState();
  const advantage = roll > 0;
  const disadvantage = roll < 0;
  const ground = parseInt(document.getElementById("combat-ground").value, 10) || 0;
  // Difficulty is a game setting, not a build choice, so it lives with the other
  // battlefield controls. Default off: the tool projects normal play.
  const honour = document.getElementById("combat-honour").checked;

  // A headline figure for the whole turn, plus every conditional version beside it.
  // These used to be checkboxes: you toggled one, the number changed, and you had
  // to remember the old one to compare. Showing them together is the comparison.
  const turnOpts = { targetAc, advantage, disadvantage, ground, honour };
  const variants = turnVariants(m, turnOpts);
  if (variants) {
    const turn = variants.base;
    const card = el("div", { class: "combat-card turn-card" });
    const totalNode = el("span", { class: "turn-total-value" }, [turn.total.toFixed(1)]);
    animateNumber(totalNode, "turn:" + m.id, turn.total, 1);
    card.appendChild(el("div", { class: "turn-total" }, [
      totalNode,
      el("span", { class: "turn-total-label" }, ["damage per turn"])
    ]));
    const seq = el("div", { class: "turn-seq" });
    seq.appendChild(el("div", { class: "turn-step" }, [
      el("span", { class: "turn-step-cost" }, ["Action"]),
      el("span", { class: "turn-step-name" }, [
        turn.mainItem.name + (turn.main.attacks > 1 ? " ×" + turn.main.attacks : "")
      ]),
      el("span", { class: "turn-step-value" }, [turn.main.dpr.toFixed(1)])
    ]));
    if (turn.off) {
      seq.appendChild(el("div", { class: "turn-step" }, [
        el("span", { class: "turn-step-cost" }, ["Bonus"]),
        el("span", { class: "turn-step-name" }, [
          turn.offItem.name,
          // when the feat is what makes the pair legal, say so — it is the reason
          // this line exists at all
          turn.dualWield && turn.dualWield.viaFeat
            ? el("span", { class: "turn-step-note" }, ["via Dual Wielder"]) : null
        ].filter(Boolean)),
        el("span", { class: "turn-step-value" }, [turn.off.dpr.toFixed(1)])
      ]));
    } else if (turn.dualWield && !turn.dualWield.ok) {
      // the off-hand weapon is equipped but cannot be used: say why rather than
      // quietly leaving the damage out
      seq.appendChild(el("div", { class: "turn-step blocked" }, [
        el("span", { class: "turn-step-cost" }, ["Bonus"]),
        el("span", { class: "turn-step-name" }, [
          "No off-hand attack",
          el("span", { class: "turn-step-note" }, [turn.dualWield.reason])
        ]),
        el("span", { class: "turn-step-value" }, ["—"])
      ]));
    }
    card.appendChild(seq);

    if (variants.rows.length) {
      const alt = el("div", { class: "turn-variants" });
      variants.rows.forEach((v) => {
        const delta = v.total - turn.total;
        const row = el("div", {
          class: "turn-variant" + (v.combined ? " combined" : "") + (v.reaction ? " reaction" : ""),
          title: v.reaction
            ? "A Reaction, not part of your own turn — it only happens if an enemy leaves your reach."
            : (v.detail || v.note || "")
        });
        row.appendChild(el("span", { class: "turn-variant-name" }, [
          v.label,
          // a resource with a real cost says so on the row, not only on hover
          v.note ? el("span", { class: "turn-variant-note" }, [v.note]) : null
        ].filter(Boolean)));
        row.appendChild(el("span", { class: "turn-variant-value" }, [v.total.toFixed(1)]));
        row.appendChild(el("span", {
          class: "turn-variant-delta " + (delta > 0.05 ? "up" : delta < -0.05 ? "down" : "same")
        }, [(delta > 0 ? "+" : "") + delta.toFixed(1)]));
        alt.appendChild(row);
      });
      card.appendChild(alt);
      card.appendChild(el("div", { class: "combat-note" }, [
        "Sneak Attack and Divine Smite land once per turn, so they count on the Action " +
        "only — not again on the bonus-action attack. Both are spent on a critical " +
        "when the turn produces one, which is what the numbers assume."
      ]));
      // Resistance is "halved (rounded down)" per hit. These figures are averages,
      // and an average cannot carry a per-roll floor — so a resisted number here
      // runs about a quarter point high. Saying so is better than a correction
      // nobody could check against their own arithmetic.
      if (targetDefence()) {
        card.appendChild(el("div", { class: "combat-note" }, [
          "Resistance halves each hit and rounds down. These are averages, so they " +
          "do not carry that rounding: expect roughly a quarter point less per " +
          "resisted hit than shown."
        ]));
      }
    }
    box.appendChild(card);
  }
  weapons.forEach(({ slot, item }) => {
    const offHand = OFF_HAND_SLOTS.includes(slot.key);
    const r = weaponAttack(m, item, {
      targetAc, advantage, disadvantage, ground, offHand, slotKey: slot.key,
      twoHanded: isTwoHanded(m, slot.key)
    });
    const card = el("div", { class: "combat-card" });
    // The icon is the fastest way to recognise which weapon a card is about,
    // the same way the game's inspect panel leads with it.
    const head = el("div", { class: "combat-weapon" });
    if (item.icon) {
      head.appendChild(el("div", { class: "combat-icon", "data-rarity": item.rarity },
        [el("img", { src: item.icon, alt: "", loading: "lazy" })]));
    }
    head.appendChild(el("div", { class: "combat-weapon-text" }, [
      el("div", { class: "combat-slot" }, [slot.label + (offHand ? " · bonus action" : "")]),
      el("div", { class: "combat-name", "data-rarity": item.rarity }, [item.name])
    ]));
    card.appendChild(head);

    const grid = el("div", { class: "combat-grid" });
    const stat = (label, value, cls, title) => {
      const c = el("div", { class: "combat-stat", title: title || "" });
      c.appendChild(el("div", { class: "combat-stat-value" + (cls ? " " + cls : "") }, [value]));
      c.appendChild(el("div", { class: "combat-stat-label" }, [label]));
      return c;
    };
    // the roll state changes the odds, so it belongs in the line that explains them
    const rollWord = r.advantage ? " with Advantage (two d20, best kept)"
      : r.disadvantage ? " with Disadvantage (two d20, worst kept)" : "";
    grid.appendChild(stat("To hit", fmtSigned(r.attackBonus),
      null, "d20 " + fmtSigned(r.attackBonus) + " vs AC " + targetAc + rollWord));
    grid.appendChild(stat("Hit chance", Math.round(r.hitChance * 100) + "%", "combat-hit",
      "Includes the automatic hit on a natural 20 and the automatic miss on a natural 1." +
      (rollWord ? " Rolled" + rollWord + "." : "")));
    // "Avg damage" used to sit here, meaning the damage of one normal hit before
    // criticals, Extra Attack and riders — a number that matched nothing the player
    // could see, duplicated the dice shown below, and made a level 11 Fighter read
    // 13.0 while actually dealing 32.3. "Per attack" is the same expected damage the
    // turn total is built from, so the two tiles now explain each other.
    grid.appendChild(stat("Per attack", r.perAttack.toFixed(1), null,
      "Expected damage of a single attack: hit chance \u00d7 damage, plus what a critical adds. " +
      "One hit rolls " + Math.round(r.minDamage) + "\u2013" + Math.round(r.maxDamage) + "."));
    grid.appendChild(stat("Damage / turn", r.dpr.toFixed(1), "combat-dpr",
      r.attacks + (r.attacks > 1 ? " attacks" : " attack") +
      " × (hit chance × damage) plus the extra dice a critical adds" +
      (r.sneakDice || r.smiteDice ? ", plus the once-per-turn riders" : "")));
    card.appendChild(grid);

    // What the weapon actually rolls, by damage type — the same breakdown the
    // game shows on the weapon, rather than one merged number.
    if (r.main) {
      const dice = el("div", { class: "dmg-parts" });
      const part = (label, type) => {
        const chip = el("span", { class: "dmg-part" }, [
          el("span", { class: "dmg-part-roll" }, [label])
        ]);
        if (type) {
          chip.appendChild(el("span", { class: "dmg-part-type", "data-damage": type }, [type]));
        }
        return chip;
      };
      const mainLabel = (r.main.count ? r.main.count + "d" + r.main.size : "") +
        (r.main.flat ? " + " + r.main.flat : "") +
        (r.damageAbilityMod ? " " + fmtSigned(r.damageAbilityMod) + " " + r.ability.toUpperCase() : "");
      dice.appendChild(part(mainLabel.trim(), r.main.type));
      // the span the game itself prints on the weapon
      dice.appendChild(el("span", { class: "dmg-range" },
        [Math.round(r.minDamage) + "\u2013" + Math.round(r.maxDamage)]));
      r.riders.forEach((x) => dice.appendChild(
        part(x.count ? x.count + "d" + x.size : String(x.flat), x.type)));
      card.appendChild(dice);
    }

    // Every term that went into the attack roll, so any number can be checked.
    const parts = [
      r.ability.toUpperCase() + " " + fmtSigned(r.abilityMod),
      r.proficient ? "proficiency +" + r.profBonus : "not proficient (no proficiency bonus)",
      r.ench ? "enchantment +" + r.ench : null,
      r.ground ? (r.ground > 0 ? "high ground +2" : "low ground −2") : null,
      r.powerAttack ? (r.gwmActive ? "Great Weapon Master: All In −5/+10"
                                   : "Sharpshooter: All In −5/+10") : null,
      r.archery ? "Archery +2 to the attack roll" : null,
      r.duelling ? "Duelling +2 damage" : null,
      r.gwf ? "Great Weapon Fighting (1s and 2s on damage dice rerolled)" : null,
      r.twoWeapon ? "Two-Weapon Fighting (ability modifier added to the off-hand)" : null,
      r.savage ? "Savage Attacker (best of two damage rolls)" : null,
      r.luck ? "Halfling Luck (natural 1 rerolled)" : null,
      (r.offHand && !r.twoWeapon) ? "off-hand: weapon dice only, no ability modifier" : null
    ].filter(Boolean);
    card.appendChild(el("div", { class: "combat-breakdown" }, [parts.join(" · ")]));
    if (r.attacks > 1) {
      card.appendChild(el("div", { class: "combat-note" }, [
        r.attacks + " attacks per Attack action" +
        (r.attacks === 3 ? " (Improved Extra Attack)" : " (Extra Attack)")
      ]));
    }
    if (r.sneakDice) {
      card.appendChild(el("div", { class: "combat-note" }, [
        "Sneak Attack " + r.sneakDice + "d6 once per turn · " + r.sneakAvg.toFixed(1) + " on a hit"
      ]));
    }
    if (r.smiteDice) {
      card.appendChild(el("div", { class: "combat-note" }, [
        "Divine Smite " + r.smiteDice + "d8 Radiant once per turn · " +
        r.smiteAvg.toFixed(1) + " on a hit"
      ]));
    }
    if (r.critChance) {
      card.appendChild(el("div", { class: "combat-note" }, [
        "Critical on " + (r.critThreshold >= 20 ? "20" : r.critThreshold + "–20") + " · " +
        (r.critChance * 100).toFixed(2).replace(/\.?0+$/, "") + "% · adds " +
        r.critExtra.toFixed(1) + " damage (dice are doubled, flat bonuses are not)"
      ]));
    }
    box.appendChild(card);
  });

  // What the projection deliberately leaves out. Equipped items carry 545 named
  // abilities between them across the library, and almost none are computable
  // from the wiki's wording alone — they recharge, they need a condition on the
  // target, or they fire on something this tool does not simulate. Rather than
  // guess a number for them or quietly ignore them, they are listed: it makes
  // every figure above a floor rather than a claim of completeness.
  const uncounted = [];
  SLOT_DEFS.forEach((s) => {
    const it = itemsById[gear(m)[s.key]];
    if (!it) return;
    (it.special || []).forEach((sp) => uncounted.push({ item: it.name, name: sp.n, desc: sp.d || "" }));
  });
  if (uncounted.length) {
    const det = el("details", { class: "combat-uncounted" });
    det.appendChild(el("summary", {}, [
      "Not counted above",
      el("span", { class: "act-count" }, [String(uncounted.length)])
    ]));
    det.appendChild(el("div", { class: "combat-note" }, [
      "These are on your equipped gear but stay out of the damage figures — they " +
      "recharge, need a condition this tool does not track, or fire outside the " +
      "attack itself. The numbers above are a floor, not a ceiling."
    ]));
    const list = el("div", { class: "uncounted-list" });
    uncounted.forEach((u) => {
      list.appendChild(el("div", { class: "uncounted-row", title: u.desc }, [
        el("span", { class: "uncounted-name" }, [u.name]),
        el("span", { class: "uncounted-item" }, [u.item])
      ]));
    });
    det.appendChild(list);
    box.appendChild(det);
  }
}

// ---------------------------------------------------------------
// Spell projection: how a spell actually lands for this character
// ---------------------------------------------------------------
// ---------------------------------------------------------------
// Spell slots — Effective Spellcaster Level (bg3.wiki/wiki/Spell_slot)
// ---------------------------------------------------------------
// "A full caster's ESL is exactly their class level, whereas the ESL of
// half-casters and one-third casters is equal to half or one-third their level,
// rounded up. When multiple classes with the Spellcasting feature are chosen,
// the total ESL is instead the summed fractional spellcaster level of every
// individual spellcasting class, rounded down."
const FULL_CASTERS = ["bard", "cleric", "druid", "sorcerer", "wizard"];
const HALF_CASTERS = ["paladin", "ranger"];
// one-third casting comes from a subclass, not the class itself
const THIRD_CASTER_SUBCLASSES = ["Arcane Trickster", "Eldritch Knight"];

// Slots per spell level by ESL, straight from the wiki's table: the highest
// column with a slot is the best spell level available.
const MAX_SLOT_BY_ESL = [0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];

function spellSlotInfo(member) {
  let fractions = [];
  let warlockLevels = 0;
  memberClasses(member).forEach((entry) => {
    // "levels taken in warlock are ignored when calculating ESL" — Pact Magic
    // is a separate progression.
    if (entry.cls === "warlock") { warlockLevels += entry.levels; return; }
    const subName = (subclassById[entry.subclass] || {}).name;
    if (FULL_CASTERS.includes(entry.cls)) fractions.push(entry.levels);
    else if (HALF_CASTERS.includes(entry.cls)) fractions.push(entry.levels / 2);
    else if (subName && THIRD_CASTER_SUBCLASSES.includes(subName)) fractions.push(entry.levels / 3);
  });
  const esl = fractions.length === 0 ? 0
    : fractions.length === 1 ? Math.ceil(fractions[0])
    : Math.floor(fractions.reduce((a, b) => a + b, 0));
  const spellcastingSlot = MAX_SLOT_BY_ESL[Math.min(esl, 12)] || 0;
  // A warlock's pact slots are always the highest level they can cast, and a
  // lower-level spell is always upcast to it.
  const pactSlot = warlockLevels ? Math.min(5, Math.ceil(warlockLevels / 2)) : 0;
  return {
    esl, spellcastingSlot, pactSlot, warlockLevels,
    maxSlot: Math.max(spellcastingSlot, pactSlot)
  };
}

// Spells resolve three ways, and the wiki records which: a spell attack roll
// against AC, a saving throw against your DC (usually half damage on a success),
// or an automatic hit like Magic Missile.
function spellProjection(member, spell, opts) {
  const d = derivedStats(member);
  if (!spell) return null;
  const level = totalLevel(member);

  // Cantrips gain dice at character levels 5 and 10 (bg3.wiki records this per
  // spell under "At higher levels"). Without it a level 12 wizard's Fire Bolt
  // would read 5.5 average instead of 16.5.
  const parsed = parseWeaponDamage(spell.damage, false);
  let dice = parsed ? parsed.main : null;
  let scaledTo = null;
  (spell.scaling || []).forEach((s) => {
    if (level >= s.level) {
      scaledTo = s;
      if (dice) dice = { ...dice, count: s.count, size: s.size,
        diceAvg: s.count * (s.size + 1) / 2,
        avg: s.count * (s.size + 1) / 2 + dice.flat };
    }
  });

  // Casting a levelled spell from a higher slot adds dice: the wiki words it as
  // "for each spell slot level above 3rd" or "per level", which comes to the same
  // thing. Magic Missile and Scorching Ray add a projectile instead of dice on the
  // same roll, so they carry the note but no computable dice.
  let upcastFrom = null;
  const slot = Math.max(spell.level || 0, opts.slotLevel || spell.level || 0);
  if (spell.upcastDice && spell.level >= 1 && slot > spell.level && dice) {
    const extra = spell.upcastDice.count * (slot - spell.level);
    upcastFrom = { slot, count: extra, size: spell.upcastDice.size };
    const total = dice.count + extra;
    dice = { ...dice, count: total,
      diceAvg: total * (dice.size + 1) / 2,
      avg: total * (dice.size + 1) / 2 + dice.flat };
  }

  // Le type de degat du sort est dans ses donnees, donc la resistance de la cible
  // s'applique ici comme sur une arme.
  const defence = targetDefence();
  const spellType = (dice && dice.type) || (spell.damageTypes || [])[0] || null;
  const spellMult = defenceMult(defence, spellType);
  const rawAvg = dice ? dice.avg
    : (spell.damageMin != null && spell.damageMax != null)
      ? (spell.damageMin + spell.damageMax) / 2
      : null;
  const avg = rawAvg == null ? null : rawAvg * spellMult;
  const diceAvg = (dice ? dice.diceAvg : 0) * spellMult;
  const notes = [];
  if (scaledTo) {
    notes.push("Scaled to " + scaledTo.count + "d" + scaledTo.size +
      " at character level " + scaledTo.level);
  }
  if (upcastFrom) {
    notes.push("Cast from a level " + upcastFrom.slot + " slot: +" + upcastFrom.count +
      "d" + upcastFrom.size + " over its base level");
  }
  if (spell.concentration) notes.push("Concentration");
  if (spell.ritual) notes.push("Ritual");
  if (spell.upcast) notes.push(spell.upcast);
  // How this character actually gets the spell. A conditional route is worth
  // stating: the numbers below are only real if you took that option.
  const access = spellAccess(member, spell);
  if (access && access.name) {
    notes.push("Available to " + access.name +
      (access.level ? " at level " + access.level : "") +
      (access.via ? " — only via " + access.via : ""));
  }
  // every condition actually in play, named on the card so the numbers are traceable
  CONDITIONS.forEach((c) => {
    const n = conditionState[c.key];
    if (n && !c.defensive) notes.push(c.label + (c.max > 1 ? " ×" + n : "") + ": " + c.effect(n));
  });
  if (spellMult !== 1) {
    notes.push("Target " + (spellMult === 0 ? "is immune to " : spellMult < 1 ? "resists " : "is vulnerable to ") +
      spellType + " — damage " + (spellMult === 0 ? "reduced to 0" : spellMult < 1 ? "halved" : "doubled"));
  }
  if (spell.attackRoll) {
    // A spell attack is an attack roll, so it crits and doubles its dice — and
    // the same threshold-lowering sources apply to it, since Improved Critical
    // affects all attacks and not just weapon ones.
    const luck = hasHalflingLuck(member);
    // Arcane Acuity adds its stack count to spell attack rolls.
    const cond = conditionTotals(null);
    const attack = (d.spellAttack || 0) + cond.spellAttack;
    // Spell Sniper lowers the threshold for spell attacks only, so it is applied
    // here rather than inside critThresholdOf, which weapon attacks share.
    const spellSniper = memberFeats(member)
      .reduce((sum, k) => sum + ((FEATS[k] || {}).spellCrit || 0), 0);
    const critThreshold = Math.max(2, critThresholdOf(member) - spellSniper);
    const spellRoll = ((opts.advantage || cond.advantage) ? 1 : 0) - (opts.disadvantage ? 1 : 0);
    const odds = attackOdds(attack, opts.targetAc, critThreshold, spellRoll, luck);
    const chance = odds.hit + odds.crit;
    return {
      mode: "Spell attack roll",
      detail: "d20 " + fmtSigned(attack) + " vs AC " + opts.targetAc +
        (spellRoll > 0 ? " with Advantage" : spellRoll < 0 ? " with Disadvantage" : "") +
        " · " + (d.spellAbility ? d.spellAbility.toUpperCase() : "?") +
        " + proficiency " + fmtSigned(d.prof),
      chanceLabel: "Hit chance", chance, avg, dice, notes,
      critNote: "Critical on " + (critThreshold >= 20 ? "20" : critThreshold + "–20") +
        " · " + (odds.crit * 100).toFixed(2).replace(/\.?0+$/, "") +
        "% · adds " + diceAvg.toFixed(1),
      expected: avg == null ? null : avg * chance + odds.crit * diceAvg
    };
  }

  if (spell.save) {
    // Saving throws in BG3 do NOT auto-succeed on a natural 20 or auto-fail on a
    // natural 1, unlike attack rolls and ability checks (bg3.wiki/wiki/Dice_rolls),
    // so a high enough save bonus genuinely never fails.
    // Arcane Acuity raises the DC by its stacks; Reverberation lowers the
    // target's STR, DEX and CON saves by its own. Both come straight from the
    // condition pages, and only apply to the saves those pages name.
    const cond = conditionTotals(spell.save);
    const dc = (d.spellDc || 10) + cond.spellDc;
    const targetSave = opts.targetSave - cond.targetSave;
    let failFaces = dc - 1 - targetSave;
    failFaces = Math.max(0, Math.min(20, failFaces));
    const failChance = failFaces / 20;
    const expected = avg == null ? null
      : avg * failChance + (spell.halfOnSave ? (avg / 2) * (1 - failChance) : 0);
    return {
      mode: spell.save + " saving throw",
      detail: "DC " + dc + " vs the target's " + spell.save + " save of " +
        fmtSigned(targetSave) + (spell.halfOnSave ? " · half damage on a success" : " · no damage on a success"),
      chanceLabel: "Target fails", chance: failChance, avg, dice, notes,
      critNote: "No critical: a saving throw is not an attack roll, and a natural 20 does not auto-succeed in BG3",
      expected
    };
  }

  return {
    mode: "Automatic hit",
    detail: "no attack roll and no saving throw",
    chanceLabel: "Hit chance", chance: 1, avg, dice, notes,
    critNote: null,
    expected: avg
  };
}

// Access is not only by base class: Arcane Trickster and Eldritch Knight cast
// without their class doing so, subclasses have their own lists, and some races
// grant cantrips. The wiki records all three, so all three are honoured.
function spellSources(member) {
  const classLabels = memberClasses(member)
    .map((c) => (CLASSES[c.cls] || {}).label).filter(Boolean);
  const subLabels = memberClasses(member)
    .map((c) => (subclassById[c.subclass] || {}).name).filter(Boolean);
  const race = raceById[member.race];
  return { classLabels, subLabels, raceName: race ? race.name : null };
}

// Subclass names grouped by their parent class, so the Spells tab's class filter
// can surface what a subclass of that class grants (Arcane Trickster under Rogue).
const SUBCLASSES_BY_CLASS_LABEL = {};
SUBCLASS_LIST.forEach((s) => {
  if (!s.class) return;
  (SUBCLASSES_BY_CLASS_LABEL[s.class] = SUBCLASSES_BY_CLASS_LABEL[s.class] || []).push(s.name);
});

// The wiki catalogues far more than player spells: NPC abilities, item-granted
// casts and sub-actions of other spells ("Activate Witch Bolt", "Animate Dead:
// Ghoul"). None of them list a class, subclass or race under "How to learn", and
// that absence is what marks them — 348 of the 579 entries.
const isLearnable = (spell) =>
  ((spell.classes || []).length + (spell.subclasses || []).length +
   (spell.races || []).length) > 0;

// How this character gets this spell, or null if they do not.
//
// The wiki's "How to learn" is not a flat list of classes: it reads "Class level 1:
// Cleric and Ranger (via Sanctified Stalker)" — a level, and sometimes a condition.
// Both used to be discarded, so a Ranger 1 was offered Sacred Flame (which needs
// Sanctified Stalker) and a Bard 1 was offered spells the wiki gates at class
// level 10 via Magical Secrets. `availability` keeps the structure, and the level
// is checked against the levels in *that class*, not the character's total.
function spellAccess(member, spell) {
  const { raceName } = spellSources(member);
  const avail = spell.availability || [];

  // levels held in each class label, and in each subclass
  const byClass = {};
  const bySub = {};
  memberClasses(member).forEach((e) => {
    const label = (CLASSES[e.cls] || {}).label;
    if (label) byClass[label] = Math.max(byClass[label] || 0, e.levels);
    const sub = (subclassById[e.subclass] || {}).name;
    if (sub) bySub[sub] = Math.max(bySub[sub] || 0, e.levels);
  });

  const hits = avail.filter((a) => {
    const have = a.kind === "class" ? byClass[a.name]
      : a.kind === "subclass" ? bySub[a.name]
      : (a.kind === "race" && raceName === a.name) ? 1 : undefined;
    if (have === undefined) return false;
    return !a.level || have >= a.level;
  });
  if (hits.length) {
    // the cheapest route wins: the lowest level, and an unconditional one first
    hits.sort((a, b) => (a.via ? 1 : 0) - (b.via ? 1 : 0) || (a.level || 0) - (b.level || 0));
    return hits[0];
  }

  // Spells scraped before `availability` existed, and race grants, still carry only
  // the flat lists. Falling back keeps those working rather than hiding them.
  if (!avail.length) {
    const { classLabels, subLabels } = spellSources(member);
    if ((spell.classes || []).some((c) => classLabels.includes(c))) return { name: null, level: null, via: null };
    if ((spell.subclasses || []).some((s) => subLabels.includes(s))) return { name: null, level: null, via: null };
    if (raceName && (spell.races || []).includes(raceName)) return { name: raceName, kind: "race", level: null, via: null };
  }
  return null;
}

function canCast(member, spell) {
  return !!spellAccess(member, spell);
}

function castableSpells(member) {
  return SPELL_LIST
    .filter((s) => canCast(member, s))
    .filter((s) => s.damageMax != null)
    .sort((a, b) => (a.level ?? 99) - (b.level ?? 99) || a.name.localeCompare(b.name));
}

function renderSpellProjection() {
  const box = document.getElementById("spell-projection");
  const sel = document.getElementById("combat-spell");
  const m = activeMember();
  box.innerHTML = "";

  const options = castableSpells(m);
  const previous = sel.value;
  sel.innerHTML = "";
  if (!options.length) {
    sel.appendChild(el("option", { value: "" }, ["— no damaging spells for this class —"]));
    sel.disabled = true;
    box.appendChild(el("div", { class: "empty-hint" }, ["This character's classes have no damaging spells."]));
    return;
  }
  sel.disabled = false;
  // The dropdown says what each spell is before it is picked: level, the dice it
  // actually rolls at this character level, its damage type, and how it resolves.
  // Otherwise picking one means guessing.
  const charLevel = totalLevel(m);
  options.forEach((s) => {
    let dice = s.damage || "";
    (s.scaling || []).forEach((sc) => {
      if (charLevel >= sc.level) dice = dice.replace(/\d+d\d+/, sc.count + "d" + sc.size);
    });
    const type = (s.damageTypes || [])[0] || "";
    const resolve = s.attackRoll ? "attack roll" : s.save ? s.save + " save" : "auto-hit";
    // a spell you only get through a specific choice says so in the list, so it is
    // never mistaken for something every member of the class has
    const access = spellAccess(m, s);
    sel.appendChild(el("option", { value: s.id }, [
      (s.level === 0 ? "Cantrip" : "L" + s.level) + " · " + s.name +
      (dice ? "  ·  " + dice.replace(/\s+/g, " ") : "") +
      (type && dice && !dice.includes(type) ? " " + type : "") +
      "  · " + resolve + (s.aoe ? "  · " + s.aoe : "") +
      (s.concentration ? "  · concentration" : "") +
      (access && access.via ? "  · via " + access.via : "")
    ]));
  });
  sel.value = options.some((s) => s.id === previous) ? previous : options[0].id;

  const spell = options.find((s) => s.id === sel.value);
  const targetAc = parseInt(document.getElementById("target-ac").value, 10) || 15;
  const targetSave = parseInt(document.getElementById("target-save").value, 10) || 0;
  const spellRollState = rollState();
  const advantage = spellRollState > 0;
  const disadvantage = spellRollState < 0;
  // Naming this character's own DC beside the field is what makes it obvious that
  // the saving throw is a contest against the caster, not against Armour Class.
  const saveHint = document.getElementById("target-save-hint");
  if (saveHint) {
    const dc = derivedStats(m).spellDc;
    saveHint.textContent = dc ? "its bonus vs your DC " + dc : "the target's bonus";
  }
  // The slot picker only appears for a spell that gains something from a higher
  // slot, and only offers slots this character can actually hold.
  const slots = spellSlotInfo(m);
  const slotWrap = document.getElementById("slot-level-wrap");
  const slotSel = document.getElementById("combat-slot-level");
  const maxSlot = slots.maxSlot;
  if (spell.upcastDice && spell.level >= 1 && spell.level < maxSlot) {
    const prevSlot = parseInt(slotSel.value, 10);
    slotSel.innerHTML = "";
    for (let lv = spell.level; lv <= maxSlot; lv++) {
      slotSel.appendChild(el("option", { value: String(lv) },
        ["Level " + lv + (lv === spell.level ? " (base)" : "")]));
    }
    // A warlock always casts at their pact slot level; there is no choice to make.
    const forced = slots.pactSlot && slots.pactSlot >= spell.level &&
      slots.pactSlot >= slots.spellcastingSlot;
    slotSel.value = String(forced ? Math.min(slots.pactSlot, maxSlot)
      : (prevSlot >= spell.level && prevSlot <= maxSlot ? prevSlot : spell.level));
    slotSel.disabled = !!forced;
    slotWrap.hidden = false;
  } else {
    slotWrap.hidden = true;
    slotSel.innerHTML = "";
  }
  const slotLevel = parseInt(slotSel.value, 10) || spell.level;

  const p = spellProjection(m, spell, { targetAc, targetSave, advantage, disadvantage, slotLevel });
  if (!p) return;

  const card = el("div", { class: "combat-card spell-projection-card" });
  const shead = el("div", { class: "combat-weapon" });
  if (spell.icon) {
    shead.appendChild(el("div", { class: "combat-icon spell-icon" },
      [el("img", { src: spell.icon, alt: "", loading: "lazy" })]));
  }
  shead.appendChild(el("div", { class: "combat-weapon-text" }, [
    el("div", { class: "combat-slot" }, [p.mode]),
    el("div", { class: "combat-name spell-name" }, [spell.name]),
    el("div", { class: "combat-subline" }, [
      (spell.level === 0 ? "Cantrip" : "Level " + spell.level) +
      (spell.school ? " · " + spell.school : "")
    ])
  ]));
  card.appendChild(shead);

  const grid = el("div", { class: "combat-grid combat-grid-3" });
  const stat = (label, value, cls, title) => {
    const c = el("div", { class: "combat-stat", title: title || "" });
    c.appendChild(el("div", { class: "combat-stat-value" + (cls ? " " + cls : "") }, [value]));
    c.appendChild(el("div", { class: "combat-stat-label" }, [label]));
    return c;
  };
  grid.appendChild(stat(p.chanceLabel, Math.round(p.chance * 100) + "%", "combat-hit"));
  // "Avg damage" next to "Expected" read as two averages. This one is the damage
  // the spell deals when it lands in full; Expected is that weighted by the odds.
  grid.appendChild(stat("If it lands", p.avg == null ? "—" : p.avg.toFixed(1), null,
    "Damage when the spell lands in full — before the chance of missing, and before a " +
    "successful saving throw halves it."));
  grid.appendChild(stat("Expected", p.expected == null ? "—" : p.expected.toFixed(1), "combat-dpr",
    "Averaged over hits, misses and — where the spell says so — half damage on a save."));
  card.appendChild(grid);

  // The dice and their type, the same way the weapon cards show them
  const dmgTypes = spell.damageTypes || [];
  if (p.dice || dmgTypes.length) {
    const dice = el("div", { class: "dmg-parts" });
    const label = p.dice
      ? (p.dice.count ? p.dice.count + "d" + p.dice.size : "") +
        (p.dice.flat ? " + " + p.dice.flat : "")
      : (spell.damage || "");
    const chip = el("span", { class: "dmg-part" }, [
      el("span", { class: "dmg-part-roll" }, [label.trim() || "—"])
    ]);
    const type = (p.dice && p.dice.type) || dmgTypes[0];
    if (type) chip.appendChild(el("span", { class: "dmg-part-type", "data-damage": type }, [type]));
    dice.appendChild(chip);
    dmgTypes.slice(1).forEach((t) => dice.appendChild(
      el("span", { class: "dmg-part" }, [
        el("span", { class: "dmg-part-type", "data-damage": t }, [t])
      ])));
    card.appendChild(dice);
  }

  card.appendChild(el("div", { class: "combat-breakdown" }, [p.detail]));
  if (p.critNote) card.appendChild(el("div", { class: "combat-note" }, [p.critNote]));
  (p.notes || []).forEach((n) => card.appendChild(el("div", { class: "combat-note" }, [n])));
  if (spell.range || spell.aoe) {
    card.appendChild(el("div", { class: "combat-note" }, [
      [spell.range ? "Range " + spell.range : null,
       spell.aoe ? "Area " + spell.aoe : null].filter(Boolean).join(" · ")
    ]));
  }
  if (spell.desc) card.appendChild(el("div", { class: "combat-desc" }, [spell.desc]));
  box.appendChild(card);
}

function initCombatControls() {
  // Every one of these controls moves the current damage per turn, so the pinned
  // comparison has to follow it — otherwise its "now" column keeps showing the
  // figure from whenever the panel last happened to redraw.
  const refresh = () => { renderCombat(); renderSpellProjection(); renderBuildCompare(); };
  // La liste des types vient des types que les donnees utilisent vraiment, donc
  // elle ne peut pas diverger de ce qu'une arme ou un sort peut infliger.
  const defSel = document.getElementById("combat-defence-type");
  defSel.appendChild(el("option", { value: "" }, ["— none —"]));
  DAMAGE_TYPES.forEach((t) => defSel.appendChild(el("option", { value: t }, [t])));

  ["target-ac", "target-save", "combat-ground", "combat-roll", "combat-honour",
   "combat-defence-type", "combat-defence-state"].forEach((id) => {
    const node = document.getElementById(id);
    node.addEventListener(node.type === "checkbox" ? "change" : "input", refresh);
  });
  document.getElementById("combat-spell").addEventListener("change", renderSpellProjection);
  document.getElementById("combat-slot-level").addEventListener("change", renderSpellProjection);
}

