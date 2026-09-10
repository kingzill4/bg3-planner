// GENERE par scripts/scrape-feats.ps1 + build-feats.ps1 — ne pas editer.
const FEAT_DATA = [
  {
    "id": "ability-improvement",
    "name": "Ability Improvement",
    "desc": "Increase one ability score by 2, or two ability scores by 1, up to a maximum of 20.",
    "grants": [],
    "wiki": "https://bg3.wiki/wiki/Ability_Improvement"
  },
  {
    "id": "actor",
    "name": "Actor",
    "desc": "Your Charisma ability score increases by 1, to a maximum of 20. You gain expertise in Deception and Performance .",
    "grants": [],
    "wiki": "https://bg3.wiki/wiki/Actor"
  },
  {
    "id": "alert",
    "name": "Alert",
    "desc": "You gain a +5 bonus to initiative and can't be Surprised .",
    "grants": [],
    "wiki": "https://bg3.wiki/wiki/Alert"
  },
  {
    "id": "athlete",
    "name": "Athlete",
    "desc": "Your Strength or Dexterity ability score increases by 1, to a maximum of 20. When you are Prone , standing up uses significantly less movement. Your Jump distance also increases by 50%.",
    "grants": [],
    "wiki": "https://bg3.wiki/wiki/Athlete"
  },
  {
    "id": "charger",
    "name": "Charger",
    "desc": "Charge forward and slam your weapon into the first enemy in your way without provoking Opportunity Attacks .",
    "grants": [
      {
        "n": "Shove",
        "d": "Charge forward and Shove the first enemy in your way without provoking Opportunity Attacks . Shove distance depends on your Strength and the target's weight."
      }
    ],
    "wiki": "https://bg3.wiki/wiki/Charger"
  },
  {
    "id": "crossbow-expert",
    "name": "Crossbow Expert",
    "desc": "When you make crossbow attacks within melee range, the attack rolls do not have Disadvantage .",
    "grants": [
      {
        "n": "Wounding",
        "d": "Your Piercing Shot also inflicts Gaping Wounds for twice as long."
      }
    ],
    "wiki": "https://bg3.wiki/wiki/Crossbow_Expert"
  },
  {
    "id": "defensive-duellist",
    "name": "Defensive Duellist",
    "desc": "When you are attacked with a melee attack while wielding a Finesse weapon you are proficient in, you can use a Reaction to increase your Armour Class by your proficiency bonus, possibly causing the attack to miss. Requires Dexterity to be at least 13.",
    "grants": [],
    "wiki": "https://bg3.wiki/wiki/Defensive_Duellist"
  },
  {
    "id": "dual-wielder",
    "name": "Dual Wielder",
    "desc": "You can use Two-Weapon Fighting even if your weapons aren't Light . You cannot dual-wield Two-Handed weapons.",
    "grants": [
      {
        "n": "Bonus Armour Class",
        "d": "You have a +1 bonus to Armour Class while wielding a melee weapon in each hand."
      }
    ],
    "wiki": "https://bg3.wiki/wiki/Dual_Wielder"
  },
  {
    "id": "dungeon-delver",
    "name": "Dungeon Delver",
    "desc": "You gain Advantage on Perception checks made to detect hidden objects and on Saving Throws made to avoid or resist traps.",
    "grants": [
      {
        "n": "Resist Traps",
        "d": "You gain resistance to the damage dealt by traps."
      }
    ],
    "wiki": "https://bg3.wiki/wiki/Dungeon_Delver"
  },
  {
    "id": "durable",
    "name": "Durable",
    "desc": "Your Constitution ability score increases by 1, to a maximum of 20. Regain full hit points every time you take a short rest .",
    "grants": [],
    "wiki": "https://bg3.wiki/wiki/Durable"
  },
  {
    "id": "elemental-adept",
    "name": "Elemental Adept",
    "desc": "Your spells and attacks ignore resistance to a damage type of your choice. In addition, when you deal that type of damage with a spell , you cannot roll a 1. Damage resistance options are one of the following: Elemental Adept: Acid Elemental Adept: Cold Elemental Adept: Lightning Elemental Adept: Fire Elemental Adept: Thunder",
    "grants": [],
    "wiki": "https://bg3.wiki/wiki/Elemental_Adept"
  },
  {
    "id": "great-weapon-master",
    "name": "Great Weapon Master",
    "desc": "When an attack with a melee weapon lands a Critical Hit or kills a creature, you can make another melee weapon attack as a Bonus Action that turn.",
    "grants": [
      {
        "n": "All In",
        "d": "When attacking with a Two-Handed or Versatile melee weapon (in both hands) that you are Proficient with, Attack Rolls take a -5 penalty, but their damage increases by 10."
      }
    ],
    "wiki": "https://bg3.wiki/wiki/Great_Weapon_Master"
  },
  {
    "id": "heavily-armoured",
    "name": "Heavily Armoured",
    "desc": "Your Strength ability score increases by 1, to a maximum of 20. Gain Proficiency with Heavy armour .",
    "grants": [],
    "wiki": "https://bg3.wiki/wiki/Heavily_Armoured"
  },
  {
    "id": "heavy-armour-master",
    "name": "Heavy Armour Master",
    "desc": "Your Strength ability score increases by 1, to a maximum of 20. Incoming damage from non-magical attacks also decreases by 3 while you're wearing heavy armour.",
    "grants": [],
    "wiki": "https://bg3.wiki/wiki/Heavy_Armour_Master"
  },
  {
    "id": "lightly-armoured",
    "name": "Lightly Armoured",
    "desc": "Your Strength or Dexterity ability score increases by 1, to a maximum of 20. Gain Proficiency with Light armour .",
    "grants": [],
    "wiki": "https://bg3.wiki/wiki/Lightly_Armoured"
  },
  {
    "id": "lucky",
    "name": "Lucky",
    "desc": "You gain 3 Luck Points that recharge after a Long Rest , which you can use to gain Advantage on Attack Rolls , Ability Checks , or Saving Throws , or to make an enemy reroll their Attack Roll .",
    "grants": [],
    "wiki": "https://bg3.wiki/wiki/Lucky"
  },
  {
    "id": "mage-slayer",
    "name": "Mage Slayer",
    "desc": "When a creature casts a Spell within melee range of you, you have Advantage on any Saving Throws against it.",
    "grants": [
      {
        "n": "Attack Caster",
        "d": "You can use a Reaction to immediately make an attack against the caster if it casts a spell within 1.5m / 5ft of you."
      },
      {
        "n": "Break Concentration",
        "d": "Enemies you hit have Disadvantage when making Saving Throws to maintain their Concentration ."
      }
    ],
    "wiki": "https://bg3.wiki/wiki/Mage_Slayer"
  },
  {
    "id": "magic-initiate-bard",
    "name": "Magic Initiate: Bard",
    "desc": "Learn 2 Cantrips and a 1st-level Spell from the Bard spell list . You can cast the 1st-level Spell once per Long Rest . Your Spellcasting Ability for all three spells is Charisma .",
    "grants": [],
    "wiki": "https://bg3.wiki/wiki/Magic_Initiate:_Bard"
  },
  {
    "id": "magic-initiate-cleric",
    "name": "Magic Initiate: Cleric",
    "desc": "Learn 2 Cantrips and a 1st-level Spell from the Cleric spell list . You can cast the 1st-level Spell once per Long Rest . Your Spellcasting Ability for all three spells is Wisdom .",
    "grants": [],
    "wiki": "https://bg3.wiki/wiki/Magic_Initiate:_Cleric"
  },
  {
    "id": "magic-initiate-druid",
    "name": "Magic Initiate: Druid",
    "desc": "Learn 2 Cantrips and a 1st-level Spell from the Druid spell list . You can cast the 1st-level Spell once per Long Rest . Your Spellcasting Ability for all three spells is Wisdom .",
    "grants": [],
    "wiki": "https://bg3.wiki/wiki/Magic_Initiate:_Druid"
  },
  {
    "id": "magic-initiate-sorcerer",
    "name": "Magic Initiate: Sorcerer",
    "desc": "Learn 2 Cantrips and a 1st-level Spell from the Sorcerer spell list . You can cast the 1st-level Spell once per Long Rest . Your Spellcasting Ability for all three spells is Charisma .",
    "grants": [],
    "wiki": "https://bg3.wiki/wiki/Magic_Initiate:_Sorcerer"
  },
  {
    "id": "magic-initiate-warlock",
    "name": "Magic Initiate: Warlock",
    "desc": "Learn 2 Cantrips and a 1st-level Spell from the Warlock spell list . You can cast the 1st-level Spell once per Long Rest . Your Spellcasting Ability for all three spells is Charisma .",
    "grants": [],
    "wiki": "https://bg3.wiki/wiki/Magic_Initiate:_Warlock"
  },
  {
    "id": "magic-initiate-wizard",
    "name": "Magic Initiate: Wizard",
    "desc": "Learn 2 Cantrips and a 1st-level Spell from the Wizard spell list . You can cast the 1st-level Spell once per Long Rest . Your Spellcasting Ability for all three spells is Intelligence .",
    "grants": [],
    "wiki": "https://bg3.wiki/wiki/Magic_Initiate:_Wizard"
  },
  {
    "id": "martial-adept",
    "name": "Martial Adept",
    "desc": "Learn two Manoeuvres from the Battle Master archetype and receive 1 (additional) Superiority Die to fuel them. You regain expended Superiority Dice after a Short or Long Rest .",
    "grants": [],
    "wiki": "https://bg3.wiki/wiki/Martial_Adept"
  },
  {
    "id": "medium-armour-master",
    "name": "Medium Armour Master",
    "desc": "When you wear medium armour, it doesn't impose Disadvantage on Stealth checks. The bonus to Armour Class you can gain from your Dexterity modifier also becomes +3 instead of +2.",
    "grants": [],
    "wiki": "https://bg3.wiki/wiki/Medium_Armour_Master"
  },
  {
    "id": "mobile",
    "name": "Mobile",
    "desc": "Your Movement Speed increases by 3 m (10 ft).",
    "grants": [
      {
        "n": "Evade Difficult Terrain",
        "d": "When you use the Dash action, Difficult Terrain doesn't slow you down."
      },
      {
        "n": "Evade Opportunity Attack",
        "d": "If you move after making a melee attack, you don't provoke an Opportunity Attack from that target."
      }
    ],
    "wiki": "https://bg3.wiki/wiki/Mobile"
  },
  {
    "id": "moderately-armoured",
    "name": "Moderately Armoured",
    "desc": "Requires Light armour Proficiency . Your Strength or Dexterity ability score increases by 1, to a maximum of 20. Gain Proficiency with Medium armour and Shields .",
    "grants": [],
    "wiki": "https://bg3.wiki/wiki/Moderately_Armoured"
  },
  {
    "id": "performer",
    "name": "Performer",
    "desc": "Your Charisma ability score increases by 1, to a maximum of 20. Gain Musical Instrument Proficiency .",
    "grants": [],
    "wiki": "https://bg3.wiki/wiki/Performer"
  },
  {
    "id": "polearm-master",
    "name": "Polearm Master",
    "desc": "When attacking with a Glaive , Halberd , Pike , Quarterstaff , or Spear , you can use a Bonus Action to attack with the butt of your weapon.",
    "grants": [
      {
        "n": "Opportunity Attack",
        "d": "You can also make an Opportunity Attack when a target comes within range."
      }
    ],
    "wiki": "https://bg3.wiki/wiki/Polearm_Master"
  },
  {
    "id": "resilient",
    "name": "Resilient",
    "desc": "You increase an Ability by 1, to a maximum of 20. Gain Proficiency in that ability's Saving Throws . The available passive features are: Resilient: Strength Resilient: Dexterity Resilient: Constitution Resilient: Intelligence Resilient: Wisdom Resilient: Charisma",
    "grants": [],
    "wiki": "https://bg3.wiki/wiki/Resilient"
  },
  {
    "id": "ritual-caster",
    "name": "Ritual Caster",
    "desc": "You learn two Ritual spells of your choice.",
    "grants": [],
    "wiki": "https://bg3.wiki/wiki/Ritual_Caster"
  },
  {
    "id": "savage-attacker",
    "name": "Savage Attacker",
    "desc": "When making melee weapon attacks, you roll your damage dice twice and use the highest result.",
    "grants": [],
    "wiki": "https://bg3.wiki/wiki/Savage_Attacker"
  },
  {
    "id": "sentinel",
    "name": "Sentinel",
    "desc": "When an enemy in melee range attacks an ally, you can use a Reaction to make a weapon attack against that enemy. Target ally must not have the Sentinel feat.",
    "grants": [
      {
        "n": "Snare",
        "d": "When you hit a creature with an Opportunity Attack , it can no longer move for the rest of its turn."
      },
      {
        "n": "Opportunity Advantage",
        "d": "You gain Advantage on Opportunity Attacks ."
      }
    ],
    "wiki": "https://bg3.wiki/wiki/Sentinel"
  },
  {
    "id": "sharpshooter",
    "name": "Sharpshooter",
    "desc": "Your ranged weapon attacks are not penalized for High Ground Rules .",
    "grants": [
      {
        "n": "All In",
        "d": "Ranged weapon attacks with weapons you are Proficient with have a -5 penalty to their Attack Roll , but deal an additional 10 damage."
      }
    ],
    "wiki": "https://bg3.wiki/wiki/Sharpshooter"
  },
  {
    "id": "shield-master",
    "name": "Shield Master",
    "desc": "Gain a +2 bonus to Dexterity Saving Throw when wielding a Shield .",
    "grants": [
      {
        "n": "Block",
        "d": "If a Spell forces you to make a Dexterity Saving Throw , you can use your Reaction to shield yourself and diminish the effect's damage. - On a failed save, you only take half damage. - On a successful save, you don't take any damage, even if you normally would."
      }
    ],
    "wiki": "https://bg3.wiki/wiki/Shield_Master"
  },
  {
    "id": "skilled",
    "name": "Skilled",
    "desc": "You gain Proficiency in 3 Skills of your choice.",
    "grants": [],
    "wiki": "https://bg3.wiki/wiki/Skilled"
  },
  {
    "id": "spell-sniper",
    "name": "Spell Sniper",
    "desc": "You learn a cantrip, and the number you need to roll a Critical Hit while attacking with a Spell is reduced by 1. This effect can stack.",
    "grants": [],
    "wiki": "https://bg3.wiki/wiki/Spell_Sniper"
  },
  {
    "id": "tavern-brawler",
    "name": "Tavern Brawler",
    "desc": "Your Strength or Constitution ability score increases by 1, to a maximum of 20. When you make an unarmed attack, use an improvised weapon, or throw something, your strength modifier is added twice to the damage and Attack Roll .",
    "grants": [],
    "wiki": "https://bg3.wiki/wiki/Tavern_Brawler"
  },
  {
    "id": "tough",
    "name": "Tough",
    "desc": "Hit Point maximum increased by 2 for each level.",
    "grants": [],
    "wiki": "https://bg3.wiki/wiki/Tough"
  },
  {
    "id": "war-caster",
    "name": "War Caster",
    "desc": "You gain Advantage on Saving Throws to maintain Concentration on a Spell .",
    "grants": [
      {
        "n": "Opportunity Spell",
        "d": "You can also use a Reaction to cast Shocking Grasp at a target moving out of melee range."
      }
    ],
    "wiki": "https://bg3.wiki/wiki/War_Caster"
  },
  {
    "id": "weapon-master",
    "name": "Weapon Master",
    "desc": "Your Strength or Dexterity ability score increases by 1, to a maximum of 20. Gain Proficiency with four Weapon types of your choice.",
    "grants": [],
    "wiki": "https://bg3.wiki/wiki/Weapon_Master"
  }
]
;

if (typeof module !== "undefined") module.exports = FEAT_DATA;

