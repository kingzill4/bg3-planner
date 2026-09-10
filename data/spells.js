// GENERE par scripts/scrape-spells.ps1 + build-spells.ps1 — ne pas editer.
const SPELLS = [
  {
    "id": "absolute-s-talisman-aid",
    "name": "Absolute's Talisman: Aid",
    "level": 2,
    "school": "Abjuration",
    "desc": "Heal yourself and increase your hit point maximum by 5 Hit Points.",
    "cost": "Action Healing: 5 5 Healing",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/absolute-s-talisman-aid.webp",
    "wiki": "https://bg3.wiki/wiki/Absolute%27s_Talisman:_Aid"
  },
  {
    "id": "acid-splash",
    "name": "Acid Splash",
    "level": 0,
    "school": "Conjuration",
    "desc": "Throw a bubble of acid that damages each creature it hits.",
    "cost": "Action",
    "damage": "1d6 Acid",
    "save": "DEX",
    "range": "18 m (60 ft)",
    "aoe": "2 m (7 ft) Radius",
    "damageMin": 1,
    "damageMax": 6,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Acid"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [
      {
        "level": 5,
        "count": 2,
        "size": 6
      },
      {
        "level": 10,
        "count": 3,
        "size": 6
      }
    ],
    "upcast": null,
    "upcastDice": null,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "subclasses": [
      "Eldritch Knight",
      "Arcane Trickster"
    ],
    "races": [
      "High Elf",
      "High Half-Elf"
    ],
    "availability": [
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "High Elf",
        "kind": "race",
        "level": 1,
        "via": null
      },
      {
        "name": "High Half-Elf",
        "kind": "race",
        "level": 1,
        "via": null
      }
    ],
    "icon": "icons/spells/acid-splash.webp",
    "wiki": "https://bg3.wiki/wiki/Acid_Splash"
  },
  {
    "id": "activate-call-lightning",
    "name": "Activate Call Lightning",
    "level": 3,
    "school": "Conjuration",
    "desc": "Call down more lightning to hit all targets within the area of effect.",
    "cost": "Action",
    "damage": "3d10 Lightning",
    "save": "DEX",
    "range": "18 m (60 ft)",
    "aoe": "2 m (7 ft) Radius",
    "damageMin": 3,
    "damageMax": 30,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Lightning"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "If Call Lightning was cast using a 4th-level spell slot or higher, it deals an additional 1d10 Lightning damage for each spell slot level above 3rd.",
    "upcastDice": {
      "count": 1,
      "size": 10
    },
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/activate-call-lightning.webp",
    "wiki": "https://bg3.wiki/wiki/Activate_Call_Lightning"
  },
  {
    "id": "activate-witch-bolt",
    "name": "Activate Witch Bolt",
    "level": 0,
    "school": "Evocation",
    "desc": "Activate the bolt and deal 1d12 Lightning. If not activated each turn, the arc dissipates and the spell ends.",
    "cost": "Action",
    "damage": "1d12 Lightning",
    "save": null,
    "range": "30 m (100 ft)",
    "aoe": null,
    "damageMin": 1,
    "damageMax": 12,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Lightning"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": null,
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/activate-witch-bolt.webp",
    "wiki": "https://bg3.wiki/wiki/Activate_Witch_Bolt"
  },
  {
    "id": "aegis-of-the-absolute",
    "name": "Aegis of the Absolute",
    "level": 9,
    "school": "Evocation",
    "desc": "The Netherbrain can make itself Immune to all types of damage it took in a round of combat until the start of its next turn.",
    "cost": null,
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit. Condition: Aegis of the Absolute Aegis of the Absolute Duration: 1 turn The Netherbrain is Immune to all types of damage it took in the previous round until the start of its next turn.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/aegis-of-the-absolute.webp",
    "wiki": "https://bg3.wiki/wiki/Aegis_of_the_Absolute"
  },
  {
    "id": "aid",
    "name": "Aid",
    "level": 2,
    "school": "Abjuration",
    "desc": "Bolster your allies with toughness and resolve to heal and increase their Hit Points maximum.",
    "cost": "Action + Level 2 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": "9 m (30 ft) Radius",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level increases the target's maximum health by an additional 5 Hit Points for each spell slot level above 2nd.",
    "upcastDice": null,
    "classes": [
      "Cleric",
      "Paladin"
    ],
    "subclasses": [
      "Life Domain"
    ],
    "races": [],
    "availability": [
      {
        "name": "Cleric",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Life Domain",
        "kind": "subclass",
        "level": 3,
        "via": "Domain Spell"
      },
      {
        "name": "Paladin",
        "kind": "class",
        "level": 5,
        "via": null
      }
    ],
    "icon": "icons/spells/aid.webp",
    "wiki": "https://bg3.wiki/wiki/Aid"
  },
  {
    "id": "animal-friendship",
    "name": "Animal Friendship",
    "level": 1,
    "school": "Enchantment",
    "desc": "Convince a beast not to attack you. The creature must have an Intelligence of 3 or less. Condition ends early if you or an ally hurts the target. In higher difficulty modes, the target might become hostile when the spell ends.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Affects an additional target for each spell slot level above 1st.",
    "upcastDice": null,
    "classes": [
      "Bard",
      "Druid",
      "Ranger"
    ],
    "subclasses": [
      "Nature Domain"
    ],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Druid",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Nature Domain",
        "kind": "subclass",
        "level": 1,
        "via": "Domain Spell"
      },
      {
        "name": "Ranger",
        "kind": "class",
        "level": 2,
        "via": null
      }
    ],
    "icon": "icons/spells/animal-friendship.webp",
    "wiki": "https://bg3.wiki/wiki/Animal_Friendship"
  },
  {
    "id": "animate-dead",
    "name": "Animate Dead",
    "level": 3,
    "school": "Necromancy",
    "desc": "Animate a corpse to create an undead servant while not in combat. The target must be a Medium or Small corpse.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": null,
    "range": "3 m (10 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "When the spell is cast at 4th Level, raise up to 3 Skeletons or Zombies instead of 1. When the spell is cast at 5th Level, raise a Ghoul or Flying Ghoul. When the spell is cast at 6th Level, raise up to 3 Ghouls or Flying Ghouls instead of 1.",
    "upcastDice": null,
    "classes": [
      "Cleric",
      "Wizard",
      "Warlock",
      "Bard"
    ],
    "subclasses": [
      "Circle of the Spores",
      "Death Domain",
      "College of Lore",
      "Oathbreaker"
    ],
    "races": [],
    "availability": [
      {
        "name": "Cleric",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Circle of the Spores",
        "kind": "subclass",
        "level": 5,
        "via": "Circle Spell"
      },
      {
        "name": "Warlock",
        "kind": "class",
        "level": 5,
        "via": "Pact of the Tome once per long rest"
      },
      {
        "name": "Death Domain",
        "kind": "subclass",
        "level": 5,
        "via": "Domain Spell"
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Oathbreaker",
        "kind": "subclass",
        "level": 9,
        "via": "Oath Spell"
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/animate-dead.webp",
    "wiki": "https://bg3.wiki/wiki/Animate_Dead"
  },
  {
    "id": "animate-dead-balthazar",
    "name": "Animate Dead (Balthazar)",
    "level": 6,
    "school": "Necromancy",
    "desc": "Awaken the dead from their century-long slumber.",
    "cost": "Action + Level 6 Spell Slot",
    "damage": null,
    "save": null,
    "range": "22 m (73 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/animate-dead-balthazar.webp",
    "wiki": "https://bg3.wiki/wiki/Animate_Dead_(Balthazar)"
  },
  {
    "id": "animate-dead-duergar",
    "name": "Animate Dead (Duergar)",
    "level": 4,
    "school": "Necromancy",
    "desc": "Animate a pile of bones or a corpse to serve you. The target must be a Medium or Small corpse.",
    "cost": "Action + Level 4 Spell Slot",
    "damage": null,
    "save": null,
    "range": "22 m (73 ft)",
    "aoe": "8 m (27 ft) Radius",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/animate-dead-duergar.webp",
    "wiki": "https://bg3.wiki/wiki/Animate_Dead_(Duergar)"
  },
  {
    "id": "animate-dead-flying-ghoul",
    "name": "Animate Dead: Flying Ghoul",
    "level": 5,
    "school": "Necromancy",
    "desc": "Create a Flying Ghoul that specialises in melee combat. The target must be a Medium or Small corpse.",
    "cost": "Action + Level 5 Spell Slot",
    "damage": null,
    "save": null,
    "range": "3 m (10 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/animate-dead-flying-ghoul.webp",
    "wiki": "https://bg3.wiki/wiki/Animate_Dead:_Flying_Ghoul"
  },
  {
    "id": "animate-dead-flying-ghoul-flock",
    "name": "Animate Dead: Flying Ghoul Flock",
    "level": 6,
    "school": "Necromancy",
    "desc": "Create 3 Flying Ghouls that specialise in melee combat. The targets must be Medium or Small corpses.",
    "cost": "Action + Level 6 Spell Slot",
    "damage": null,
    "save": null,
    "range": "9 m (30 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/animate-dead-flying-ghoul-flock.webp",
    "wiki": "https://bg3.wiki/wiki/Animate_Dead:_Flying_Ghoul_Flock"
  },
  {
    "id": "animate-dead-ghoul",
    "name": "Animate Dead: Ghoul",
    "level": 5,
    "school": "Necromancy",
    "desc": "Create a ghoul that specializes in melee combat. The target must be a Medium or Small corpse.",
    "cost": "Action + Level 5 Spell Slot",
    "damage": null,
    "save": null,
    "range": "3 m (10 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/animate-dead-ghoul.webp",
    "wiki": "https://bg3.wiki/wiki/Animate_Dead:_Ghoul"
  },
  {
    "id": "animate-dead-ghoul-pack",
    "name": "Animate Dead: Ghoul Pack",
    "level": 6,
    "school": "Necromancy",
    "desc": "Create 3 Ghouls that specialise in melee combat. The targets must be a Medium or Small corpse.",
    "cost": "Action + Level 6 Spell Slot",
    "damage": null,
    "save": null,
    "range": "9 m (30 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/animate-dead-ghoul-pack.webp",
    "wiki": "https://bg3.wiki/wiki/Animate_Dead:_Ghoul_Pack"
  },
  {
    "id": "animate-dead-skeleton",
    "name": "Animate Dead: Skeleton",
    "level": 3,
    "school": "Necromancy",
    "desc": "Create a skeleton that specialises in ranged combat. The target must be a Medium or Small corpse.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": null,
    "range": "3 m (10 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/animate-dead-skeleton.webp",
    "wiki": "https://bg3.wiki/wiki/Animate_Dead:_Skeleton"
  },
  {
    "id": "animate-dead-skeleton-squad",
    "name": "Animate Dead: Skeleton Squad",
    "level": 4,
    "school": "Necromancy",
    "desc": "Create 3 Skeletons that specialise in ranged combat. The targets must be Medium or Small corpses.",
    "cost": "Action + Level 4 Spell Slot",
    "damage": null,
    "save": null,
    "range": "9 m (30 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/animate-dead-skeleton-squad.webp",
    "wiki": "https://bg3.wiki/wiki/Animate_Dead:_Skeleton_Squad"
  },
  {
    "id": "animate-dead-zombie",
    "name": "Animate Dead: Zombie",
    "level": 3,
    "school": "Necromancy",
    "desc": "Create a zombie that specialises in melee combat. The target must be a Medium or Small corpse.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": null,
    "range": "3 m (10 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/animate-dead-zombie.webp",
    "wiki": "https://bg3.wiki/wiki/Animate_Dead:_Zombie"
  },
  {
    "id": "animate-dead-zombie-battalion",
    "name": "Animate Dead: Zombie Battalion",
    "level": 4,
    "school": "Necromancy",
    "desc": "Create 3 zombies that specialise in melee combat. The targets must be Medium or Small corpses.",
    "cost": "Action + Level 4 Spell Slot",
    "damage": null,
    "save": null,
    "range": "9 m (30 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": null,
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/animate-dead-zombie-battalion.webp",
    "wiki": "https://bg3.wiki/wiki/Animate_Dead:_Zombie_Battalion"
  },
  {
    "id": "arabella-s-shadow-entangle",
    "name": "Arabella's Shadow Entangle",
    "level": 1,
    "school": "Conjuration",
    "desc": "Cast this upon shadow and undead creatures to Entangle them. The entangling surface can affect any creatures who move through it.",
    "cost": "Action",
    "damage": null,
    "save": "STR",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/arabella-s-shadow-entangle.webp",
    "wiki": "https://bg3.wiki/wiki/Arabella%27s_Shadow_Entangle"
  },
  {
    "id": "arcane-gate",
    "name": "Arcane Gate",
    "level": 6,
    "school": "Conjuration",
    "desc": "Create two linked teleportation portals within range. All creatures, including enemies, may travel between the two portals as a free action.",
    "cost": "Action + Level 6 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "subclasses": [],
    "races": [],
    "availability": [
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 11,
        "via": null
      },
      {
        "name": "Warlock",
        "kind": "class",
        "level": 11,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 11,
        "via": null
      }
    ],
    "icon": "icons/spells/arcane-gate.webp",
    "wiki": "https://bg3.wiki/wiki/Arcane_Gate"
  },
  {
    "id": "arcane-lock",
    "name": "Arcane Lock",
    "level": 2,
    "school": "Abjuration",
    "desc": "Close a door or container with a magical lock. It can no longer be lockpicked or opened with Knock.",
    "cost": "Action + Level 2 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Wizard",
      "Bard"
    ],
    "subclasses": [
      "College of Lore",
      "Eldritch Knight",
      "Arcane Trickster"
    ],
    "races": [],
    "availability": [
      {
        "name": "Wizard",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 7,
        "via": null
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 8,
        "via": null
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/arcane-lock.webp",
    "wiki": "https://bg3.wiki/wiki/Arcane_Lock"
  },
  {
    "id": "armour-of-agathys",
    "name": "Armour of Agathys",
    "level": 1,
    "school": "Abjuration",
    "desc": "Gain 5 temporary hit points and deal 5 Cold damage to any creature that hits you with a melee attack. Can only have Temporary Hit Points from one source.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Cold"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Gain an additional 5 temporary hit points and deal an additional 5 Cold damage per level.",
    "upcastDice": null,
    "classes": [
      "Warlock",
      "Bard"
    ],
    "subclasses": [
      "Draconic Bloodline",
      "College of Lore"
    ],
    "races": [],
    "availability": [
      {
        "name": "Warlock",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Draconic Bloodline",
        "kind": "subclass",
        "level": 1,
        "via": "White/Cold Ancestry"
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/armour-of-agathys.webp",
    "wiki": "https://bg3.wiki/wiki/Armour_of_Agathys"
  },
  {
    "id": "arms-of-hadar",
    "name": "Arms of Hadar",
    "level": 1,
    "school": "Conjuration",
    "desc": "Prevent targets from using reactions.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": "2d6 Necrotic",
    "save": "STR",
    "range": "Self",
    "aoe": "3 m (10 ft) Radius",
    "damageMin": 2,
    "damageMax": 12,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Necrotic"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Deals an additional 1d6 Necrotic damage per level.",
    "upcastDice": {
      "count": 1,
      "size": 6
    },
    "classes": [
      "Warlock"
    ],
    "subclasses": [],
    "races": [],
    "availability": [
      {
        "name": "Warlock",
        "kind": "class",
        "level": 1,
        "via": null
      }
    ],
    "icon": "icons/spells/arms-of-hadar.webp",
    "wiki": "https://bg3.wiki/wiki/Arms_of_Hadar"
  },
  {
    "id": "astral-rift",
    "name": "Astral Rift",
    "level": 3,
    "school": "Conjuration",
    "desc": "Open a tear in reality itself, allowing allies to enter this plane from the Astral Sea. While holding open the rift, the caster can't move, or take actions, reactions or bonus actions other than Summoning an ally every other turn.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "9 m (30 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/astral-rift.webp",
    "wiki": "https://bg3.wiki/wiki/Astral_Rift"
  },
  {
    "id": "bane-spell",
    "name": "Bane (spell)",
    "level": 1,
    "school": "Enchantment",
    "desc": "Up to 3 creatures receive a -1d4 penalty to Attack Rolls and Saving Throws.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": "CHA",
    "range": "9 m (30 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Affects an additional target for each spell slot level above 1st.",
    "upcastDice": null,
    "classes": [
      "Bard",
      "Cleric"
    ],
    "subclasses": [
      "Oath of Vengeance"
    ],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Cleric",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Oath of Vengeance",
        "kind": "subclass",
        "level": 3,
        "via": "Oath Spell"
      }
    ],
    "icon": "icons/spells/bane-spell.webp",
    "wiki": "https://bg3.wiki/wiki/Bane_(spell)"
  },
  {
    "id": "bane-s-wrath",
    "name": "Bane's Wrath",
    "level": 4,
    "school": null,
    "desc": "Strike with the Black Hand's ire, dealing more damage and possibly Frightening your target.",
    "cost": "Action",
    "damage": "6d6 Psychic",
    "save": "WIS",
    "range": "9 m (30 ft)",
    "aoe": null,
    "damageMin": 6,
    "damageMax": 36,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Psychic"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/bane-s-wrath.webp",
    "wiki": "https://bg3.wiki/wiki/Bane%27s_Wrath"
  },
  {
    "id": "banishing-smite",
    "name": "Banishing Smite",
    "level": 5,
    "school": "Abjuration",
    "desc": "Possibly Banish your target to another plane of existence. Targets with 50 Hit Points or more can't be Banished.",
    "cost": "on hit Bonus Action + Level 5 Spell Slot",
    "damage": "5d10 Force",
    "save": null,
    "range": "9 m (30 ft)",
    "aoe": null,
    "damageMin": 5,
    "damageMax": 50,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Force"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Bard"
    ],
    "subclasses": [
      "The Hexblade"
    ],
    "races": [],
    "availability": [
      {
        "name": "The Hexblade",
        "kind": "subclass",
        "level": 9,
        "via": null
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/banishing-smite.webp",
    "wiki": "https://bg3.wiki/wiki/Banishing_Smite"
  },
  {
    "id": "banishing-smite-melee",
    "name": "Banishing Smite (Melee)",
    "level": 5,
    "school": "Abjuration",
    "desc": "Possibly Banish your target to another plane of existence.",
    "cost": "on hit Bonus Action + Level 5 Spell Slot",
    "damage": "5d10 Force",
    "save": null,
    "range": "9 m (30 ft)",
    "aoe": null,
    "damageMin": 5,
    "damageMax": 50,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Force"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/banishing-smite-melee.webp",
    "wiki": "https://bg3.wiki/wiki/Banishing_Smite_(Melee)"
  },
  {
    "id": "banishing-smite-ranged",
    "name": "Banishing Smite (Ranged)",
    "level": 5,
    "school": "Abjuration",
    "desc": "Possibly Banish your target to another plane of existence. Targets with 50 Hit Points or more can't be Banished.",
    "cost": "on hit Bonus Action + Level 5 Spell Slot",
    "damage": "5d10 Force",
    "save": null,
    "range": "9 m (30 ft)",
    "aoe": null,
    "damageMin": 5,
    "damageMax": 50,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Force"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/banishing-smite-ranged.webp",
    "wiki": "https://bg3.wiki/wiki/Banishing_Smite_(Ranged)"
  },
  {
    "id": "banishment",
    "name": "Banishment",
    "level": 4,
    "school": "Abjuration",
    "desc": "Temporarily Banish your target to another plane of existence.",
    "cost": "Action + Level 4 Spell Slot",
    "damage": null,
    "save": "CHA",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Affect an additional target per level.",
    "upcastDice": null,
    "classes": [
      "Cleric",
      "Sorcerer",
      "Warlock",
      "Wizard",
      "Bard"
    ],
    "subclasses": [],
    "races": [],
    "availability": [
      {
        "name": "Cleric",
        "kind": "class",
        "level": 7,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 7,
        "via": null
      },
      {
        "name": "Warlock",
        "kind": "class",
        "level": 7,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 7,
        "via": null
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/banishment.webp",
    "wiki": "https://bg3.wiki/wiki/Banishment"
  },
  {
    "id": "barkskin",
    "name": "Barkskin",
    "level": 2,
    "school": "Transmutation",
    "desc": "Touch a willing creature to toughen its skin and increase its Armour Class up to 16.",
    "cost": "Action + Level 2 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Druid",
      "Ranger"
    ],
    "subclasses": [
      "Nature Domain",
      "Circle of the Land"
    ],
    "races": [],
    "availability": [
      {
        "name": "Druid",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Nature Domain",
        "kind": "subclass",
        "level": 3,
        "via": "Domain Spell"
      },
      {
        "name": "Circle of the Land",
        "kind": "subclass",
        "level": 3,
        "via": "Forest"
      },
      {
        "name": "Ranger",
        "kind": "class",
        "level": 5,
        "via": null
      }
    ],
    "icon": "icons/spells/barkskin.webp",
    "wiki": "https://bg3.wiki/wiki/Barkskin"
  },
  {
    "id": "beacon-of-hope",
    "name": "Beacon of Hope",
    "level": 3,
    "school": "Abjuration",
    "desc": "Your allies will regain the maximum Hit Points possible when healed. They also gain Advantage on Wisdom Saving Throws and Death Saving Throws.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": "9 m (30 ft) Radius",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Cleric"
    ],
    "subclasses": [
      "Life Domain",
      "Oath of Devotion"
    ],
    "races": [],
    "availability": [
      {
        "name": "Cleric",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Life Domain",
        "kind": "subclass",
        "level": 5,
        "via": "Domain Spell"
      },
      {
        "name": "Oath of Devotion",
        "kind": "subclass",
        "level": 9,
        "via": "Oath Spell"
      }
    ],
    "icon": "icons/spells/beacon-of-hope.webp",
    "wiki": "https://bg3.wiki/wiki/Beacon_of_Hope"
  },
  {
    "id": "bear-s-endurance",
    "name": "Bear's Endurance",
    "level": 2,
    "school": "Transmutation",
    "desc": "Creature gains Advantage on Constitution Checks and gains 7 Temporary Hit Points. Can only have temporary hit points from one source.",
    "cost": "Action + Level 2 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "When this Spell is cast at 3rd level or higher, you can target an additional creature for each spell slot level above 2nd.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/bear-s-endurance.webp",
    "wiki": "https://bg3.wiki/wiki/Bear%27s_Endurance"
  },
  {
    "id": "beckoning-darkness",
    "name": "Beckoning Darkness",
    "level": 4,
    "school": "Necromancy",
    "desc": "Curse a creature to be haunted by darkness. It takes 2d8 Necrotic damage if it enters or starts its turn in a Lightly or Heavily Obscured area.",
    "cost": "Bonus Action",
    "damage": "2d8 Necrotic",
    "save": "CHA",
    "range": "4 m (13 ft)",
    "aoe": null,
    "damageMin": 2,
    "damageMax": 16,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Necrotic"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/beckoning-darkness.webp",
    "wiki": "https://bg3.wiki/wiki/Beckoning_Darkness"
  },
  {
    "id": "beguiling-rebuke",
    "name": "Beguiling Rebuke",
    "level": 6,
    "school": "Enchantment",
    "desc": "Try to Beguile your attacker and its nearby allies. Creatures charmed in this way cannot attack Raphael.",
    "cost": null,
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/beguiling-rebuke.webp",
    "wiki": "https://bg3.wiki/wiki/Beguiling_Rebuke"
  },
  {
    "id": "bestow-curse",
    "name": "Bestow Curse",
    "level": 3,
    "school": "Necromancy",
    "desc": "Curse a creature with your touch. The curse either bestows Disadvantage on Ability Checks and Saving Throws, Disadvantage on Attack Rolls, lets you deal additional damage to the target, or robs it of its Actions. The effect of the curse is based on the variant selected and lasts for 10 turns.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "The duration is increased to 20 turns when cast at level 4, to 50 turns at level 5, and to 100 turns at level 6.",
    "upcastDice": null,
    "classes": [
      "Bard",
      "Cleric",
      "Wizard"
    ],
    "subclasses": [
      "The Great Old One",
      "Trickery Domain",
      "Oathbreaker"
    ],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Cleric",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "The Great Old One",
        "kind": "subclass",
        "level": 5,
        "via": null
      },
      {
        "name": "Trickery Domain",
        "kind": "subclass",
        "level": 5,
        "via": "Domain Spell"
      },
      {
        "name": "Oathbreaker",
        "kind": "subclass",
        "level": 9,
        "via": "Oath Spell"
      }
    ],
    "icon": "icons/spells/bestow-curse.webp",
    "wiki": "https://bg3.wiki/wiki/Bestow_Curse"
  },
  {
    "id": "bestow-curse-additional-damage",
    "name": "Bestow Curse: Additional Damage",
    "level": 3,
    "school": "Necromancy",
    "desc": "Curse a creature with your touch. Your attacks and spells deal an additional 1d8 Necrotic damage to the target.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": "1d8 Necrotic",
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 1,
    "damageMax": 8,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Necrotic"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "The duration is increased to 20 turns when cast at level 4, to 50 turns at level 5, and to 100 turns at level 6.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/bestow-curse-additional-damage.webp",
    "wiki": "https://bg3.wiki/wiki/Bestow_Curse:_Additional_Damage"
  },
  {
    "id": "bestow-curse-attack-disadvantage",
    "name": "Bestow Curse: Attack Disadvantage",
    "level": 3,
    "school": "Necromancy",
    "desc": "Curse a creature with your touch. It has Disadvantage on Attack Rolls against you.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "The duration is increased to 20 turns when cast at level 4, to 50 turns at level 5, and to 100 turns at level 6.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/bestow-curse-attack-disadvantage.webp",
    "wiki": "https://bg3.wiki/wiki/Bestow_Curse:_Attack_Disadvantage"
  },
  {
    "id": "bestow-curse-charisma-disadvantage",
    "name": "Bestow Curse: Charisma Disadvantage",
    "level": 3,
    "school": "Necromancy",
    "desc": "Curse a creature with your touch. It suffers Disadvantage on Charisma Ability Checks and Saving Throws.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "The duration is increased to 20 turns when cast at level 4, to 50 turns at level 5, and to 100 turns at level 6.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/bestow-curse-charisma-disadvantage.webp",
    "wiki": "https://bg3.wiki/wiki/Bestow_Curse:_Charisma_Disadvantage"
  },
  {
    "id": "bestow-curse-constitution-disadvantage",
    "name": "Bestow Curse: Constitution Disadvantage",
    "level": 3,
    "school": "Necromancy",
    "desc": "Curse a creature with your touch. It suffers Disadvantage on Constitution Ability Checks and Saving Throws.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "The duration is increased to 20 turns when cast at level 4, to 50 turns at level 5, and to 100 turns at level 6.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/bestow-curse-constitution-disadvantage.webp",
    "wiki": "https://bg3.wiki/wiki/Bestow_Curse:_Constitution_Disadvantage"
  },
  {
    "id": "bestow-curse-dexterity-disadvantage",
    "name": "Bestow Curse: Dexterity Disadvantage",
    "level": 3,
    "school": "Necromancy",
    "desc": "Curse a creature with your touch. It suffers Disadvantage on Dexterity Ability Checks and Saving Throws.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "The duration is increased to 20 turns when cast at level 4, to 50 turns at level 5, and to 100 turns at level 6.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/bestow-curse-dexterity-disadvantage.webp",
    "wiki": "https://bg3.wiki/wiki/Bestow_Curse:_Dexterity_Disadvantage"
  },
  {
    "id": "bestow-curse-dread",
    "name": "Bestow Curse: Dread",
    "level": 3,
    "school": "Necromancy",
    "desc": "Curse a creature with your touch. It fills with dread, possibly skipping its turn.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "The duration is increased to 20 turns when cast at level 4, to 50 turns at level 5, and to 100 turns at level 6.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/bestow-curse-dread.webp",
    "wiki": "https://bg3.wiki/wiki/Bestow_Curse:_Dread"
  },
  {
    "id": "bestow-curse-intelligence-disadvantage",
    "name": "Bestow Curse: Intelligence Disadvantage",
    "level": 3,
    "school": "Necromancy",
    "desc": "Curse a creature with your touch. It suffers Disadvantage on Intelligence Ability Checks and Saving Throws.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "The duration is increased to 20 turns when cast at level 4, to 50 turns at level 5, and to 100 turns at level 6.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/bestow-curse-intelligence-disadvantage.webp",
    "wiki": "https://bg3.wiki/wiki/Bestow_Curse:_Intelligence_Disadvantage"
  },
  {
    "id": "bestow-curse-strength-disadvantage",
    "name": "Bestow Curse: Strength Disadvantage",
    "level": 3,
    "school": "Necromancy",
    "desc": "Curse a creature with your touch. It suffers Disadvantage on Strength Ability Checks and Saving Throws.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "The duration is increased to 20 turns when cast at level 4, to 50 turns at level 5, and to 100 turns at level 6.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/bestow-curse-strength-disadvantage.webp",
    "wiki": "https://bg3.wiki/wiki/Bestow_Curse:_Strength_Disadvantage"
  },
  {
    "id": "bestow-curse-wisdom-disadvantage",
    "name": "Bestow Curse: Wisdom Disadvantage",
    "level": 3,
    "school": "Necromancy",
    "desc": "Curse a creature with your touch. It suffers Disadvantage on Wisdom Ability Checks and Saving Throws.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "The duration is increased to 20 turns when cast at level 4, to 50 turns at level 5, and to 100 turns at level 6.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/bestow-curse-wisdom-disadvantage.webp",
    "wiki": "https://bg3.wiki/wiki/Bestow_Curse:_Wisdom_Disadvantage"
  },
  {
    "id": "blade-barrier",
    "name": "Blade Barrier",
    "level": 6,
    "school": "Evocation",
    "desc": "Summons a wall of razor-sharp blades that turns the area into Difficult Terrain and damages anyone foolish enough to come close.",
    "cost": "Action + Level 6 Spell Slot",
    "damage": "6d10 Slashing",
    "save": "DEX",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 6,
    "damageMax": 60,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Slashing"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Cleric"
    ],
    "subclasses": [],
    "races": [],
    "availability": [
      {
        "name": "Cleric",
        "kind": "class",
        "level": 11,
        "via": null
      }
    ],
    "icon": "icons/spells/blade-barrier.webp",
    "wiki": "https://bg3.wiki/wiki/Blade_Barrier"
  },
  {
    "id": "blade-ward",
    "name": "Blade Ward",
    "level": 0,
    "school": "Abjuration",
    "desc": "Take only half the damage from Bludgeoning, Piercing, and Slashing attacks.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": null,
    "upcastDice": null,
    "classes": [
      "Bard",
      "Cleric",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "subclasses": [
      "Eldritch Knight",
      "Arcane Trickster"
    ],
    "races": [
      "High Elf",
      "High Half-Elf"
    ],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Cleric",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Warlock",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "High Elf",
        "kind": "race",
        "level": 1,
        "via": null
      },
      {
        "name": "High Half-Elf",
        "kind": "race",
        "level": 1,
        "via": null
      }
    ],
    "icon": "icons/spells/blade-ward.webp",
    "wiki": "https://bg3.wiki/wiki/Blade_Ward"
  },
  {
    "id": "bless",
    "name": "Bless",
    "level": 1,
    "school": "Enchantment",
    "desc": "Bless up to 3 creatures. They gain a +1d4 bonus to Attack Rolls and Saving Throws.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "9 m (30 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Affects an additional target for each spell slot level above 1st.",
    "upcastDice": null,
    "classes": [
      "Cleric",
      "Paladin",
      "Bard"
    ],
    "subclasses": [
      "Life Domain",
      "College of Lore"
    ],
    "races": [],
    "availability": [
      {
        "name": "Cleric",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Life Domain",
        "kind": "subclass",
        "level": 1,
        "via": "Domain Spell"
      },
      {
        "name": "Paladin",
        "kind": "class",
        "level": 2,
        "via": null
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/bless.webp",
    "wiki": "https://bg3.wiki/wiki/Bless"
  },
  {
    "id": "blight",
    "name": "Blight",
    "level": 4,
    "school": "Necromancy",
    "desc": "Deals 8d8 Necrotic damage to a target. Plants take maximum damage from this spell, and have Disadvantage on the Saving Throw against it. No effect on undead and constructs.",
    "cost": "Action + Level 4 Spell Slot",
    "damage": "8d8 Necrotic",
    "save": "CON",
    "range": "9 m (30 ft)",
    "aoe": null,
    "damageMin": 8,
    "damageMax": 64,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Necrotic"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level deals an extra 1d8 Necrotic damage for each spell slot level above 4th.",
    "upcastDice": {
      "count": 1,
      "size": 8
    },
    "classes": [
      "Druid",
      "Sorcerer",
      "Warlock",
      "Wizard",
      "Bard"
    ],
    "subclasses": [
      "Circle of the Spores",
      "Death Domain"
    ],
    "races": [],
    "availability": [
      {
        "name": "Druid",
        "kind": "class",
        "level": 7,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 7,
        "via": null
      },
      {
        "name": "Warlock",
        "kind": "class",
        "level": 7,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 7,
        "via": null
      },
      {
        "name": "Circle of the Spores",
        "kind": "subclass",
        "level": 7,
        "via": "Circle Spell"
      },
      {
        "name": "Death Domain",
        "kind": "subclass",
        "level": 7,
        "via": "Domain Spell"
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/blight.webp",
    "wiki": "https://bg3.wiki/wiki/Blight"
  },
  {
    "id": "blinding-smite",
    "name": "Blinding Smite",
    "level": 3,
    "school": "Evocation",
    "desc": "Evoke a heavenly flare and possibly Blind your target",
    "cost": "on hit Bonus Action + Level 3 Spell Slot",
    "damage": "3d8 Radiant",
    "save": "CON",
    "range": "9 m (30 ft)",
    "aoe": null,
    "damageMin": 3,
    "damageMax": 24,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Radiant"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Paladin"
    ],
    "subclasses": [],
    "races": [],
    "availability": [
      {
        "name": "Paladin",
        "kind": "class",
        "level": 9,
        "via": null
      }
    ],
    "icon": "icons/spells/blinding-smite.webp",
    "wiki": "https://bg3.wiki/wiki/Blinding_Smite"
  },
  {
    "id": "blindness",
    "name": "Blindness",
    "level": 2,
    "school": "Necromancy",
    "desc": "Limit a foe's sight range. It is easier to hit, and the creature will miss more often. Attack Rolls against it have Advantage and the foe attacks with Disadvantage.",
    "cost": "Action + Level 2 Spell Slot",
    "damage": null,
    "save": "CON",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Affects an additional target for each spell slot level above 2nd.",
    "upcastDice": null,
    "classes": [
      "Bard",
      "Cleric",
      "Sorcerer",
      "Wizard"
    ],
    "subclasses": [
      "The Fiend",
      "Circle of the Spores",
      "Death Domain",
      "Arcane Trickster",
      "Eldritch Knight"
    ],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Cleric",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "The Fiend",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Circle of the Spores",
        "kind": "subclass",
        "level": 3,
        "via": "Circle Spell"
      },
      {
        "name": "Death Domain",
        "kind": "subclass",
        "level": 3,
        "via": "Domain Spell"
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 8,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 8,
        "via": null
      }
    ],
    "icon": "icons/spells/blindness.webp",
    "wiki": "https://bg3.wiki/wiki/Blindness"
  },
  {
    "id": "blink",
    "name": "Blink",
    "level": 3,
    "school": "Transmutation",
    "desc": "At the end of your turn, roll a d20. On 11 or higher, you vanish into the Ethereal Plane. While there, you can't be harmed or seen in this world. When you do vanish, your presence here is a representation of the location you'll come back to. You can choose to teleport it up to 6 m (20 ft). Availa...",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "subclasses": [
      "The Archfey",
      "The Hexblade"
    ],
    "races": [],
    "availability": [
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "The Archfey",
        "kind": "subclass",
        "level": 5,
        "via": null
      },
      {
        "name": "The Hexblade",
        "kind": "subclass",
        "level": 5,
        "via": null
      }
    ],
    "icon": "icons/spells/blink.webp",
    "wiki": "https://bg3.wiki/wiki/Blink"
  },
  {
    "id": "bludgeon-the-weak",
    "name": "Bludgeon the Weak",
    "level": 1,
    "school": "Transmutation",
    "desc": "Make an enemy Vulnerable to Bludgeoning damage. This effect lasts 3 turns, or until the target takes damage.",
    "cost": "Bonus Action",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/bludgeon-the-weak.webp",
    "wiki": "https://bg3.wiki/wiki/Bludgeon_the_Weak"
  },
  {
    "id": "blur",
    "name": "Blur",
    "level": 2,
    "school": "Illusion",
    "desc": "Attackers have Disadvantage on Attack Rolls against you. Doesn't affect creatures that don't rely on sight or that can see through illusions.",
    "cost": "Action + Level 2 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Sorcerer",
      "Wizard",
      "Bard"
    ],
    "subclasses": [
      "The Hexblade",
      "Circle of the Land",
      "College of Lore",
      "Arcane Trickster",
      "Eldritch Knight"
    ],
    "races": [],
    "availability": [
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "The Hexblade",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Circle of the Land",
        "kind": "subclass",
        "level": 3,
        "via": "Desert"
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 7,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 8,
        "via": null
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/blur.webp",
    "wiki": "https://bg3.wiki/wiki/Blur"
  },
  {
    "id": "bolts-of-doom",
    "name": "Bolts of Doom",
    "level": 4,
    "school": "Evocation",
    "desc": "Embrace Kereska's lightning bolts to gain resistance to Lightning damage. Your lightning spells deal additional Lightning damage equal to your proficiency bonus. When you deal spell damage, gain 2 [ See Notes ] Lightning Charges. While attuned to Kereska's lightning you can cast Chain Lightning a...",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/bolts-of-doom.webp",
    "wiki": "https://bg3.wiki/wiki/Bolts_of_Doom"
  },
  {
    "id": "bone-chill",
    "name": "Bone Chill",
    "level": 0,
    "school": "Necromancy",
    "desc": "Prevent the target from healing until your next turn. The target cannot help Downed characters. An undead target receives Disadvantage on Attack Rolls.",
    "cost": "Action",
    "damage": "1d8 Necrotic",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 1,
    "damageMax": 8,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Necrotic"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [
      {
        "level": 5,
        "count": 2,
        "size": 8
      },
      {
        "level": 10,
        "count": 3,
        "size": 8
      }
    ],
    "upcast": null,
    "upcastDice": null,
    "classes": [
      "Sorcerer",
      "Warlock",
      "Wizard",
      "Bard"
    ],
    "subclasses": [
      "Death Domain",
      "Circle of the Spores",
      "Eldritch Knight",
      "Arcane Trickster",
      "College of Lore"
    ],
    "races": [
      "High Elf",
      "High Half-Elf"
    ],
    "availability": [
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Warlock",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Death Domain",
        "kind": "subclass",
        "level": 1,
        "via": "Domain Spell"
      },
      {
        "name": "Circle of the Spores",
        "kind": "subclass",
        "level": 2,
        "via": "Circle Spell"
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      },
      {
        "name": "High Elf",
        "kind": "race",
        "level": 1,
        "via": null
      },
      {
        "name": "High Half-Elf",
        "kind": "race",
        "level": 1,
        "via": null
      }
    ],
    "icon": "icons/spells/bone-chill.webp",
    "wiki": "https://bg3.wiki/wiki/Bone_Chill"
  },
  {
    "id": "bone-shaking-thunder",
    "name": "Bone-shaking Thunder",
    "level": 4,
    "school": "Evocation",
    "desc": "Embrace Kereska's thunder to gain resistance to Thunder damage. Your thunder spells deal additional Thunder damage equal to your proficiency bonus. When you deal spell damage, inflict 2 turns [ See Notes ] of Reverberation upon the target. While attuned to Kereska's thunder you can cast Shatter a...",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/bone-shaking-thunder.webp",
    "wiki": "https://bg3.wiki/wiki/Bone-shaking_Thunder"
  },
  {
    "id": "booming-blade",
    "name": "Booming Blade",
    "level": 0,
    "school": "Evocation",
    "desc": "Strike with your weapon, afflicting your foe with a resonance that hurts them for 1d8 Thunder when they move. This spell can be cast while you are Silenced. Requires proficiency with the equipped weapon",
    "cost": "Action",
    "damage": "1d8 Thunder",
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": 1,
    "damageMax": 8,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Thunder"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": null,
    "upcastDice": null,
    "classes": [
      "Sorcerer",
      "Wizard",
      "Warlock"
    ],
    "subclasses": [
      "Arcane Trickster",
      "Eldritch Knight"
    ],
    "races": [
      "High Elf",
      "High Half-Elf"
    ],
    "availability": [
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Warlock",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "High Elf",
        "kind": "race",
        "level": 1,
        "via": null
      },
      {
        "name": "High Half-Elf",
        "kind": "race",
        "level": 1,
        "via": null
      }
    ],
    "icon": "icons/spells/booming-blade.webp",
    "wiki": "https://bg3.wiki/wiki/Booming_Blade"
  },
  {
    "id": "boon-of-servitude",
    "name": "Boon of Servitude",
    "level": 1,
    "school": "Evocation",
    "desc": "Bask in Ethel's boons. You regain 2d4+Spellcasting Modifier Hit Points each turn, and your Armour Class increased by 2.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/boon-of-servitude.webp",
    "wiki": "https://bg3.wiki/wiki/Boon_of_Servitude"
  },
  {
    "id": "boots-of-dimension-door",
    "name": "Boots of Dimension Door",
    "level": 5,
    "school": "Conjuration",
    "desc": "Cast Dimension Door using your boots.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "100 m (333 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/boots-of-dimension-door.webp",
    "wiki": "https://bg3.wiki/wiki/Boots_of_Dimension_Door"
  },
  {
    "id": "brand-the-weak",
    "name": "Brand the Weak",
    "level": 1,
    "school": "Transmutation",
    "desc": "Expose the weak points of an enemy. They become Vulnerable to Bludgeoning, Slashing, or Piercing damage. This effect lasts 3 turns, or until the target takes damage.",
    "cost": "Bonus Action",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/brand-the-weak.webp",
    "wiki": "https://bg3.wiki/wiki/Brand_the_Weak"
  },
  {
    "id": "branding-smite",
    "name": "Branding Smite",
    "level": 2,
    "school": "Evocation",
    "desc": "Your weapon gleams with astral radiance as you strike and possibly mark your targets with light, preventing it from turning Invisible.",
    "cost": "on hit Bonus Action + Level 2 Spell Slot",
    "damage": "2d6 Radiant",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 2,
    "damageMax": 12,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Radiant"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Deals an additional 1d6 Radiant damage per level.",
    "upcastDice": {
      "count": 1,
      "size": 6
    },
    "classes": [
      "Paladin"
    ],
    "subclasses": [
      "The Hexblade"
    ],
    "races": [],
    "availability": [
      {
        "name": "The Hexblade",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Paladin",
        "kind": "class",
        "level": 5,
        "via": null
      }
    ],
    "icon": "icons/spells/branding-smite.webp",
    "wiki": "https://bg3.wiki/wiki/Branding_Smite"
  },
  {
    "id": "branding-smite-melee",
    "name": "Branding Smite (Melee)",
    "level": 2,
    "school": "Evocation",
    "desc": "Your melee weapon gleams with astral radiance as you strike and possibly mark your targets with light, preventing it from turning Invisible.",
    "cost": "on hit Bonus Action + Level 2 Spell Slot",
    "damage": "2d6 Radiant",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 2,
    "damageMax": 12,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Radiant"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Deals an additional 1d6 Radiant damage per level.",
    "upcastDice": {
      "count": 1,
      "size": 6
    },
    "classes": [],
    "subclasses": [],
    "races": [
      "Zariel Tiefling"
    ],
    "availability": [
      {
        "name": "Zariel Tiefling",
        "kind": "race",
        "level": 5,
        "via": null
      }
    ],
    "icon": "icons/spells/branding-smite-melee.webp",
    "wiki": "https://bg3.wiki/wiki/Branding_Smite_(Melee)"
  },
  {
    "id": "branding-smite-ranged",
    "name": "Branding Smite (Ranged)",
    "level": 2,
    "school": "Evocation",
    "desc": "Your ranged weapon gleams with astral radiance as you strike and possibly mark your targets with light, preventing it from turning Invisible.",
    "cost": "on hit Bonus Action + Level 2 Spell Slot",
    "damage": "2d6 Radiant",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 2,
    "damageMax": 12,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Radiant"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Deals an additional 1d6 Radiant damage per level.",
    "upcastDice": {
      "count": 1,
      "size": 6
    },
    "classes": [],
    "subclasses": [],
    "races": [
      "Zariel Tiefling"
    ],
    "availability": [
      {
        "name": "Zariel Tiefling",
        "kind": "race",
        "level": 5,
        "via": null
      }
    ],
    "icon": "icons/spells/branding-smite-ranged.webp",
    "wiki": "https://bg3.wiki/wiki/Branding_Smite_(Ranged)"
  },
  {
    "id": "bull-s-strength",
    "name": "Bull's Strength",
    "level": 2,
    "school": "Transmutation",
    "desc": "Creature gains Advantage on Strength Checks and its Weight Limit is doubled.",
    "cost": "Action + Level 2 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "When this Spell is cast at 3rd level or higher, you can target an additional creature for each spell slot level above 2nd.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/bull-s-strength.webp",
    "wiki": "https://bg3.wiki/wiki/Bull%27s_Strength"
  },
  {
    "id": "burning-age",
    "name": "Burning Age",
    "level": 3,
    "school": "Transmutation",
    "desc": "Gain a +1 bonus to Attack Rolls and deal an additional 1d4 Fire damage.",
    "cost": "Bonus Action",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/burning-age.webp",
    "wiki": "https://bg3.wiki/wiki/Burning_Age"
  },
  {
    "id": "burning-hands",
    "name": "Burning Hands",
    "level": 1,
    "school": "Evocation",
    "desc": "Each flammable target is hit with 3d6 Fire damage.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": "3d6 Fire",
    "save": "DEX",
    "range": "Self",
    "aoe": "5 m (17 ft) Cone",
    "damageMin": 3,
    "damageMax": 18,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Fire"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Deals an additional 1d6 Fire per level.",
    "upcastDice": {
      "count": 1,
      "size": 6
    },
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "subclasses": [
      "The Fiend",
      "Light Domain",
      "Draconic Bloodline",
      "Arcane Trickster",
      "Eldritch Knight"
    ],
    "races": [
      "Mephistopheles Tiefling"
    ],
    "availability": [
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "The Fiend",
        "kind": "subclass",
        "level": 1,
        "via": null
      },
      {
        "name": "Light Domain",
        "kind": "subclass",
        "level": 1,
        "via": "Domain Spell"
      },
      {
        "name": "Draconic Bloodline",
        "kind": "subclass",
        "level": 1,
        "via": "Red/Fire"
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Mephistopheles Tiefling",
        "kind": "race",
        "level": 3,
        "via": null
      }
    ],
    "icon": "icons/spells/burning-hands.webp",
    "wiki": "https://bg3.wiki/wiki/Burning_Hands"
  },
  {
    "id": "bursting-sinew",
    "name": "Bursting Sinew",
    "level": 0,
    "school": "Necromancy",
    "desc": "Explode a corpse, causing it to impale those around it.",
    "cost": "Action",
    "damage": "1d10 Piercing",
    "save": "DEX",
    "range": "18 m (60 ft)",
    "aoe": "3 m (10 ft) Radius",
    "damageMin": 1,
    "damageMax": 10,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Piercing"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [
      {
        "level": 5,
        "count": 2,
        "size": 10
      },
      {
        "level": 10,
        "count": 3,
        "size": 10
      }
    ],
    "upcast": null,
    "upcastDice": null,
    "classes": [
      "Cleric",
      "Sorcerer",
      "Wizard"
    ],
    "subclasses": [
      "Death Domain",
      "Eldritch Knight",
      "Arcane Trickster"
    ],
    "races": [
      "High Elf",
      "High Half-Elf"
    ],
    "availability": [
      {
        "name": "Cleric",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Death Domain",
        "kind": "subclass",
        "level": 1,
        "via": "Domain Spell"
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "High Elf",
        "kind": "race",
        "level": 1,
        "via": null
      },
      {
        "name": "High Half-Elf",
        "kind": "race",
        "level": 1,
        "via": null
      }
    ],
    "icon": "icons/spells/bursting-sinew.webp",
    "wiki": "https://bg3.wiki/wiki/Bursting_Sinew"
  },
  {
    "id": "call-lightning",
    "name": "Call Lightning",
    "level": 3,
    "school": "Conjuration",
    "desc": "Lightning strikes all targets within the area of effect for 3d10 Lightning damage. Then for 10 turns, you can call down lightning again without expending a spell slot.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": "3d10 Lightning",
    "save": "DEX",
    "range": "18 m (60 ft)",
    "aoe": "2 m (7 ft) Radius",
    "damageMin": 3,
    "damageMax": 30,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Lightning"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "When the spell is cast using a 4th-level spell slot or higher, it deals an additional 1d10 Lightning damage for each spell slot level above 3rd for the initial casting and all granted free casts.",
    "upcastDice": {
      "count": 1,
      "size": 10
    },
    "classes": [
      "Druid",
      "Warlock",
      "Bard"
    ],
    "subclasses": [
      "Tempest Domain",
      "Circle of the Land",
      "Storm Sorcery",
      "College of Lore"
    ],
    "races": [],
    "availability": [
      {
        "name": "Druid",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Tempest Domain",
        "kind": "subclass",
        "level": 5,
        "via": null
      },
      {
        "name": "Circle of the Land",
        "kind": "subclass",
        "level": 5,
        "via": "Coast or Forest"
      },
      {
        "name": "Warlock",
        "kind": "class",
        "level": 5,
        "via": "Pact of the Tome once per long rest"
      },
      {
        "name": "Storm Sorcery",
        "kind": "subclass",
        "level": 6,
        "via": null
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/call-lightning.webp",
    "wiki": "https://bg3.wiki/wiki/Call_Lightning"
  },
  {
    "id": "call-of-the-crustacean",
    "name": "Call of the Crustacean",
    "level": 3,
    "school": "Conjuration",
    "desc": "Conjure an Armoured Crab to fight alongside you. The crab can use Razor Claw.",
    "cost": "Bonus Action + Level 3 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "This spell can be upcast to level 4 once per battle to summon 6 crabs instead of 1.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/call-of-the-crustacean.webp",
    "wiki": "https://bg3.wiki/wiki/Call_of_the_Crustacean"
  },
  {
    "id": "calm-emotions",
    "name": "Calm Emotions",
    "level": 2,
    "school": "Enchantment",
    "desc": "Humanoids can't be Charmed, Frightened, or become enraged.",
    "cost": "Action + Level 2 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": "6 m (20 ft) Radius",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Bard",
      "Cleric"
    ],
    "subclasses": [
      "The Archfey"
    ],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Cleric",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "The Archfey",
        "kind": "subclass",
        "level": 3,
        "via": null
      }
    ],
    "icon": "icons/spells/calm-emotions.webp",
    "wiki": "https://bg3.wiki/wiki/Calm_Emotions"
  },
  {
    "id": "careful-what-you-wish-for",
    "name": "Careful What You Wish For",
    "level": 4,
    "school": "Transmutation",
    "desc": "Polymorph target into a cheese. It reverts to its original form when reduced to 0 hit points. If the cheese's hit points drop to 0, the target reverts to its original form with its original hit points.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/careful-what-you-wish-for.webp",
    "wiki": "https://bg3.wiki/wiki/Careful_What_You_Wish_For"
  },
  {
    "id": "carrion-s-explosive-cloudkill",
    "name": "Carrion's Explosive Cloudkill",
    "level": 5,
    "school": "Necromancy",
    "desc": "Force an undead corpse to explode, wounding nearby creatures and creating a large cloud that deals heavy Poison damage to those lingering within it.",
    "cost": "Action",
    "damage": "4d6 Slashing",
    "save": "DEX",
    "range": "18 m (60 ft)",
    "aoe": "3 m (10 ft) Radius",
    "damageMin": 9,
    "damageMax": 54,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Slashing",
      "Poison"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/carrion-s-explosive-cloudkill.webp",
    "wiki": "https://bg3.wiki/wiki/Carrion%27s_Explosive_Cloudkill"
  },
  {
    "id": "castigate-heartform",
    "name": "Castigate Heartform",
    "level": 4,
    "school": "Illusion",
    "desc": "Curse a creature whose heart you have mapped until they act against their nature.",
    "cost": "Bonus Action",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/castigate-heartform.webp",
    "wiki": "https://bg3.wiki/wiki/Castigate_Heartform"
  },
  {
    "id": "cat-s-grace",
    "name": "Cat's Grace",
    "level": 2,
    "school": "Transmutation",
    "desc": "Creature gains Advantage on Dexterity Checks and only takes half damage from falling.",
    "cost": "Action + Level 2 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "When this Spell is cast at 3rd level or higher, you can target an additional creature for each spell slot level above 2nd.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/cat-s-grace.webp",
    "wiki": "https://bg3.wiki/wiki/Cat%27s_Grace"
  },
  {
    "id": "celestial-haste",
    "name": "Celestial Haste",
    "level": 3,
    "school": "Transmutation",
    "desc": "Gain Hastened.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/celestial-haste.webp",
    "wiki": "https://bg3.wiki/wiki/Celestial_Haste"
  },
  {
    "id": "chain-lightning",
    "name": "Chain Lightning",
    "level": 6,
    "school": "Evocation",
    "desc": "Strike an enemy with lightning. Three more bolts will leap from the target, electrifying as many as three other enemies within range.",
    "cost": "Action + Level 6 Spell Slot",
    "damage": "10d8 Lightning",
    "save": "DEX",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 10,
    "damageMax": 80,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Lightning"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "subclasses": [],
    "races": [],
    "availability": [
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 11,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 11,
        "via": null
      }
    ],
    "icon": "icons/spells/chain-lightning.webp",
    "wiki": "https://bg3.wiki/wiki/Chain_Lightning"
  },
  {
    "id": "charm-person",
    "name": "Charm Person",
    "level": 1,
    "school": "Enchantment",
    "desc": "Charm a humanoid to prevent it from attacking you. You gain Advantage on Charisma Checks in dialogue. Enemies have Advantage on Saving Throws against being Charmed. Condition ends early if you or an ally hurts the target. In higher difficulty modes, the target might accuse you of enchanting them.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Affect an additional target for each spell slot level above 1st.",
    "upcastDice": null,
    "classes": [
      "Bard",
      "Druid",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "subclasses": [
      "Trickery Domain",
      "Arcane Trickster",
      "Eldritch Knight"
    ],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Druid",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Warlock",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Trickery Domain",
        "kind": "subclass",
        "level": 1,
        "via": "Domain Spell"
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 3,
        "via": null
      }
    ],
    "icon": "icons/spells/charm-person.webp",
    "wiki": "https://bg3.wiki/wiki/Charm_Person"
  },
  {
    "id": "cheesy-smell",
    "name": "Cheesy Smell",
    "level": 3,
    "school": "Conjuration",
    "desc": "Create a cloud of gas so pungent it prevents creatures within it from taking actions.",
    "cost": "Action",
    "damage": null,
    "save": "CON",
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/cheesy-smell.webp",
    "wiki": "https://bg3.wiki/wiki/Cheesy_Smell"
  },
  {
    "id": "chromatic-orb",
    "name": "Chromatic Orb",
    "level": 1,
    "school": "Evocation",
    "desc": "Hurl a sphere of energy. It deals 3d8 Thunder damage, or 2d8 Acid, Cold, Fire, Lightning or Poison damage and creates a surface.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Acid",
      "Cold",
      "Fire",
      "Lightning",
      "Poison",
      "Thunder"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level deals an extra 1d8 damage of the chosen type for each spell slot level above 1st.",
    "upcastDice": {
      "count": 1,
      "size": 8
    },
    "classes": [
      "Sorcerer",
      "Wizard",
      "Bard"
    ],
    "subclasses": [
      "Arcane Trickster",
      "Eldritch Knight",
      "College of Lore"
    ],
    "races": [],
    "availability": [
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/chromatic-orb.webp",
    "wiki": "https://bg3.wiki/wiki/Chromatic_Orb"
  },
  {
    "id": "chromatic-orb-acid",
    "name": "Chromatic Orb: Acid",
    "level": 1,
    "school": "Evocation",
    "desc": "Hurl a sphere of energy that deals 2d8 Acid damage and creates an Acid surface.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": "2d8 Acid",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 2,
    "damageMax": 16,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Acid"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level deals an extra 1d8 Acid damage for each spell slot level above 1st.",
    "upcastDice": {
      "count": 1,
      "size": 8
    },
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/chromatic-orb-acid.webp",
    "wiki": "https://bg3.wiki/wiki/Chromatic_Orb:_Acid"
  },
  {
    "id": "chromatic-orb-cold",
    "name": "Chromatic Orb: Cold",
    "level": 1,
    "school": "Evocation",
    "desc": "Hurl a sphere of energy that deals 2d8 Cold damage and creates an Ice surface.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": "2d8 Cold",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 2,
    "damageMax": 16,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Cold"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level deals an extra 1d8 Cold damage for each spell slot level above 1st.",
    "upcastDice": {
      "count": 1,
      "size": 8
    },
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/chromatic-orb-cold.webp",
    "wiki": "https://bg3.wiki/wiki/Chromatic_Orb:_Cold"
  },
  {
    "id": "chromatic-orb-fire",
    "name": "Chromatic Orb: Fire",
    "level": 1,
    "school": "Evocation",
    "desc": "Hurl a sphere of energy that deals 2d8 Fire damage and creates a Fire surface.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": "2d8 Fire",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 2,
    "damageMax": 16,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Fire"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level deals an extra 1d8 Fire damage for each spell slot level above 1st.",
    "upcastDice": {
      "count": 1,
      "size": 8
    },
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/chromatic-orb-fire.webp",
    "wiki": "https://bg3.wiki/wiki/Chromatic_Orb:_Fire"
  },
  {
    "id": "chromatic-orb-lightning",
    "name": "Chromatic Orb: Lightning",
    "level": 1,
    "school": "Evocation",
    "desc": "Hurl a sphere of energy that deals 2d8 Lightning damage and creates an Electrified Water surface.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": "2d8 Lightning",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 2,
    "damageMax": 16,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Lightning"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level deals an extra 1d8 Lightning damage for each spell slot level above 1st.",
    "upcastDice": {
      "count": 1,
      "size": 8
    },
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/chromatic-orb-lightning.webp",
    "wiki": "https://bg3.wiki/wiki/Chromatic_Orb:_Lightning"
  },
  {
    "id": "chromatic-orb-poison",
    "name": "Chromatic Orb: Poison",
    "level": 1,
    "school": "Evocation",
    "desc": "Hurl poisonous energy that damages the target and creates a bubbling surface to Poison creatures.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": "2d8 Poison",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 2,
    "damageMax": 16,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Poison"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level deals an extra 1d8 Poison damage for each spell slot level above 1st.",
    "upcastDice": {
      "count": 1,
      "size": 8
    },
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/chromatic-orb-poison.webp",
    "wiki": "https://bg3.wiki/wiki/Chromatic_Orb:_Poison"
  },
  {
    "id": "chromatic-orb-thunder",
    "name": "Chromatic Orb: Thunder",
    "level": 1,
    "school": "Evocation",
    "desc": "Hurl a sphere of energy that deals 3d8 Thunder damage.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": "3d8 Thunder",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 3,
    "damageMax": 24,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Thunder"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level deals an extra 1d8 Thunder damage for each spell slot level above 1st.",
    "upcastDice": {
      "count": 1,
      "size": 8
    },
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/chromatic-orb-thunder.webp",
    "wiki": "https://bg3.wiki/wiki/Chromatic_Orb:_Thunder"
  },
  {
    "id": "circle-of-death",
    "name": "Circle of Death",
    "level": 6,
    "school": "Necromancy",
    "desc": "Sculpt a massive sphere of entropic energy around a creature. Devastate the target and all surrounding creatures.",
    "cost": "Action + Level 6 Spell Slot",
    "damage": "8d6 Necrotic",
    "save": "CON",
    "range": "18 m (60 ft)",
    "aoe": "9 m (30 ft) Radius",
    "damageMin": 8,
    "damageMax": 48,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Necrotic"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "subclasses": [],
    "races": [],
    "availability": [
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 11,
        "via": null
      },
      {
        "name": "Warlock",
        "kind": "class",
        "level": 11,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 11,
        "via": null
      }
    ],
    "icon": "icons/spells/circle-of-death.webp",
    "wiki": "https://bg3.wiki/wiki/Circle_of_Death"
  },
  {
    "id": "cloud-of-daggers",
    "name": "Cloud of Daggers",
    "level": 2,
    "school": "Conjuration",
    "desc": "Conjure a cloud of spinning daggers that attack anyone inside.",
    "cost": "Action + Level 2 Spell Slot",
    "damage": "4d4 Slashing",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 4,
    "damageMax": 16,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Slashing"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level deals an extra 2d4 Slashing damage for each spell slot level above 2nd.",
    "upcastDice": {
      "count": 2,
      "size": 4
    },
    "classes": [
      "Bard",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "subclasses": [
      "Arcane Trickster",
      "Eldritch Knight"
    ],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Warlock",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 8,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 8,
        "via": null
      }
    ],
    "icon": "icons/spells/cloud-of-daggers.webp",
    "wiki": "https://bg3.wiki/wiki/Cloud_of_Daggers"
  },
  {
    "id": "cloudkill",
    "name": "Cloudkill",
    "level": 5,
    "school": "Conjuration",
    "desc": "Craft a large cloud that inflicts 5d8 Poison damage per turn. You can reposition the cloud every turn. The cloud Heavily Obscures everything within it.",
    "cost": "Action + Level 5 Spell Slot",
    "damage": "5d8 Poison",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 5,
    "damageMax": 40,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Poison"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level deals an extra 1d8 Poison damage for each spell slot level above 5th.",
    "upcastDice": {
      "count": 1,
      "size": 8
    },
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "subclasses": [
      "Circle of the Spores",
      "Circle of the Land",
      "Death Domain"
    ],
    "races": [],
    "availability": [
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 9,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 9,
        "via": null
      },
      {
        "name": "Circle of the Spores",
        "kind": "subclass",
        "level": 9,
        "via": "Circle Spell"
      },
      {
        "name": "Circle of the Land",
        "kind": "subclass",
        "level": 9,
        "via": "Swamp and Underdark"
      },
      {
        "name": "Death Domain",
        "kind": "subclass",
        "level": 9,
        "via": "Domain Spell"
      }
    ],
    "icon": "icons/spells/cloudkill.webp",
    "wiki": "https://bg3.wiki/wiki/Cloudkill"
  },
  {
    "id": "colour-spray",
    "name": "Colour Spray",
    "level": 1,
    "school": "Illusion",
    "desc": "Blind creatures up to a combined 33 Hit Points.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": "5 m (17 ft) Cone",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level increases the combined Hit Point total by 11 for each spell slot level above 1st.",
    "upcastDice": null,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "subclasses": [
      "Arcane Trickster",
      "Eldritch Knight"
    ],
    "races": [],
    "availability": [
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 3,
        "via": null
      }
    ],
    "icon": "icons/spells/colour-spray.webp",
    "wiki": "https://bg3.wiki/wiki/Colour_Spray"
  },
  {
    "id": "command",
    "name": "Command",
    "level": 1,
    "school": "Enchantment",
    "desc": "Command a creature to flee, move closer, freeze, drop to the ground or drop its weapon. The target must succeed on a Wisdom Saving Throw in order to resist the effects. No effect on undead.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Affects an additional target for each spell slot level above 1st.",
    "upcastDice": null,
    "classes": [
      "Cleric",
      "Paladin",
      "Bard"
    ],
    "subclasses": [
      "The Fiend",
      "Knowledge Domain",
      "Oath of the Crown",
      "College of Lore"
    ],
    "races": [],
    "availability": [
      {
        "name": "Cleric",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "The Fiend",
        "kind": "subclass",
        "level": 1,
        "via": null
      },
      {
        "name": "Knowledge Domain",
        "kind": "subclass",
        "level": 1,
        "via": "Domain Spell"
      },
      {
        "name": "Paladin",
        "kind": "class",
        "level": 2,
        "via": null
      },
      {
        "name": "Oath of the Crown",
        "kind": "subclass",
        "level": 3,
        "via": "Oath Spell"
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/command.webp",
    "wiki": "https://bg3.wiki/wiki/Command"
  },
  {
    "id": "command-approach",
    "name": "Command: Approach",
    "level": 1,
    "school": "Enchantment",
    "desc": "Command a creature to move toward you on its turn and do nothing else.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Affects an additional target for each spell slot level above 1st.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/command-approach.webp",
    "wiki": "https://bg3.wiki/wiki/Command:_Approach"
  },
  {
    "id": "command-approach-undead",
    "name": "Command: Approach (Undead)",
    "level": 1,
    "school": "Enchantment",
    "desc": "Command an undead to move towards you, then end their turn.",
    "cost": "Action",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/command-approach-undead.webp",
    "wiki": "https://bg3.wiki/wiki/Command:_Approach_(Undead)"
  },
  {
    "id": "command-drop",
    "name": "Command: Drop",
    "level": 1,
    "school": "Enchantment",
    "desc": "Command a creature to drop its weapon.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Affects an additional target for each spell slot level above 1st.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/command-drop.webp",
    "wiki": "https://bg3.wiki/wiki/Command:_Drop"
  },
  {
    "id": "command-drop-undead",
    "name": "Command: Drop (Undead)",
    "level": 1,
    "school": "Enchantment",
    "desc": "Command an Undead to drop their weapon on its turn and do nothing else.",
    "cost": "Action",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/command-drop-undead.webp",
    "wiki": "https://bg3.wiki/wiki/Command:_Drop_(Undead)"
  },
  {
    "id": "command-flee",
    "name": "Command: Flee",
    "level": 1,
    "school": "Enchantment",
    "desc": "Command a creature to flee from you on its turn and do nothing else.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Affects an additional target for each spell slot level above 1st.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/command-flee.webp",
    "wiki": "https://bg3.wiki/wiki/Command:_Flee"
  },
  {
    "id": "command-flee-undead",
    "name": "Command: Flee (Undead)",
    "level": 1,
    "school": "Enchantment",
    "desc": "Command a creature to flee from you on its turn and do nothing else.",
    "cost": "Action",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/command-flee-undead.webp",
    "wiki": "https://bg3.wiki/wiki/Command:_Flee_(Undead)"
  },
  {
    "id": "command-grovel",
    "name": "Command: Grovel",
    "level": 1,
    "school": "Enchantment",
    "desc": "Command a creature to fall Prone immediately and do nothing else.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Affects an additional target for each spell slot level above 1st.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/command-grovel.webp",
    "wiki": "https://bg3.wiki/wiki/Command:_Grovel"
  },
  {
    "id": "command-grovel-undead",
    "name": "Command: Grovel (Undead)",
    "level": 1,
    "school": "Enchantment",
    "desc": "Command an undead to fall Prone on its turn and do nothing else.",
    "cost": "Action",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/command-grovel-undead.webp",
    "wiki": "https://bg3.wiki/wiki/Command:_Grovel_(Undead)"
  },
  {
    "id": "command-halt",
    "name": "Command: Halt",
    "level": 1,
    "school": "Enchantment",
    "desc": "Command a creature to halt, preventing it from moving or taking any type of action.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Affects an additional target for each spell slot level above 1st.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/command-halt.webp",
    "wiki": "https://bg3.wiki/wiki/Command:_Halt"
  },
  {
    "id": "command-halt-undead",
    "name": "Command: Halt (Undead)",
    "level": 1,
    "school": "Enchantment",
    "desc": "Command a creature to halt, preventing it from moving or taking any type of action.",
    "cost": "Action",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/command-halt-undead.webp",
    "wiki": "https://bg3.wiki/wiki/Command:_Halt_(Undead)"
  },
  {
    "id": "compelled-duel",
    "name": "Compelled Duel",
    "level": 1,
    "school": "Enchantment",
    "desc": "Force an enemy to attack only you, giving it Disadvantage against other targets.",
    "cost": "Bonus Action + Level 1 Spell Slot",
    "damage": null,
    "save": "WIS",
    "range": "9 m (30 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Paladin"
    ],
    "subclasses": [
      "Oath of the Crown"
    ],
    "races": [],
    "availability": [
      {
        "name": "Paladin",
        "kind": "class",
        "level": 2,
        "via": null
      },
      {
        "name": "Oath of the Crown",
        "kind": "subclass",
        "level": 3,
        "via": "Oath Spell"
      }
    ],
    "icon": "icons/spells/compelled-duel.webp",
    "wiki": "https://bg3.wiki/wiki/Compelled_Duel"
  },
  {
    "id": "cone-of-cold",
    "name": "Cone of Cold",
    "level": 5,
    "school": "Evocation",
    "desc": "Make a flurry of frost, crisp air, and condensed snow crystals erupt from your hands.",
    "cost": "Action + Level 5 Spell Slot",
    "damage": "8d8 Cold",
    "save": "CON",
    "range": "Self",
    "aoe": "9 m (30 ft) Cone",
    "damageMin": 8,
    "damageMax": 64,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Cold"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "The damage is increased by 1d8 Cold for each spell slot level above 5th.",
    "upcastDice": null,
    "classes": [
      "Sorcerer",
      "Wizard",
      "Bard"
    ],
    "subclasses": [
      "The Fiend",
      "The Hexblade",
      "Circle of the Land"
    ],
    "races": [],
    "availability": [
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 9,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 9,
        "via": null
      },
      {
        "name": "The Fiend",
        "kind": "subclass",
        "level": 9,
        "via": null
      },
      {
        "name": "The Hexblade",
        "kind": "subclass",
        "level": 9,
        "via": null
      },
      {
        "name": "Circle of the Land",
        "kind": "subclass",
        "level": 9,
        "via": "Arctic"
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/cone-of-cold.webp",
    "wiki": "https://bg3.wiki/wiki/Cone_of_Cold"
  },
  {
    "id": "confusion",
    "name": "Confusion",
    "level": 4,
    "school": "Enchantment",
    "desc": "Befuddle a group of creatures, causing them to attack at random, wander around aimlessly, and occasionally skip turns in the stupor.",
    "cost": "Action + Level 4 Spell Slot",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": "6 m (20 ft) Radius",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Increases the radius of the affected area by 2 m (7 ft) per additional spell slot level.",
    "upcastDice": null,
    "classes": [
      "Bard",
      "Druid",
      "Sorcerer",
      "Wizard"
    ],
    "subclasses": [
      "Knowledge Domain",
      "Circle of the Spores",
      "Circle of the Land"
    ],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 7,
        "via": null
      },
      {
        "name": "Druid",
        "kind": "class",
        "level": 7,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 7,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 7,
        "via": null
      },
      {
        "name": "Knowledge Domain",
        "kind": "subclass",
        "level": 7,
        "via": "Domain Spell"
      },
      {
        "name": "Circle of the Spores",
        "kind": "subclass",
        "level": 7,
        "via": "Circle Spell"
      },
      {
        "name": "Circle of the Land",
        "kind": "subclass",
        "level": 7,
        "via": "Coast"
      }
    ],
    "icon": "icons/spells/confusion.webp",
    "wiki": "https://bg3.wiki/wiki/Confusion"
  },
  {
    "id": "conjure-barrage",
    "name": "Conjure Barrage",
    "level": 3,
    "school": "Conjuration",
    "desc": "Channel your weapon's essence into a destructive, widespread volley.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": "2d8 Weapon",
    "save": "DEX",
    "range": "Self",
    "aoe": "9 m (30 ft) Cone",
    "damageMin": 2,
    "damageMax": 16,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Ranger"
    ],
    "subclasses": [],
    "races": [],
    "availability": [
      {
        "name": "Ranger",
        "kind": "class",
        "level": 9,
        "via": null
      }
    ],
    "icon": "icons/spells/conjure-barrage.webp",
    "wiki": "https://bg3.wiki/wiki/Conjure_Barrage"
  },
  {
    "id": "conjure-barrage-melee-weapon",
    "name": "Conjure Barrage: Melee Weapon",
    "level": 3,
    "school": "Conjuration",
    "desc": "Channel your weapon's essence into a destructive, widespread volley. Requires a melee weapon equipped.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": "2d8 Weapon",
    "save": "DEX",
    "range": "Self",
    "aoe": "9 m (30 ft) Cone",
    "damageMin": 2,
    "damageMax": 16,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/conjure-barrage-melee-weapon.webp",
    "wiki": "https://bg3.wiki/wiki/Conjure_Barrage:_Melee_Weapon"
  },
  {
    "id": "conjure-barrage-ranged-weapon",
    "name": "Conjure Barrage: Ranged Weapon",
    "level": 3,
    "school": "Conjuration",
    "desc": "Channel your weapon's essence into a destructive, widespread volley. Requires a ranged weapon equipped.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": "2d8 Weapon",
    "save": "DEX",
    "range": "Self",
    "aoe": "9 m (30 ft) Cone",
    "damageMin": 2,
    "damageMax": 16,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/conjure-barrage-ranged-weapon.webp",
    "wiki": "https://bg3.wiki/wiki/Conjure_Barrage:_Ranged_Weapon"
  },
  {
    "id": "conjure-elemental",
    "name": "Conjure Elemental",
    "level": 5,
    "school": "Conjuration",
    "desc": "Bend the barrier between the Planes until they disgorge an elemental ally to follow and fight for you.",
    "cost": "Action + Level 5 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Piercing",
      "Slashing",
      "Bludgeoning",
      "Fire",
      "Lightning",
      "Cold",
      "Thunder"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "At level 6, the spellcaster can summon an Air Myrmidon, Earth Myrmidon, Fire Myrmidon, or Water Myrmidon.",
    "upcastDice": null,
    "classes": [
      "Wizard",
      "Druid",
      "Bard"
    ],
    "subclasses": [
      "Circle of the Land"
    ],
    "races": [],
    "availability": [
      {
        "name": "Wizard",
        "kind": "class",
        "level": 9,
        "via": null
      },
      {
        "name": "Druid",
        "kind": "class",
        "level": 9,
        "via": null
      },
      {
        "name": "Circle of the Land",
        "kind": "subclass",
        "level": 9,
        "via": "Coast and Mountain"
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/conjure-elemental.webp",
    "wiki": "https://bg3.wiki/wiki/Conjure_Elemental"
  },
  {
    "id": "conjure-elemental-air-elemental",
    "name": "Conjure Elemental: Air Elemental",
    "level": 5,
    "school": "Conjuration",
    "desc": "The air elemental can use Primordial Gales, Gushing Air, and can Shock your foes.",
    "cost": "Action + Level 5 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/conjure-elemental-air-elemental.webp",
    "wiki": "https://bg3.wiki/wiki/Conjure_Elemental:_Air_Elemental"
  },
  {
    "id": "conjure-elemental-air-myrmidon",
    "name": "Conjure Elemental: Air Myrmidon",
    "level": 6,
    "school": "Conjuration",
    "desc": "The myrmidon can cast Invisibility, Electrified Flail, and Raging Vortex.",
    "cost": "Action + Level 6 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/conjure-elemental-air-myrmidon.webp",
    "wiki": "https://bg3.wiki/wiki/Conjure_Elemental:_Air_Myrmidon"
  },
  {
    "id": "conjure-elemental-earth-elemental",
    "name": "Conjure Elemental: Earth Elemental",
    "level": 5,
    "school": "Conjuration",
    "desc": "The earth elemental can use Seismic Strike, Soil-Clogged Slam, and can create sludgy mud surfaces while walloping your foes.",
    "cost": "Action + Level 5 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/conjure-elemental-earth-elemental.webp",
    "wiki": "https://bg3.wiki/wiki/Conjure_Elemental:_Earth_Elemental"
  },
  {
    "id": "conjure-elemental-earth-myrmidon",
    "name": "Conjure Elemental: Earth Myrmidon",
    "level": 6,
    "school": "Conjuration",
    "desc": "The myrmidon can cast Muck to Metal, Sludgy Sling, and Burrow (Earth Myrmidon).",
    "cost": "Action + Level 6 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/conjure-elemental-earth-myrmidon.webp",
    "wiki": "https://bg3.wiki/wiki/Conjure_Elemental:_Earth_Myrmidon"
  },
  {
    "id": "conjure-elemental-fire-elemental",
    "name": "Conjure Elemental: Fire Elemental",
    "level": 5,
    "school": "Conjuration",
    "desc": "The fire elemental can use Smouldering Touch, Erupting Cinder, and can make your foes Burn.",
    "cost": "Action + Level 5 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/conjure-elemental-fire-elemental.webp",
    "wiki": "https://bg3.wiki/wiki/Conjure_Elemental:_Fire_Elemental"
  },
  {
    "id": "conjure-elemental-fire-myrmidon",
    "name": "Conjure Elemental: Fire Myrmidon",
    "level": 6,
    "school": "Conjuration",
    "desc": "The myrmidon can cast Scorching Strike, Myrmidon's Immolation, and Cinderous Swipe.",
    "cost": "Action + Level 6 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/conjure-elemental-fire-myrmidon.webp",
    "wiki": "https://bg3.wiki/wiki/Conjure_Elemental:_Fire_Myrmidon"
  },
  {
    "id": "conjure-elemental-water-elemental",
    "name": "Conjure Elemental: Water Elemental",
    "level": 5,
    "school": "Conjuration",
    "desc": "The water elemental can use Winter's Breath, Slam, and can mete out cold punishment upon foes with its fists.",
    "cost": "Action + Level 5 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/conjure-elemental-water-elemental.webp",
    "wiki": "https://bg3.wiki/wiki/Conjure_Elemental:_Water_Elemental"
  },
  {
    "id": "conjure-elemental-water-myrmidon",
    "name": "Conjure Elemental: Water Myrmidon",
    "level": 6,
    "school": "Conjuration",
    "desc": "The myrmidon can cast Hiemal Strike, Healing Vapours, and Explosive Icicle.",
    "cost": "Action + Level 6 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/conjure-elemental-water-myrmidon.webp",
    "wiki": "https://bg3.wiki/wiki/Conjure_Elemental:_Water_Myrmidon"
  },
  {
    "id": "conjure-minor-elemental",
    "name": "Conjure Minor Elemental",
    "level": 4,
    "school": "Conjuration",
    "desc": "Conjure a minor elemental to fight alongside you.",
    "cost": "Action + Level 4 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Slashing",
      "Bludgeoning",
      "Fire",
      "Cold"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Wizard",
      "Druid"
    ],
    "subclasses": [
      "Circle of the Land"
    ],
    "races": [],
    "availability": [
      {
        "name": "Wizard",
        "kind": "class",
        "level": 7,
        "via": null
      },
      {
        "name": "Druid",
        "kind": "class",
        "level": 7,
        "via": null
      },
      {
        "name": "Circle of the Land",
        "kind": "subclass",
        "level": 7,
        "via": "Arctic and Forest"
      }
    ],
    "icon": "icons/spells/conjure-minor-elemental.webp",
    "wiki": "https://bg3.wiki/wiki/Conjure_Minor_Elemental"
  },
  {
    "id": "conjure-minor-elemental-azer",
    "name": "Conjure Minor Elemental: Azer",
    "level": 4,
    "school": "Conjuration",
    "desc": "Conjure an azer from the Plane of Fire. It deals both Bludgeoning and Fire damage with its warhammer, and can Overheat. It carries the Azer Warhammer.",
    "cost": "Action + Level 4 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/conjure-minor-elemental-azer.webp",
    "wiki": "https://bg3.wiki/wiki/Conjure_Minor_Elemental:_Azer"
  },
  {
    "id": "conjure-minor-elemental-ice-mephits",
    "name": "Conjure Minor Elemental: Ice Mephits",
    "level": 4,
    "school": "Conjuration",
    "desc": "Conjure two ice mephits from the Elemental Chaos. They can Hurl and Exhale ice, and Explode when they die.",
    "cost": "Action + Level 4 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/conjure-minor-elemental-ice-mephits.webp",
    "wiki": "https://bg3.wiki/wiki/Conjure_Minor_Elemental:_Ice_Mephits"
  },
  {
    "id": "conjure-minor-elemental-mud-mephits",
    "name": "Conjure Minor Elemental: Mud Mephits",
    "level": 4,
    "school": "Conjuration",
    "desc": "Conjure two mud mephits from the Elemental Chaos. They can cast Mud Breath and Explode when they die.",
    "cost": "Action + Level 4 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/conjure-minor-elemental-mud-mephits.webp",
    "wiki": "https://bg3.wiki/wiki/Conjure_Minor_Elemental:_Mud_Mephits"
  },
  {
    "id": "conjure-shadow-lantern-wraith",
    "name": "Conjure Shadow Lantern Wraith",
    "level": 6,
    "school": "Necromancy",
    "desc": "Pull an undead creature from the depths of the Shadow Lantern's depraved magic to join your side in combat.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "3 m (10 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/conjure-shadow-lantern-wraith.webp",
    "wiki": "https://bg3.wiki/wiki/Conjure_Shadow_Lantern_Wraith"
  },
  {
    "id": "conjure-us",
    "name": "Conjure Us",
    "level": 0,
    "school": "Conjuration",
    "desc": "Conjure Us to fight by your side.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": null,
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/conjure-us.webp",
    "wiki": "https://bg3.wiki/wiki/Conjure_Us"
  },
  {
    "id": "conjure-woodland-being",
    "name": "Conjure Woodland Being",
    "level": 4,
    "school": "Conjuration",
    "desc": "Conjure a dryad to fight alongside you. She can use Nature's Step, Entangle enemies, and Summon a wood woad.",
    "cost": "Action + Level 4 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Bludgeoning",
      "Piercing"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Druid"
    ],
    "subclasses": [],
    "races": [],
    "availability": [
      {
        "name": "Druid",
        "kind": "class",
        "level": 7,
        "via": null
      }
    ],
    "icon": "icons/spells/conjure-woodland-being.webp",
    "wiki": "https://bg3.wiki/wiki/Conjure_Woodland_Being"
  },
  {
    "id": "contagion",
    "name": "Contagion",
    "level": 5,
    "school": "Necromancy",
    "desc": "Poison a target and possibly afflict them with a disease of your choice. Once infected, the target will roll a Constitution Saving Throw each turn. If it accumulates 3 successes, it recovers. If it accumulates 3 failures, it contracts the disease chosen by the spellcaster.",
    "cost": "Action + Level 5 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Cleric",
      "Druid",
      "Bard"
    ],
    "subclasses": [
      "Circle of the Spores",
      "Circle of the Land",
      "Death Domain"
    ],
    "races": [],
    "availability": [
      {
        "name": "Cleric",
        "kind": "class",
        "level": 9,
        "via": null
      },
      {
        "name": "Druid",
        "kind": "class",
        "level": 9,
        "via": null
      },
      {
        "name": "Circle of the Spores",
        "kind": "subclass",
        "level": 9,
        "via": "Circle Spell"
      },
      {
        "name": "Circle of the Land",
        "kind": "subclass",
        "level": 9,
        "via": "Arctic/Forest/Underdark"
      },
      {
        "name": "Death Domain",
        "kind": "subclass",
        "level": 9,
        "via": "Domain Spell"
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/contagion.webp",
    "wiki": "https://bg3.wiki/wiki/Contagion"
  },
  {
    "id": "contagion-blinding-sickness",
    "name": "Contagion: Blinding Sickness",
    "level": 5,
    "school": "Necromancy",
    "desc": "The target receives Disadvantage on Wisdom Ability Checks and Saving Throws, and is Blinded. Hot fingers of pain push through the creature's eyes, impairing its Wisdom.",
    "cost": "Action + Level 5 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/contagion-blinding-sickness.webp",
    "wiki": "https://bg3.wiki/wiki/Contagion:_Blinding_Sickness"
  },
  {
    "id": "contagion-filth-fever",
    "name": "Contagion: Filth Fever",
    "level": 5,
    "school": "Necromancy",
    "desc": "The target receives Disadvantage on Strength Ability Checks, Saving Throws, and Attack Rolls that use Strength. Fever squeezes huge drops of thick oily sweat from the creature's pores, impairing its Strength.",
    "cost": "Action + Level 5 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/contagion-filth-fever.webp",
    "wiki": "https://bg3.wiki/wiki/Contagion:_Filth_Fever"
  },
  {
    "id": "contagion-flesh-rot",
    "name": "Contagion: Flesh Rot",
    "level": 5,
    "school": "Necromancy",
    "desc": "The target receives Disadvantage on Charisma Ability Checks, and is afflicted with Vulnerability to all damage. The creature begins to mortify, becoming a festering flesh sack propped up by bones, impairing its Charisma.",
    "cost": "Action + Level 5 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/contagion-flesh-rot.webp",
    "wiki": "https://bg3.wiki/wiki/Contagion:_Flesh_Rot"
  },
  {
    "id": "contagion-mindfire",
    "name": "Contagion: Mindfire",
    "level": 5,
    "school": "Necromancy",
    "desc": "The target receives Disadvantage on Intelligence Ability Checks and Saving Throws, and is Befuddled. The creature's brain begins to cook in a rancid stew of hot sour blood, impairing its Intelligence.",
    "cost": "Action + Level 5 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/contagion-mindfire.webp",
    "wiki": "https://bg3.wiki/wiki/Contagion:_Mindfire"
  },
  {
    "id": "contagion-seizure",
    "name": "Contagion: Seizure",
    "level": 5,
    "school": "Necromancy",
    "desc": "The target receives Disadvantage on Dexterity Ability Checks, Saving Throws, and Attack Rolls. Spasms rack the creature, impairing its Dexterity.",
    "cost": "Action + Level 5 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/contagion-seizure.webp",
    "wiki": "https://bg3.wiki/wiki/Contagion:_Seizure"
  },
  {
    "id": "contagion-slimy-doom",
    "name": "Contagion: Slimy Doom",
    "level": 5,
    "school": "Necromancy",
    "desc": "The target receives Disadvantage on Constitution Ability Checks and Saving Throws. Whenever they are hit, they get Stunned. Fever squeezes huge drops of thick oily sweat from the creature's pores, impairing its Constitution.",
    "cost": "Action + Level 5 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/contagion-slimy-doom.webp",
    "wiki": "https://bg3.wiki/wiki/Contagion:_Slimy_Doom"
  },
  {
    "id": "corrosive-age",
    "name": "Corrosive Age",
    "level": 3,
    "school": "Transmutation",
    "desc": "Gain a +1 bonus to Attack Rolls and deal an additional 1d4 Acid damage.",
    "cost": "Bonus Action",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/corrosive-age.webp",
    "wiki": "https://bg3.wiki/wiki/Corrosive_Age"
  },
  {
    "id": "cosmic-omen-ability-check",
    "name": "Cosmic Omen: Ability Check",
    "level": 0,
    "school": null,
    "desc": "Give your allies a +1d6 bonus to Ability Checks.",
    "cost": "Cosmic Omen",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": null,
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/cosmic-omen-ability-check.webp",
    "wiki": "https://bg3.wiki/wiki/Cosmic_Omen:_Ability_Check"
  },
  {
    "id": "counterspell",
    "name": "Counterspell",
    "level": 3,
    "school": "Abjuration",
    "desc": "Try to stop a spell being cast. If it is higher level than the spell slot you used to Counterspell, you must make a check using your spellcasting ability to prevent it. The check's difficulty is equal to 10 plus the level of the spell you are trying to counter. This spell can be cast while you ar...",
    "cost": "Reaction + Level 3 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Counterspell can be upcast to counter spells of higher levels without requiring a check.",
    "upcastDice": null,
    "classes": [
      "Sorcerer",
      "Warlock",
      "Wizard",
      "Bard"
    ],
    "subclasses": [
      "College of Lore"
    ],
    "races": [],
    "availability": [
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Warlock",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/counterspell.webp",
    "wiki": "https://bg3.wiki/wiki/Counterspell"
  },
  {
    "id": "create-undead",
    "name": "Create Undead",
    "level": 6,
    "school": "Necromancy",
    "desc": "Create a corpse as a heinous mummy that fights by your side. The target must be a Medium or Small corpse.",
    "cost": "Action + Level 6 Spell Slot",
    "damage": null,
    "save": null,
    "range": "3 m (10 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Slashing",
      "Bludgeoning",
      "Necrotic"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Cleric",
      "Warlock",
      "Wizard"
    ],
    "subclasses": [],
    "races": [],
    "availability": [
      {
        "name": "Cleric",
        "kind": "class",
        "level": 11,
        "via": null
      },
      {
        "name": "Warlock",
        "kind": "class",
        "level": 11,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 11,
        "via": null
      }
    ],
    "icon": "icons/spells/create-undead.webp",
    "wiki": "https://bg3.wiki/wiki/Create_Undead"
  },
  {
    "id": "create-water",
    "name": "Create Water",
    "level": 1,
    "school": "Transmutation",
    "desc": "Call forth rain. It extinguishes exposed flames and forms a Water surface.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "9 m (30 ft)",
    "aoe": "4 m (13 ft) Radius",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "When the spell is cast a 2nd Level or higher, the area that you can create water increases by 2 m (7 ft) for each spell slot level above 1st.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/create-water.webp",
    "wiki": "https://bg3.wiki/wiki/Create_Water"
  },
  {
    "id": "create-water-variant",
    "name": "Create Water (variant)",
    "level": 1,
    "school": "Transmutation",
    "desc": "Call forth rain. It extinguishes exposed flames and forms a Water surface.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "9 m (30 ft)",
    "aoe": "2 m (7 ft) Radius",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/create-water-variant.webp",
    "wiki": "https://bg3.wiki/wiki/Create_Water_(variant)"
  },
  {
    "id": "create-or-destroy-water",
    "name": "Create or Destroy Water",
    "level": 1,
    "school": "Transmutation",
    "desc": "Choose to call forth rain or destroy a water-based surface.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "9 m (30 ft)",
    "aoe": "4 m (13 ft) Radius",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "When the spell is cast a 2nd Level or higher, the area in which the caster can create or destroy water increases by 2 m (7 ft) for each spell slot level above 1st.",
    "upcastDice": null,
    "classes": [
      "Cleric",
      "Druid"
    ],
    "subclasses": [
      "Conjuration School",
      "Storm Sorcery"
    ],
    "races": [],
    "availability": [
      {
        "name": "Cleric",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Druid",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Conjuration School",
        "kind": "subclass",
        "level": 2,
        "via": "Minor Conjuration"
      },
      {
        "name": "Storm Sorcery",
        "kind": "subclass",
        "level": 6,
        "via": "Storm Spell"
      }
    ],
    "icon": "icons/spells/create-or-destroy-water.webp",
    "wiki": "https://bg3.wiki/wiki/Create_or_Destroy_Water"
  },
  {
    "id": "crown-of-madness",
    "name": "Crown of Madness",
    "level": 2,
    "school": "Enchantment",
    "desc": "Instil madness in a humanoid enemy, making them attack the creature closest to them (other than you), even if it's allied. At the end of each turn, the affected creature can make a Wisdom Saving Throw to end this condition.",
    "cost": "Action + Level 2 Spell Slot",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Bard",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "subclasses": [
      "Oathbreaker",
      "Arcane Trickster",
      "Eldritch Knight"
    ],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Warlock",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Oathbreaker",
        "kind": "subclass",
        "level": 5,
        "via": "Oath Spell"
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 7,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 8,
        "via": null
      }
    ],
    "icon": "icons/spells/crown-of-madness.webp",
    "wiki": "https://bg3.wiki/wiki/Crown_of_Madness"
  },
  {
    "id": "crusader-s-mantle",
    "name": "Crusader's Mantle",
    "level": 3,
    "school": "Evocation",
    "desc": "Radiate a holy power that emboldens you and nearby allies. Their weapon attacks deal an additional 1d4 Radiant damage.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": "1d4 Radiant",
    "save": null,
    "range": "Self",
    "aoe": "9 m (30 ft) Radius",
    "damageMin": 1,
    "damageMax": 4,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Radiant"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Paladin",
      "Bard"
    ],
    "subclasses": [
      "War Domain",
      "College of Lore",
      "Oath of the Crown"
    ],
    "races": [],
    "availability": [
      {
        "name": "War Domain",
        "kind": "subclass",
        "level": 5,
        "via": "Domain Spell"
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Paladin",
        "kind": "class",
        "level": 9,
        "via": null
      },
      {
        "name": "Oath of the Crown",
        "kind": "subclass",
        "level": 9,
        "via": "Oath Spell"
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/crusader-s-mantle.webp",
    "wiki": "https://bg3.wiki/wiki/Crusader%27s_Mantle"
  },
  {
    "id": "cure-wounds",
    "name": "Cure Wounds",
    "level": 1,
    "school": "Evocation",
    "desc": "Heal a creature you can touch. No effect on undead and constructs.",
    "cost": null,
    "damage": "1d8",
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Heals an additional 1d8 Hit Points for each spell slot level above 1st.",
    "upcastDice": {
      "count": 1,
      "size": 8
    },
    "classes": [
      "Bard",
      "Cleric",
      "Druid",
      "Paladin",
      "Ranger"
    ],
    "subclasses": [
      "Life Domain"
    ],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Cleric",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Druid",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Life Domain",
        "kind": "subclass",
        "level": 1,
        "via": "Domain Spell"
      },
      {
        "name": "Paladin",
        "kind": "class",
        "level": 2,
        "via": null
      },
      {
        "name": "Ranger",
        "kind": "class",
        "level": 2,
        "via": null
      }
    ],
    "icon": "icons/spells/cure-wounds.webp",
    "wiki": "https://bg3.wiki/wiki/Cure_Wounds"
  },
  {
    "id": "curriculum-of-strategy-artistry-of-war",
    "name": "Curriculum of Strategy: Artistry of War",
    "level": 5,
    "school": "Evocation",
    "desc": "Summon the apparitions of 6 master strategists. Each apparition strikes a target of your choosing, dealing 2d6 + 6 Force damage (for a total of 12d6 + 36 Force).",
    "cost": "Action + Level 5 Spell Slot",
    "damage": "2d6 + 6 Force",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 48,
    "damageMax": 108,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Force"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/curriculum-of-strategy-artistry-of-war.webp",
    "wiki": "https://bg3.wiki/wiki/Curriculum_of_Strategy:_Artistry_of_War"
  },
  {
    "id": "curse-of-regret",
    "name": "Curse of Regret",
    "level": 1,
    "school": "Enchantment",
    "desc": "Curse a creature with regret. It takes 4~10 Psychic damage every turn, and becomes vulnerable to Psychic damage.",
    "cost": "Action",
    "damage": "1d4 + 1 Psychic",
    "save": "CHA",
    "range": "16 m (53 ft)",
    "aoe": "3 m (10 ft) Radius",
    "damageMin": 2,
    "damageMax": 5,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Psychic"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/curse-of-regret.webp",
    "wiki": "https://bg3.wiki/wiki/Curse_of_Regret"
  },
  {
    "id": "curse-of-terror",
    "name": "Curse of Terror",
    "level": 0,
    "school": "Enchantment",
    "desc": "Strike terror into a creature's heart and Frighten it.",
    "cost": "Bonus Action",
    "damage": "2d4 + 1 Psychic",
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 3,
    "damageMax": 9,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Psychic"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": null,
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/curse-of-terror.webp",
    "wiki": "https://bg3.wiki/wiki/Curse_of_Terror"
  },
  {
    "id": "dancing-lights",
    "name": "Dancing Lights",
    "level": 0,
    "school": "Evocation",
    "desc": "Illuminate a 9 m (30 ft) radius.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": "9 m (30 ft) Radius",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": null,
    "upcastDice": null,
    "classes": [
      "Bard",
      "Sorcerer",
      "Wizard",
      "Druid"
    ],
    "subclasses": [
      "Eldritch Knight",
      "Arcane Trickster"
    ],
    "races": [
      "High Elf",
      "High Half-Elf",
      "Drow Half-Elf"
    ],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Druid",
        "kind": "class",
        "level": 5,
        "via": "Wild Shape: Deep Rothé"
      },
      {
        "name": "High Elf",
        "kind": "race",
        "level": 1,
        "via": null
      },
      {
        "name": "High Half-Elf",
        "kind": "race",
        "level": 1,
        "via": null
      },
      {
        "name": "Drow Half-Elf",
        "kind": "race",
        "level": 1,
        "via": null
      }
    ],
    "icon": "icons/spells/dancing-lights.webp",
    "wiki": "https://bg3.wiki/wiki/Dancing_Lights"
  },
  {
    "id": "danse-macabre",
    "name": "Danse Macabre",
    "level": 5,
    "school": "Necromancy",
    "desc": "Create 4 ghouls that fight alongside you.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "9 m (30 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/danse-macabre.webp",
    "wiki": "https://bg3.wiki/wiki/Danse_Macabre"
  },
  {
    "id": "darkness",
    "name": "Darkness",
    "level": 2,
    "school": "Evocation",
    "desc": "Create a cloud of magical darkness that Heavily Obscures and inflicts Blind to creatures within. Creatures cannot make ranged attacks into or out of it.",
    "cost": "Action + Level 2 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Sorcerer",
      "Warlock",
      "Wizard",
      "Bard"
    ],
    "subclasses": [
      "Circle of the Land",
      "Shadow Magic",
      "Oathbreaker",
      "College of Lore",
      "Eldritch Knight",
      "Arcane Trickster"
    ],
    "races": [
      "Drow Half-Elf",
      "Asmodeus Tiefling"
    ],
    "availability": [
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Warlock",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Circle of the Land",
        "kind": "subclass",
        "level": 3,
        "via": "Swamp"
      },
      {
        "name": "Shadow Magic",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Oathbreaker",
        "kind": "subclass",
        "level": 5,
        "via": "Oath Spell"
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 7,
        "via": null
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 8,
        "via": null
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      },
      {
        "name": "Drow Half-Elf",
        "kind": "race",
        "level": 5,
        "via": null
      },
      {
        "name": "Asmodeus Tiefling",
        "kind": "race",
        "level": 5,
        "via": null
      }
    ],
    "icon": "icons/spells/darkness.webp",
    "wiki": "https://bg3.wiki/wiki/Darkness"
  },
  {
    "id": "darkvision-spell",
    "name": "Darkvision (spell)",
    "level": 2,
    "school": "Transmutation",
    "desc": "Grant a creature the ability to see in the dark out to a range of {12 m (40 ft).",
    "cost": "Action + Level 2 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Druid",
      "Sorcerer",
      "Wizard",
      "Ranger",
      "Bard"
    ],
    "subclasses": [
      "College of Lore",
      "Arcane Trickster",
      "Eldritch Knight"
    ],
    "races": [],
    "availability": [
      {
        "name": "Druid",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Ranger",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 8,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 8,
        "via": null
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/darkvision-spell.webp",
    "wiki": "https://bg3.wiki/wiki/Darkvision_(spell)"
  },
  {
    "id": "daylight",
    "name": "Daylight",
    "level": 3,
    "school": "Evocation",
    "desc": "Enchant an item to shine like the sun or summon a sphere of sunlight that dispels all darkness around it. Items can only be enchanted with Daylight for 20 turns.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Cleric",
      "Druid",
      "Sorcerer",
      "Ranger",
      "Paladin",
      "Bard"
    ],
    "subclasses": [
      "Light Domain",
      "Circle of the Land",
      "College of Lore"
    ],
    "races": [],
    "availability": [
      {
        "name": "Cleric",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Druid",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Light Domain",
        "kind": "subclass",
        "level": 5,
        "via": "Domain Spell"
      },
      {
        "name": "Circle of the Land",
        "kind": "subclass",
        "level": 5,
        "via": "Grassland"
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Ranger",
        "kind": "class",
        "level": 9,
        "via": null
      },
      {
        "name": "Paladin",
        "kind": "class",
        "level": 9,
        "via": null
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/daylight.webp",
    "wiki": "https://bg3.wiki/wiki/Daylight"
  },
  {
    "id": "daylight-enchant-item",
    "name": "Daylight: Enchant Item",
    "level": 3,
    "school": "Evocation",
    "desc": "Enchant an item or weapon to shine with the light of the sun and dispel all darkness around it. Target must have a weapon in its main hand.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": "15 m (50 ft) Radius",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/daylight-enchant-item.webp",
    "wiki": "https://bg3.wiki/wiki/Daylight:_Enchant_Item"
  },
  {
    "id": "daylight-sphere",
    "name": "Daylight: Sphere",
    "level": 3,
    "school": "Evocation",
    "desc": "Summon a sphere of sunlight that dispels all darkness around it. The sphere cannot be moved.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": "15 m (50 ft) Radius",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/daylight-sphere.webp",
    "wiki": "https://bg3.wiki/wiki/Daylight:_Sphere"
  },
  {
    "id": "deadlier-than-arsenic",
    "name": "Deadlier than Arsenic",
    "level": 4,
    "school": "Evocation",
    "desc": "Embrace Kereska's poison to gain resistance to Poison damage. Your poison spells deal additional Poison damage equal to your proficiency bonus. When you deal spell damage, inflict 2 turns [ See Notes ] of Poisoned upon the target. While attuned to Kereska's poison you can cast Cloudkill and Ray o...",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/deadlier-than-arsenic.webp",
    "wiki": "https://bg3.wiki/wiki/Deadlier_than_Arsenic"
  },
  {
    "id": "death-ward",
    "name": "Death Ward",
    "level": 4,
    "school": "Abjuration",
    "desc": "Protect a creature from death. The next time damage would reduce it to 0 Hit Points, it remains conscious with 1 Hit Point left.",
    "cost": "Action + Level 4 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Cleric",
      "Bard"
    ],
    "subclasses": [
      "Life Domain",
      "Death Domain"
    ],
    "races": [],
    "availability": [
      {
        "name": "Cleric",
        "kind": "class",
        "level": 7,
        "via": null
      },
      {
        "name": "Life Domain",
        "kind": "subclass",
        "level": 7,
        "via": "Domain Spell"
      },
      {
        "name": "Death Domain",
        "kind": "subclass",
        "level": 7,
        "via": "Domain Spell"
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/death-ward.webp",
    "wiki": "https://bg3.wiki/wiki/Death_Ward"
  },
  {
    "id": "destroy-water",
    "name": "Destroy Water",
    "level": 1,
    "school": "Transmutation",
    "desc": "Cause water-based surfaces (such as Water, Steam Cloud, Ice, Blood and Simple Toxin) to vanish.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "9 m (30 ft)",
    "aoe": "4 m (13 ft) Radius",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "When the spell is cast a 2nd Level or higher, the area of water destroyed increases by 2 m (7 ft) for each spell slot level above 1st.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/destroy-water.webp",
    "wiki": "https://bg3.wiki/wiki/Destroy_Water"
  },
  {
    "id": "destructive-wave",
    "name": "Destructive Wave",
    "level": 5,
    "school": "Evocation",
    "desc": "Create a shockwave of either divine or malevolent thunder that damages nearby enemies and possibly knocks them Prone.",
    "cost": "Action + Level 5 Spell Slot",
    "damage": "5d6 Thunder",
    "save": "CON",
    "range": "9 m (30 ft)",
    "aoe": null,
    "damageMin": 10,
    "damageMax": 60,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Thunder",
      "Radiant",
      "Necrotic"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [
      "Tempest Domain",
      "Light Domain"
    ],
    "races": [],
    "availability": [
      {
        "name": "Tempest Domain",
        "kind": "subclass",
        "level": 9,
        "via": "Domain Spell"
      },
      {
        "name": "Light Domain",
        "kind": "subclass",
        "level": 9,
        "via": "Domain Spell"
      }
    ],
    "icon": "icons/spells/destructive-wave.webp",
    "wiki": "https://bg3.wiki/wiki/Destructive_Wave"
  },
  {
    "id": "destructive-wave-necrotic",
    "name": "Destructive Wave: Necrotic",
    "level": 5,
    "school": "Evocation",
    "desc": "Emit a shockwave of malevolent thunder that damages nearby enemies and possibly knocks them Prone.",
    "cost": "Action + Level 5 Spell Slot",
    "damage": "5d6 Thunder",
    "save": "CON",
    "range": "9 m (30 ft)",
    "aoe": null,
    "damageMin": 10,
    "damageMax": 60,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Thunder",
      "Necrotic"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/destructive-wave-necrotic.webp",
    "wiki": "https://bg3.wiki/wiki/Destructive_Wave:_Necrotic"
  },
  {
    "id": "destructive-wave-radiant",
    "name": "Destructive Wave: Radiant",
    "level": 5,
    "school": "Evocation",
    "desc": "Emit a shockwave of divine thunder that damages nearby enemies and possibly knocks them Prone.",
    "cost": "Action + Level 5 Spell Slot",
    "damage": "5d6 Thunder",
    "save": "CON",
    "range": "9 m (30 ft)",
    "aoe": null,
    "damageMin": 10,
    "damageMax": 60,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Thunder",
      "Radiant"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/destructive-wave-radiant.webp",
    "wiki": "https://bg3.wiki/wiki/Destructive_Wave:_Radiant"
  },
  {
    "id": "detect-thoughts",
    "name": "Detect Thoughts",
    "level": 2,
    "school": "Divination",
    "desc": "Focus your mind to read the thoughts of certain creatures while talking to them.",
    "cost": "Action + Level 2 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Bard",
      "Sorcerer",
      "Wizard"
    ],
    "subclasses": [
      "The Great Old One",
      "Circle of the Spores",
      "Arcane Trickster",
      "Eldritch Knight"
    ],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "The Great Old One",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Circle of the Spores",
        "kind": "subclass",
        "level": 3,
        "via": "Circle Spell"
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 8,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 8,
        "via": null
      }
    ],
    "icon": "icons/spells/detect-thoughts.webp",
    "wiki": "https://bg3.wiki/wiki/Detect_Thoughts"
  },
  {
    "id": "dethrone",
    "name": "Dethrone",
    "level": 5,
    "school": "Necromancy",
    "desc": "Shred a foe's very essence by pulling on strands of the Weave.",
    "cost": "Action + Level 5 Spell Slot",
    "damage": "10d6 + 20 Necrotic",
    "save": "CON",
    "range": "30 m (100 ft)",
    "aoe": null,
    "damageMin": 30,
    "damageMax": 80,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Necrotic"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/dethrone.webp",
    "wiki": "https://bg3.wiki/wiki/Dethrone"
  },
  {
    "id": "diabolic-chains",
    "name": "Diabolic Chains",
    "level": 6,
    "school": "Evocation",
    "desc": "Spend 2 souls you have consumed to lash out with 3 magmatic chains of Hellfire and possibly push the targets back 5 m (17 ft).",
    "cost": "Action",
    "damage": "6d6 Fire",
    "save": "DEX",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 18,
    "damageMax": 108,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Fire"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/diabolic-chains.webp",
    "wiki": "https://bg3.wiki/wiki/Diabolic_Chains"
  },
  {
    "id": "dimension-door",
    "name": "Dimension Door",
    "level": 4,
    "school": "Conjuration",
    "desc": "Teleport yourself and up to one adjacent ally to a place you can see. The ally cannot be larger than Medium.",
    "cost": "Action + Level 4 Spell Slot",
    "damage": null,
    "save": null,
    "range": "50 m (167 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Bard",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "subclasses": [
      "Trickery Domain"
    ],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 7,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 7,
        "via": null
      },
      {
        "name": "Warlock",
        "kind": "class",
        "level": 7,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 7,
        "via": null
      },
      {
        "name": "Trickery Domain",
        "kind": "subclass",
        "level": 7,
        "via": "Domain Spell"
      }
    ],
    "icon": "icons/spells/dimension-door.webp",
    "wiki": "https://bg3.wiki/wiki/Dimension_Door"
  },
  {
    "id": "dirty-trick-vicious-mockery",
    "name": "Dirty Trick: Vicious Mockery",
    "level": 0,
    "school": "Enchantment",
    "desc": "Insult a creature: it has Disadvantage on its next Attack Roll. Gain Advantage on your next attack.",
    "cost": "Bonus Action",
    "damage": "1d4 Psychic",
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 1,
    "damageMax": 4,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Psychic"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [
      {
        "level": 5,
        "count": 2,
        "size": 4
      },
      {
        "level": 10,
        "count": 3,
        "size": 4
      }
    ],
    "upcast": null,
    "upcastDice": null,
    "classes": [],
    "subclasses": [
      "Swashbuckler"
    ],
    "races": [],
    "availability": [
      {
        "name": "Swashbuckler",
        "kind": "subclass",
        "level": 4,
        "via": null
      }
    ],
    "icon": "icons/spells/dirty-trick-vicious-mockery.webp",
    "wiki": "https://bg3.wiki/wiki/Dirty_Trick:_Vicious_Mockery"
  },
  {
    "id": "disconcerting-visage",
    "name": "Disconcerting Visage",
    "level": 5,
    "school": null,
    "desc": "Accentuate your unnatural form, Confusing nearby creatures. No effect on undead.",
    "cost": "Action",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": "10 m (33 ft) Radius",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/disconcerting-visage.webp",
    "wiki": "https://bg3.wiki/wiki/Disconcerting_Visage"
  },
  {
    "id": "disconcerting-visage-tactician",
    "name": "Disconcerting Visage (Tactician)",
    "level": 5,
    "school": null,
    "desc": "Accentuate your unnatural form, Confusing nearby creatures and dealing 3d10 Necrotic damage. Creatures take half the damage on successful Wisdom Saving Throws. No effect on undead.",
    "cost": "Action",
    "damage": "3d10 Necrotic",
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": "10 m (33 ft) Radius",
    "damageMin": 3,
    "damageMax": 30,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Necrotic"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/disconcerting-visage-tactician.webp",
    "wiki": "https://bg3.wiki/wiki/Disconcerting_Visage_(Tactician)"
  },
  {
    "id": "disguise-self",
    "name": "Disguise Self",
    "level": 1,
    "school": "Illusion",
    "desc": "Magically change all aspects of your appearance.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Bard",
      "Sorcerer",
      "Wizard"
    ],
    "subclasses": [
      "Trickery Domain",
      "Draconic Bloodline",
      "Arcane Trickster",
      "Eldritch Knight",
      "Gloom Stalker"
    ],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Trickery Domain",
        "kind": "subclass",
        "level": 1,
        "via": "Domain Spell"
      },
      {
        "name": "Draconic Bloodline",
        "kind": "subclass",
        "level": 1,
        "via": "Gold/Fire Ancestry"
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Gloom Stalker",
        "kind": "subclass",
        "level": 3,
        "via": null
      }
    ],
    "icon": "icons/spells/disguise-self.webp",
    "wiki": "https://bg3.wiki/wiki/Disguise_Self"
  },
  {
    "id": "disguise-self-femme-dragonborn",
    "name": "Disguise Self: Femme Dragonborn",
    "level": 1,
    "school": "Illusion",
    "desc": "Disguise yourself as a dragonborn with a feminine body type.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/disguise-self-femme-dragonborn.webp",
    "wiki": "https://bg3.wiki/wiki/Disguise_Self:_Femme_Dragonborn"
  },
  {
    "id": "disguise-self-femme-drow",
    "name": "Disguise Self: Femme Drow",
    "level": 1,
    "school": "Illusion",
    "desc": "Disguise yourself as a drow with a feminine body type.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/disguise-self-femme-drow.webp",
    "wiki": "https://bg3.wiki/wiki/Disguise_Self:_Femme_Drow"
  },
  {
    "id": "disguise-self-femme-dwarf",
    "name": "Disguise Self: Femme Dwarf",
    "level": 1,
    "school": "Illusion",
    "desc": "Disguise yourself as a dwarf with a feminine body type.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/disguise-self-femme-dwarf.webp",
    "wiki": "https://bg3.wiki/wiki/Disguise_Self:_Femme_Dwarf"
  },
  {
    "id": "disguise-self-femme-elf",
    "name": "Disguise Self: Femme Elf",
    "level": 1,
    "school": "Illusion",
    "desc": "Disguise yourself as an elf with a feminine body type.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/disguise-self-femme-elf.webp",
    "wiki": "https://bg3.wiki/wiki/Disguise_Self:_Femme_Elf"
  },
  {
    "id": "disguise-self-femme-githyanki",
    "name": "Disguise Self: Femme Githyanki",
    "level": 1,
    "school": "Illusion",
    "desc": "Disguise yourself as a githyanki with a feminine body type.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/disguise-self-femme-githyanki.webp",
    "wiki": "https://bg3.wiki/wiki/Disguise_Self:_Femme_Githyanki"
  },
  {
    "id": "disguise-self-femme-gnome",
    "name": "Disguise Self: Femme Gnome",
    "level": 1,
    "school": "Illusion",
    "desc": "Disguise yourself as a gnome with a feminine body type.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/disguise-self-femme-gnome.webp",
    "wiki": "https://bg3.wiki/wiki/Disguise_Self:_Femme_Gnome"
  },
  {
    "id": "disguise-self-femme-half-elf",
    "name": "Disguise Self: Femme Half-Elf",
    "level": 1,
    "school": "Illusion",
    "desc": "Disguise yourself as a half-elf with a feminine body type.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/disguise-self-femme-half-elf.webp",
    "wiki": "https://bg3.wiki/wiki/Disguise_Self:_Femme_Half-Elf"
  },
  {
    "id": "disguise-self-femme-half-orc",
    "name": "Disguise Self: Femme Half-Orc",
    "level": 1,
    "school": "Illusion",
    "desc": "Disguise yourself as a half-orc with a feminine body type.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/disguise-self-femme-half-orc.webp",
    "wiki": "https://bg3.wiki/wiki/Disguise_Self:_Femme_Half-Orc"
  },
  {
    "id": "disguise-self-femme-halfling",
    "name": "Disguise Self: Femme Halfling",
    "level": 1,
    "school": "Illusion",
    "desc": "Disguise yourself as a halfling with a feminine body type.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/disguise-self-femme-halfling.webp",
    "wiki": "https://bg3.wiki/wiki/Disguise_Self:_Femme_Halfling"
  },
  {
    "id": "disguise-self-femme-human",
    "name": "Disguise Self: Femme Human",
    "level": 1,
    "school": "Illusion",
    "desc": "Disguise yourself as a human with a feminine body type.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/disguise-self-femme-human.webp",
    "wiki": "https://bg3.wiki/wiki/Disguise_Self:_Femme_Human"
  },
  {
    "id": "disguise-self-femme-strong-drow",
    "name": "Disguise Self: Femme Strong Drow",
    "level": 1,
    "school": "Illusion",
    "desc": "Disguise yourself as a drow with a strong feminine body type.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/disguise-self-femme-strong-drow.webp",
    "wiki": "https://bg3.wiki/wiki/Disguise_Self:_Femme_Strong_Drow"
  },
  {
    "id": "disguise-self-femme-strong-elf",
    "name": "Disguise Self: Femme Strong Elf",
    "level": 1,
    "school": "Illusion",
    "desc": "Disguise yourself as an elf with a strong feminine body type.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/disguise-self-femme-strong-elf.webp",
    "wiki": "https://bg3.wiki/wiki/Disguise_Self:_Femme_Strong_Elf"
  },
  {
    "id": "disguise-self-femme-strong-half-elf",
    "name": "Disguise Self: Femme Strong Half-Elf",
    "level": 1,
    "school": "Illusion",
    "desc": "Disguise yourself as a half-elf with a strong feminine body type.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/disguise-self-femme-strong-half-elf.webp",
    "wiki": "https://bg3.wiki/wiki/Disguise_Self:_Femme_Strong_Half-Elf"
  },
  {
    "id": "disguise-self-femme-strong-human",
    "name": "Disguise Self: Femme Strong Human",
    "level": 1,
    "school": "Illusion",
    "desc": "Disguise yourself as a human with a strong feminine body type.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/disguise-self-femme-strong-human.webp",
    "wiki": "https://bg3.wiki/wiki/Disguise_Self:_Femme_Strong_Human"
  },
  {
    "id": "disguise-self-femme-strong-tiefling",
    "name": "Disguise Self: Femme Strong Tiefling",
    "level": 1,
    "school": "Illusion",
    "desc": "Disguise yourself as a tiefling with a strong feminine body type.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/disguise-self-femme-strong-tiefling.webp",
    "wiki": "https://bg3.wiki/wiki/Disguise_Self:_Femme_Strong_Tiefling"
  },
  {
    "id": "disguise-self-femme-tiefling",
    "name": "Disguise Self: Femme Tiefling",
    "level": 1,
    "school": "Illusion",
    "desc": "Disguise yourself as a tiefling with a feminine body type.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/disguise-self-femme-tiefling.webp",
    "wiki": "https://bg3.wiki/wiki/Disguise_Self:_Femme_Tiefling"
  },
  {
    "id": "disguise-self-masc-dragonborn",
    "name": "Disguise Self: Masc Dragonborn",
    "level": 1,
    "school": "Illusion",
    "desc": "Disguise yourself as a dragonborn with a masculine body type.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/disguise-self-masc-dragonborn.webp",
    "wiki": "https://bg3.wiki/wiki/Disguise_Self:_Masc_Dragonborn"
  },
  {
    "id": "disguise-self-masc-drow",
    "name": "Disguise Self: Masc Drow",
    "level": 1,
    "school": "Illusion",
    "desc": "Disguise yourself as a drow with a masculine body type.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/disguise-self-masc-drow.webp",
    "wiki": "https://bg3.wiki/wiki/Disguise_Self:_Masc_Drow"
  },
  {
    "id": "disguise-self-masc-dwarf",
    "name": "Disguise Self: Masc Dwarf",
    "level": 1,
    "school": "Illusion",
    "desc": "Disguise yourself as a dwarf with a masculine body type.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/disguise-self-masc-dwarf.webp",
    "wiki": "https://bg3.wiki/wiki/Disguise_Self:_Masc_Dwarf"
  },
  {
    "id": "disguise-self-masc-elf",
    "name": "Disguise Self: Masc Elf",
    "level": 1,
    "school": "Illusion",
    "desc": "Disguise yourself as an elf with a masculine body type.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/disguise-self-masc-elf.webp",
    "wiki": "https://bg3.wiki/wiki/Disguise_Self:_Masc_Elf"
  },
  {
    "id": "disguise-self-masc-githyanki",
    "name": "Disguise Self: Masc Githyanki",
    "level": 1,
    "school": "Illusion",
    "desc": "Disguise yourself as a githyanki with a masculine body type.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/disguise-self-masc-githyanki.webp",
    "wiki": "https://bg3.wiki/wiki/Disguise_Self:_Masc_Githyanki"
  },
  {
    "id": "disguise-self-masc-gnome",
    "name": "Disguise Self: Masc Gnome",
    "level": 1,
    "school": "Illusion",
    "desc": "Disguise yourself as a gnome with a masculine body type.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/disguise-self-masc-gnome.webp",
    "wiki": "https://bg3.wiki/wiki/Disguise_Self:_Masc_Gnome"
  },
  {
    "id": "disguise-self-masc-half-elf",
    "name": "Disguise Self: Masc Half-Elf",
    "level": 1,
    "school": "Illusion",
    "desc": "Disguise yourself as a half-elf with a masculine body type.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/disguise-self-masc-half-elf.webp",
    "wiki": "https://bg3.wiki/wiki/Disguise_Self:_Masc_Half-Elf"
  },
  {
    "id": "disguise-self-masc-half-orc",
    "name": "Disguise Self: Masc Half-Orc",
    "level": 1,
    "school": "Illusion",
    "desc": "Disguise yourself as a half-orc with a masculine body type.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/disguise-self-masc-half-orc.webp",
    "wiki": "https://bg3.wiki/wiki/Disguise_Self:_Masc_Half-Orc"
  },
  {
    "id": "disguise-self-masc-halfling",
    "name": "Disguise Self: Masc Halfling",
    "level": 1,
    "school": "Illusion",
    "desc": "Disguise yourself as a halfling with a masculine body type.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/disguise-self-masc-halfling.webp",
    "wiki": "https://bg3.wiki/wiki/Disguise_Self:_Masc_Halfling"
  },
  {
    "id": "disguise-self-masc-human",
    "name": "Disguise Self: Masc Human",
    "level": 1,
    "school": "Illusion",
    "desc": "Disguise yourself as a human with a masculine body type.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/disguise-self-masc-human.webp",
    "wiki": "https://bg3.wiki/wiki/Disguise_Self:_Masc_Human"
  },
  {
    "id": "disguise-self-masc-strong-drow",
    "name": "Disguise Self: Masc Strong Drow",
    "level": 1,
    "school": "Illusion",
    "desc": "Disguise yourself as a drow with a strong masculine body type.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/disguise-self-masc-strong-drow.webp",
    "wiki": "https://bg3.wiki/wiki/Disguise_Self:_Masc_Strong_Drow"
  },
  {
    "id": "disguise-self-masc-strong-elf",
    "name": "Disguise Self: Masc Strong Elf",
    "level": 1,
    "school": "Illusion",
    "desc": "Disguise yourself as an elf with a strong masculine body type.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/disguise-self-masc-strong-elf.webp",
    "wiki": "https://bg3.wiki/wiki/Disguise_Self:_Masc_Strong_Elf"
  },
  {
    "id": "disguise-self-masc-strong-half-elf",
    "name": "Disguise Self: Masc Strong Half-Elf",
    "level": 1,
    "school": "Illusion",
    "desc": "Disguise yourself as a half-elf with a strong masculine body type.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/disguise-self-masc-strong-half-elf.webp",
    "wiki": "https://bg3.wiki/wiki/Disguise_Self:_Masc_Strong_Half-Elf"
  },
  {
    "id": "disguise-self-masc-strong-human",
    "name": "Disguise Self: Masc Strong Human",
    "level": 1,
    "school": "Illusion",
    "desc": "Disguise yourself as a human with a strong masculine body type.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/disguise-self-masc-strong-human.webp",
    "wiki": "https://bg3.wiki/wiki/Disguise_Self:_Masc_Strong_Human"
  },
  {
    "id": "disguise-self-masc-strong-tiefling",
    "name": "Disguise Self: Masc Strong Tiefling",
    "level": 1,
    "school": "Illusion",
    "desc": "Disguise yourself as a tiefling with a strong masculine body type.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/disguise-self-masc-strong-tiefling.webp",
    "wiki": "https://bg3.wiki/wiki/Disguise_Self:_Masc_Strong_Tiefling"
  },
  {
    "id": "disguise-self-masc-tiefling",
    "name": "Disguise Self: Masc Tiefling",
    "level": 1,
    "school": "Illusion",
    "desc": "Disguise yourself as a tiefling with a masculine body type.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/disguise-self-masc-tiefling.webp",
    "wiki": "https://bg3.wiki/wiki/Disguise_Self:_Masc_Tiefling"
  },
  {
    "id": "disintegrate",
    "name": "Disintegrate",
    "level": 6,
    "school": "Transmutation",
    "desc": "If the target fails a Dexterity Saving Throw, and the spell reduces it to 0 hit points, it disintegrates into a crumbly ash.",
    "cost": "Action + Level 6 Spell Slot",
    "damage": "10d6 + 40 Force",
    "save": "DEX",
    "range": "9 m (30 ft)",
    "aoe": null,
    "damageMin": 50,
    "damageMax": 100,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Force"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "subclasses": [],
    "races": [],
    "availability": [
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 11,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 11,
        "via": null
      }
    ],
    "icon": "icons/spells/disintegrate.webp",
    "wiki": "https://bg3.wiki/wiki/Disintegrate"
  },
  {
    "id": "dismiss-arcane-lock",
    "name": "Dismiss Arcane Lock",
    "level": 2,
    "school": "Abjuration",
    "desc": "Remove your Arcane Lock from a door or container.",
    "cost": null,
    "damage": null,
    "save": null,
    "range": "9 m (30 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/dismiss-arcane-lock.webp",
    "wiki": "https://bg3.wiki/wiki/Dismiss_Arcane_Lock"
  },
  {
    "id": "dispel-evil-and-good",
    "name": "Dispel Evil And Good",
    "level": 5,
    "school": "Abjuration",
    "desc": "Aberrations, Celestials, Elementals, Fey, Fiends, and Undead have Disadvantage on Attack Rolls against you. You can also break Enchantments that Charm, Frighten, or Possesses allies.",
    "cost": "Action + Level 5 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Cleric"
    ],
    "subclasses": [],
    "races": [],
    "availability": [
      {
        "name": "Cleric",
        "kind": "class",
        "level": 9,
        "via": null
      }
    ],
    "icon": "icons/spells/dispel-evil-and-good.webp",
    "wiki": "https://bg3.wiki/wiki/Dispel_Evil_And_Good"
  },
  {
    "id": "dispel-evil-and-good-break-enchantment",
    "name": "Dispel Evil And Good: Break Enchantment",
    "level": 5,
    "school": "Abjuration",
    "desc": "Touch a creature that is Charmed, Frightened, or Possessed by an otherworldly entity to free its mind.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/dispel-evil-and-good-break-enchantment.webp",
    "wiki": "https://bg3.wiki/wiki/Dispel_Evil_And_Good:_Break_Enchantment"
  },
  {
    "id": "disrobing-blinkstep",
    "name": "Disrobing Blinkstep",
    "level": 2,
    "school": "Conjuration",
    "desc": "You teleport to an unoccupied space you can see. However, your clothes do not teleport with you.",
    "cost": "Bonus Action",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/disrobing-blinkstep.webp",
    "wiki": "https://bg3.wiki/wiki/Disrobing_Blinkstep"
  },
  {
    "id": "dissonant-whispers",
    "name": "Dissonant Whispers",
    "level": 1,
    "school": "Enchantment",
    "desc": "Frighten a creature: they'll have Disadvantage on Ability Checks and Attack Rolls and they cannot move.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": "3d6 Psychic",
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 3,
    "damageMax": 18,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Psychic"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Deal an additional 1d6 Psychic damage per level.",
    "upcastDice": {
      "count": 1,
      "size": 6
    },
    "classes": [
      "Bard"
    ],
    "subclasses": [
      "The Great Old One"
    ],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "The Great Old One",
        "kind": "subclass",
        "level": 1,
        "via": null
      }
    ],
    "icon": "icons/spells/dissonant-whispers.webp",
    "wiki": "https://bg3.wiki/wiki/Dissonant_Whispers"
  },
  {
    "id": "divine-favour",
    "name": "Divine Favour",
    "level": 1,
    "school": "Evocation",
    "desc": "Your prayer empowers you with divine radiance. Your weapons deal an additional 1d4 Radiant damage.",
    "cost": "Bonus Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Radiant"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Paladin"
    ],
    "subclasses": [
      "War Domain"
    ],
    "races": [],
    "availability": [
      {
        "name": "War Domain",
        "kind": "subclass",
        "level": 1,
        "via": "Domain Spell"
      },
      {
        "name": "Paladin",
        "kind": "class",
        "level": 2,
        "via": null
      }
    ],
    "icon": "icons/spells/divine-favour.webp",
    "wiki": "https://bg3.wiki/wiki/Divine_Favour"
  },
  {
    "id": "divine-revelry",
    "name": "Divine Revelry",
    "level": 9,
    "school": "Enchantment",
    "desc": "Conjure forth a barrel of Shadowdark Ale from the Yawning Portal and spread an Irrestible Dance across all nearby creatures.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "12 m (40 ft)",
    "aoe": "3 m (10 ft) Radius",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": null,
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/divine-revelry.webp",
    "wiki": "https://bg3.wiki/wiki/Divine_Revelry"
  },
  {
    "id": "dominate-beast",
    "name": "Dominate Beast",
    "level": 4,
    "school": "Enchantment",
    "desc": "Make a beast fight alongside you. Every time the Beast takes damage, it makes a Wisdom Saving Throw against your domination.",
    "cost": "Action + Level 4 Spell Slot",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Druid",
      "Sorcerer",
      "Bard"
    ],
    "subclasses": [
      "Nature Domain",
      "The Archfey",
      "The Great Old One",
      "The Hexblade",
      "Circle of the Land"
    ],
    "races": [],
    "availability": [
      {
        "name": "Druid",
        "kind": "class",
        "level": 7,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 7,
        "via": null
      },
      {
        "name": "Nature Domain",
        "kind": "subclass",
        "level": 7,
        "via": "Domain Spell"
      },
      {
        "name": "The Archfey",
        "kind": "subclass",
        "level": 7,
        "via": null
      },
      {
        "name": "The Great Old One",
        "kind": "subclass",
        "level": 7,
        "via": null
      },
      {
        "name": "The Hexblade",
        "kind": "subclass",
        "level": 7,
        "via": null
      },
      {
        "name": "Circle of the Land",
        "kind": "subclass",
        "level": 7,
        "via": "Mountain or Underdark"
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/dominate-beast.webp",
    "wiki": "https://bg3.wiki/wiki/Dominate_Beast"
  },
  {
    "id": "dominate-person",
    "name": "Dominate Person",
    "level": 5,
    "school": "Enchantment",
    "desc": "Dominate a nearby humanoid. Allies are unaffected. Every time the creature takes damage, it may repeat the Saving Throw against your domination.",
    "cost": "Action + Level 5 Spell Slot",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Bard",
      "Sorcerer",
      "Wizard"
    ],
    "subclasses": [
      "The Archfey",
      "The Great Old One",
      "Trickery Domain",
      "Knowledge Domain"
    ],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 9,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 9,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 9,
        "via": null
      },
      {
        "name": "The Archfey",
        "kind": "subclass",
        "level": 9,
        "via": null
      },
      {
        "name": "The Great Old One",
        "kind": "subclass",
        "level": 9,
        "via": null
      },
      {
        "name": "Trickery Domain",
        "kind": "subclass",
        "level": 9,
        "via": "Domain Spell"
      },
      {
        "name": "Knowledge Domain",
        "kind": "subclass",
        "level": 9,
        "via": "Domain Spell"
      }
    ],
    "icon": "icons/spells/dominate-person.webp",
    "wiki": "https://bg3.wiki/wiki/Dominate_Person"
  },
  {
    "id": "draconic-elemental-weapon",
    "name": "Draconic Elemental Weapon",
    "level": 3,
    "school": "Transmutation",
    "desc": "Imbue a weapon with elemental power. It receives a +1 bonus to Attack Rolls and deals an additional 1d4 damage of your choice.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Acid",
      "Lightning",
      "Cold",
      "Fire",
      "Thunder"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/draconic-elemental-weapon.webp",
    "wiki": "https://bg3.wiki/wiki/Draconic_Elemental_Weapon"
  },
  {
    "id": "draconic-elemental-weapon-acid",
    "name": "Draconic Elemental Weapon: Acid",
    "level": 3,
    "school": "Transmutation",
    "desc": "Imbue a weapon with corrosive might. It receives a +1 bonus to Attack Rolls and deals an additional 1d4 Acid damage.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/draconic-elemental-weapon-acid.webp",
    "wiki": "https://bg3.wiki/wiki/Draconic_Elemental_Weapon:_Acid"
  },
  {
    "id": "draconic-elemental-weapon-cold",
    "name": "Draconic Elemental Weapon: Cold",
    "level": 3,
    "school": "Transmutation",
    "desc": "Imbue a weapon with an icy might. It receives a +1 bonus to Attack Rolls and deals an additional 1d4 Cold damage.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/draconic-elemental-weapon-cold.webp",
    "wiki": "https://bg3.wiki/wiki/Draconic_Elemental_Weapon:_Cold"
  },
  {
    "id": "draconic-elemental-weapon-fire",
    "name": "Draconic Elemental Weapon: Fire",
    "level": 3,
    "school": "Transmutation",
    "desc": "Imbue a weapon with an icy might. It receives a +1 bonus to Attack Rolls and deals an additional 1d4 Fire damage.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/draconic-elemental-weapon-fire.webp",
    "wiki": "https://bg3.wiki/wiki/Draconic_Elemental_Weapon:_Fire"
  },
  {
    "id": "draconic-elemental-weapon-lightning",
    "name": "Draconic Elemental Weapon: Lightning",
    "level": 3,
    "school": "Transmutation",
    "desc": "Imbue a weapon with an icy might. It receives a +1 bonus to Attack Rolls and deals an additional 1d4 Lightning damage.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/draconic-elemental-weapon-lightning.webp",
    "wiki": "https://bg3.wiki/wiki/Draconic_Elemental_Weapon:_Lightning"
  },
  {
    "id": "draconic-elemental-weapon-thunder",
    "name": "Draconic Elemental Weapon: Thunder",
    "level": 3,
    "school": "Transmutation",
    "desc": "Imbue a weapon with an icy might. It receives a +1 bonus to Attack Rolls and deals an additional 1d4 Thunder damage.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/draconic-elemental-weapon-thunder.webp",
    "wiki": "https://bg3.wiki/wiki/Draconic_Elemental_Weapon:_Thunder"
  },
  {
    "id": "drow-magic-faerie-fire",
    "name": "Drow Magic: Faerie Fire",
    "level": 1,
    "school": "Evocation",
    "desc": "All targets within the light turn visible, and Attack Rolls against them have Advantage.",
    "cost": "Action",
    "damage": null,
    "save": "DEX",
    "range": "18 m (60 ft)",
    "aoe": "6 m (20 ft) Radius",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [
      "Drow Half-Elf"
    ],
    "availability": [
      {
        "name": "Drow Half-Elf",
        "kind": "race",
        "level": 3,
        "via": null
      }
    ],
    "icon": "icons/spells/drow-magic-faerie-fire.webp",
    "wiki": "https://bg3.wiki/wiki/Drow_Magic:_Faerie_Fire"
  },
  {
    "id": "drunken-inhale",
    "name": "Drunken Inhale",
    "level": 1,
    "school": "Evocation",
    "desc": "Compel foes toward you with an intoxicating wind that makes them Drunk.",
    "cost": "Action",
    "damage": "4d8 Poison",
    "save": "CON",
    "range": "Self",
    "aoe": "5 m (17 ft) Cone",
    "damageMin": 4,
    "damageMax": 32,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Poison"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/drunken-inhale.webp",
    "wiki": "https://bg3.wiki/wiki/Drunken_Inhale"
  },
  {
    "id": "eagle-s-splendour",
    "name": "Eagle's Splendour",
    "level": 2,
    "school": "Transmutation",
    "desc": "Creature gains Advantage on Charisma Checks.",
    "cost": "Action + Level 2 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "When this Spell is cast at 3rd level or higher, you can target an additional creature for each spell slot level above 2nd.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/eagle-s-splendour.webp",
    "wiki": "https://bg3.wiki/wiki/Eagle%27s_Splendour"
  },
  {
    "id": "eldritch-blast",
    "name": "Eldritch Blast",
    "level": 0,
    "school": "Evocation",
    "desc": "Conjure a beam of crackling energy. Deals 1d10 Force damage to a target.",
    "cost": "Action",
    "damage": "1d10 Force",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 1,
    "damageMax": 10,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Force"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": null,
    "upcastDice": null,
    "classes": [
      "Warlock",
      "Bard"
    ],
    "subclasses": [
      "College of Lore"
    ],
    "races": [],
    "availability": [
      {
        "name": "Warlock",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/eldritch-blast.webp",
    "wiki": "https://bg3.wiki/wiki/Eldritch_Blast"
  },
  {
    "id": "elemental-age",
    "name": "Elemental Age",
    "level": 3,
    "school": "Transmutation",
    "desc": "Give your main hand weapon a +1 bonus to its Attack Rolls and an additional 1d4 Acid, Cold or Fire damage to its strikes depending on the elemental age embodied.",
    "cost": "Bonus Action",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/elemental-age.webp",
    "wiki": "https://bg3.wiki/wiki/Elemental_Age"
  },
  {
    "id": "elemental-retort",
    "name": "Elemental Retort",
    "level": 5,
    "school": "Evocation",
    "desc": "When you take damage, you can retaliate, blasting your attacker with the elemental damage of each myrmidon currently Siphoned.",
    "cost": null,
    "damage": "3d8 Lightning",
    "save": "DEX",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 12,
    "damageMax": 96,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Lightning",
      "Poison",
      "Fire",
      "Cold"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/elemental-retort.webp",
    "wiki": "https://bg3.wiki/wiki/Elemental_Retort"
  },
  {
    "id": "elemental-weapon",
    "name": "Elemental Weapon",
    "level": 3,
    "school": "Transmutation",
    "desc": "Imbue a weapon with elemental power. It receives a +1 bonus to Attack Rolls and deals an additional 1d4 damage of your choice.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Acid",
      "Lightning",
      "Cold",
      "Fire",
      "Thunder"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell using a 5th or 6th level Spell Slot increases the Attack Rolls bonus by 1 and additional 1d4 damage of your choice.",
    "upcastDice": null,
    "classes": [
      "Paladin"
    ],
    "subclasses": [
      "The Hexblade"
    ],
    "races": [],
    "availability": [
      {
        "name": "The Hexblade",
        "kind": "subclass",
        "level": 5,
        "via": null
      },
      {
        "name": "Paladin",
        "kind": "class",
        "level": 9,
        "via": null
      }
    ],
    "icon": "icons/spells/elemental-weapon.webp",
    "wiki": "https://bg3.wiki/wiki/Elemental_Weapon"
  },
  {
    "id": "elemental-weapon-acid",
    "name": "Elemental Weapon: Acid",
    "level": 3,
    "school": "Transmutation",
    "desc": "Imbue a weapon with corrosive might. It receives a +1 bonus to Attack Rolls and deals an additional 1d4 Acid damage.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell using a 5th or 6th level Spell Slot would increase the Attack Rolls bonus by 1 and additional 1d4 Acid damage.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/elemental-weapon-acid.webp",
    "wiki": "https://bg3.wiki/wiki/Elemental_Weapon:_Acid"
  },
  {
    "id": "elemental-weapon-cold",
    "name": "Elemental Weapon: Cold",
    "level": 3,
    "school": "Transmutation",
    "desc": "Imbue a weapon with an icy might. It receives a +1 bonus to Attack Rolls and deals an additional 1d4 Cold damage.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell using a 5th or 6th level Spell Slot would increase the Attack Rolls bonus by 1 and additional 1d4 Cold damage.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/elemental-weapon-cold.webp",
    "wiki": "https://bg3.wiki/wiki/Elemental_Weapon:_Cold"
  },
  {
    "id": "elemental-weapon-fire",
    "name": "Elemental Weapon: Fire",
    "level": 3,
    "school": "Transmutation",
    "desc": "Imbue a weapon with fiery might. It receives a +1 bonus to Attack Rolls and deals an additional 1d4 Fire damage.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell using a 5th or 6th level Spell Slot would increase the Attack Rolls bonus by 1 and additional 1d4 Fire damage.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/elemental-weapon-fire.webp",
    "wiki": "https://bg3.wiki/wiki/Elemental_Weapon:_Fire"
  },
  {
    "id": "elemental-weapon-lightning",
    "name": "Elemental Weapon: Lightning",
    "level": 3,
    "school": "Transmutation",
    "desc": "Imbue a weapon with an electrical might. It receives a +1 bonus to Attack Rolls and deals an additional 1d4 Lightning damage.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell using a 5th or 6th level Spell Slot would increase the Attack Rolls bonus by 1 and additional 1d4 Lightning damage.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/elemental-weapon-lightning.webp",
    "wiki": "https://bg3.wiki/wiki/Elemental_Weapon:_Lightning"
  },
  {
    "id": "elemental-weapon-thunder",
    "name": "Elemental Weapon: Thunder",
    "level": 3,
    "school": "Transmutation",
    "desc": "Imbue a weapon with thunderous might. It receives a +1 bonus to Attack Rolls and deals an additional 1d4 Thunder damage.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell using a 5th or 6th level Spell Slot would increase the Attack Rolls bonus by 1 and additional 1d4 Thunder damage.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/elemental-weapon-thunder.webp",
    "wiki": "https://bg3.wiki/wiki/Elemental_Weapon:_Thunder"
  },
  {
    "id": "enhance-ability",
    "name": "Enhance Ability",
    "level": 2,
    "school": "Transmutation",
    "desc": "Bestow a magical enchantment upon an ally. They gain Advantage on Ability Checks with a chosen Ability.",
    "cost": "Action + Level 2 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "When this Spell is cast at 3rd level or higher, you can target an additional creature for each spell slot level above 2nd.",
    "upcastDice": null,
    "classes": [
      "Bard",
      "Cleric",
      "Druid",
      "Sorcerer"
    ],
    "subclasses": [],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Cleric",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Druid",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 3,
        "via": null
      }
    ],
    "icon": "icons/spells/enhance-ability.webp",
    "wiki": "https://bg3.wiki/wiki/Enhance_Ability"
  },
  {
    "id": "enhance-leap",
    "name": "Enhance Leap",
    "level": 1,
    "school": "Transmutation",
    "desc": "Triple a creature's Jumping distance.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Druid",
      "Sorcerer",
      "Wizard",
      "Ranger"
    ],
    "subclasses": [
      "Arcane Trickster",
      "Eldritch Knight"
    ],
    "races": [],
    "availability": [
      {
        "name": "Druid",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Ranger",
        "kind": "class",
        "level": 2,
        "via": null
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 3,
        "via": null
      }
    ],
    "icon": "icons/spells/enhance-leap.webp",
    "wiki": "https://bg3.wiki/wiki/Enhance_Leap"
  },
  {
    "id": "enlarge",
    "name": "Enlarge",
    "level": 2,
    "school": "Transmutation",
    "desc": "Make a creature larger. Its weapons deal an extra 1d4 damage. It has Advantage on Strength Checks and Saving Throws.",
    "cost": "Action + Level 2 Spell Slot",
    "damage": null,
    "save": null,
    "range": "9 m (30 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/enlarge.webp",
    "wiki": "https://bg3.wiki/wiki/Enlarge"
  },
  {
    "id": "enlarge-duergar",
    "name": "Enlarge (Duergar)",
    "level": 0,
    "school": null,
    "desc": "Grow in size to become stronger You gain Advantage on Ability Checks and Saving Throws using Strength, and weapon attacks deal an additional 1d4 damage.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": null,
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [
      "Duergar"
    ],
    "availability": [
      {
        "name": "Duergar",
        "kind": "race",
        "level": 3,
        "via": null
      }
    ],
    "icon": "icons/spells/enlarge-duergar.webp",
    "wiki": "https://bg3.wiki/wiki/Enlarge_(Duergar)"
  },
  {
    "id": "enlarge-reduce",
    "name": "Enlarge/Reduce",
    "level": 2,
    "school": "Transmutation",
    "desc": "Make a creature larger or smaller. Either option has a duration of 10 turns. This affects their weapon damage and Strength Checks and Saving Throws.",
    "cost": "Action + Level 2 Spell Slot",
    "damage": null,
    "save": null,
    "range": "9 m (30 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "subclasses": [
      "Arcane Trickster",
      "Eldritch Knight"
    ],
    "races": [
      "Duergar"
    ],
    "availability": [
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 8,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 8,
        "via": null
      },
      {
        "name": "Duergar",
        "kind": "race",
        "level": 3,
        "via": null
      }
    ],
    "icon": "icons/spells/enlarge-reduce.webp",
    "wiki": "https://bg3.wiki/wiki/Enlarge/Reduce"
  },
  {
    "id": "ensnaring-strands",
    "name": "Ensnaring Strands",
    "level": 1,
    "school": "Conjuration",
    "desc": "Your attack conjures thick sticky webbing that possibly Enwebs your target(s).",
    "cost": "Action",
    "damage": "1d10",
    "save": "STR",
    "range": "9 m (30 ft)",
    "aoe": null,
    "damageMin": 1,
    "damageMax": 10,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Slashing"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/ensnaring-strands.webp",
    "wiki": "https://bg3.wiki/wiki/Ensnaring_Strands"
  },
  {
    "id": "ensnaring-strike",
    "name": "Ensnaring Strike",
    "level": 1,
    "school": "Conjuration",
    "desc": "Your attack summons thorny vines that possibly Ensnare your target. Ensnared creatures cannot move and take 1d6 Piercing damage at the start of each turn. An ally can use their Help action to try and tear away the vines.",
    "cost": "on hit Bonus Action + Level 1 Spell Slot",
    "damage": "1d6 Piercing",
    "save": "STR",
    "range": "9 m (30 ft)",
    "aoe": null,
    "damageMin": 1,
    "damageMax": 6,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Piercing"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Ensnared condition deals an extra 1d6 Piercing damage per level.",
    "upcastDice": {
      "count": 1,
      "size": 6
    },
    "classes": [
      "Ranger"
    ],
    "subclasses": [
      "Oath of the Ancients"
    ],
    "races": [],
    "availability": [
      {
        "name": "Ranger",
        "kind": "class",
        "level": 2,
        "via": null
      },
      {
        "name": "Oath of the Ancients",
        "kind": "subclass",
        "level": 3,
        "via": "Oath Spell"
      }
    ],
    "icon": "icons/spells/ensnaring-strike.webp",
    "wiki": "https://bg3.wiki/wiki/Ensnaring_Strike"
  },
  {
    "id": "ensnaring-strike-melee",
    "name": "Ensnaring Strike (Melee)",
    "level": 1,
    "school": "Conjuration",
    "desc": "Your attack summons thorny vines that possibly Ensnare your target.",
    "cost": "on hit Bonus Action + Level 1 Spell Slot",
    "damage": "1d6 Piercing",
    "save": "STR",
    "range": "9 m (30 ft)",
    "aoe": null,
    "damageMin": 1,
    "damageMax": 6,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Piercing"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Ensnared condition deals an extra 1d6 Piercing damage per level.",
    "upcastDice": {
      "count": 1,
      "size": 6
    },
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/ensnaring-strike-melee.webp",
    "wiki": "https://bg3.wiki/wiki/Ensnaring_Strike_(Melee)"
  },
  {
    "id": "ensnaring-strike-ranged",
    "name": "Ensnaring Strike (Ranged)",
    "level": 1,
    "school": "Conjuration",
    "desc": "Your attack summons thorny vines that possibly Ensnare your target.",
    "cost": "on hit Bonus Action + Level 1 Spell Slot",
    "damage": "1d6 Piercing",
    "save": "STR",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 1,
    "damageMax": 6,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Piercing"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Ensnared condition deals an extra 1d6 Piercing damage per level.",
    "upcastDice": {
      "count": 1,
      "size": 6
    },
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/ensnaring-strike-ranged.webp",
    "wiki": "https://bg3.wiki/wiki/Ensnaring_Strike_(Ranged)"
  },
  {
    "id": "entangle",
    "name": "Entangle",
    "level": 1,
    "school": "Conjuration",
    "desc": "Vines sprout from the ground, turning it into Difficult Terrain and possibly Entangling creatures within. Entangled creatures cannot move. An ally can use its help action to try and tear away the vines.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": "STR",
    "range": "18 m (60 ft)",
    "aoe": "3 m (10 ft) Radius",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Druid",
      "Bard"
    ],
    "subclasses": [
      "College of Lore"
    ],
    "races": [],
    "availability": [
      {
        "name": "Druid",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/entangle.webp",
    "wiki": "https://bg3.wiki/wiki/Entangle"
  },
  {
    "id": "entangle-dryad",
    "name": "Entangle (Dryad)",
    "level": 0,
    "school": null,
    "desc": "Create a vine surface, slowing down creatures, possibly Entangling them.",
    "cost": "Action",
    "damage": null,
    "save": "STR",
    "range": "18 m (60 ft)",
    "aoe": "3 m (10 ft) Radius",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": null,
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/entangle-dryad.webp",
    "wiki": "https://bg3.wiki/wiki/Entangle_(Dryad)"
  },
  {
    "id": "entangle-wood-woad",
    "name": "Entangle (Wood Woad)",
    "level": 1,
    "school": "Conjuration",
    "desc": "Create a vine surface, slowing down creatures, possibly Entangling them.",
    "cost": "Action",
    "damage": null,
    "save": "STR",
    "range": "6 m (20 ft)",
    "aoe": "6 m (20 ft) Radius",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/entangle-wood-woad.webp",
    "wiki": "https://bg3.wiki/wiki/Entangle_(Wood_Woad)"
  },
  {
    "id": "enthrall",
    "name": "Enthrall",
    "level": 2,
    "school": "Enchantment",
    "desc": "Reduce a creature's peripheral vision and make it look at you.",
    "cost": "Action + Level 2 Spell Slot",
    "damage": null,
    "save": "WIS",
    "range": "6 m (20 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Bard",
      "Warlock"
    ],
    "subclasses": [],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Warlock",
        "kind": "class",
        "level": 3,
        "via": null
      }
    ],
    "icon": "icons/spells/enthrall.webp",
    "wiki": "https://bg3.wiki/wiki/Enthrall"
  },
  {
    "id": "ethel-s-insect-plague",
    "name": "Ethel's Insect Plague",
    "level": 5,
    "school": "Conjuration",
    "desc": "Locusts attack everyone within range, make the area Difficult Terrain, and impose Disadvantage on Perception Checks. Ethel and her allies are immune to the effects.",
    "cost": "Action",
    "damage": "4d10 Piercing",
    "save": "CON",
    "range": "18 m (60 ft)",
    "aoe": "6 m (20 ft) Radius",
    "damageMin": 4,
    "damageMax": 40,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Piercing"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/ethel-s-insect-plague.webp",
    "wiki": "https://bg3.wiki/wiki/Ethel%27s_Insect_Plague"
  },
  {
    "id": "ethel-s-ray-of-sickness",
    "name": "Ethel's Ray of Sickness",
    "level": 2,
    "school": "Necromancy",
    "desc": "Possibly Poisons the target. 3 additional rays leap from the target to nearby foes within 8 m (27 ft).",
    "cost": "Action",
    "damage": "3d8 Poison",
    "save": "CON",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 3,
    "damageMax": 24,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Poison"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/ethel-s-ray-of-sickness.webp",
    "wiki": "https://bg3.wiki/wiki/Ethel%27s_Ray_of_Sickness"
  },
  {
    "id": "evard-s-black-tentacles",
    "name": "Evard's Black Tentacles",
    "level": 4,
    "school": "Conjuration",
    "desc": "Tentacles sprout from the ground, turning the area into Difficult Terrain, attacking and Smothering creatures within.",
    "cost": "Action + Level 4 Spell Slot",
    "damage": "3d6 Bludgeoning",
    "save": "STR",
    "range": "18 m (60 ft)",
    "aoe": "6 m (20 ft) Radius",
    "damageMin": 3,
    "damageMax": 18,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Bludgeoning"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Wizard"
    ],
    "subclasses": [
      "The Great Old One"
    ],
    "races": [],
    "availability": [
      {
        "name": "Wizard",
        "kind": "class",
        "level": 7,
        "via": null
      },
      {
        "name": "The Great Old One",
        "kind": "subclass",
        "level": 7,
        "via": null
      }
    ],
    "icon": "icons/spells/evard-s-black-tentacles.webp",
    "wiki": "https://bg3.wiki/wiki/Evard%27s_Black_Tentacles"
  },
  {
    "id": "exhort-the-risen",
    "name": "Exhort the Risen",
    "level": 1,
    "school": "Enchantment",
    "desc": "Subjugate the undead with your commands.",
    "cost": "Action",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/exhort-the-risen.webp",
    "wiki": "https://bg3.wiki/wiki/Exhort_the_Risen"
  },
  {
    "id": "expeditious-retreat",
    "name": "Expeditious Retreat",
    "level": 1,
    "school": "Transmutation",
    "desc": "Gain Dash immediately and as a bonus action on each of your turns until this spell ends.",
    "cost": "Bonus Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "subclasses": [
      "Arcane Trickster",
      "Eldritch Knight"
    ],
    "races": [],
    "availability": [
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Warlock",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 3,
        "via": null
      }
    ],
    "icon": "icons/spells/expeditious-retreat.webp",
    "wiki": "https://bg3.wiki/wiki/Expeditious_Retreat"
  },
  {
    "id": "eyebite",
    "name": "Eyebite",
    "level": 6,
    "school": "Necromancy",
    "desc": "Your eyes become black corridors walled in teeth, your gaze capable of inflicting dread, sickness, or putting creatures to sleep. While Concentrating, you may cast Eyebite without expending a spell slot.",
    "cost": "Action + Level 6 Spell Slot",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Bard",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "subclasses": [],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 11,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 11,
        "via": null
      },
      {
        "name": "Warlock",
        "kind": "class",
        "level": 11,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 11,
        "via": null
      }
    ],
    "icon": "icons/spells/eyebite.webp",
    "wiki": "https://bg3.wiki/wiki/Eyebite"
  },
  {
    "id": "eyebite-asleep",
    "name": "Eyebite: Asleep",
    "level": 6,
    "school": "Necromancy",
    "desc": "Put a creature to sleep. The condition ends upon taking damage.",
    "cost": "Action + Level 6 Spell Slot",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/eyebite-asleep.webp",
    "wiki": "https://bg3.wiki/wiki/Eyebite:_Asleep"
  },
  {
    "id": "eyebite-panicked",
    "name": "Eyebite: Panicked",
    "level": 6,
    "school": "Necromancy",
    "desc": "Strike Fear deep into a creature's heart.",
    "cost": "Action + Level 6 Spell Slot",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/eyebite-panicked.webp",
    "wiki": "https://bg3.wiki/wiki/Eyebite:_Panicked"
  },
  {
    "id": "eyebite-sickened",
    "name": "Eyebite: Sickened",
    "level": 6,
    "school": "Necromancy",
    "desc": "Afflict a creature with Disadvantage on Attack Rolls and Ability Checks.",
    "cost": "Action + Level 6 Spell Slot",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/eyebite-sickened.webp",
    "wiki": "https://bg3.wiki/wiki/Eyebite:_Sickened"
  },
  {
    "id": "eyes-of-the-dark-darkness",
    "name": "Eyes of the Dark: Darkness",
    "level": 2,
    "school": "Evocation",
    "desc": "Create a dark shroud that Heavily Obscures and Blinds creatures within. Creatures cannot make ranged attacks into or out of it. The caster can see normally in darkness, both magical and non-magical, to a distance of 25 m (83 ft).",
    "cost": "Action + 2 Sorcery Points",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": null,
    "upcastDice": null,
    "classes": [],
    "subclasses": [
      "Shadow Magic"
    ],
    "races": [],
    "availability": [
      {
        "name": "Shadow Magic",
        "kind": "subclass",
        "level": 3,
        "via": null
      }
    ],
    "icon": "icons/spells/eyes-of-the-dark-darkness.webp",
    "wiki": "https://bg3.wiki/wiki/Eyes_of_the_Dark:_Darkness"
  },
  {
    "id": "faerie-fire",
    "name": "Faerie Fire",
    "level": 1,
    "school": "Evocation",
    "desc": "All targets within the light turn visible, and Attack Rolls against them have Advantage.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": "DEX",
    "range": "18 m (60 ft)",
    "aoe": "6 m (20 ft) Radius",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Bard",
      "Druid"
    ],
    "subclasses": [
      "Light Domain",
      "The Archfey",
      "Swarmkeeper"
    ],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Druid",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Light Domain",
        "kind": "subclass",
        "level": 1,
        "via": "Domain Spell"
      },
      {
        "name": "The Archfey",
        "kind": "subclass",
        "level": 1,
        "via": null
      },
      {
        "name": "Swarmkeeper",
        "kind": "subclass",
        "level": 3,
        "via": null
      }
    ],
    "icon": "icons/spells/faerie-fire.webp",
    "wiki": "https://bg3.wiki/wiki/Faerie_Fire"
  },
  {
    "id": "faithwarden-s-vines",
    "name": "Faithwarden's Vines",
    "level": 1,
    "school": "Conjuration",
    "desc": "Vines sprout from the ground, turning it into Difficult Terrain and possibly Entangling creatures within. Entangled creatures cannot move. An ally can use its help action to try and tear away the vines.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": "3 m (10 ft) Radius",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/faithwarden-s-vines.webp",
    "wiki": "https://bg3.wiki/wiki/Faithwarden%27s_Vines"
  },
  {
    "id": "false-life",
    "name": "False Life",
    "level": 1,
    "school": "Necromancy",
    "desc": "Bolster yourself with a necromantic facsimile of life to gain 7 temporary hit points. Can only have temporary hit points from one source.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level yields an extra 5 temporary hit points for each spell slot level above 1st.",
    "upcastDice": null,
    "classes": [
      "Sorcerer",
      "Wizard",
      "Bard"
    ],
    "subclasses": [
      "Death Domain",
      "Arcane Trickster",
      "Eldritch Knight",
      "College of Lore"
    ],
    "races": [],
    "availability": [
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Death Domain",
        "kind": "subclass",
        "level": 1,
        "via": "Domain Spell"
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/false-life.webp",
    "wiki": "https://bg3.wiki/wiki/False_Life"
  },
  {
    "id": "fanatic-retaliation",
    "name": "Fanatic Retaliation",
    "level": 3,
    "school": "Evocation",
    "desc": "Avenge a fallen Spindleweb Fanatic with a psionic barrage that can Silence its killer.",
    "cost": null,
    "damage": "6d10 Psychic",
    "save": "INT",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 6,
    "damageMax": 60,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Psychic"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/fanatic-retaliation.webp",
    "wiki": "https://bg3.wiki/wiki/Fanatic_Retaliation"
  },
  {
    "id": "fear",
    "name": "Fear",
    "level": 3,
    "school": "Illusion",
    "desc": "Hostile targets drop everything and become Fearful: they have Disadvantage on Ability Checks and Attack Rolls. If the target ends their turn where they can't see you, they can make another Saving Throw to shake off their fear.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": "WIS",
    "range": "Self",
    "aoe": "9 m (30 ft) Cone",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Bard",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "subclasses": [
      "Trickery Domain",
      "Gloom Stalker"
    ],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Warlock",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Trickery Domain",
        "kind": "subclass",
        "level": 5,
        "via": "Domain Spell"
      },
      {
        "name": "Gloom Stalker",
        "kind": "subclass",
        "level": 9,
        "via": null
      }
    ],
    "icon": "icons/spells/fear.webp",
    "wiki": "https://bg3.wiki/wiki/Fear"
  },
  {
    "id": "feather-fall",
    "name": "Feather Fall",
    "level": 1,
    "school": "Transmutation",
    "desc": "You and nearby allies gain Immunity to Falling damage.",
    "cost": "Bonus Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": "9 m (30 ft) Radius",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Bard",
      "Sorcerer",
      "Wizard"
    ],
    "subclasses": [
      "Draconic Bloodline",
      "Arcane Trickster",
      "Eldritch Knight"
    ],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Draconic Bloodline",
        "kind": "subclass",
        "level": 1,
        "via": "Silver/Cold Ancestry"
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 3,
        "via": null
      }
    ],
    "icon": "icons/spells/feather-fall.webp",
    "wiki": "https://bg3.wiki/wiki/Feather_Fall"
  },
  {
    "id": "feign-death",
    "name": "Feign Death",
    "level": 3,
    "school": "Necromancy",
    "desc": "Put an ally in a protective coma. They become Resistant to all damage except Psychic. Disease and poison no longer have any effect. Removed when Helped.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Bard",
      "Cleric",
      "Druid",
      "Wizard"
    ],
    "subclasses": [],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Cleric",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Druid",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 5,
        "via": null
      }
    ],
    "icon": "icons/spells/feign-death.webp",
    "wiki": "https://bg3.wiki/wiki/Feign_Death"
  },
  {
    "id": "fiendish-charm",
    "name": "Fiendish Charm",
    "level": 1,
    "school": "Enchantment",
    "desc": "Charm a humanoid to prevent it from attacking you. You gain Advantage on Charisma Ability Checks in dialogue. You can only Charm a humanoid once per day with this action. Condition ends early if you or an ally hurts the target. In higher difficulty modes, the target might accuse you of enchanting...",
    "cost": "Action",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/fiendish-charm.webp",
    "wiki": "https://bg3.wiki/wiki/Fiendish_Charm"
  },
  {
    "id": "fiery-bolt",
    "name": "Fiery Bolt",
    "level": 0,
    "school": "Evocation",
    "desc": "Hurl a mote of fire.",
    "cost": "Action",
    "damage": "1d4 Fire",
    "save": null,
    "range": "8 m (27 ft)",
    "aoe": null,
    "damageMin": 1,
    "damageMax": 4,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Fire"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": null,
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/fiery-bolt.webp",
    "wiki": "https://bg3.wiki/wiki/Fiery_Bolt"
  },
  {
    "id": "find-familiar",
    "name": "Find Familiar",
    "level": 1,
    "school": "Conjuration",
    "desc": "Summon a familiar, a fey spirit that takes an animal form of your choosing",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Wizard",
      "Ranger",
      "Warlock"
    ],
    "subclasses": [
      "Eldritch Knight",
      "Arcane Trickster"
    ],
    "races": [],
    "availability": [
      {
        "name": "Wizard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Ranger",
        "kind": "class",
        "level": 1,
        "via": "Beast Tamer"
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Warlock",
        "kind": "class",
        "level": 3,
        "via": "Pact of the Chain"
      }
    ],
    "icon": "icons/spells/find-familiar.webp",
    "wiki": "https://bg3.wiki/wiki/Find_Familiar"
  },
  {
    "id": "find-familiar-boo",
    "name": "Find Familiar: Boo",
    "level": 1,
    "school": null,
    "desc": "Summon your adorable, occasionally violent, and above all faithful companion, Boo.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit. Creature: Boo STR 10 DEX 20 (+5) CON 10 INT 6 (-2) WIS 12 (+1) CHA 6 (-2) Hit Points 20 Armour Class 20 Size Tiny Bite () Bite a target.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/find-familiar-boo.webp",
    "wiki": "https://bg3.wiki/wiki/Find_Familiar:_Boo"
  },
  {
    "id": "find-familiar-cat",
    "name": "Find Familiar: Cat",
    "level": 1,
    "school": "Conjuration",
    "desc": "Summon a cat familiar that can Meow to distract your enemies.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/find-familiar-cat.webp",
    "wiki": "https://bg3.wiki/wiki/Find_Familiar:_Cat"
  },
  {
    "id": "find-familiar-cheeky-quasit",
    "name": "Find Familiar: Cheeky Quasit",
    "level": 1,
    "school": "Conjuration",
    "desc": "Summon a familiar with the form of a quasit that can turn Invisible and Scare enemies.",
    "cost": null,
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/find-familiar-cheeky-quasit.webp",
    "wiki": "https://bg3.wiki/wiki/Find_Familiar:_Cheeky_Quasit"
  },
  {
    "id": "find-familiar-crab",
    "name": "Find Familiar: Crab",
    "level": 1,
    "school": "Conjuration",
    "desc": "Summon a crab familiar that can slow enemies with its Crippling Pinch.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/find-familiar-crab.webp",
    "wiki": "https://bg3.wiki/wiki/Find_Familiar:_Crab"
  },
  {
    "id": "find-familiar-frog",
    "name": "Find Familiar: Frog",
    "level": 1,
    "school": "Conjuration",
    "desc": "Summon a frog familiar who can spread its Bufotoxin to enemies.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/find-familiar-frog.webp",
    "wiki": "https://bg3.wiki/wiki/Find_Familiar:_Frog"
  },
  {
    "id": "find-familiar-imp",
    "name": "Find Familiar: Imp",
    "level": 1,
    "school": "Conjuration",
    "desc": "Summon a familiar with the form of an imp that can fly, turn Invisible, and Sting enemies.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Warlock"
    ],
    "subclasses": [],
    "races": [],
    "availability": [
      {
        "name": "Warlock",
        "kind": "class",
        "level": 3,
        "via": "Pact of the Chain"
      }
    ],
    "icon": "icons/spells/find-familiar-imp.webp",
    "wiki": "https://bg3.wiki/wiki/Find_Familiar:_Imp"
  },
  {
    "id": "find-familiar-quasit",
    "name": "Find Familiar: Quasit",
    "level": 1,
    "school": "Conjuration",
    "desc": "Summon a familiar with the form of a quasit that can turn Invisible and Scare enemies.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Warlock"
    ],
    "subclasses": [],
    "races": [],
    "availability": [
      {
        "name": "Warlock",
        "kind": "class",
        "level": 3,
        "via": "Pact of the Chain"
      }
    ],
    "icon": "icons/spells/find-familiar-quasit.webp",
    "wiki": "https://bg3.wiki/wiki/Find_Familiar:_Quasit"
  },
  {
    "id": "find-familiar-rat",
    "name": "Find Familiar: Rat",
    "level": 1,
    "school": "Conjuration",
    "desc": "Summon a rat familiar with an Infectious Bite.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/find-familiar-rat.webp",
    "wiki": "https://bg3.wiki/wiki/Find_Familiar:_Rat"
  },
  {
    "id": "find-familiar-raven",
    "name": "Find Familiar: Raven",
    "level": 1,
    "school": "Conjuration",
    "desc": "Summon a raven familiar that can Blind enemies with its beak.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/find-familiar-raven.webp",
    "wiki": "https://bg3.wiki/wiki/Find_Familiar:_Raven"
  },
  {
    "id": "find-familiar-scratch",
    "name": "Find Familiar: Scratch",
    "level": 1,
    "school": "Conjuration",
    "desc": "Summon the best boy. Scratch's keen nose can discover many things hidden around the world.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/find-familiar-scratch.webp",
    "wiki": "https://bg3.wiki/wiki/Find_Familiar:_Scratch"
  },
  {
    "id": "find-familiar-spider",
    "name": "Find Familiar: Spider",
    "level": 1,
    "school": "Conjuration",
    "desc": "Summon a spider familiar with a poisonous Bite.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/find-familiar-spider.webp",
    "wiki": "https://bg3.wiki/wiki/Find_Familiar:_Spider"
  },
  {
    "id": "finger-of-death",
    "name": "Finger of Death",
    "level": 7,
    "school": "Necromancy",
    "desc": "Point at a foe to cause searing pain.",
    "cost": "Action",
    "damage": "7d8 + 30 Necrotic",
    "save": "CON",
    "range": "30 m (100 ft)",
    "aoe": null,
    "damageMin": 37,
    "damageMax": 86,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Necrotic"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/finger-of-death.webp",
    "wiki": "https://bg3.wiki/wiki/Finger_of_Death"
  },
  {
    "id": "fire-bolt",
    "name": "Fire Bolt",
    "level": 0,
    "school": "Evocation",
    "desc": "Hurl a mote of fire.",
    "cost": "Action",
    "damage": "1d10 Fire",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 1,
    "damageMax": 10,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Fire"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [
      {
        "level": 5,
        "count": 2,
        "size": 10
      },
      {
        "level": 10,
        "count": 3,
        "size": 10
      }
    ],
    "upcast": null,
    "upcastDice": null,
    "classes": [
      "Sorcerer",
      "Wizard",
      "Bard"
    ],
    "subclasses": [
      "Arcane Trickster",
      "Eldritch Knight",
      "College of Lore"
    ],
    "races": [
      "High Elf",
      "High Half-Elf"
    ],
    "availability": [
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      },
      {
        "name": "High Elf",
        "kind": "race",
        "level": 1,
        "via": null
      },
      {
        "name": "High Half-Elf",
        "kind": "race",
        "level": 1,
        "via": null
      }
    ],
    "icon": "icons/spells/fire-bolt.webp",
    "wiki": "https://bg3.wiki/wiki/Fire_Bolt"
  },
  {
    "id": "fire-shield",
    "name": "Fire Shield",
    "level": 4,
    "school": "Evocation",
    "desc": "Wreathe your body in flames that shed light in a 3 m (10 ft) radius, provide Resistance to Fire or Cold damage, and retaliate against melee attacks.",
    "cost": "Action + Level 4 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Fire",
      "Cold"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Wizard",
      "Bard"
    ],
    "subclasses": [
      "The Fiend"
    ],
    "races": [],
    "availability": [
      {
        "name": "Wizard",
        "kind": "class",
        "level": 7,
        "via": null
      },
      {
        "name": "The Fiend",
        "kind": "subclass",
        "level": 7,
        "via": null
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/fire-shield.webp",
    "wiki": "https://bg3.wiki/wiki/Fire_Shield"
  },
  {
    "id": "fire-shield-chill",
    "name": "Fire Shield: Chill",
    "level": 4,
    "school": "Evocation",
    "desc": "Ice-cold flames shed light in a 3 m (10 ft) radius. You take only half the damage of all Fire damage, and deal 2d8 Cold damage to anyone who hits you with a melee attack.",
    "cost": "Action + Level 4 Spell Slot",
    "damage": "2d8 Cold",
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": 2,
    "damageMax": 16,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Cold"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/fire-shield-chill.webp",
    "wiki": "https://bg3.wiki/wiki/Fire_Shield:_Chill"
  },
  {
    "id": "fire-shield-warm",
    "name": "Fire Shield: Warm",
    "level": 4,
    "school": "Evocation",
    "desc": "Scorching flames shed light in a 3 m (10 ft) radius. You take only half the damage of all Cold damage, and deal 2d8 Fire damage to anyone who hits you with a melee attack.",
    "cost": "Action + Level 4 Spell Slot",
    "damage": "2d8 Fire",
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": 2,
    "damageMax": 16,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Fire"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/fire-shield-warm.webp",
    "wiki": "https://bg3.wiki/wiki/Fire_Shield:_Warm"
  },
  {
    "id": "fireball",
    "name": "Fireball",
    "level": 3,
    "school": "Evocation",
    "desc": "Shoot a bright flame from your fingers that explodes upon contact, torching everything in the vicinity for 8d6 Fire damage.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": "8d6 Fire",
    "save": "DEX",
    "range": "18 m (60 ft)",
    "aoe": "4 m (13 ft) Radius",
    "damageMin": 8,
    "damageMax": 48,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Fire"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "When the spell is cast using a 4th level slot or higher, damage increases by 1d6 Fire for each spell slot level above 3rd.",
    "upcastDice": {
      "count": 1,
      "size": 6
    },
    "classes": [
      "Sorcerer",
      "Wizard",
      "Bard"
    ],
    "subclasses": [
      "Light Domain",
      "The Fiend",
      "College of Lore"
    ],
    "races": [],
    "availability": [
      {
        "name": "Light Domain",
        "kind": "subclass",
        "level": 5,
        "via": "Domain Spell"
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "The Fiend",
        "kind": "subclass",
        "level": 5,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/fireball.webp",
    "wiki": "https://bg3.wiki/wiki/Fireball"
  },
  {
    "id": "fireball-cazador",
    "name": "Fireball (Cazador)",
    "level": 3,
    "school": "Evocation",
    "desc": "Shoot a bright flame from your fingers that explodes upon contact, torching everything in the vicinity for 10d6 Fire damage.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": "10d6 Fire",
    "save": "DEX",
    "range": "18 m (60 ft)",
    "aoe": "4 m (13 ft) Radius",
    "damageMin": 10,
    "damageMax": 60,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Fire"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "When the spell is cast using a 4th level slot or higher, damage increases by 1d6 Fire for each spell slot level above 3rd.",
    "upcastDice": {
      "count": 1,
      "size": 6
    },
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/fireball-cazador.webp",
    "wiki": "https://bg3.wiki/wiki/Fireball_(Cazador)"
  },
  {
    "id": "flame-blade",
    "name": "Flame Blade",
    "level": 2,
    "school": "Evocation",
    "desc": "Conjure a flaming Scimitar in your hand for 10 turns that deals 3d6 Fire damage. It sheds a bright light in a 3 m (10 ft) radius and a dim light in a 6 m (20 ft) radius. The blade can be unequipped and equipped again, but must stay on the spellcaster's person.",
    "cost": "Bonus Action + Level 2 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Fire"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Damage increases by 1d6 Fire for every two spell slot levels above 2nd (e.g., a total of 4d6 at levels 4 and 5, and 5d6 at level 6).",
    "upcastDice": null,
    "classes": [
      "Druid"
    ],
    "subclasses": [],
    "races": [],
    "availability": [
      {
        "name": "Druid",
        "kind": "class",
        "level": 3,
        "via": null
      }
    ],
    "icon": "icons/spells/flame-blade.webp",
    "wiki": "https://bg3.wiki/wiki/Flame_Blade"
  },
  {
    "id": "flame-strike",
    "name": "Flame Strike",
    "level": 5,
    "school": "Evocation",
    "desc": "Make a pillar of divine fire roar down from the heavens like the wrath of affronted angels.",
    "cost": "Action + Level 5 Spell Slot",
    "damage": "5d6 Fire",
    "save": "DEX",
    "range": "18 m (60 ft)",
    "aoe": "3 m (10 ft) Radius",
    "damageMin": 10,
    "damageMax": 60,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Fire",
      "Radiant"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Deals an additional 1d6 Fire damage and 1d6 Radiant damage for each spell slot level above 5th.",
    "upcastDice": {
      "count": 1,
      "size": 6
    },
    "classes": [
      "Cleric"
    ],
    "subclasses": [
      "The Fiend",
      "Light Domain",
      "War Domain"
    ],
    "races": [],
    "availability": [
      {
        "name": "Cleric",
        "kind": "class",
        "level": 9,
        "via": null
      },
      {
        "name": "The Fiend",
        "kind": "subclass",
        "level": 9,
        "via": null
      },
      {
        "name": "Light Domain",
        "kind": "subclass",
        "level": 9,
        "via": "Domain Spell"
      },
      {
        "name": "War Domain",
        "kind": "subclass",
        "level": 9,
        "via": "Domain Spell"
      }
    ],
    "icon": "icons/spells/flame-strike.webp",
    "wiki": "https://bg3.wiki/wiki/Flame_Strike"
  },
  {
    "id": "flame-of-wrath",
    "name": "Flame of Wrath",
    "level": 4,
    "school": "Evocation",
    "desc": "Embrace Kereska's flame to gain resistance to Fire damage. Your fire spells deal additional Fire damage equal to your proficiency bonus. When you deal spell damage, gain 2 turns [ See Notes ] of Heat. While attuned to Kereska's flame you can cast Fireball and Wall of Fire once each per short rest...",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/flame-of-wrath.webp",
    "wiki": "https://bg3.wiki/wiki/Flame_of_Wrath"
  },
  {
    "id": "flames-of-avernus-spell",
    "name": "Flames of Avernus (spell)",
    "level": 6,
    "school": "Evocation",
    "desc": "Loose a searing wave of infernal fire from your palms.",
    "cost": "Action",
    "damage": "6d6 Fire",
    "save": "DEX",
    "range": "Self",
    "aoe": "5 m (17 ft) Cone",
    "damageMin": 6,
    "damageMax": 36,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Fire"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/flames-of-avernus-spell.webp",
    "wiki": "https://bg3.wiki/wiki/Flames_of_Avernus_(spell)"
  },
  {
    "id": "flaming-sphere",
    "name": "Flaming Sphere",
    "level": 2,
    "school": "Conjuration",
    "desc": "Summon a Flaming Sphere that deals 2d6 Fire damage to nearby enemies and objects. It also sheds bright light in a 6 m (20 ft) radius, and dim light for an additional 6 m (20 ft). You can move the sphere. You can remain hidden while casting this spell.",
    "cost": "Action + Level 2 Spell Slot",
    "damage": "2d6 Fire",
    "save": "DEX",
    "range": "18 m (60 ft)",
    "aoe": "2 m (7 ft) Radius",
    "damageMin": 2,
    "damageMax": 12,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Fire"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level deals an extra 1d6 Fire damage for each spell slot level above 2nd.",
    "upcastDice": {
      "count": 1,
      "size": 6
    },
    "classes": [
      "Druid",
      "Wizard"
    ],
    "subclasses": [
      "Light Domain",
      "Arcane Trickster",
      "Eldritch Knight"
    ],
    "races": [],
    "availability": [
      {
        "name": "Druid",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Light Domain",
        "kind": "subclass",
        "level": 3,
        "via": "Domain Spell"
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 8,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 8,
        "via": null
      }
    ],
    "icon": "icons/spells/flaming-sphere.webp",
    "wiki": "https://bg3.wiki/wiki/Flaming_Sphere"
  },
  {
    "id": "fleeting-dream",
    "name": "Fleeting Dream",
    "level": 2,
    "school": "Conjuration",
    "desc": "Surrounded by silver mist, you teleport to an unoccupied space you can see.",
    "cost": "Bonus Action + Level 2 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/fleeting-dream.webp",
    "wiki": "https://bg3.wiki/wiki/Fleeting_Dream"
  },
  {
    "id": "flesh-to-gold",
    "name": "Flesh to Gold",
    "level": 6,
    "school": "Transmutation",
    "desc": "Restrain a target and, after 3 rounds, the target becomes inactive solid gold until the spell ends. The target will Petrify if it does not succeed its Saving Throw within 3 turns. [ See Notes ]",
    "cost": "Action + Level 6 Spell Slot",
    "damage": null,
    "save": "CON",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/flesh-to-gold.webp",
    "wiki": "https://bg3.wiki/wiki/Flesh_to_Gold"
  },
  {
    "id": "flesh-to-stone",
    "name": "Flesh to Stone",
    "level": 6,
    "school": "Transmutation",
    "desc": "Atrophy a foe, Restraining them until they temporarily turn to stone. The target will Petrify if it does not succeed its Saving Throw within 3 turns. [ See Notes ]",
    "cost": "Action + Level 6 Spell Slot",
    "damage": null,
    "save": "CON",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Wizard",
      "Warlock"
    ],
    "subclasses": [],
    "races": [],
    "availability": [
      {
        "name": "Wizard",
        "kind": "class",
        "level": 11,
        "via": null
      },
      {
        "name": "Warlock",
        "kind": "class",
        "level": 11,
        "via": null
      }
    ],
    "icon": "icons/spells/flesh-to-stone.webp",
    "wiki": "https://bg3.wiki/wiki/Flesh_to_Stone"
  },
  {
    "id": "fly-bonus-action",
    "name": "Fly (bonus action)",
    "level": 3,
    "school": "Transmutation",
    "desc": "Bestow the ability to Fly upon yourself.",
    "cost": "Bonus Action",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/fly-bonus-action.webp",
    "wiki": "https://bg3.wiki/wiki/Fly_(bonus_action)"
  },
  {
    "id": "fog-cloud",
    "name": "Fog Cloud",
    "level": 1,
    "school": "Conjuration",
    "desc": "Create a cloud of dense fog to Heavily Obscure and Blind creatures within.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": "4.5 m (15 ft) Radius",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "When this spell is cast at 2nd level or higher, its area of effect increases by 2 m (7 ft) for each spell slot level above 1st.",
    "upcastDice": null,
    "classes": [
      "Druid",
      "Sorcerer",
      "Wizard",
      "Ranger"
    ],
    "subclasses": [
      "Tempest Domain",
      "Draconic Bloodline",
      "Arcane Trickster",
      "Eldritch Knight"
    ],
    "races": [],
    "availability": [
      {
        "name": "Druid",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Tempest Domain",
        "kind": "subclass",
        "level": 1,
        "via": "Domain Spell"
      },
      {
        "name": "Draconic Bloodline",
        "kind": "subclass",
        "level": 1,
        "via": "Bronze/Lightning Ancestry"
      },
      {
        "name": "Ranger",
        "kind": "class",
        "level": 2,
        "via": null
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 3,
        "via": null
      }
    ],
    "icon": "icons/spells/fog-cloud.webp",
    "wiki": "https://bg3.wiki/wiki/Fog_Cloud"
  },
  {
    "id": "forced-teleportation",
    "name": "Forced Teleportation",
    "level": 5,
    "school": "Enchantment",
    "desc": "Cazador forcibly teleports one of his vampire spawn to a nearby location.",
    "cost": "Bonus Action",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/forced-teleportation.webp",
    "wiki": "https://bg3.wiki/wiki/Forced_Teleportation"
  },
  {
    "id": "formsculpt-tressym",
    "name": "Formsculpt: Tressym",
    "level": 9,
    "school": "Transmutation",
    "desc": "Rearrange a creature's very being into the image of Gale's darling pet. If the tressym's hit points drop to 0, the target reverts to its original form with its original hit points.",
    "cost": "Bonus Action",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit. Condition: Polymorphed (Tressym) Polymorphed Duration: 5 turns Changed into a beast.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/formsculpt-tressym.webp",
    "wiki": "https://bg3.wiki/wiki/Formsculpt:_Tressym"
  },
  {
    "id": "fox-s-cunning",
    "name": "Fox's Cunning",
    "level": 2,
    "school": "Transmutation",
    "desc": "Creature gains Advantage on Intelligence Checks.",
    "cost": "Action + Level 2 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "When this Spell is cast at 3rd level or higher, you can target an additional creature for each spell slot level above 2nd.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/fox-s-cunning.webp",
    "wiki": "https://bg3.wiki/wiki/Fox%27s_Cunning"
  },
  {
    "id": "freedom-of-movement",
    "name": "Freedom of Movement",
    "level": 4,
    "school": "Abjuration",
    "desc": "Snap an ally out of any Stun. Difficult Terrain can't slow them down, and they can't be magically Paralysed or Restrained. If the target is restrained by non-magical means, it can spend 1.5 m (5 ft) of Movement to free itself.",
    "cost": "Action + Level 4 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Bard",
      "Cleric",
      "Druid"
    ],
    "subclasses": [
      "War Domain",
      "Tempest Domain",
      "Circle of the Land"
    ],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 7,
        "via": null
      },
      {
        "name": "Cleric",
        "kind": "class",
        "level": 7,
        "via": null
      },
      {
        "name": "Druid",
        "kind": "class",
        "level": 7,
        "via": null
      },
      {
        "name": "War Domain",
        "kind": "subclass",
        "level": 7,
        "via": "Domain Spell"
      },
      {
        "name": "Tempest Domain",
        "kind": "subclass",
        "level": 7,
        "via": "Domain Spell"
      },
      {
        "name": "Circle of the Land",
        "kind": "subclass",
        "level": 7,
        "via": "Coast or Grassland"
      }
    ],
    "icon": "icons/spells/freedom-of-movement.webp",
    "wiki": "https://bg3.wiki/wiki/Freedom_of_Movement"
  },
  {
    "id": "friends",
    "name": "Friends",
    "level": 0,
    "school": "Enchantment",
    "desc": "Gain Advantage on Charisma Checks against a non- hostile creature. This spell can be cast while you are Silenced. In higher difficulty modes, the target might accuse you of enchanting them.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "9 m (30 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": null,
    "upcastDice": null,
    "classes": [
      "Bard",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "subclasses": [
      "Eldritch Knight",
      "Arcane Trickster"
    ],
    "races": [
      "High Elf",
      "High Half-Elf"
    ],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Warlock",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "High Elf",
        "kind": "race",
        "level": 1,
        "via": null
      },
      {
        "name": "High Half-Elf",
        "kind": "race",
        "level": 1,
        "via": null
      }
    ],
    "icon": "icons/spells/friends.webp",
    "wiki": "https://bg3.wiki/wiki/Friends"
  },
  {
    "id": "frost-of-dark-winter",
    "name": "Frost of Dark Winter",
    "level": 4,
    "school": "Evocation",
    "desc": "Embrace Kereska's ice to gain resistance to Cold damage. Your cold spells deal additional Cold damage equal to your proficiency bonus. When you deal spell damage, inflict 2 turns [ See Notes ] of Frost upon the target. While attuned to Kereska's ice you can cast Cone of Cold and Ice Storm each on...",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/frost-of-dark-winter.webp",
    "wiki": "https://bg3.wiki/wiki/Frost_of_Dark_Winter"
  },
  {
    "id": "gaseous-form",
    "name": "Gaseous Form",
    "level": 3,
    "school": "Transmutation",
    "desc": "Transform yourself or an ally into a tiny gas cloud. It can't fall, and fits through small openings. It is very hard to damage. The cloud has Advantage on Constitution, Dexterity, and Strength Saving Throws. While transformed, the target won't be able to attack, cast spells, or talk.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Sorcerer",
      "Warlock",
      "Wizard",
      "Bard"
    ],
    "subclasses": [
      "Circle of the Spores",
      "Circle of the Land",
      "College of Lore",
      "Swarmkeeper"
    ],
    "races": [],
    "availability": [
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Warlock",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Circle of the Spores",
        "kind": "subclass",
        "level": 5,
        "via": "Circle Spell"
      },
      {
        "name": "Circle of the Land",
        "kind": "subclass",
        "level": 5,
        "via": "Underdark"
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Swarmkeeper",
        "kind": "subclass",
        "level": 9,
        "via": null
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/gaseous-form.webp",
    "wiki": "https://bg3.wiki/wiki/Gaseous_Form"
  },
  {
    "id": "ghoulish-touch",
    "name": "Ghoulish Touch",
    "level": 1,
    "school": "Necromancy",
    "desc": "Lash out with deadly claws and possibly Paralyse the target. Elves and undead cannot be Paralysed by this attack.",
    "cost": "Action",
    "damage": "2d6 Necrotic",
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": 2,
    "damageMax": 12,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Necrotic"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/ghoulish-touch.webp",
    "wiki": "https://bg3.wiki/wiki/Ghoulish_Touch"
  },
  {
    "id": "githborn-flying-boots",
    "name": "Githborn: Flying Boots",
    "level": 3,
    "school": "Transmutation",
    "desc": "Bestow the ability to Fly upon yourself.",
    "cost": "Bonus Action",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/githborn-flying-boots.webp",
    "wiki": "https://bg3.wiki/wiki/Githborn:_Flying_Boots"
  },
  {
    "id": "githyanki-psionics-jump",
    "name": "Githyanki Psionics: Jump",
    "level": 1,
    "school": "Transmutation",
    "desc": "Triple a creature's Jumping distance.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [
      "Githyanki"
    ],
    "availability": [
      {
        "name": "Githyanki",
        "kind": "race",
        "level": 3,
        "via": null
      }
    ],
    "icon": "icons/spells/githyanki-psionics-jump.webp",
    "wiki": "https://bg3.wiki/wiki/Githyanki_Psionics:_Jump"
  },
  {
    "id": "githyanki-psionics-mage-hand",
    "name": "Githyanki Psionics: Mage Hand",
    "level": 0,
    "school": "Conjuration",
    "desc": "Create an invisible spectral hand that can manipulate and interact with objects.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": null,
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [
      "Githyanki"
    ],
    "availability": [
      {
        "name": "Githyanki",
        "kind": "race",
        "level": 1,
        "via": null
      }
    ],
    "icon": "icons/spells/githyanki-psionics-mage-hand.webp",
    "wiki": "https://bg3.wiki/wiki/Githyanki_Psionics:_Mage_Hand"
  },
  {
    "id": "glacial-age",
    "name": "Glacial Age",
    "level": 3,
    "school": "Transmutation",
    "desc": "Gain a +1 bonus to Attack Rolls and deals an additional 1d4 Cold damage.",
    "cost": "Bonus Action",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/glacial-age.webp",
    "wiki": "https://bg3.wiki/wiki/Glacial_Age"
  },
  {
    "id": "globe-of-invulnerability",
    "name": "Globe of Invulnerability",
    "level": 6,
    "school": "Abjuration",
    "desc": "Create a barrier that makes creatures and objects inside it immune to all damage.",
    "cost": "Action + Level 6 Spell Slot",
    "damage": null,
    "save": null,
    "range": "3 m (10 ft)",
    "aoe": "3 m (10 ft) Radius",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "subclasses": [],
    "races": [],
    "availability": [
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 11,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 11,
        "via": null
      }
    ],
    "icon": "icons/spells/globe-of-invulnerability.webp",
    "wiki": "https://bg3.wiki/wiki/Globe_of_Invulnerability"
  },
  {
    "id": "glyph-of-warding",
    "name": "Glyph of Warding",
    "level": 3,
    "school": "Abjuration",
    "desc": "Inscribe a circle of arcane glyphs on the ground. When stepped on by an enemy the selected magical effect will trigger. The glyph will last until triggered, or until a Long Rest. Only one glyph can be active at a time.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": "DEX",
    "range": "9 m (30 ft)",
    "aoe": "4 m (13 ft) Radius",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Acid",
      "Lightning",
      "Cold",
      "Fire",
      "Thunder"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "See each individual variant's page.",
    "upcastDice": null,
    "classes": [
      "Bard",
      "Cleric",
      "Wizard"
    ],
    "subclasses": [],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Cleric",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 5,
        "via": null
      }
    ],
    "icon": "icons/spells/glyph-of-warding.webp",
    "wiki": "https://bg3.wiki/wiki/Glyph_of_Warding"
  },
  {
    "id": "glyph-of-warding-acid",
    "name": "Glyph of Warding: Acid",
    "level": 3,
    "school": "Abjuration",
    "desc": "The glyph explodes, dealing Acid damage to enemies in the vicinity. Creatures who pass the Dexterity Saving Throw still take half damage. The glyph will last until triggered, or until a Long Rest. Only one glyph can be active at a time.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": "5d8 Acid",
    "save": "DEX",
    "range": "9 m (30 ft)",
    "aoe": "4 m (13 ft) Radius",
    "damageMin": 5,
    "damageMax": 40,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Acid"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level deals an extra 1d8 Acid damage for each spell slot level above 3rd.",
    "upcastDice": {
      "count": 1,
      "size": 8
    },
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/glyph-of-warding-acid.webp",
    "wiki": "https://bg3.wiki/wiki/Glyph_of_Warding:_Acid"
  },
  {
    "id": "glyph-of-warding-cold",
    "name": "Glyph of Warding: Cold",
    "level": 3,
    "school": "Abjuration",
    "desc": "The glyph explodes, dealing Cold damage to enemies in the vicinity. Creatures who pass the Dexterity Saving Throw still take half damage. The glyph will last until triggered, or until a Long Rest. Only one glyph can be active at a time.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": "5d8 Cold",
    "save": "DEX",
    "range": "9 m (30 ft)",
    "aoe": "4 m (13 ft) Radius",
    "damageMin": 5,
    "damageMax": 40,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Cold"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level deals an extra 1d8 Cold damage for each spell slot level above 3rd.",
    "upcastDice": {
      "count": 1,
      "size": 8
    },
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/glyph-of-warding-cold.webp",
    "wiki": "https://bg3.wiki/wiki/Glyph_of_Warding:_Cold"
  },
  {
    "id": "glyph-of-warding-detonation",
    "name": "Glyph of Warding: Detonation",
    "level": 3,
    "school": "Abjuration",
    "desc": "The glyph emits a gust of wind that pushes back everyone within range when stepped on by an enemy. Any creatures within the area of effect that fail the Dexterity Saving Throw will be pushed back. The glyph will last until triggered, or until a Long Rest. Only one glyph can be active at a time.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": "DEX",
    "range": "9 m (30 ft)",
    "aoe": "4 m (13 ft) Radius",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/glyph-of-warding-detonation.webp",
    "wiki": "https://bg3.wiki/wiki/Glyph_of_Warding:_Detonation"
  },
  {
    "id": "glyph-of-warding-fire",
    "name": "Glyph of Warding: Fire",
    "level": 3,
    "school": "Abjuration",
    "desc": "The glyph explodes, dealing Fire damage to enemies in the vicinity. Creatures who pass the Dexterity Saving Throw still take half damage. The glyph will last until triggered, or until a Long Rest. Only one glyph can be active at a time.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": "5d8 Fire",
    "save": "DEX",
    "range": "9 m (30 ft)",
    "aoe": "4 m (13 ft) Radius",
    "damageMin": 5,
    "damageMax": 40,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Fire"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level deals an extra 1d8 Fire damage for each spell slot level above 3rd.",
    "upcastDice": {
      "count": 1,
      "size": 8
    },
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/glyph-of-warding-fire.webp",
    "wiki": "https://bg3.wiki/wiki/Glyph_of_Warding:_Fire"
  },
  {
    "id": "glyph-of-warding-lightning",
    "name": "Glyph of Warding: Lightning",
    "level": 3,
    "school": "Abjuration",
    "desc": "The glyph explodes, dealing Lightning damage to enemies in the vicinity. Creatures who pass the Dexterity Saving Throw still take half damage. The glyph will last until triggered, or until a Long Rest. Only one glyph can be active at a time.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": "5d8 Lightning",
    "save": "DEX",
    "range": "9 m (30 ft)",
    "aoe": "4 m (13 ft) Radius",
    "damageMin": 5,
    "damageMax": 40,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Lightning"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level deals an extra 1d8 Lightning damage for each spell slot level above 3rd.",
    "upcastDice": {
      "count": 1,
      "size": 8
    },
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/glyph-of-warding-lightning.webp",
    "wiki": "https://bg3.wiki/wiki/Glyph_of_Warding:_Lightning"
  },
  {
    "id": "glyph-of-warding-sleep",
    "name": "Glyph of Warding: Sleep",
    "level": 3,
    "school": "Abjuration",
    "desc": "The glyph emits a soothing magic that puts everyone within range to Sleep when stepped on by an enemy. Any creatures within the area of effect (that aren't immune to magical sleep) that fail the Dexterity Saving Throw will be put to Sleep. The glyph will last until triggered, or until a Long Rest...",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": "DEX",
    "range": "9 m (30 ft)",
    "aoe": "4 m (13 ft) Radius",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/glyph-of-warding-sleep.webp",
    "wiki": "https://bg3.wiki/wiki/Glyph_of_Warding:_Sleep"
  },
  {
    "id": "glyph-of-warding-thunder",
    "name": "Glyph of Warding: Thunder",
    "level": 3,
    "school": "Abjuration",
    "desc": "The glyph explodes, dealing Thunder damage to enemies in the vicinity. Creatures who pass the Dexterity Saving Throw still take half damage. The glyph will last until triggered, or until a Long Rest. Only one glyph can be active at a time.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": "5d8 Thunder",
    "save": "DEX",
    "range": "9 m (30 ft)",
    "aoe": "4 m (13 ft) Radius",
    "damageMin": 5,
    "damageMax": 40,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Thunder"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level deals an extra 1d8 Thunder damage for each spell slot level above 3rd.",
    "upcastDice": {
      "count": 1,
      "size": 8
    },
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/glyph-of-warding-thunder.webp",
    "wiki": "https://bg3.wiki/wiki/Glyph_of_Warding:_Thunder"
  },
  {
    "id": "goodberry",
    "name": "Goodberry",
    "level": 1,
    "school": "Transmutation",
    "desc": "Conjure four magical berries for yourself or a companion. Creatures who eat a berry regain 1d4 Hit Points. Each berry counts as one Camp Supplies. The berries appear in the targeted creature's inventory and disappear after a Long Rest.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "9 m (30 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Druid",
      "Ranger"
    ],
    "subclasses": [],
    "races": [],
    "availability": [
      {
        "name": "Druid",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Ranger",
        "kind": "class",
        "level": 2,
        "via": null
      }
    ],
    "icon": "icons/spells/goodberry.webp",
    "wiki": "https://bg3.wiki/wiki/Goodberry"
  },
  {
    "id": "grant-flight",
    "name": "Grant Flight",
    "level": 3,
    "school": "Transmutation",
    "desc": "Bestow the ability to Fly upon yourself or an ally.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": null,
    "range": "9 m (30 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Affects an additional target for each spell slot level above 3rd.",
    "upcastDice": null,
    "classes": [
      "Sorcerer",
      "Warlock",
      "Wizard",
      "Bard"
    ],
    "subclasses": [
      "Circle of the Land",
      "College of Lore"
    ],
    "races": [],
    "availability": [
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Warlock",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Circle of the Land",
        "kind": "subclass",
        "level": 5,
        "via": "Mountain"
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/grant-flight.webp",
    "wiki": "https://bg3.wiki/wiki/Grant_Flight"
  },
  {
    "id": "grasping-vine",
    "name": "Grasping Vine",
    "level": 4,
    "school": "Conjuration",
    "desc": "Summon a giant vine capable of dragging creatures toward itself.",
    "cost": "Bonus Action + Level 4 Spell Slot",
    "damage": null,
    "save": null,
    "range": "9 m (30 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Druid"
    ],
    "subclasses": [
      "Nature Domain",
      "Circle of the Land"
    ],
    "races": [],
    "availability": [
      {
        "name": "Druid",
        "kind": "class",
        "level": 7,
        "via": null
      },
      {
        "name": "Nature Domain",
        "kind": "subclass",
        "level": 7,
        "via": "Domain Spell"
      },
      {
        "name": "Circle of the Land",
        "kind": "subclass",
        "level": 7,
        "via": "Forest or Swamp"
      }
    ],
    "icon": "icons/spells/grasping-vine.webp",
    "wiki": "https://bg3.wiki/wiki/Grasping_Vine"
  },
  {
    "id": "grave-repulsion",
    "name": "Grave Repulsion",
    "level": 1,
    "school": "Evocation",
    "desc": "Release an ectoplasmic pulse that knocks living creatures back 8 m (27 ft).",
    "cost": null,
    "damage": "3d8 Necrotic",
    "save": "CON",
    "range": "9 m (30 ft)",
    "aoe": "5 m (17 ft) Cube",
    "damageMin": 3,
    "damageMax": 24,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Necrotic"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/grave-repulsion.webp",
    "wiki": "https://bg3.wiki/wiki/Grave_Repulsion"
  },
  {
    "id": "grease",
    "name": "Grease",
    "level": 1,
    "school": "Conjuration",
    "desc": "Cover the ground in flammable grease. It becomes Difficult Terrain and creatures within can fall Prone.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": "DEX",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Wizard"
    ],
    "subclasses": [
      "Draconic Bloodline",
      "Arcane Trickster",
      "Eldritch Knight"
    ],
    "races": [],
    "availability": [
      {
        "name": "Wizard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Draconic Bloodline",
        "kind": "subclass",
        "level": 1,
        "via": "Black/Acid Ancestry"
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 3,
        "via": null
      }
    ],
    "icon": "icons/spells/grease.webp",
    "wiki": "https://bg3.wiki/wiki/Grease"
  },
  {
    "id": "greater-invisibility",
    "name": "Greater Invisibility",
    "level": 4,
    "school": "Illusion",
    "desc": "Turn a creature Invisible. Attacks against it have Disadvantage. It attacks with Advantage. Invisibility breaks when you fail increasingly harder Stealth Checks on attacking, casting spells, or interacting with items.",
    "cost": "Action + Level 4 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Bard",
      "Sorcerer",
      "Wizard"
    ],
    "subclasses": [
      "Circle of the Land",
      "The Archfey",
      "The Hexblade"
    ],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 7,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 7,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 7,
        "via": null
      },
      {
        "name": "Circle of the Land",
        "kind": "subclass",
        "level": 7,
        "via": "Underdark"
      },
      {
        "name": "The Archfey",
        "kind": "subclass",
        "level": 7,
        "via": null
      },
      {
        "name": "The Hexblade",
        "kind": "subclass",
        "level": 7,
        "via": null
      }
    ],
    "icon": "icons/spells/greater-invisibility.webp",
    "wiki": "https://bg3.wiki/wiki/Greater_Invisibility"
  },
  {
    "id": "greater-restoration",
    "name": "Greater Restoration",
    "level": 5,
    "school": "Abjuration",
    "desc": "Touch a creature and negate any Charm, Petrification, Stun, or Curse.",
    "cost": "Action + Level 5 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Bard",
      "Cleric",
      "Druid"
    ],
    "subclasses": [
      "Life Domain",
      "Circle of the Land"
    ],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 9,
        "via": null
      },
      {
        "name": "Cleric",
        "kind": "class",
        "level": 9,
        "via": null
      },
      {
        "name": "Druid",
        "kind": "class",
        "level": 9,
        "via": null
      },
      {
        "name": "Life Domain",
        "kind": "subclass",
        "level": 9,
        "via": "Domain Spell"
      },
      {
        "name": "Circle of the Land",
        "kind": "subclass",
        "level": 9,
        "via": "Coast or Grassland"
      }
    ],
    "icon": "icons/spells/greater-restoration.webp",
    "wiki": "https://bg3.wiki/wiki/Greater_Restoration"
  },
  {
    "id": "guardian-of-faith",
    "name": "Guardian of Faith",
    "level": 4,
    "school": "Conjuration",
    "desc": "Call forth a divine guardian that attacks nearby enemies. Every time it deals damage, the guardian loses an equal amount of Hit Points.",
    "cost": "Action + Level 4 Spell Slot",
    "damage": null,
    "save": null,
    "range": "9 m (30 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Cleric",
      "Bard"
    ],
    "subclasses": [
      "Light Domain",
      "Life Domain"
    ],
    "races": [],
    "availability": [
      {
        "name": "Cleric",
        "kind": "class",
        "level": 7,
        "via": null
      },
      {
        "name": "Light Domain",
        "kind": "subclass",
        "level": 7,
        "via": "Domain Spell"
      },
      {
        "name": "Life Domain",
        "kind": "subclass",
        "level": 7,
        "via": "Domain Spell"
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/guardian-of-faith.webp",
    "wiki": "https://bg3.wiki/wiki/Guardian_of_Faith"
  },
  {
    "id": "guidance",
    "name": "Guidance",
    "level": 0,
    "school": "Divination",
    "desc": "The target gains +1d4 bonus to Ability Checks.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "9 m (30 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": null,
    "upcastDice": null,
    "classes": [
      "Cleric",
      "Druid",
      "Warlock"
    ],
    "subclasses": [
      "Circle of the Stars",
      "Arcane Archer"
    ],
    "races": [],
    "availability": [
      {
        "name": "Cleric",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Druid",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Circle of the Stars",
        "kind": "subclass",
        "level": 2,
        "via": null
      },
      {
        "name": "Warlock",
        "kind": "class",
        "level": 3,
        "via": "Pact of the Tome"
      },
      {
        "name": "Arcane Archer",
        "kind": "subclass",
        "level": 3,
        "via": null
      }
    ],
    "icon": "icons/spells/guidance.webp",
    "wiki": "https://bg3.wiki/wiki/Guidance"
  },
  {
    "id": "guiding-bolt",
    "name": "Guiding Bolt",
    "level": 1,
    "school": "Evocation",
    "desc": "The next attack roll against this target has Advantage.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": "4d6 Radiant",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 4,
    "damageMax": 24,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Radiant"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Deals an additional 1d6 Radiant damage per level.",
    "upcastDice": {
      "count": 1,
      "size": 6
    },
    "classes": [
      "Cleric",
      "Bard"
    ],
    "subclasses": [
      "Circle of the Stars",
      "College of Lore"
    ],
    "races": [],
    "availability": [
      {
        "name": "Cleric",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Circle of the Stars",
        "kind": "subclass",
        "level": 2,
        "via": null
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/guiding-bolt.webp",
    "wiki": "https://bg3.wiki/wiki/Guiding_Bolt"
  },
  {
    "id": "gust-of-wind",
    "name": "Gust of Wind",
    "level": 2,
    "school": "Evocation",
    "desc": "Summon a strong wind that clears all clouds. Any creatures caught in the gale who fail a Strength Saving Throw will be pushed back 5 m (17 ft) and be thrown Off Balance.",
    "cost": "Action + Level 2 Spell Slot",
    "damage": null,
    "save": "STR",
    "range": "Self",
    "aoe": "12 m (40 ft) Line",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Druid",
      "Sorcerer",
      "Wizard"
    ],
    "subclasses": [
      "Tempest Domain",
      "Storm Sorcery",
      "Eldritch Knight",
      "Arcane Trickster"
    ],
    "races": [],
    "availability": [
      {
        "name": "Druid",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Tempest Domain",
        "kind": "subclass",
        "level": 3,
        "via": "Domain Spell"
      },
      {
        "name": "Storm Sorcery",
        "kind": "subclass",
        "level": 6,
        "via": "Storm Spell"
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 7,
        "via": null
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 8,
        "via": null
      }
    ],
    "icon": "icons/spells/gust-of-wind.webp",
    "wiki": "https://bg3.wiki/wiki/Gust_of_Wind"
  },
  {
    "id": "hail-of-thorns",
    "name": "Hail of Thorns",
    "level": 1,
    "school": "Conjuration",
    "desc": "Shoot a volley of thorns. The thorns deal weapon damage to the target and then explode. The explosion deals an additional 1d10 Piercing damage to the target and surrounding creatures. On miss, the thorns still explode. On save, targets still take half damage from the explosion.",
    "cost": "Action + Bonus Action + Level 1 Spell Slot",
    "damage": "1d10 Piercing",
    "save": "DEX",
    "range": "18 m (60 ft)",
    "aoe": "2 m (7 ft) Radius",
    "damageMin": 1,
    "damageMax": 10,
    "attackRoll": true,
    "halfOnSave": true,
    "damageTypes": [
      "Piercing"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "When the spell is cast at 2nd Level or higher, the addition AoE damage increases by 1d10 Piercing for each spell slot level above 1st.",
    "upcastDice": {
      "count": 1,
      "size": 10
    },
    "classes": [
      "Ranger"
    ],
    "subclasses": [],
    "races": [],
    "availability": [
      {
        "name": "Ranger",
        "kind": "class",
        "level": 2,
        "via": null
      }
    ],
    "icon": "icons/spells/hail-of-thorns.webp",
    "wiki": "https://bg3.wiki/wiki/Hail_of_Thorns"
  },
  {
    "id": "harm",
    "name": "Harm",
    "level": 6,
    "school": "Necromancy",
    "desc": "Reduce a target's maximum Hit Points, but never below 1.",
    "cost": "Action + Level 6 Spell Slot",
    "damage": "14d6 Necrotic",
    "save": "CON",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 14,
    "damageMax": 84,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Necrotic"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Cleric"
    ],
    "subclasses": [],
    "races": [],
    "availability": [
      {
        "name": "Cleric",
        "kind": "class",
        "level": 11,
        "via": null
      }
    ],
    "icon": "icons/spells/harm.webp",
    "wiki": "https://bg3.wiki/wiki/Harm"
  },
  {
    "id": "harvest-soul",
    "name": "Harvest Soul",
    "level": 6,
    "school": "Enchantment",
    "desc": "Speak a word of fiendish destruction to instantly kill a creature with less than a third of its hit points, leaving it with a Severed Soul.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/harvest-soul.webp",
    "wiki": "https://bg3.wiki/wiki/Harvest_Soul"
  },
  {
    "id": "haste",
    "name": "Haste",
    "level": 3,
    "school": "Transmutation",
    "desc": "Target yourself or an ally to become Hastened. The creature has a +2 bonus to Armour Class, Advantage on Dexterity Saving Throws, its Movement Speed is doubled, and can take one additional Action per turn. When the condition ends, the creature becomes Lethargic.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": null,
    "range": "9 m (30 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Sorcerer",
      "Wizard",
      "Warlock",
      "Bard"
    ],
    "subclasses": [
      "Circle of the Land",
      "College of Lore",
      "Oath of Vengeance"
    ],
    "races": [],
    "availability": [
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Circle of the Land",
        "kind": "subclass",
        "level": 5,
        "via": "Arctic or Grassland"
      },
      {
        "name": "Warlock",
        "kind": "class",
        "level": 5,
        "via": "Pact of the Tome once per long rest"
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Oath of Vengeance",
        "kind": "subclass",
        "level": 9,
        "via": null
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/haste.webp",
    "wiki": "https://bg3.wiki/wiki/Haste"
  },
  {
    "id": "heal",
    "name": "Heal",
    "level": 6,
    "school": "Evocation",
    "desc": "Heals a target's wounds and remove Blindness and any diseases. No effect on undead and constructs.",
    "cost": "Action + Level 6 Spell Slot Healing: 70 70 Healing",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Cleric",
      "Druid"
    ],
    "subclasses": [],
    "races": [],
    "availability": [
      {
        "name": "Cleric",
        "kind": "class",
        "level": 11,
        "via": null
      },
      {
        "name": "Druid",
        "kind": "class",
        "level": 11,
        "via": null
      }
    ],
    "icon": "icons/spells/heal.webp",
    "wiki": "https://bg3.wiki/wiki/Heal"
  },
  {
    "id": "healing-word",
    "name": "Healing Word",
    "level": 1,
    "school": "Evocation",
    "desc": "Heal a creature you can see. No effect on undead and constructs.",
    "cost": null,
    "damage": "1d4",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Heals an additional 1d4 Hit Points for each spell slot level above 1st.",
    "upcastDice": {
      "count": 1,
      "size": 4
    },
    "classes": [
      "Bard",
      "Cleric",
      "Druid"
    ],
    "subclasses": [],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Cleric",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Druid",
        "kind": "class",
        "level": 1,
        "via": null
      }
    ],
    "icon": "icons/spells/healing-word.webp",
    "wiki": "https://bg3.wiki/wiki/Healing_Word"
  },
  {
    "id": "heartwrench",
    "name": "Heartwrench",
    "level": 4,
    "school": "Illusion",
    "desc": "Rend a target with a psychic barrage after you or an ally is struck by a Heartform Mapped creature.",
    "cost": null,
    "damage": "10d12 Psychic",
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 10,
    "damageMax": 120,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Psychic"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/heartwrench.webp",
    "wiki": "https://bg3.wiki/wiki/Heartwrench"
  },
  {
    "id": "heat-metal",
    "name": "Heat Metal",
    "level": 2,
    "school": "Transmutation",
    "desc": "Cause a metal weapon or armour to glow red-hot and force the wearer to let go or receive Disadvantage on Attack Rolls and Ability Checks. If the creature is only wearing metal armour, it always receives Disadvantage. If the creature is still touching the metal, you can use a bonus action on subse...",
    "cost": "Action + Level 2 Spell Slot",
    "damage": "2d8 Fire",
    "save": "CON",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 2,
    "damageMax": 16,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Fire"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level deals an extra 1d8 Fire damage for each spell slot level above 2nd.",
    "upcastDice": {
      "count": 1,
      "size": 8
    },
    "classes": [
      "Bard",
      "Druid"
    ],
    "subclasses": [],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Druid",
        "kind": "class",
        "level": 3,
        "via": null
      }
    ],
    "icon": "icons/spells/heat-metal.webp",
    "wiki": "https://bg3.wiki/wiki/Heat_Metal"
  },
  {
    "id": "heat-metal-reapply-damage",
    "name": "Heat Metal: Reapply Damage",
    "level": 2,
    "school": "Transmutation",
    "desc": "Cause a metal Weapon or Armour to glow red-hot and force the creature touching it to let go or receive Disadvantage on Attack Rolls and Ability Checks. If the creature is only wearing metal armour, it always receives Disadvantage. If the creature is still touching the metal, you can use a Bonus A...",
    "cost": "Bonus Action",
    "damage": "2d8 Fire",
    "save": "CON",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 2,
    "damageMax": 16,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Fire"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting Heat Metal at a higher level deals an extra 1d8 Fire damage for each spell slot level above 2nd when reapplying it.",
    "upcastDice": {
      "count": 1,
      "size": 8
    },
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/heat-metal-reapply-damage.webp",
    "wiki": "https://bg3.wiki/wiki/Heat_Metal:_Reapply_Damage"
  },
  {
    "id": "hellfire-curse",
    "name": "Hellfire Curse",
    "level": 1,
    "school": null,
    "desc": "Induce a spark of hellfire within a target to give them Disadvantage on Strength, Dexterity, and Constitution Saving Throws",
    "cost": "Bonus Action",
    "damage": null,
    "save": "WIS",
    "range": "9 m (30 ft)",
    "aoe": "6 m (20 ft) Radius",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/hellfire-curse.webp",
    "wiki": "https://bg3.wiki/wiki/Hellfire_Curse"
  },
  {
    "id": "hellfire-orb",
    "name": "Hellfire Orb",
    "level": 6,
    "school": "Evocation",
    "desc": "Hurl an exploding ball of hellfire that damages all nearby creatures and objects. Hellfire ignores resistance and immunity to Fire damage.",
    "cost": "Action",
    "damage": "20d6 Fire",
    "save": "DEX",
    "range": "18 m (60 ft)",
    "aoe": "4 m (13 ft) Radius",
    "damageMin": 20,
    "damageMax": 120,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Fire"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/hellfire-orb.webp",
    "wiki": "https://bg3.wiki/wiki/Hellfire_Orb"
  },
  {
    "id": "hellflame-cleave",
    "name": "Hellflame Cleave",
    "level": 0,
    "school": null,
    "desc": "Spew hellish flames and strike your foes. Hellfire ignores resistance and immunity to Fire damage.",
    "cost": "Action",
    "damage": "2d6 Fire",
    "save": "DEX",
    "range": "18 m (60 ft)",
    "aoe": "3 m (10 ft) Cone",
    "damageMin": 2,
    "damageMax": 12,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Fire"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": null,
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/hellflame-cleave.webp",
    "wiki": "https://bg3.wiki/wiki/Hellflame_Cleave"
  },
  {
    "id": "hellish-rebuke",
    "name": "Hellish Rebuke",
    "level": 1,
    "school": "Evocation",
    "desc": "React to your next attacker with flames that deal 2d10 Fire damage. On a successful save, the target still takes half damage.",
    "cost": "Reaction + Level 1 Spell Slot",
    "damage": "2d10 Fire",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 2,
    "damageMax": 20,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Fire"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Deals an additional 1d10 Fire damage per level.",
    "upcastDice": {
      "count": 1,
      "size": 10
    },
    "classes": [
      "Warlock",
      "Bard"
    ],
    "subclasses": [
      "Oathbreaker",
      "College of Lore"
    ],
    "races": [],
    "availability": [
      {
        "name": "Warlock",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Oathbreaker",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/hellish-rebuke.webp",
    "wiki": "https://bg3.wiki/wiki/Hellish_Rebuke"
  },
  {
    "id": "heroes-feast",
    "name": "Heroes' Feast",
    "level": 6,
    "school": "Conjuration",
    "desc": "You and everyone around can't be Poisoned, Diseased, or Frightened (status group). Everyone's maximum Hit Points increases by 12, and they make Wisdom Saving Throws with Advantage.",
    "cost": "Action + Level 6 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": "18 m (60 ft) Radius",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Cleric",
      "Druid"
    ],
    "subclasses": [],
    "races": [],
    "availability": [
      {
        "name": "Cleric",
        "kind": "class",
        "level": 11,
        "via": null
      },
      {
        "name": "Druid",
        "kind": "class",
        "level": 11,
        "via": null
      }
    ],
    "icon": "icons/spells/heroes-feast.webp",
    "wiki": "https://bg3.wiki/wiki/Heroes%27_Feast"
  },
  {
    "id": "heroism",
    "name": "Heroism",
    "level": 1,
    "school": "Enchantment",
    "desc": "Make yourself or a target immune to Frightened and gain 5 Temporary Hit Points each turn. Can only have Temporary Hit Points from one source.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Affects an additional target for each spell slot level above 1st.",
    "upcastDice": null,
    "classes": [
      "Bard",
      "Paladin"
    ],
    "subclasses": [],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Paladin",
        "kind": "class",
        "level": 2,
        "via": null
      }
    ],
    "icon": "icons/spells/heroism.webp",
    "wiki": "https://bg3.wiki/wiki/Heroism"
  },
  {
    "id": "hex",
    "name": "Hex",
    "level": 1,
    "school": "Enchantment",
    "desc": "Make your attacks deal an additional 1d6 Necrotic damage to the target and give it Disadvantage on an Ability of your choosing. If the target dies before the spell ends, you can Reapply Hex to a new creature without expending a Spell Slot.",
    "cost": "Bonus Action + Level 1 Spell Slot",
    "damage": "1d6 Necrotic",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 1,
    "damageMax": 6,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Necrotic"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Warlock",
      "Bard"
    ],
    "subclasses": [
      "College of Lore"
    ],
    "races": [],
    "availability": [
      {
        "name": "Warlock",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/hex.webp",
    "wiki": "https://bg3.wiki/wiki/Hex"
  },
  {
    "id": "hex-charisma",
    "name": "Hex (Charisma)",
    "level": 1,
    "school": "Enchantment",
    "desc": "Deal an additional 1d6 Necrotic damage when you attack the target and impart Disadvantage on Charisma Checks.",
    "cost": "Bonus Action + Level 1 Spell Slot",
    "damage": "1d6 Necrotic",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 1,
    "damageMax": 6,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Necrotic"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/hex-charisma.webp",
    "wiki": "https://bg3.wiki/wiki/Hex_(Charisma)"
  },
  {
    "id": "hex-constitution",
    "name": "Hex (Constitution)",
    "level": 1,
    "school": "Enchantment",
    "desc": "Deal an additional 1d6 Necrotic damage when you attack the target and impart Disadvantage on Constitution Checks.",
    "cost": "Bonus Action + Level 1 Spell Slot",
    "damage": "1d6 Necrotic",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 1,
    "damageMax": 6,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Necrotic"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/hex-constitution.webp",
    "wiki": "https://bg3.wiki/wiki/Hex_(Constitution)"
  },
  {
    "id": "hex-dexterity",
    "name": "Hex (Dexterity)",
    "level": 1,
    "school": "Enchantment",
    "desc": "Deal an additional 1d6 Necrotic damage when you attack the target and impart Disadvantage on Dexterity Checks.",
    "cost": "Bonus Action + Level 1 Spell Slot",
    "damage": "1d6 Necrotic",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 1,
    "damageMax": 6,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Necrotic"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/hex-dexterity.webp",
    "wiki": "https://bg3.wiki/wiki/Hex_(Dexterity)"
  },
  {
    "id": "hex-intelligence",
    "name": "Hex (Intelligence)",
    "level": 1,
    "school": "Enchantment",
    "desc": "Deal an additional 1d6 Necrotic damage when you attack the target and impart Disadvantage on Intelligence Checks.",
    "cost": "Bonus Action + Level 1 Spell Slot",
    "damage": "1d6 Necrotic",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 1,
    "damageMax": 6,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Necrotic"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/hex-intelligence.webp",
    "wiki": "https://bg3.wiki/wiki/Hex_(Intelligence)"
  },
  {
    "id": "hex-strength",
    "name": "Hex (Strength)",
    "level": 1,
    "school": "Enchantment",
    "desc": "Deal an additional 1d6 Necrotic damage when you attack the target and impart Disadvantage on Strength Checks.",
    "cost": "Bonus Action + Level 1 Spell Slot",
    "damage": "1d6 Necrotic",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 1,
    "damageMax": 6,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Necrotic"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/hex-strength.webp",
    "wiki": "https://bg3.wiki/wiki/Hex_(Strength)"
  },
  {
    "id": "hex-wisdom",
    "name": "Hex (Wisdom)",
    "level": 1,
    "school": "Enchantment",
    "desc": "Deal an additional 1d6 Necrotic damage when you attack the target and impart Disadvantage on Wisdom Checks.",
    "cost": "Bonus Action + Level 1 Spell Slot",
    "damage": "1d6 Necrotic",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 1,
    "damageMax": 6,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Necrotic"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/hex-wisdom.webp",
    "wiki": "https://bg3.wiki/wiki/Hex_(Wisdom)"
  },
  {
    "id": "hold-monster",
    "name": "Hold Monster",
    "level": 5,
    "school": "Enchantment",
    "desc": "Paralyse a creature. It can't move, act, or react. Attacks from within 3 m (10 ft) are always critical hits. No effect on undead.",
    "cost": "Action + Level 5 Spell Slot",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Affects an additional target for each spell slot level above 5th.",
    "upcastDice": null,
    "classes": [
      "Bard",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "subclasses": [
      "War Domain"
    ],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 9,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 9,
        "via": null
      },
      {
        "name": "Warlock",
        "kind": "class",
        "level": 9,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 9,
        "via": null
      },
      {
        "name": "War Domain",
        "kind": "subclass",
        "level": 9,
        "via": "Domain Spell"
      }
    ],
    "icon": "icons/spells/hold-monster.webp",
    "wiki": "https://bg3.wiki/wiki/Hold_Monster"
  },
  {
    "id": "hold-person",
    "name": "Hold Person",
    "level": 2,
    "school": "Enchantment",
    "desc": "Hold a humanoid enemy still. They can't move, act, or react. Attacks from within 3 m (10 ft) are always Critical Hits. At the end of each turn, the affected creature can make a Wisdom Saving Throw to end this condition.",
    "cost": "Action + Level 2 Spell Slot",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Affects an additional target for each spell slot level above 2nd.",
    "upcastDice": null,
    "classes": [
      "Bard",
      "Cleric",
      "Druid",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "subclasses": [
      "Circle of the Land",
      "Oath of Vengeance",
      "Arcane Trickster",
      "Eldritch Knight"
    ],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Cleric",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Druid",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Warlock",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Circle of the Land",
        "kind": "subclass",
        "level": 3,
        "via": "Arctic and Forest"
      },
      {
        "name": "Oath of Vengeance",
        "kind": "subclass",
        "level": 5,
        "via": null
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 7,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 8,
        "via": null
      }
    ],
    "icon": "icons/spells/hold-person.webp",
    "wiki": "https://bg3.wiki/wiki/Hold_Person"
  },
  {
    "id": "hordestrike",
    "name": "Hordestrike",
    "level": 4,
    "school": "Evocation",
    "desc": "Launch a hammer of spectral force at a creature your minions are attacking.",
    "cost": null,
    "damage": "4d8 Force",
    "save": "DEX",
    "range": "16 m (53 ft)",
    "aoe": null,
    "damageMin": 4,
    "damageMax": 32,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Force"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/hordestrike.webp",
    "wiki": "https://bg3.wiki/wiki/Hordestrike"
  },
  {
    "id": "howl-of-the-dead",
    "name": "Howl of the Dead",
    "level": 0,
    "school": null,
    "desc": "Let out a bone-chilling howl that Numbs all nearby creatures.",
    "cost": "Bonus Action",
    "damage": null,
    "save": "WIS",
    "range": "16 m (53 ft)",
    "aoe": "3 m (10 ft) Radius",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": null,
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/howl-of-the-dead.webp",
    "wiki": "https://bg3.wiki/wiki/Howl_of_the_Dead"
  },
  {
    "id": "hunger-of-hadar",
    "name": "Hunger of Hadar",
    "level": 3,
    "school": "Conjuration",
    "desc": "Creatures within this black sphere are Blinded and take damage at the end of their turn and the start of their turn. Creatures starting their turn in the area take 2d6 Cold damage. Creatures ending their turn in the area possibly take 2d6 Acid damage. The area is Difficult Terrain.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": "2d6 Cold",
    "save": "DEX",
    "range": "18 m (60 ft)",
    "aoe": "6 m (20 ft) Radius",
    "damageMin": 4,
    "damageMax": 24,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Cold",
      "Acid"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Warlock",
      "Bard"
    ],
    "subclasses": [
      "College of Lore"
    ],
    "races": [],
    "availability": [
      {
        "name": "Warlock",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/hunger-of-hadar.webp",
    "wiki": "https://bg3.wiki/wiki/Hunger_of_Hadar"
  },
  {
    "id": "hunter-s-mark",
    "name": "Hunter's Mark",
    "level": 1,
    "school": "Divination",
    "desc": "Mark a creature as your quarry to deal an additional 1d6 Weapon damage whenever you hit it with a weapon attack. If the target dies before the spell ends, you can use Reapply Hunter's Mark to mark a new creature.",
    "cost": "Bonus Action + Level 1 Spell Slot",
    "damage": "1d6 Weapon",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 1,
    "damageMax": 6,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Ranger",
      "Bard"
    ],
    "subclasses": [
      "Oath of Vengeance",
      "College of Lore"
    ],
    "races": [],
    "availability": [
      {
        "name": "Ranger",
        "kind": "class",
        "level": 2,
        "via": null
      },
      {
        "name": "Oath of Vengeance",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/hunter-s-mark.webp",
    "wiki": "https://bg3.wiki/wiki/Hunter%27s_Mark"
  },
  {
    "id": "hypnotic-pattern",
    "name": "Hypnotic Pattern",
    "level": 3,
    "school": "Illusion",
    "desc": "Hypnotise creatures that can see the pattern. They cannot attack you. They cannot move nor act. This spell can be cast while you are Silenced.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": "9 m (30 ft) Radius",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Bard",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "subclasses": [
      "Circle of the Land"
    ],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Warlock",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Circle of the Land",
        "kind": "subclass",
        "level": 5,
        "via": "Desert"
      }
    ],
    "icon": "icons/spells/hypnotic-pattern.webp",
    "wiki": "https://bg3.wiki/wiki/Hypnotic_Pattern"
  },
  {
    "id": "ice-knife",
    "name": "Ice Knife",
    "level": 1,
    "school": "Conjuration",
    "desc": "Throw a shard of ice that deals 1d10 Piercing damage. It explodes and deals 2d6 Cold damage to anyone nearby. It leaves an Ice surface. On miss, the shard of ice still explodes. This spell can be cast while you are Silenced.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": "1d10 Piercing",
    "save": "DEX",
    "range": "18 m (60 ft)",
    "aoe": "2 m (7 ft) Radius",
    "damageMin": 3,
    "damageMax": 22,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Piercing",
      "Cold"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Upcast: Casting this spell at a higher level deals an extra 1d6 Cold damage for each Spell Slot Level above 1st.",
    "upcastDice": null,
    "classes": [
      "Druid",
      "Sorcerer",
      "Wizard",
      "Bard"
    ],
    "subclasses": [
      "Arcane Trickster",
      "Eldritch Knight",
      "College of Lore"
    ],
    "races": [],
    "availability": [
      {
        "name": "Druid",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/ice-knife.webp",
    "wiki": "https://bg3.wiki/wiki/Ice_Knife"
  },
  {
    "id": "ice-storm",
    "name": "Ice Storm",
    "level": 4,
    "school": "Evocation",
    "desc": "Impel a storm of hail and ice to crash from the sky, covering the ground and striking all objects and creatures within range, dealing Bludgeoning and Cold damage. It also creates an Ice surface that lasts 2 turns.",
    "cost": "Action + Level 4 Spell Slot",
    "damage": "2d8 Bludgeoning",
    "save": "DEX",
    "range": "18 m (60 ft)",
    "aoe": "6 m (20 ft) Radius",
    "damageMin": 6,
    "damageMax": 40,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Bludgeoning",
      "Cold"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level deals an extra 1d8 Bludgeoning damage for each spell slot level above 4th.",
    "upcastDice": {
      "count": 1,
      "size": 8
    },
    "classes": [
      "Druid",
      "Sorcerer",
      "Wizard",
      "Bard"
    ],
    "subclasses": [
      "Tempest Domain",
      "Circle of the Land"
    ],
    "races": [],
    "availability": [
      {
        "name": "Druid",
        "kind": "class",
        "level": 7,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 7,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 7,
        "via": null
      },
      {
        "name": "Tempest Domain",
        "kind": "subclass",
        "level": 7,
        "via": "Domain Spell"
      },
      {
        "name": "Circle of the Land",
        "kind": "subclass",
        "level": 7,
        "via": "Arctic"
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/ice-storm.webp",
    "wiki": "https://bg3.wiki/wiki/Ice_Storm"
  },
  {
    "id": "igniting-spark",
    "name": "Igniting Spark",
    "level": 4,
    "school": "Evocation",
    "desc": "Launch a mote of infernal flame to set a target alight and Burn it.",
    "cost": "Action",
    "damage": "6d6 Fire",
    "save": "DEX",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 6,
    "damageMax": 36,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Fire"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/igniting-spark.webp",
    "wiki": "https://bg3.wiki/wiki/Igniting_Spark"
  },
  {
    "id": "improved-minor-illusion",
    "name": "Improved Minor Illusion",
    "level": 0,
    "school": "Illusion",
    "desc": "You can cast Minor Illusion as a bonus action.",
    "cost": "Bonus Action",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": null,
    "upcastDice": null,
    "classes": [],
    "subclasses": [
      "Illusion School"
    ],
    "races": [],
    "availability": [
      {
        "name": "Illusion School",
        "kind": "subclass",
        "level": 2,
        "via": null
      }
    ],
    "icon": "icons/spells/improved-minor-illusion.webp",
    "wiki": "https://bg3.wiki/wiki/Improved_Minor_Illusion"
  },
  {
    "id": "incinerate",
    "name": "Incinerate",
    "level": 6,
    "school": "Evocation",
    "desc": "Spend 2 souls to wreath a target in malevolent flame.",
    "cost": "Action",
    "damage": "8d8 Fire",
    "save": "DEX",
    "range": "18 m (60 ft)",
    "aoe": "3 m (10 ft) Radius",
    "damageMin": 8,
    "damageMax": 64,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Fire"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/incinerate.webp",
    "wiki": "https://bg3.wiki/wiki/Incinerate"
  },
  {
    "id": "infernal-legacy-hellish-rebuke",
    "name": "Infernal Legacy: Hellish Rebuke",
    "level": 1,
    "school": "Evocation",
    "desc": "React to your next attacker with flames that deal 3d10 Fire damage. On a successful save, the target still takes half damage.",
    "cost": "Reaction",
    "damage": "3d10 Fire",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 3,
    "damageMax": 30,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Fire"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/infernal-legacy-hellish-rebuke.webp",
    "wiki": "https://bg3.wiki/wiki/Infernal_Legacy:_Hellish_Rebuke"
  },
  {
    "id": "infernal-salve",
    "name": "Infernal Salve",
    "level": 6,
    "school": "Evocation",
    "desc": "Spend 1 soul to heal a Fiend. No effect on undead and constructs.",
    "cost": "Bonus Action Healing: 3~18 3d6 Healing",
    "damage": "3d6 Healing",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Heals an additional 1d4 Hit Points for each spell slot level above 1st.",
    "upcastDice": {
      "count": 1,
      "size": 4
    },
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/infernal-salve.webp",
    "wiki": "https://bg3.wiki/wiki/Infernal_Salve"
  },
  {
    "id": "inflict-wounds",
    "name": "Inflict Wounds",
    "level": 1,
    "school": "Necromancy",
    "desc": "Putrefy a creature with Necrotic energy filling your hands.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": "3d10 Necrotic",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 3,
    "damageMax": 30,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Necrotic"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Deals an additional 1d10 Necrotic damage per level.",
    "upcastDice": {
      "count": 1,
      "size": 10
    },
    "classes": [
      "Cleric"
    ],
    "subclasses": [
      "Oathbreaker"
    ],
    "races": [],
    "availability": [
      {
        "name": "Cleric",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Oathbreaker",
        "kind": "subclass",
        "level": 3,
        "via": "Oath Spell"
      }
    ],
    "icon": "icons/spells/inflict-wounds.webp",
    "wiki": "https://bg3.wiki/wiki/Inflict_Wounds"
  },
  {
    "id": "insect-plague",
    "name": "Insect Plague",
    "level": 5,
    "school": "Conjuration",
    "desc": "Locusts attack everyone within range, make the area Difficult Terrain, and impose Disadvantage on Perception Checks.",
    "cost": "Action + Level 5 Spell Slot",
    "damage": "4d10 Piercing",
    "save": "CON",
    "range": "18 m (60 ft)",
    "aoe": "6 m (20 ft) Radius",
    "damageMin": 4,
    "damageMax": 40,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Piercing"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level deals an extra 1d10 Piercing damage for each spell slot level above 5th.",
    "upcastDice": {
      "count": 1,
      "size": 10
    },
    "classes": [
      "Cleric",
      "Druid",
      "Sorcerer"
    ],
    "subclasses": [
      "Nature Domain",
      "Tempest Domain",
      "Circle of the Land"
    ],
    "races": [],
    "availability": [
      {
        "name": "Cleric",
        "kind": "class",
        "level": 9,
        "via": null
      },
      {
        "name": "Druid",
        "kind": "class",
        "level": 9,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 9,
        "via": null
      },
      {
        "name": "Nature Domain",
        "kind": "subclass",
        "level": 9,
        "via": "Domain Spell"
      },
      {
        "name": "Tempest Domain",
        "kind": "subclass",
        "level": 9,
        "via": "Domain Spell"
      },
      {
        "name": "Circle of the Land",
        "kind": "subclass",
        "level": 9,
        "via": "Desert/Grassland/Swamp"
      }
    ],
    "icon": "icons/spells/insect-plague.webp",
    "wiki": "https://bg3.wiki/wiki/Insect_Plague"
  },
  {
    "id": "invigorating-flame",
    "name": "Invigorating Flame",
    "level": 4,
    "school": "Conjuration",
    "desc": "Ignite the corpses of nearby grease elementals with revitalising flame, resurrecting them as lava elementals to fight beside you.",
    "cost": "Action + Level 4 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": "30 m (100 ft) Radius",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/invigorating-flame.webp",
    "wiki": "https://bg3.wiki/wiki/Invigorating_Flame"
  },
  {
    "id": "invisibility-duergar",
    "name": "Invisibility (Duergar)",
    "level": 0,
    "school": null,
    "desc": "Become Invisible.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": null,
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [
      "Duergar"
    ],
    "availability": [
      {
        "name": "Duergar",
        "kind": "race",
        "level": 5,
        "via": null
      }
    ],
    "icon": "icons/spells/invisibility-duergar.webp",
    "wiki": "https://bg3.wiki/wiki/Invisibility_(Duergar)"
  },
  {
    "id": "invisibility-spell",
    "name": "Invisibility (spell)",
    "level": 2,
    "school": "Illusion",
    "desc": "Touch a creature to turn it Invisible. Attacks against it have Disadvantage. It attacks with Advantage. Invisibility ends early if the invisible entity attacks, casts another spell, interacts with an object, takes an action or bonus action, or is damaged. [ See Notes ] Condition ends early if the...",
    "cost": "Action + Level 2 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Affects an additional target for each spell slot level above 2nd.",
    "upcastDice": null,
    "classes": [
      "Bard",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "subclasses": [
      "Circle of the Land",
      "Arcane Trickster",
      "Eldritch Knight"
    ],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Warlock",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Circle of the Land",
        "kind": "subclass",
        "level": 3,
        "via": "Grassland"
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 7,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 8,
        "via": null
      }
    ],
    "icon": "icons/spells/invisibility-spell.webp",
    "wiki": "https://bg3.wiki/wiki/Invisibility_(spell)"
  },
  {
    "id": "invocation-of-eternal-debt",
    "name": "Invocation of Eternal Debt",
    "level": 6,
    "school": "Conjuration",
    "desc": "Spend 1 soul to summon an Eternal Debtor to your side.",
    "cost": "Bonus Action",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/invocation-of-eternal-debt.webp",
    "wiki": "https://bg3.wiki/wiki/Invocation_of_Eternal_Debt"
  },
  {
    "id": "karsite-grip",
    "name": "Karsite Grip",
    "level": 6,
    "school": "Evocation",
    "desc": "Crush a creature's being with pure Netherese energy that can fork across to three other targets within 8m.",
    "cost": "Action",
    "damage": "8d8 Force",
    "save": "DEX",
    "range": "60 m (200 ft)",
    "aoe": null,
    "damageMin": 8,
    "damageMax": 64,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Force"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/karsite-grip.webp",
    "wiki": "https://bg3.wiki/wiki/Karsite_Grip"
  },
  {
    "id": "karsus-compulsion",
    "name": "Karsus' Compulsion",
    "level": 9,
    "school": "Enchantment",
    "desc": "Channel the stones' magic to control the Crown of Karsus and dominate the Netherbrain. The caster must channel this spell until their next turn for it to take effect. Ends if caster is Incapacitated, Stunned, Polymorphed, or Knocked Out.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "6 m (20 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/karsus-compulsion.webp",
    "wiki": "https://bg3.wiki/wiki/Karsus%27_Compulsion"
  },
  {
    "id": "keeper-s-fee",
    "name": "Keeper's Fee",
    "level": 5,
    "school": null,
    "desc": "Magically snatch a weapon from the target's hand.",
    "cost": "Bonus Action",
    "damage": null,
    "save": "DEX",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/keeper-s-fee.webp",
    "wiki": "https://bg3.wiki/wiki/Keeper%27s_Fee"
  },
  {
    "id": "kereska-s-favour",
    "name": "Kereska's Favour",
    "level": 4,
    "school": "Evocation",
    "desc": "Imbue yourself with elemental energy sourced from the draconic goddess, Kereska.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Fire",
      "Poison",
      "Lightning",
      "Cold",
      "Thunder",
      "Acid"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/kereska-s-favour.webp",
    "wiki": "https://bg3.wiki/wiki/Kereska%27s_Favour"
  },
  {
    "id": "khalid-s-gift-aid",
    "name": "Khalid's Gift: Aid",
    "level": 3,
    "school": "Abjuration",
    "desc": "Heal yourself and increase your hit point maximum by 10 hit points.",
    "cost": "Action Healing: 10 10 Healing",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/khalid-s-gift-aid.webp",
    "wiki": "https://bg3.wiki/wiki/Khalid%27s_Gift:_Aid"
  },
  {
    "id": "knock",
    "name": "Knock",
    "level": 2,
    "school": "Transmutation",
    "desc": "Unlock an object that is held shut by a mundane lock.",
    "cost": "Action + Level 2 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Bard",
      "Sorcerer",
      "Wizard"
    ],
    "subclasses": [
      "Arcane Trickster",
      "Eldritch Knight"
    ],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 8,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 8,
        "via": null
      }
    ],
    "icon": "icons/spells/knock.webp",
    "wiki": "https://bg3.wiki/wiki/Knock"
  },
  {
    "id": "legacy-of-avernus-branding-smite",
    "name": "Legacy of Avernus: Branding Smite",
    "level": 2,
    "school": "Evocation",
    "desc": "Your weapon gleams with astral radiance as you strike and possibly mark your targets with light, preventing it from turning Invisible.",
    "cost": "Action Cost on hit Bonus Action",
    "damage": "2d6 Radiant",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 2,
    "damageMax": 12,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Radiant"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [
      "Zariel Tiefling"
    ],
    "availability": [
      {
        "name": "Zariel Tiefling",
        "kind": "race",
        "level": 5,
        "via": null
      }
    ],
    "icon": "icons/spells/legacy-of-avernus-branding-smite.webp",
    "wiki": "https://bg3.wiki/wiki/Legacy_of_Avernus:_Branding_Smite"
  },
  {
    "id": "legacy-of-avernus-searing-smite",
    "name": "Legacy of Avernus: Searing Smite",
    "level": 1,
    "school": "Evocation",
    "desc": "Deal an extra 2d6 Fire and set your target on fire: it takes 1d6 Fire every turn.",
    "cost": "Action Cost on hit Bonus Action",
    "damage": "2d6 Fire",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 3,
    "damageMax": 18,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Fire"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [
      "Zariel Tiefling"
    ],
    "availability": [
      {
        "name": "Zariel Tiefling",
        "kind": "race",
        "level": 3,
        "via": null
      }
    ],
    "icon": "icons/spells/legacy-of-avernus-searing-smite.webp",
    "wiki": "https://bg3.wiki/wiki/Legacy_of_Avernus:_Searing_Smite"
  },
  {
    "id": "legacy-of-cania-burning-hands",
    "name": "Legacy of Cania: Burning Hands",
    "level": 1,
    "school": "Evocation",
    "desc": "Each flammable target is hit with 4d6 Fire damage.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": "4d6 Fire",
    "save": "DEX",
    "range": "Self",
    "aoe": "5 m (17 ft) Cone",
    "damageMin": 4,
    "damageMax": 24,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Fire"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [
      "Mephistopheles Tiefling"
    ],
    "availability": [
      {
        "name": "Mephistopheles Tiefling",
        "kind": "race",
        "level": 3,
        "via": null
      }
    ],
    "icon": "icons/spells/legacy-of-cania-burning-hands.webp",
    "wiki": "https://bg3.wiki/wiki/Legacy_of_Cania:_Burning_Hands"
  },
  {
    "id": "legacy-of-cania-flame-blade",
    "name": "Legacy of Cania: Flame Blade",
    "level": 2,
    "school": "Evocation",
    "desc": "Conjure a flaming Scimitar in your hand for 10 turns that deals 3d6 Fire damage. It sheds a bright light in a 3 m (10 ft) radius and a dim light in a 6 m (20 ft) radius. The blade can be unequipped and equipped again, but must stay on the spellcaster's person.",
    "cost": "Bonus Action",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [
      "Mephistopheles Tiefling"
    ],
    "availability": [
      {
        "name": "Mephistopheles Tiefling",
        "kind": "race",
        "level": 5,
        "via": null
      }
    ],
    "icon": "icons/spells/legacy-of-cania-flame-blade.webp",
    "wiki": "https://bg3.wiki/wiki/Legacy_of_Cania:_Flame_Blade"
  },
  {
    "id": "lesser-restoration",
    "name": "Lesser Restoration",
    "level": 2,
    "school": "Abjuration",
    "desc": "Cure a creature from Diseased, Poisoned, Paralysis, or Blinded.",
    "cost": "Action + Level 2 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Bard",
      "Cleric",
      "Druid",
      "Paladin",
      "Ranger"
    ],
    "subclasses": [
      "Life Domain",
      "Oath of Devotion"
    ],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Cleric",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Druid",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Life Domain",
        "kind": "subclass",
        "level": 3,
        "via": "Domain Spell"
      },
      {
        "name": "Paladin",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Ranger",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Oath of Devotion",
        "kind": "subclass",
        "level": 5,
        "via": "Oath Spell"
      }
    ],
    "icon": "icons/spells/lesser-restoration.webp",
    "wiki": "https://bg3.wiki/wiki/Lesser_Restoration"
  },
  {
    "id": "light",
    "name": "Light",
    "level": 0,
    "school": "Evocation",
    "desc": "Infuse an object with an aura of light. Only affects one target at a time.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": null,
    "upcastDice": null,
    "classes": [
      "Bard",
      "Cleric",
      "Sorcerer",
      "Wizard"
    ],
    "subclasses": [
      "Light Domain",
      "Arcane Archer",
      "Arcane Trickster",
      "Eldritch Knight"
    ],
    "races": [
      "High Elf",
      "High Half-Elf"
    ],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Cleric",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Light Domain",
        "kind": "subclass",
        "level": 1,
        "via": "Domain Spell"
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Arcane Archer",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "High Elf",
        "kind": "race",
        "level": 1,
        "via": null
      },
      {
        "name": "High Half-Elf",
        "kind": "race",
        "level": 1,
        "via": null
      }
    ],
    "icon": "icons/spells/light.webp",
    "wiki": "https://bg3.wiki/wiki/Light"
  },
  {
    "id": "lightning-arrow",
    "name": "Lightning Arrow",
    "level": 3,
    "school": "Transmutation",
    "desc": "After the arrow hits, smaller bolts snake out from the target towards nearby creatures.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": "4d8 Lightning",
    "save": "DEX",
    "range": "18 m (60 ft)",
    "aoe": "3 m (10 ft) Radius",
    "damageMin": 6,
    "damageMax": 48,
    "attackRoll": true,
    "halfOnSave": true,
    "damageTypes": [
      "Lightning"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "When the spell is cast at 4th level or higher, both the primary arrow damage and the burst damage increase by 1d8 Lightning for each spell slot level above 3rd.",
    "upcastDice": null,
    "classes": [
      "Ranger"
    ],
    "subclasses": [],
    "races": [],
    "availability": [
      {
        "name": "Ranger",
        "kind": "class",
        "level": 9,
        "via": null
      }
    ],
    "icon": "icons/spells/lightning-arrow.webp",
    "wiki": "https://bg3.wiki/wiki/Lightning_Arrow"
  },
  {
    "id": "lightning-bolt",
    "name": "Lightning Bolt",
    "level": 3,
    "school": "Evocation",
    "desc": "Call forth a blast of lightning that hits all creatures in the line of the eruption.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": "8d6 Lightning",
    "save": "DEX",
    "range": "Self",
    "aoe": "30 m (100 ft) Line",
    "damageMin": 8,
    "damageMax": 48,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Lightning"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level deals an extra 1d6 Lightning for each spell slot level above 3rd.",
    "upcastDice": {
      "count": 1,
      "size": 6
    },
    "classes": [
      "Sorcerer",
      "Wizard",
      "Bard"
    ],
    "subclasses": [
      "Circle of the Land",
      "College of Lore"
    ],
    "races": [],
    "availability": [
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Circle of the Land",
        "kind": "subclass",
        "level": 5,
        "via": "Mountain"
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/lightning-bolt.webp",
    "wiki": "https://bg3.wiki/wiki/Lightning_Bolt"
  },
  {
    "id": "longstrider",
    "name": "Longstrider",
    "level": 1,
    "school": "Transmutation",
    "desc": "Increase a creature's Movement Speed by 3 m (10 ft).",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Affect an additional target for each spell slot level above 1st.",
    "upcastDice": null,
    "classes": [
      "Bard",
      "Druid",
      "Wizard",
      "Ranger"
    ],
    "subclasses": [
      "Arcane Trickster",
      "Eldritch Knight"
    ],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Druid",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Ranger",
        "kind": "class",
        "level": 2,
        "via": null
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 3,
        "via": null
      }
    ],
    "icon": "icons/spells/longstrider.webp",
    "wiki": "https://bg3.wiki/wiki/Longstrider"
  },
  {
    "id": "lovely-assistant",
    "name": "Lovely Assistant",
    "level": 5,
    "school": "Necromancy",
    "desc": "The Surgeon reanimates the corpse of one of his nurses. The target must be a Medium or Small corpse.",
    "cost": "Bonus Action",
    "damage": null,
    "save": null,
    "range": "8 m (27 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/lovely-assistant.webp",
    "wiki": "https://bg3.wiki/wiki/Lovely_Assistant"
  },
  {
    "id": "luminous-arrow",
    "name": "Luminous Arrow",
    "level": 1,
    "school": "Evocation",
    "desc": "Shoot a luminous arrow at a target.",
    "cost": "Bonus Action",
    "damage": "1d8",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 1,
    "damageMax": 8,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Radiant"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "At Level 10, Twinkling Constellations increases the base damage to 2d8 Radiant.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [
      "Circle of the Stars"
    ],
    "races": [],
    "availability": [
      {
        "name": "Circle of the Stars",
        "kind": "subclass",
        "level": 2,
        "via": null
      }
    ],
    "icon": "icons/spells/luminous-arrow.webp",
    "wiki": "https://bg3.wiki/wiki/Luminous_Arrow"
  },
  {
    "id": "lunar-bulwark",
    "name": "Lunar Bulwark",
    "level": 1,
    "school": "Abjuration",
    "desc": "Bathe yourself in the shielding magic of Selûne's watchful gaze. The target can't be wearing Armour.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/lunar-bulwark.webp",
    "wiki": "https://bg3.wiki/wiki/Lunar_Bulwark"
  },
  {
    "id": "lunar-flare",
    "name": "Lunar Flare",
    "level": 2,
    "school": "Evocation",
    "desc": "Fire a mote of moonlight that spills roiling Holy Fire in a 2 m (7 ft) radius where it impacts.",
    "cost": "Action + Level 2 Spell Slot",
    "damage": "5d6 Radiant",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 5,
    "damageMax": 30,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Radiant"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/lunar-flare.webp",
    "wiki": "https://bg3.wiki/wiki/Lunar_Flare"
  },
  {
    "id": "lunar-smite",
    "name": "Lunar Smite",
    "level": 1,
    "school": "Evocation",
    "desc": "Engulf your weapon in Selûne's light, dealing an additional 1d6 Radiant damage and inflicting Holy Fire on a hit.",
    "cost": "on hit Bonus Action + Level 1 Spell Slot",
    "damage": "1d6 Radiant",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 2,
    "damageMax": 10,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Radiant"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/lunar-smite.webp",
    "wiki": "https://bg3.wiki/wiki/Lunar_Smite"
  },
  {
    "id": "mage-armour",
    "name": "Mage Armour",
    "level": 1,
    "school": "Abjuration",
    "desc": "Surround an unarmoured creature in a protective magical force. Its Armour Class increases to 13 + its Dexterity modifier. This effect does not stack with Unarmoured Defence. The target can't be wearing Armour.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "subclasses": [
      "Arcane Trickster",
      "Eldritch Knight"
    ],
    "races": [],
    "availability": [
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 3,
        "via": null
      }
    ],
    "icon": "icons/spells/mage-armour.webp",
    "wiki": "https://bg3.wiki/wiki/Mage_Armour"
  },
  {
    "id": "mage-hand",
    "name": "Mage Hand",
    "level": 0,
    "school": "Conjuration",
    "desc": "Create a spectral hand that can manipulate and interact with objects.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": null,
    "upcastDice": null,
    "classes": [
      "Bard",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "subclasses": [
      "Arcane Trickster",
      "Eldritch Knight",
      "Swarmkeeper"
    ],
    "races": [
      "High Elf",
      "High Half-Elf",
      "Mephistopheles Tiefling"
    ],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Warlock",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Swarmkeeper",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "High Elf",
        "kind": "race",
        "level": 1,
        "via": null
      },
      {
        "name": "High Half-Elf",
        "kind": "race",
        "level": 1,
        "via": null
      },
      {
        "name": "Mephistopheles Tiefling",
        "kind": "race",
        "level": 1,
        "via": null
      }
    ],
    "icon": "icons/spells/mage-hand.webp",
    "wiki": "https://bg3.wiki/wiki/Mage_Hand"
  },
  {
    "id": "magic-missile",
    "name": "Magic Missile",
    "level": 1,
    "school": "Evocation",
    "desc": "Create three darts of magical force, each dealing 1d4 + 1 Force damage to its target. The darts always hit their target, and can each be targeted individually.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": "1d4 + 1 Force",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 6,
    "damageMax": 15,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Force"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Creates one additional dart per level also dealing 1d4 + 1 Force.",
    "upcastDice": null,
    "classes": [
      "Sorcerer",
      "Wizard",
      "Bard"
    ],
    "subclasses": [
      "Arcane Trickster",
      "Eldritch Knight",
      "College of Lore"
    ],
    "races": [],
    "availability": [
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/magic-missile.webp",
    "wiki": "https://bg3.wiki/wiki/Magic_Missile"
  },
  {
    "id": "magic-missile-illithid-arcanist",
    "name": "Magic Missile (Illithid Arcanist)",
    "level": 1,
    "school": "Evocation",
    "desc": "Create six darts of magical force, each dealing 1d4 + 5 Force damage to its target. The darts always hit their target, and can each be targeted individually.",
    "cost": "Action",
    "damage": "6d4 + 30 Force",
    "save": null,
    "range": "30 m (100 ft)",
    "aoe": null,
    "damageMin": 36,
    "damageMax": 54,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Force"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/magic-missile-illithid-arcanist.webp",
    "wiki": "https://bg3.wiki/wiki/Magic_Missile_(Illithid_Arcanist)"
  },
  {
    "id": "magic-weapon",
    "name": "Magic Weapon",
    "level": 2,
    "school": "Transmutation",
    "desc": "Infuse a weapon with arcane energy. The weapon becomes magical, receiving a +1 bonus to Attack Rolls and Damage Rolls.",
    "cost": "Action + Level 2 Spell Slot",
    "damage": null,
    "save": null,
    "range": "30 m (100 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "The bonus increases by 1 for every two spell slot levels above 2nd (e.g., +2 at levels 4 and 5, and +3 at level 6).",
    "upcastDice": null,
    "classes": [
      "Wizard",
      "Paladin"
    ],
    "subclasses": [
      "War Domain",
      "Arcane Trickster",
      "Eldritch Knight"
    ],
    "races": [],
    "availability": [
      {
        "name": "Wizard",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "War Domain",
        "kind": "subclass",
        "level": 3,
        "via": "Domain Spell"
      },
      {
        "name": "Paladin",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 8,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 8,
        "via": null
      }
    ],
    "icon": "icons/spells/magic-weapon.webp",
    "wiki": "https://bg3.wiki/wiki/Magic_Weapon"
  },
  {
    "id": "mapped-terror-betrayal",
    "name": "Mapped Terror: Betrayal",
    "level": 4,
    "school": "Illusion",
    "desc": "Exploit the target's mapped fear to Frighten it and Dominate one of its allies.",
    "cost": "Action + Level 4 Spell Slot",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": "18 m (60 ft) Radius",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/mapped-terror-betrayal.webp",
    "wiki": "https://bg3.wiki/wiki/Mapped_Terror:_Betrayal"
  },
  {
    "id": "mapped-terror-ceremorphosis",
    "name": "Mapped Terror: Ceremorphosis",
    "level": 4,
    "school": "Illusion",
    "desc": "Exploit the target's mapped fear to make it believe it has undergone ceremorphosis.",
    "cost": "Action + Level 4 Spell Slot",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/mapped-terror-ceremorphosis.webp",
    "wiki": "https://bg3.wiki/wiki/Mapped_Terror:_Ceremorphosis"
  },
  {
    "id": "mapped-terror-darkness",
    "name": "Mapped Terror: Darkness",
    "level": 4,
    "school": "Illusion",
    "desc": "Exploit the target's mapped fear to Frighten it and inflict Blinding Sickness upon it.",
    "cost": "Action + Level 4 Spell Slot",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/mapped-terror-darkness.webp",
    "wiki": "https://bg3.wiki/wiki/Mapped_Terror:_Darkness"
  },
  {
    "id": "mapped-terror-disease",
    "name": "Mapped Terror: Disease",
    "level": 4,
    "school": "Illusion",
    "desc": "Exploit the target's mapped fear to Frighten it and inflict Flesh Rot upon it.",
    "cost": "Action + Level 4 Spell Slot",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/mapped-terror-disease.webp",
    "wiki": "https://bg3.wiki/wiki/Mapped_Terror:_Disease"
  },
  {
    "id": "mapped-terror-powerlessness",
    "name": "Mapped Terror: Powerlessness",
    "level": 4,
    "school": "Illusion",
    "desc": "Exploit the target's mapped fear to Frighten it and Rot its flesh.",
    "cost": "Action + Level 4 Spell Slot",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/mapped-terror-powerlessness.webp",
    "wiki": "https://bg3.wiki/wiki/Mapped_Terror:_Powerlessness"
  },
  {
    "id": "mapped-terror-spiders",
    "name": "Mapped Terror: Spiders",
    "level": 6,
    "school": "Illusion",
    "desc": "Exploit one of the target's deepest fears by transforming your followers into spiders.",
    "cost": "Action + Level 6 Spell Slot",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/mapped-terror-spiders.webp",
    "wiki": "https://bg3.wiki/wiki/Mapped_Terror:_Spiders"
  },
  {
    "id": "mapped-terror-wolves",
    "name": "Mapped Terror: Wolves",
    "level": 6,
    "school": "Illusion",
    "desc": "Exploit one of the target's deepest fears by transforming your followers into a pack of wolves.",
    "cost": "Action + Level 6 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/mapped-terror-wolves.webp",
    "wiki": "https://bg3.wiki/wiki/Mapped_Terror:_Wolves"
  },
  {
    "id": "mark-of-putrefaction",
    "name": "Mark of Putrefaction",
    "level": 4,
    "school": "Necromancy",
    "desc": "Mark a target to make it Vulnerable to Necrotic damage.",
    "cost": "Bonus Action",
    "damage": null,
    "save": null,
    "range": "12 m (40 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/mark-of-putrefaction.webp",
    "wiki": "https://bg3.wiki/wiki/Mark_of_Putrefaction"
  },
  {
    "id": "mass-cure-wounds",
    "name": "Mass Cure Wounds",
    "level": 5,
    "school": "Evocation",
    "desc": "Unleash a soothing hum of energy that heals you and nearby allies. No effect on Undead and Constructs",
    "cost": null,
    "damage": "3d8",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level heals an extra 1d8 Hit Points for each spell slot level above 5th.",
    "upcastDice": {
      "count": 1,
      "size": 8
    },
    "classes": [
      "Bard",
      "Cleric",
      "Druid"
    ],
    "subclasses": [
      "Circle of the Land",
      "Life Domain"
    ],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 9,
        "via": null
      },
      {
        "name": "Cleric",
        "kind": "class",
        "level": 9,
        "via": null
      },
      {
        "name": "Druid",
        "kind": "class",
        "level": 9,
        "via": null
      },
      {
        "name": "Circle of the Land",
        "kind": "subclass",
        "level": 9,
        "via": "Forest"
      },
      {
        "name": "Life Domain",
        "kind": "subclass",
        "level": 9,
        "via": "Domain Spell"
      }
    ],
    "icon": "icons/spells/mass-cure-wounds.webp",
    "wiki": "https://bg3.wiki/wiki/Mass_Cure_Wounds"
  },
  {
    "id": "mass-healing-word",
    "name": "Mass Healing Word",
    "level": 3,
    "school": "Evocation",
    "desc": "Heal your nearby allies. No effect on undead and constructs.",
    "cost": null,
    "damage": "1d4",
    "save": null,
    "range": "Self",
    "aoe": "18 m (60 ft) Radius",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "When this spell is cast using a 4th level slot or higher, targets heal an extra 1d4 Hit Points for each spell slot level above 3rd.",
    "upcastDice": {
      "count": 1,
      "size": 4
    },
    "classes": [
      "Cleric",
      "Bard"
    ],
    "subclasses": [
      "College of Lore"
    ],
    "races": [],
    "availability": [
      {
        "name": "Cleric",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/mass-healing-word.webp",
    "wiki": "https://bg3.wiki/wiki/Mass_Healing_Word"
  },
  {
    "id": "melf-s-acid-arrow",
    "name": "Melf's Acid Arrow",
    "level": 2,
    "school": "Evocation",
    "desc": "Shoot a green arrow that bursts in a spray of acid. Deals 4d4 Acid damage immediately and 2d4 Acid damage at the end of the target's next turn. If the spell misses, the target still takes half the initial damage, but no damage at the end of its next turn.",
    "cost": "Action + Level 2 Spell Slot",
    "damage": "4d4 Acid",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 6,
    "damageMax": 24,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Acid"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level deals an extra 2d4 Acid damage (1d4 Acid on impact and at the end of target's turn) for each spell slot level above 2nd.",
    "upcastDice": null,
    "classes": [
      "Wizard"
    ],
    "subclasses": [
      "Circle of the Land",
      "Eldritch Knight",
      "Arcane Trickster"
    ],
    "races": [],
    "availability": [
      {
        "name": "Wizard",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Circle of the Land",
        "kind": "subclass",
        "level": 3,
        "via": "Swamp"
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 7,
        "via": null
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 8,
        "via": null
      }
    ],
    "icon": "icons/spells/melf-s-acid-arrow.webp",
    "wiki": "https://bg3.wiki/wiki/Melf%27s_Acid_Arrow"
  },
  {
    "id": "mind-flayer-domination",
    "name": "Mind Flayer Domination",
    "level": 4,
    "school": "Enchantment",
    "desc": "Dominate a nearby humanoid. Allies are unaffected. Each time the dominated creature takes damage, it may repeat the Saving Throw against your domination. Tadpoled creatures cannot be targeted.",
    "cost": "Action",
    "damage": null,
    "save": "INT",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/mind-flayer-domination.webp",
    "wiki": "https://bg3.wiki/wiki/Mind_Flayer_Domination"
  },
  {
    "id": "mind-mastery",
    "name": "Mind Mastery",
    "level": 3,
    "school": "Enchantment",
    "desc": "Cause an enemy to make a weapon attack against one of its allies.",
    "cost": "Action",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/mind-mastery.webp",
    "wiki": "https://bg3.wiki/wiki/Mind_Mastery"
  },
  {
    "id": "mind-spike",
    "name": "Mind Spike",
    "level": 1,
    "school": "Enchantment",
    "desc": "Reach into an enemy's mind and impose Disadvantage on Wisdom Saving Throws.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": "2d8 Psychic",
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 2,
    "damageMax": 16,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Psychic"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/mind-spike.webp",
    "wiki": "https://bg3.wiki/wiki/Mind_Spike"
  },
  {
    "id": "minor-illusion",
    "name": "Minor Illusion",
    "level": 0,
    "school": "Illusion",
    "desc": "Create an illusion that compels nearby creatures to investigate. You can remain hidden while casting this spell. This spell can be cast while you are Silenced.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": null,
    "upcastDice": null,
    "classes": [
      "Bard",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "subclasses": [
      "Eldritch Knight",
      "Arcane Trickster",
      "Way of Shadow"
    ],
    "races": [
      "High Elf",
      "High Half-Elf"
    ],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Warlock",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Way of Shadow",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "High Elf",
        "kind": "race",
        "level": 1,
        "via": null
      },
      {
        "name": "High Half-Elf",
        "kind": "race",
        "level": 1,
        "via": null
      }
    ],
    "icon": "icons/spells/minor-illusion.webp",
    "wiki": "https://bg3.wiki/wiki/Minor_Illusion"
  },
  {
    "id": "mirror-image",
    "name": "Mirror Image",
    "level": 2,
    "school": "Illusion",
    "desc": "Create 3 illusory duplicates of yourself to distract attackers. Each duplicate increases your Armour Class by 3. Whenever you successfully evade an attack, one of the duplicates disappears.",
    "cost": "Action + Level 2 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "subclasses": [
      "Trickery Domain",
      "Circle of the Land",
      "Arcane Trickster",
      "Eldritch Knight"
    ],
    "races": [],
    "availability": [
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Warlock",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Trickery Domain",
        "kind": "subclass",
        "level": 3,
        "via": "Domain Spell"
      },
      {
        "name": "Circle of the Land",
        "kind": "subclass",
        "level": 3,
        "via": "Coast and Mountain"
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 7,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 8,
        "via": null
      }
    ],
    "icon": "icons/spells/mirror-image.webp",
    "wiki": "https://bg3.wiki/wiki/Mirror_Image"
  },
  {
    "id": "misty-step",
    "name": "Misty Step",
    "level": 2,
    "school": "Conjuration",
    "desc": "Surrounded by silver mist, you teleport to an unoccupied space you can see.",
    "cost": "Bonus Action + Level 2 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Sorcerer",
      "Warlock",
      "Wizard",
      "Bard"
    ],
    "subclasses": [
      "Circle of the Land",
      "Oath of the Ancients",
      "Oath of Vengeance",
      "Gloom Stalker",
      "College of Lore",
      "Arcane Trickster",
      "Eldritch Knight"
    ],
    "races": [
      "Githyanki"
    ],
    "availability": [
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Warlock",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Circle of the Land",
        "kind": "subclass",
        "level": 3,
        "via": "Coast and Underdark"
      },
      {
        "name": "Oath of the Ancients",
        "kind": "subclass",
        "level": 5,
        "via": "Oath Spell"
      },
      {
        "name": "Oath of Vengeance",
        "kind": "subclass",
        "level": 5,
        "via": "Oath Spell"
      },
      {
        "name": "Gloom Stalker",
        "kind": "subclass",
        "level": 5,
        "via": null
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 8,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 8,
        "via": null
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      },
      {
        "name": "Githyanki",
        "kind": "race",
        "level": 5,
        "via": null
      }
    ],
    "icon": "icons/spells/misty-step.webp",
    "wiki": "https://bg3.wiki/wiki/Misty_Step"
  },
  {
    "id": "moonbeam",
    "name": "Moonbeam",
    "level": 2,
    "school": "Evocation",
    "desc": "Call down a beam of light that damages any creatures that enters the beam or starts its turn in the light. You can use an Action to move the beam 18 m (60 ft).",
    "cost": "Action + Level 2 Spell Slot",
    "damage": "2d10 Radiant",
    "save": "CON",
    "range": "18 m (60 ft)",
    "aoe": "1 m (3 ft) Radius",
    "damageMin": 2,
    "damageMax": 20,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Radiant"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "When the spell is cast at 3rd level or higher, damage increases by 1d10 Radiant for each spell slot level above 2nd.",
    "upcastDice": {
      "count": 1,
      "size": 10
    },
    "classes": [
      "Druid"
    ],
    "subclasses": [
      "Oath of the Ancients"
    ],
    "races": [],
    "availability": [
      {
        "name": "Druid",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Oath of the Ancients",
        "kind": "subclass",
        "level": 5,
        "via": "Oath Spell"
      }
    ],
    "icon": "icons/spells/moonbeam.webp",
    "wiki": "https://bg3.wiki/wiki/Moonbeam"
  },
  {
    "id": "moonmote",
    "name": "Moonmote",
    "level": 0,
    "school": "Evocation",
    "desc": "Illuminate the area around you with wisps of moonish light that make movement difficult for enemies and bolster your allies' damage. At the start of their turn, each hostile creature within the light must succeed a Wisdom Saving Throw or they must treat the lighted area as Difficult Terrain. Each...",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": "9 m (30 ft) Radius",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": null,
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/moonmote.webp",
    "wiki": "https://bg3.wiki/wiki/Moonmote"
  },
  {
    "id": "move-moonbeam",
    "name": "Move Moonbeam",
    "level": 2,
    "school": "Evocation",
    "desc": "Move the beam of moonlight up to 18 m (60 ft). The beam of light damages any creature that enters the beam or starts its turn in the light.",
    "cost": "Action",
    "damage": "2d10 Radiant",
    "save": "CON",
    "range": "18 m (60 ft)",
    "aoe": "1 m (3 ft) Radius",
    "damageMin": 2,
    "damageMax": 20,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Radiant"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "When Moonbeam is cast at 3rd level or higher, this damage also increases by 1d10 Radiant for each spell slot level above 2nd.",
    "upcastDice": {
      "count": 1,
      "size": 10
    },
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/move-moonbeam.webp",
    "wiki": "https://bg3.wiki/wiki/Move_Moonbeam"
  },
  {
    "id": "murderous-cloud-of-daggers",
    "name": "Murderous Cloud of Daggers",
    "level": 2,
    "school": "Conjuration",
    "desc": "Conjure a cloud of spinning daggers that attack anyone inside.",
    "cost": "Action + Level 2 Spell Slot",
    "damage": "6d4 Piercing",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 6,
    "damageMax": 24,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Piercing"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level deals an extra 2d4 Piercing damage for each spell slot level above 2nd.",
    "upcastDice": {
      "count": 2,
      "size": 4
    },
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/murderous-cloud-of-daggers.webp",
    "wiki": "https://bg3.wiki/wiki/Murderous_Cloud_of_Daggers"
  },
  {
    "id": "mystic-carrion-s-vile-curse",
    "name": "Mystic Carrion's Vile Curse",
    "level": 6,
    "school": "Necromancy",
    "desc": "Bestow Mystic Carrion's Poisoned Curse on a foe. The curse will worsen over time unless the target can succeed a Saving Throw.",
    "cost": "Action",
    "damage": "2d10 Necrotic",
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 2,
    "damageMax": 20,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Necrotic"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/mystic-carrion-s-vile-curse.webp",
    "wiki": "https://bg3.wiki/wiki/Mystic_Carrion%27s_Vile_Curse"
  },
  {
    "id": "no-rest-for-the-wicked",
    "name": "No Rest for the Wicked",
    "level": 3,
    "school": "Necromancy",
    "desc": "Death is but a temporary inconvenience - raise a fallen undead with half of its hit points.",
    "cost": "Bonus Action",
    "damage": null,
    "save": null,
    "range": "3 m (10 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/no-rest-for-the-wicked.webp",
    "wiki": "https://bg3.wiki/wiki/No_Rest_for_the_Wicked"
  },
  {
    "id": "obliging-assistant",
    "name": "Obliging Assistant",
    "level": 4,
    "school": "Necromancy",
    "desc": "Heal The Surgeon.",
    "cost": null,
    "damage": "3d6",
    "save": null,
    "range": "3 m (10 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/obliging-assistant.webp",
    "wiki": "https://bg3.wiki/wiki/Obliging_Assistant"
  },
  {
    "id": "otiluke-s-conveniently-portable-freezing-sphere",
    "name": "Otiluke's Conveniently Portable Freezing Sphere",
    "level": 6,
    "school": "Evocation",
    "desc": "Create a vessel for Otiluke's Freezing Sphere. Put it in your pocket, give it to an ally, or throw it away. It will explode after 10 turn(s).",
    "cost": "Action + Level 6 Spell Slot",
    "damage": "10d6 Cold",
    "save": "CON",
    "range": "3 m (10 ft)",
    "aoe": null,
    "damageMin": 10,
    "damageMax": 60,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Cold"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/otiluke-s-conveniently-portable-freezing-sphere.webp",
    "wiki": "https://bg3.wiki/wiki/Otiluke%27s_Conveniently_Portable_Freezing_Sphere"
  },
  {
    "id": "otiluke-s-freezing-sphere",
    "name": "Otiluke's Freezing Sphere",
    "level": 6,
    "school": "Evocation",
    "desc": "Create a ball of churning ice that can be launched instantly to generate a frosty explosion or stored for later use.",
    "cost": "Action + Level 6 Spell Slot",
    "damage": "10d6 Cold",
    "save": "CON",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 10,
    "damageMax": 60,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Cold"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Wizard"
    ],
    "subclasses": [],
    "races": [],
    "availability": [
      {
        "name": "Wizard",
        "kind": "class",
        "level": 11,
        "via": null
      }
    ],
    "icon": "icons/spells/otiluke-s-freezing-sphere.webp",
    "wiki": "https://bg3.wiki/wiki/Otiluke%27s_Freezing_Sphere"
  },
  {
    "id": "otiluke-s-freezing-sphere-launch",
    "name": "Otiluke's Freezing Sphere (Launch)",
    "level": 6,
    "school": "Evocation",
    "desc": "Launch a ball of churning ice that explodes and damages all creatures and objects within range.",
    "cost": "Action + Level 6 Spell Slot",
    "damage": "10d6 Cold",
    "save": "CON",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 10,
    "damageMax": 60,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Cold"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/otiluke-s-freezing-sphere-launch.webp",
    "wiki": "https://bg3.wiki/wiki/Otiluke%27s_Freezing_Sphere_(Launch)"
  },
  {
    "id": "otiluke-s-resilient-sphere",
    "name": "Otiluke's Resilient Sphere",
    "level": 4,
    "school": "Evocation",
    "desc": "Enclose a target in a sphere of shimmering force, reducing its movement speed by half, and blocking all incoming and spell effects. The sphere reduces the target's movement speed by half, and also prevents it from casting spells or dealing damage. The target can't be Huge in size.",
    "cost": "Action + Level 4 Spell Slot",
    "damage": null,
    "save": null,
    "range": "9 m (30 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Wizard"
    ],
    "subclasses": [
      "Knowledge Domain"
    ],
    "races": [],
    "availability": [
      {
        "name": "Wizard",
        "kind": "class",
        "level": 7,
        "via": null
      },
      {
        "name": "Knowledge Domain",
        "kind": "subclass",
        "level": 7,
        "via": "Domain Spell"
      }
    ],
    "icon": "icons/spells/otiluke-s-resilient-sphere.webp",
    "wiki": "https://bg3.wiki/wiki/Otiluke%27s_Resilient_Sphere"
  },
  {
    "id": "otto-s-irresistible-dance",
    "name": "Otto's Irresistible Dance",
    "level": 6,
    "school": "Enchantment",
    "desc": "Cause a creature to start dancing, making it unable to take Actions or Move. Its attackers have Advantage on Attack Rolls. The dancer has Disadvantage on Attack Rolls and Dexterity Saving Throws.",
    "cost": "Action + Level 6 Spell Slot",
    "damage": null,
    "save": "WIS",
    "range": "9 m (30 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Bard",
      "Wizard"
    ],
    "subclasses": [],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 11,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 11,
        "via": null
      }
    ],
    "icon": "icons/spells/otto-s-irresistible-dance.webp",
    "wiki": "https://bg3.wiki/wiki/Otto%27s_Irresistible_Dance"
  },
  {
    "id": "overwhelming-grief",
    "name": "Overwhelming Grief",
    "level": 4,
    "school": "Necromancy",
    "desc": "The Justiciar strikes at their foe's brain with pure malice, inflicting Call of the Dark Lady",
    "cost": "Bonus Action",
    "damage": "1d8 Necrotic",
    "save": "CON",
    "range": "6 m (20 ft)",
    "aoe": "3 m (10 ft) Radius",
    "damageMin": 2,
    "damageMax": 12,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Necrotic"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/overwhelming-grief.webp",
    "wiki": "https://bg3.wiki/wiki/Overwhelming_Grief"
  },
  {
    "id": "owl-s-wisdom",
    "name": "Owl's Wisdom",
    "level": 2,
    "school": "Transmutation",
    "desc": "Creature gains Advantage on Wisdom Checks.",
    "cost": "Action + Level 2 Spell Slot",
    "damage": null,
    "save": null,
    "range": "6 m (20 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "When this Spell is cast at 3rd level or higher, you can target an additional creature for each spell slot level above 2nd.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/owl-s-wisdom.webp",
    "wiki": "https://bg3.wiki/wiki/Owl%27s_Wisdom"
  },
  {
    "id": "paralyzing-ray",
    "name": "Paralyzing Ray",
    "level": 3,
    "school": "Necromancy",
    "desc": "Paralyses its target.",
    "cost": "Action",
    "damage": null,
    "save": "CON",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/paralyzing-ray.webp",
    "wiki": "https://bg3.wiki/wiki/Paralyzing_Ray"
  },
  {
    "id": "pass-without-trace",
    "name": "Pass Without Trace",
    "level": 2,
    "school": "Abjuration",
    "desc": "Call forth a veil of shadow and silence that gives you and nearby allies a +10 bonus to Stealth Checks.",
    "cost": "Action + Level 2 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": "9 m (30 ft) Radius",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Druid",
      "Ranger",
      "Bard"
    ],
    "subclasses": [
      "Trickery Domain",
      "Circle of the Land",
      "College of Lore"
    ],
    "races": [],
    "availability": [
      {
        "name": "Druid",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Trickery Domain",
        "kind": "subclass",
        "level": 3,
        "via": "Domain Spell"
      },
      {
        "name": "Circle of the Land",
        "kind": "subclass",
        "level": 3,
        "via": "Grassland"
      },
      {
        "name": "Ranger",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/pass-without-trace.webp",
    "wiki": "https://bg3.wiki/wiki/Pass_Without_Trace"
  },
  {
    "id": "perturbing-visage",
    "name": "Perturbing Visage",
    "level": 5,
    "school": null,
    "desc": "Accentuate your unnatural form, Unnerving nearby creatures. No effect on undead.",
    "cost": "Action",
    "damage": null,
    "save": "WIS",
    "range": "Self",
    "aoe": "10 m (33 ft) Radius",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/perturbing-visage.webp",
    "wiki": "https://bg3.wiki/wiki/Perturbing_Visage"
  },
  {
    "id": "phantasmal-force",
    "name": "Phantasmal Force",
    "level": 2,
    "school": "Illusion",
    "desc": "Deal damage to a creature each turn. At the start of its turn, it takes Psychic damage. Each subsequent time it takes damage, the damage type of Phantasmal Force changes to match that damage type.",
    "cost": "Action + Level 2 Spell Slot",
    "damage": null,
    "save": "INT",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Bard",
      "Sorcerer",
      "Wizard"
    ],
    "subclasses": [
      "The Great Old One",
      "The Archfey",
      "Arcane Trickster",
      "Eldritch Knight"
    ],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "The Great Old One",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "The Archfey",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 7,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 8,
        "via": null
      }
    ],
    "icon": "icons/spells/phantasmal-force.webp",
    "wiki": "https://bg3.wiki/wiki/Phantasmal_Force"
  },
  {
    "id": "phantasmal-killer",
    "name": "Phantasmal Killer",
    "level": 4,
    "school": "Illusion",
    "desc": "Haunt a creature with illusions of its greatest fears. It takes 4d10 Psychic Damage per turn, cannot move, has Disadvantage on Ability Checks and Attack Rolls",
    "cost": "Action + Level 4 Spell Slot",
    "damage": "4d10 Psychic",
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 4,
    "damageMax": 40,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Psychic"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Upcast: When this spell is cast at 5th level or higher, it deals an additional 1d10 Psychic damage per level per turn.",
    "upcastDice": {
      "count": 1,
      "size": 10
    },
    "classes": [
      "Wizard"
    ],
    "subclasses": [
      "The Hexblade"
    ],
    "races": [],
    "availability": [
      {
        "name": "Wizard",
        "kind": "class",
        "level": 7,
        "via": null
      },
      {
        "name": "The Hexblade",
        "kind": "subclass",
        "level": 7,
        "via": null
      }
    ],
    "icon": "icons/spells/phantasmal-killer.webp",
    "wiki": "https://bg3.wiki/wiki/Phantasmal_Killer"
  },
  {
    "id": "pierce-the-weak",
    "name": "Pierce the Weak",
    "level": 1,
    "school": "Transmutation",
    "desc": "Make an enemy Vulnerable to Piercing damage. This effect lasts 3 turns, or until the target takes damage.",
    "cost": "Bonus Action",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/pierce-the-weak.webp",
    "wiki": "https://bg3.wiki/wiki/Pierce_the_Weak"
  },
  {
    "id": "planar-ally",
    "name": "Planar Ally",
    "level": 6,
    "school": "Conjuration",
    "desc": "Beseech one of these otherworldly entities for aid. Summon either an Elemental, Celestial, or Fiend to fight for you.",
    "cost": "Action + Level 6 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Cleric"
    ],
    "subclasses": [],
    "races": [],
    "availability": [
      {
        "name": "Cleric",
        "kind": "class",
        "level": 11,
        "via": null
      }
    ],
    "icon": "icons/spells/planar-ally.webp",
    "wiki": "https://bg3.wiki/wiki/Planar_Ally"
  },
  {
    "id": "planar-ally-cambion",
    "name": "Planar Ally: Cambion",
    "level": 6,
    "school": "Conjuration",
    "desc": "Conjure a Cambion to fight alongside you.",
    "cost": "Action + Level 6 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/planar-ally-cambion.webp",
    "wiki": "https://bg3.wiki/wiki/Planar_Ally:_Cambion"
  },
  {
    "id": "planar-ally-deva",
    "name": "Planar Ally: Deva",
    "level": 6,
    "school": "Conjuration",
    "desc": "Conjure a Celestial Deva to fight alongside you. It can cast Wrathful Smite, Revivify, and Concussive Smash.",
    "cost": "Action + Level 6 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/planar-ally-deva.webp",
    "wiki": "https://bg3.wiki/wiki/Planar_Ally:_Deva"
  },
  {
    "id": "planar-ally-deva-banite",
    "name": "Planar Ally: Deva (Banite)",
    "level": 6,
    "school": "Conjuration",
    "desc": "Conjure a Banite deva to fight alongside you. It can cast Wrathful Smite, Revivify and Concussive Smash.",
    "cost": "Action + Level 6 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/planar-ally-deva-banite.webp",
    "wiki": "https://bg3.wiki/wiki/Planar_Ally:_Deva_(Banite)"
  },
  {
    "id": "planar-ally-djinni",
    "name": "Planar Ally: Djinni",
    "level": 6,
    "school": "Conjuration",
    "desc": "Conjure a powerful djinni to fight alongside you. It can cast Sweetplum Gales, Thunderwave, and Drunken Inhale.",
    "cost": "Action + Level 6 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/planar-ally-djinni.webp",
    "wiki": "https://bg3.wiki/wiki/Planar_Ally:_Djinni"
  },
  {
    "id": "planar-binding",
    "name": "Planar Binding",
    "level": 5,
    "school": "Abjuration",
    "desc": "Target an otherworldly creature and attach its consciousness to your own. It will follow and fight for you as an ally. Target must be a Celestial, Elemental, Fey, or a Fiend.",
    "cost": "Action + Level 5 Spell Slot",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Bard",
      "Cleric",
      "Druid",
      "Wizard"
    ],
    "subclasses": [],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 9,
        "via": null
      },
      {
        "name": "Cleric",
        "kind": "class",
        "level": 9,
        "via": null
      },
      {
        "name": "Druid",
        "kind": "class",
        "level": 9,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 9,
        "via": null
      }
    ],
    "icon": "icons/spells/planar-binding.webp",
    "wiki": "https://bg3.wiki/wiki/Planar_Binding"
  },
  {
    "id": "plant-growth",
    "name": "Plant Growth",
    "level": 3,
    "school": "Transmutation",
    "desc": "Make weeds burst from the ground and smother the area. Creatures moving through the weeds have their Movement Speed quartered.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Bard",
      "Druid",
      "Ranger"
    ],
    "subclasses": [
      "The Archfey",
      "Nature Domain",
      "Circle of the Land",
      "Oath of the Ancients"
    ],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Druid",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "The Archfey",
        "kind": "subclass",
        "level": 5,
        "via": null
      },
      {
        "name": "Nature Domain",
        "kind": "subclass",
        "level": 5,
        "via": "Domain Spell"
      },
      {
        "name": "Circle of the Land",
        "kind": "subclass",
        "level": 5,
        "via": "Forest"
      },
      {
        "name": "Ranger",
        "kind": "class",
        "level": 9,
        "via": null
      },
      {
        "name": "Oath of the Ancients",
        "kind": "subclass",
        "level": 9,
        "via": "Oath Spell"
      }
    ],
    "icon": "icons/spells/plant-growth.webp",
    "wiki": "https://bg3.wiki/wiki/Plant_Growth"
  },
  {
    "id": "poison-spray",
    "name": "Poison Spray",
    "level": 0,
    "school": "Conjuration",
    "desc": "Project a puff of noxious gas, dealing 1d12 Poison to a target.",
    "cost": "Action",
    "damage": "1d12 Poison",
    "save": "CON",
    "range": "3 m (10 ft)",
    "aoe": null,
    "damageMin": 1,
    "damageMax": 12,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Poison"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [
      {
        "level": 5,
        "count": 2,
        "size": 12
      },
      {
        "level": 10,
        "count": 3,
        "size": 12
      }
    ],
    "upcast": null,
    "upcastDice": null,
    "classes": [
      "Druid",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "subclasses": [
      "Nature Domain",
      "Circle of the Land",
      "Eldritch Knight",
      "Arcane Trickster"
    ],
    "races": [
      "High Elf",
      "High Half-Elf"
    ],
    "availability": [
      {
        "name": "Druid",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Warlock",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Nature Domain",
        "kind": "subclass",
        "level": 1,
        "via": "Domain Spell"
      },
      {
        "name": "Circle of the Land",
        "kind": "subclass",
        "level": 2,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "High Elf",
        "kind": "race",
        "level": 1,
        "via": null
      },
      {
        "name": "High Half-Elf",
        "kind": "race",
        "level": 1,
        "via": null
      }
    ],
    "icon": "icons/spells/poison-spray.webp",
    "wiki": "https://bg3.wiki/wiki/Poison_Spray"
  },
  {
    "id": "polymorph",
    "name": "Polymorph",
    "level": 4,
    "school": "Transmutation",
    "desc": "Transform a creature into a harmless sheep. If the sheep's Hit Points drop to 0, the target reverts to its original form with its original Hit Points.",
    "cost": "Action + Level 4 Spell Slot",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Bard",
      "Druid",
      "Sorcerer",
      "Wizard"
    ],
    "subclasses": [
      "Circle of the Land",
      "Trickery Domain"
    ],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 7,
        "via": null
      },
      {
        "name": "Druid",
        "kind": "class",
        "level": 7,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 7,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 7,
        "via": null
      },
      {
        "name": "Circle of the Land",
        "kind": "subclass",
        "level": 7,
        "via": "Grassland"
      },
      {
        "name": "Trickery Domain",
        "kind": "subclass",
        "level": 7,
        "via": "Domain Spell"
      }
    ],
    "icon": "icons/spells/polymorph.webp",
    "wiki": "https://bg3.wiki/wiki/Polymorph"
  },
  {
    "id": "possession",
    "name": "Possession",
    "level": 5,
    "school": "Enchantment",
    "desc": "Possess a creature, forcing it to act according to your will and dealing 4d8 Necrotic damage to it every turn. While possessing another creature, you cannot be targeted by spells or attacks.",
    "cost": "Action",
    "damage": null,
    "save": "CHA",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/possession.webp",
    "wiki": "https://bg3.wiki/wiki/Possession"
  },
  {
    "id": "power-word-kill",
    "name": "Power Word Kill",
    "level": 9,
    "school": "Enchantment",
    "desc": "Compel an enemy with 100 Hit Points or fewer to die instantly. Limited to one use only.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/power-word-kill.webp",
    "wiki": "https://bg3.wiki/wiki/Power_Word_Kill"
  },
  {
    "id": "power-word-ruin",
    "name": "Power Word: Ruin",
    "level": 9,
    "school": "Transmutation",
    "desc": "Speak a word of disaster into the Galerian Weave, calling forth three beams of pure destruction that each deal 10d6+40 Force damage.",
    "cost": "Action",
    "damage": "30d6 + 120 Force",
    "save": null,
    "range": "9 m (30 ft)",
    "aoe": null,
    "damageMin": 150,
    "damageMax": 300,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Force"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/power-word-ruin.webp",
    "wiki": "https://bg3.wiki/wiki/Power_Word:_Ruin"
  },
  {
    "id": "prayer-of-healing",
    "name": "Prayer of Healing",
    "level": 2,
    "school": "Evocation",
    "desc": "Heal all allies you can see within range. Can only be used outside of combat. No effect on undead and constructs.",
    "cost": null,
    "damage": "2d8",
    "save": null,
    "range": "Self",
    "aoe": "9 m (30 ft) Radius",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "When the spell is cast at 3rd Level or higher, heal a target an extra 1d8 Hit Points for each spell slot level above 2nd.",
    "upcastDice": {
      "count": 1,
      "size": 8
    },
    "classes": [
      "Cleric"
    ],
    "subclasses": [],
    "races": [],
    "availability": [
      {
        "name": "Cleric",
        "kind": "class",
        "level": 3,
        "via": null
      }
    ],
    "icon": "icons/spells/prayer-of-healing.webp",
    "wiki": "https://bg3.wiki/wiki/Prayer_of_Healing"
  },
  {
    "id": "produce-flame",
    "name": "Produce Flame",
    "level": 0,
    "school": "Conjuration",
    "desc": "A flame in your hand sheds a light in a 9 m (30 ft) radius and deals 1d8 Fire damage when thrown. Throwing the flame immediately after you conjure it does not cost an Action. Extinguishing or throwing it on subsequent turns costs an action. The throw has a range of 9 m (30 ft).",
    "cost": "Action",
    "damage": "1d8 Fire",
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": 1,
    "damageMax": 8,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Fire"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [
      {
        "level": 5,
        "count": 2,
        "size": 8
      },
      {
        "level": 10,
        "count": 3,
        "size": 8
      }
    ],
    "upcast": null,
    "upcastDice": null,
    "classes": [
      "Cleric",
      "Druid"
    ],
    "subclasses": [],
    "races": [
      "Asmodeus Tiefling"
    ],
    "availability": [
      {
        "name": "Cleric",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Druid",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Asmodeus Tiefling",
        "kind": "race",
        "level": 1,
        "via": null
      }
    ],
    "icon": "icons/spells/produce-flame.webp",
    "wiki": "https://bg3.wiki/wiki/Produce_Flame"
  },
  {
    "id": "produce-flame-dismiss",
    "name": "Produce Flame: Dismiss",
    "level": 0,
    "school": "Conjuration",
    "desc": "Put out the conjured flame in your hand.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": null,
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/produce-flame-dismiss.webp",
    "wiki": "https://bg3.wiki/wiki/Produce_Flame:_Dismiss"
  },
  {
    "id": "produce-flame-hurl",
    "name": "Produce Flame: Hurl",
    "level": 0,
    "school": "Conjuration",
    "desc": "Hurl the conjured flame in your hand at a target and let it sizzle out.",
    "cost": "Action",
    "damage": "1d8 Fire",
    "save": null,
    "range": "9 m (30 ft)",
    "aoe": null,
    "damageMin": 1,
    "damageMax": 8,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Fire"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [
      {
        "level": 5,
        "count": 2,
        "size": 8
      },
      {
        "level": 10,
        "count": 3,
        "size": 8
      }
    ],
    "upcast": null,
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/produce-flame-hurl.webp",
    "wiki": "https://bg3.wiki/wiki/Produce_Flame:_Hurl"
  },
  {
    "id": "promise-of-wealth",
    "name": "Promise of Wealth",
    "level": 6,
    "school": "Divination",
    "desc": "Mark a target with Promise of Wealth. Your Allies with Infectious Greed gain Advantage on Attack Rolls against it, convinced it carries great wealth.",
    "cost": "Bonus Action",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/promise-of-wealth.webp",
    "wiki": "https://bg3.wiki/wiki/Promise_of_Wealth"
  },
  {
    "id": "protection-from-energy",
    "name": "Protection from Energy",
    "level": 3,
    "school": "Abjuration",
    "desc": "Touch a creature to grant it Resistance to Acid, Cold, Fire, Lightning, or Thunder damage.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Cleric",
      "Druid",
      "Sorcerer",
      "Wizard",
      "Ranger"
    ],
    "subclasses": [
      "Circle of the Land",
      "Oath of the Ancients",
      "Oath of Vengeance"
    ],
    "races": [],
    "availability": [
      {
        "name": "Cleric",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Druid",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Circle of the Land",
        "kind": "subclass",
        "level": 5,
        "via": "Desert"
      },
      {
        "name": "Ranger",
        "kind": "class",
        "level": 9,
        "via": null
      },
      {
        "name": "Oath of the Ancients",
        "kind": "subclass",
        "level": 9,
        "via": null
      },
      {
        "name": "Oath of Vengeance",
        "kind": "subclass",
        "level": 9,
        "via": null
      }
    ],
    "icon": "icons/spells/protection-from-energy.webp",
    "wiki": "https://bg3.wiki/wiki/Protection_from_Energy"
  },
  {
    "id": "protection-from-energy-acid",
    "name": "Protection from Energy: Acid",
    "level": 3,
    "school": "Abjuration",
    "desc": "Touch a creature to grant it Resistance to Acid damage.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/protection-from-energy-acid.webp",
    "wiki": "https://bg3.wiki/wiki/Protection_from_Energy:_Acid"
  },
  {
    "id": "protection-from-energy-cold",
    "name": "Protection from Energy: Cold",
    "level": 3,
    "school": "Abjuration",
    "desc": "Touch a creature to grant it Resistance to Cold damage.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/protection-from-energy-cold.webp",
    "wiki": "https://bg3.wiki/wiki/Protection_from_Energy:_Cold"
  },
  {
    "id": "protection-from-energy-fire",
    "name": "Protection from Energy: Fire",
    "level": 3,
    "school": "Abjuration",
    "desc": "Touch a creature to grant it Resistance to Fire damage.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/protection-from-energy-fire.webp",
    "wiki": "https://bg3.wiki/wiki/Protection_from_Energy:_Fire"
  },
  {
    "id": "protection-from-energy-lightning",
    "name": "Protection from Energy: Lightning",
    "level": 3,
    "school": "Abjuration",
    "desc": "Touch a creature to grant it Resistance to Lightning damage.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/protection-from-energy-lightning.webp",
    "wiki": "https://bg3.wiki/wiki/Protection_from_Energy:_Lightning"
  },
  {
    "id": "protection-from-energy-thunder",
    "name": "Protection from Energy: Thunder",
    "level": 3,
    "school": "Abjuration",
    "desc": "Touch a creature to grant it Resistance to Thunder damage.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/protection-from-energy-thunder.webp",
    "wiki": "https://bg3.wiki/wiki/Protection_from_Energy:_Thunder"
  },
  {
    "id": "protection-from-evil-and-good",
    "name": "Protection from Evil and Good",
    "level": 1,
    "school": "Abjuration",
    "desc": "Protect an ally against the attacks and powers of Aberrations, Celestials, Elementals, Fey, Fiends, and Undead. The targets can't be Charmed, Frightened, or possessed by them, and when these creatures attack it, they have Disadvantage.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Cleric",
      "Warlock",
      "Wizard",
      "Paladin"
    ],
    "subclasses": [
      "Oath of Devotion",
      "Arcane Trickster",
      "Eldritch Knight"
    ],
    "races": [],
    "availability": [
      {
        "name": "Cleric",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Warlock",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Paladin",
        "kind": "class",
        "level": 2,
        "via": null
      },
      {
        "name": "Oath of Devotion",
        "kind": "subclass",
        "level": 3,
        "via": "Oath Spell"
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 3,
        "via": null
      }
    ],
    "icon": "icons/spells/protection-from-evil-and-good.webp",
    "wiki": "https://bg3.wiki/wiki/Protection_from_Evil_and_Good"
  },
  {
    "id": "protection-from-missiles",
    "name": "Protection from Missiles",
    "level": 2,
    "school": "Abjuration",
    "desc": "Amplify your reflexes to better contend with incoming missiles. Ranged weapon attacks against you have Disadvantage, and their damage is halved.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/protection-from-missiles.webp",
    "wiki": "https://bg3.wiki/wiki/Protection_from_Missiles"
  },
  {
    "id": "protection-from-poison",
    "name": "Protection from Poison",
    "level": 2,
    "school": "Abjuration",
    "desc": "Touch a creature to neutralise all poisons affecting it, and grant it protection against poisonous influences. Grants Advantage on Saving Throws against being Poisoned, and Resistance to Poison damage.",
    "cost": "Action + Level 2 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Cleric",
      "Druid",
      "Paladin",
      "Ranger"
    ],
    "subclasses": [],
    "races": [],
    "availability": [
      {
        "name": "Cleric",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Druid",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Paladin",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Ranger",
        "kind": "class",
        "level": 5,
        "via": null
      }
    ],
    "icon": "icons/spells/protection-from-poison.webp",
    "wiki": "https://bg3.wiki/wiki/Protection_from_Poison"
  },
  {
    "id": "psionic-suggestion-drop",
    "name": "Psionic Suggestion: Drop",
    "level": 1,
    "school": "Enchantment",
    "desc": "Command a creature to drop its weapon on its turn and do nothing else.",
    "cost": "Action",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/psionic-suggestion-drop.webp",
    "wiki": "https://bg3.wiki/wiki/Psionic_Suggestion:_Drop"
  },
  {
    "id": "psionic-suggestion-flee",
    "name": "Psionic Suggestion: Flee",
    "level": 1,
    "school": "Enchantment",
    "desc": "Command a creature to flee from you on its turn and do nothing else.",
    "cost": "Action",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/psionic-suggestion-flee.webp",
    "wiki": "https://bg3.wiki/wiki/Psionic_Suggestion:_Flee"
  },
  {
    "id": "psionic-suggestion-grovel",
    "name": "Psionic Suggestion: Grovel",
    "level": 1,
    "school": "Enchantment",
    "desc": "Command a creature to fall Prone immediately and do nothing else.",
    "cost": "Action",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/psionic-suggestion-grovel.webp",
    "wiki": "https://bg3.wiki/wiki/Psionic_Suggestion:_Grovel"
  },
  {
    "id": "psionic-suggestion-halt",
    "name": "Psionic Suggestion: Halt",
    "level": 1,
    "school": "Enchantment",
    "desc": "Command a creature to fall Prone on its turn and do nothing else.",
    "cost": "Action",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/psionic-suggestion-halt.webp",
    "wiki": "https://bg3.wiki/wiki/Psionic_Suggestion:_Halt"
  },
  {
    "id": "psionic-suggestion-hush",
    "name": "Psionic Suggestion: Hush",
    "level": 1,
    "school": "Enchantment",
    "desc": "Silence a creature with a psionic command.",
    "cost": "Action",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/psionic-suggestion-hush.webp",
    "wiki": "https://bg3.wiki/wiki/Psionic_Suggestion:_Hush"
  },
  {
    "id": "psychic-rend",
    "name": "Psychic Rend",
    "level": 0,
    "school": "Enchantment",
    "desc": "Reach into an enemy's mind. Tear it to pieces and inflict Disadvantage on Intelligence and Wisdom Checks and Saving Throws.",
    "cost": "Action",
    "damage": "2d8 + 3 Psychic",
    "save": "INT",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 5,
    "damageMax": 19,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Psychic"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": null,
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/psychic-rend.webp",
    "wiki": "https://bg3.wiki/wiki/Psychic_Rend"
  },
  {
    "id": "punish-divinity",
    "name": "Punish Divinity",
    "level": 6,
    "school": null,
    "desc": "After taking Radiant damage, Stun the attacker, allowing you to Drain its hit points.",
    "cost": "Reaction",
    "damage": null,
    "save": "DEX",
    "range": "30 m (100 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/punish-divinity.webp",
    "wiki": "https://bg3.wiki/wiki/Punish_Divinity"
  },
  {
    "id": "ravaging-inferno",
    "name": "Ravaging Inferno",
    "level": 6,
    "school": "Evocation",
    "desc": "Spend 2 souls to hurl an exploding ball of Hellfire that damages all nearby creatures and objects. Hellfire burns with more fervour than any mortal flame, ignoring Resistance and Immunity to Fire damage.",
    "cost": "Action",
    "damage": "20d6 Fire",
    "save": "DEX",
    "range": "18 m (60 ft)",
    "aoe": "4 m (13 ft) Radius",
    "damageMin": 20,
    "damageMax": 120,
    "attackRoll": true,
    "halfOnSave": true,
    "damageTypes": [
      "Fire"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/ravaging-inferno.webp",
    "wiki": "https://bg3.wiki/wiki/Ravaging_Inferno"
  },
  {
    "id": "ray-of-enfeeblement",
    "name": "Ray of Enfeeblement",
    "level": 2,
    "school": "Necromancy",
    "desc": "Weaken a foe: they deal half damage with weapon attacks using Strength.",
    "cost": "Action + Level 2 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Warlock",
      "Wizard",
      "Bard"
    ],
    "subclasses": [
      "Death Domain",
      "College of Lore",
      "Arcane Trickster",
      "Eldritch Knight"
    ],
    "races": [],
    "availability": [
      {
        "name": "Warlock",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Death Domain",
        "kind": "subclass",
        "level": 3,
        "via": "Domain Spell"
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 8,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 8,
        "via": null
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/ray-of-enfeeblement.webp",
    "wiki": "https://bg3.wiki/wiki/Ray_of_Enfeeblement"
  },
  {
    "id": "ray-of-fear",
    "name": "Ray of Fear",
    "level": 3,
    "school": "Necromancy",
    "desc": "Frightens your target.",
    "cost": "Action",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/ray-of-fear.webp",
    "wiki": "https://bg3.wiki/wiki/Ray_of_Fear"
  },
  {
    "id": "ray-of-frost",
    "name": "Ray of Frost",
    "level": 0,
    "school": "Evocation",
    "desc": "Reduces the target's Movement Speed by 3 m (10 ft).",
    "cost": "Action",
    "damage": "1d8 Cold",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 1,
    "damageMax": 8,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Cold"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [
      {
        "level": 5,
        "count": 2,
        "size": 8
      },
      {
        "level": 10,
        "count": 3,
        "size": 8
      }
    ],
    "upcast": null,
    "upcastDice": null,
    "classes": [
      "Sorcerer",
      "Wizard",
      "Bard"
    ],
    "subclasses": [
      "Eldritch Knight",
      "Arcane Trickster",
      "College of Lore"
    ],
    "races": [
      "High Elf",
      "High Half-Elf"
    ],
    "availability": [
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      },
      {
        "name": "High Elf",
        "kind": "race",
        "level": 1,
        "via": null
      },
      {
        "name": "High Half-Elf",
        "kind": "race",
        "level": 1,
        "via": null
      }
    ],
    "icon": "icons/spells/ray-of-frost.webp",
    "wiki": "https://bg3.wiki/wiki/Ray_of_Frost"
  },
  {
    "id": "ray-of-sickness",
    "name": "Ray of Sickness",
    "level": 1,
    "school": "Necromancy",
    "desc": "Possibly Poisons the target.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": "2d8 Poison",
    "save": "CON",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 2,
    "damageMax": 16,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Poison"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level deals an extra 1d8 Poison damage for each spell slot level above 1st.",
    "upcastDice": {
      "count": 1,
      "size": 8
    },
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "subclasses": [
      "Draconic Bloodline",
      "Death Domain",
      "Arcane Trickster",
      "Eldritch Knight"
    ],
    "races": [],
    "availability": [
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Draconic Bloodline",
        "kind": "subclass",
        "level": 1,
        "via": "Green/Poison"
      },
      {
        "name": "Death Domain",
        "kind": "subclass",
        "level": 1,
        "via": "Domain Spell"
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 3,
        "via": null
      }
    ],
    "icon": "icons/spells/ray-of-sickness.webp",
    "wiki": "https://bg3.wiki/wiki/Ray_of_Sickness"
  },
  {
    "id": "rays-of-fire",
    "name": "Rays of Fire",
    "level": 2,
    "school": "Evocation",
    "desc": "Hurl 3 rays of fire. Each ray deals 3d6 Fire damage.",
    "cost": "Action",
    "damage": "3d6 Fire",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 9,
    "damageMax": 54,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Fire"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/rays-of-fire.webp",
    "wiki": "https://bg3.wiki/wiki/Rays_of_Fire"
  },
  {
    "id": "rays-of-fire-cantrip",
    "name": "Rays of Fire (Cantrip)",
    "level": 0,
    "school": null,
    "desc": "Hurl 3 rays of fire. Each ray deals 3d6 Fire damage.",
    "cost": "Action",
    "damage": "3d6 Fire",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 9,
    "damageMax": 54,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Fire"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": null,
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/rays-of-fire-cantrip.webp",
    "wiki": "https://bg3.wiki/wiki/Rays_of_Fire_(Cantrip)"
  },
  {
    "id": "rays-of-fire-mol",
    "name": "Rays of Fire (Mol)",
    "level": 4,
    "school": "Evocation",
    "desc": "Hurl 5 rays of fire. Each ray deals 3d6 Fire damage.",
    "cost": "Action",
    "damage": "3d6 Fire",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 15,
    "damageMax": 90,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Fire"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/rays-of-fire-mol.webp",
    "wiki": "https://bg3.wiki/wiki/Rays_of_Fire_(Mol)"
  },
  {
    "id": "reach-from-beyond",
    "name": "Reach from Beyond",
    "level": 0,
    "school": "Necromancy",
    "desc": "Defile a target with Myrkul's decaying magic.",
    "cost": "Action",
    "damage": "2d4",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 2,
    "damageMax": 8,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Necrotic"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": null,
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/reach-from-beyond.webp",
    "wiki": "https://bg3.wiki/wiki/Reach_from_Beyond"
  },
  {
    "id": "reapply-hunter-s-mark",
    "name": "Reapply Hunter's Mark",
    "level": 1,
    "school": "Divination",
    "desc": "Shift your Hunter's Mark to a new creature without using a Spell Slot. If the target dies before the spell ends, you can mark a new creature without expending a spell slot.",
    "cost": "Bonus Action",
    "damage": "1d6 Weapon",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 1,
    "damageMax": 6,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/reapply-hunter-s-mark.webp",
    "wiki": "https://bg3.wiki/wiki/Reapply_Hunter%27s_Mark"
  },
  {
    "id": "recast-speak-with-dead",
    "name": "Recast Speak with Dead",
    "level": 3,
    "school": "Necromancy",
    "desc": "Cast Speak with Dead on a different corpse without expending a spell slot. Skeletons and creatures killed with Acid, Fire, Lightning, Necrotic, or Radiant damage no longer have a mouth and can't be made to talk using this spell. Doesn't work on Undead.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "9 m (30 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/recast-speak-with-dead.webp",
    "wiki": "https://bg3.wiki/wiki/Recast_Speak_with_Dead"
  },
  {
    "id": "recast-sunbeam",
    "name": "Recast Sunbeam",
    "level": 6,
    "school": "Evocation",
    "desc": "Call forth another beam of light that sears and Blinds all creatures in its path, without expending a spell slot.",
    "cost": "Action",
    "damage": "6d8 Radiant",
    "save": "CON",
    "range": "Self",
    "aoe": "18 m (60 ft) Line",
    "damageMin": 6,
    "damageMax": 48,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Radiant"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/recast-sunbeam.webp",
    "wiki": "https://bg3.wiki/wiki/Recast_Sunbeam"
  },
  {
    "id": "reduce",
    "name": "Reduce",
    "level": 2,
    "school": "Transmutation",
    "desc": "Make a creature smaller. Its weapons deal 1d4 less damage (minimum of 1 damage). It has Disadvantage on Strength Checks and Saving Throws.",
    "cost": "Action + Level 2 Spell Slot",
    "damage": null,
    "save": "CON",
    "range": "9 m (30 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/reduce.webp",
    "wiki": "https://bg3.wiki/wiki/Reduce"
  },
  {
    "id": "reduce-duergar",
    "name": "Reduce (Duergar)",
    "level": 2,
    "school": null,
    "desc": "Shrink in size to become harder to hit but slightly weaker. Your Armour Class increases by 5, but you receive Disadvantage on Ability Checks and Saving Throws using Strength, and your weapons deal 1d4 less damage (minimum of 1 damage).",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/reduce-duergar.webp",
    "wiki": "https://bg3.wiki/wiki/Reduce_(Duergar)"
  },
  {
    "id": "remove-curse",
    "name": "Remove Curse",
    "level": 3,
    "school": "Abjuration",
    "desc": "Touch a creature or object to remove all Curses and Hexes affecting it.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Cleric",
      "Warlock",
      "Wizard",
      "Paladin",
      "Bard"
    ],
    "subclasses": [
      "College of Lore",
      "Oath of Devotion"
    ],
    "races": [],
    "availability": [
      {
        "name": "Cleric",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Warlock",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Paladin",
        "kind": "class",
        "level": 9,
        "via": null
      },
      {
        "name": "Oath of Devotion",
        "kind": "subclass",
        "level": 9,
        "via": "Oath Spell"
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/remove-curse.webp",
    "wiki": "https://bg3.wiki/wiki/Remove_Curse"
  },
  {
    "id": "resistance-cantrip",
    "name": "Resistance (Cantrip)",
    "level": 0,
    "school": "Abjuration",
    "desc": "Make a target more resistant to spell effects and conditions: it receives a +1d4 bonus to Saving Throws.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": null,
    "upcastDice": null,
    "classes": [
      "Cleric",
      "Druid"
    ],
    "subclasses": [
      "Circle of the Land"
    ],
    "races": [],
    "availability": [
      {
        "name": "Cleric",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Druid",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Circle of the Land",
        "kind": "subclass",
        "level": 2,
        "via": null
      }
    ],
    "icon": "icons/spells/resistance-cantrip.webp",
    "wiki": "https://bg3.wiki/wiki/Resistance_(Cantrip)"
  },
  {
    "id": "restore-vitality",
    "name": "Restore Vitality",
    "level": 3,
    "school": "Evocation",
    "desc": "Use a bonus action to heal yourself or a nearby ally.",
    "cost": "Bonus Action Healing: 2~12 2d6 Healing",
    "damage": "2d6 Healing",
    "save": null,
    "range": "9 m (30 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/restore-vitality.webp",
    "wiki": "https://bg3.wiki/wiki/Restore_Vitality"
  },
  {
    "id": "revivify",
    "name": "Revivify",
    "level": 3,
    "school": "Necromancy",
    "desc": "Revive a companion. They return to life with 1 hit point.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": null,
    "range": "9 m (30 ft)",
    "aoe": "9 m (30 ft) Radius",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Cleric",
      "Paladin",
      "Bard"
    ],
    "subclasses": [
      "Life Domain",
      "College of Lore"
    ],
    "races": [],
    "availability": [
      {
        "name": "Cleric",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Life Domain",
        "kind": "subclass",
        "level": 5,
        "via": "Domain Spell"
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Paladin",
        "kind": "class",
        "level": 9,
        "via": null
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/revivify.webp",
    "wiki": "https://bg3.wiki/wiki/Revivify"
  },
  {
    "id": "revoke-guest-status",
    "name": "Revoke Guest Status",
    "level": 5,
    "school": "Abjuration",
    "desc": "Hope banishes one of the unwelcome guests from her house forever.",
    "cost": "Action + Level 5 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/revoke-guest-status.webp",
    "wiki": "https://bg3.wiki/wiki/Revoke_Guest_Status"
  },
  {
    "id": "ride-the-winds",
    "name": "Ride the Winds",
    "level": 3,
    "school": "Transmutation",
    "desc": "Transform into a cloud, becoming Resistant to all damage, gains Advantage on Constitution, Dexterity, and Strength Saving Throws, and becomes Tiny in size. While transformed, the target won't be able to attack, cast spells, or talk.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/ride-the-winds.webp",
    "wiki": "https://bg3.wiki/wiki/Ride_the_Winds"
  },
  {
    "id": "rolan-s-colour-spray",
    "name": "Rolan's Colour Spray",
    "level": 1,
    "school": "Illusion",
    "desc": "Create an illustrious display of flashing lights to dazzle and Confuse creatures up to a combined 44 hit points.",
    "cost": "Action + Level 4 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": "5 m (17 ft) Cone",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/rolan-s-colour-spray.webp",
    "wiki": "https://bg3.wiki/wiki/Rolan%27s_Colour_Spray"
  },
  {
    "id": "rolan-s-fireball",
    "name": "Rolan's Fireball",
    "level": 4,
    "school": "Evocation",
    "desc": "Shoot a bright flame from your fingers that explodes upon contact, torching everything in the vicinity and Heating metal weapons and armour caught in the flames. If the creature is only wearing metal armour, it always receives Disadvantage. If the creature is still touching the metal, you can use...",
    "cost": "Action + Level 4 Spell Slot",
    "damage": "7d6 Fire",
    "save": "DEX",
    "range": "18 m (60 ft)",
    "aoe": "4 m (13 ft) Radius",
    "damageMin": 7,
    "damageMax": 42,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Fire"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/rolan-s-fireball.webp",
    "wiki": "https://bg3.wiki/wiki/Rolan%27s_Fireball"
  },
  {
    "id": "rolan-s-mage-armour",
    "name": "Rolan's Mage Armour",
    "level": 1,
    "school": "Abjuration",
    "desc": "Grant a creature a rudimentary defensive boost, increasing its Armour Class by 2",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "8 m (27 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/rolan-s-mage-armour.webp",
    "wiki": "https://bg3.wiki/wiki/Rolan%27s_Mage_Armour"
  },
  {
    "id": "rolan-s-magic-missile",
    "name": "Rolan's Magic Missile",
    "level": 1,
    "school": "Evocation",
    "desc": "Hurl a concentrated dart of magical force that can Daze the target. This spell never misses.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": "5d4 + 5 Force",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 10,
    "damageMax": 25,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Force"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/rolan-s-magic-missile.webp",
    "wiki": "https://bg3.wiki/wiki/Rolan%27s_Magic_Missile"
  },
  {
    "id": "rolan-s-thunderwave",
    "name": "Rolan's Thunderwave",
    "level": 1,
    "school": "Evocation",
    "desc": "Release a focused blast of thunderous force that pushes targets back 12 m (40 ft) and knocks them Prone.",
    "cost": "Action + Level 2 Spell Slot",
    "damage": "2d6 Thunder",
    "save": "CON",
    "range": "18 m (60 ft)",
    "aoe": "5 m (17 ft) Cube",
    "damageMin": 2,
    "damageMax": 12,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Thunder"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/rolan-s-thunderwave.webp",
    "wiki": "https://bg3.wiki/wiki/Rolan%27s_Thunderwave"
  },
  {
    "id": "sacred-flame",
    "name": "Sacred Flame",
    "level": 0,
    "school": "Evocation",
    "desc": "Engulf a target in a flame-like radiance.",
    "cost": "Action",
    "damage": "1d8 Radiant",
    "save": "DEX",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 1,
    "damageMax": 8,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Radiant"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [
      {
        "level": 5,
        "count": 2,
        "size": 8
      },
      {
        "level": 10,
        "count": 3,
        "size": 8
      }
    ],
    "upcast": null,
    "upcastDice": null,
    "classes": [
      "Cleric",
      "Ranger",
      "Bard"
    ],
    "subclasses": [
      "College of Lore"
    ],
    "races": [],
    "availability": [
      {
        "name": "Cleric",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Ranger",
        "kind": "class",
        "level": 1,
        "via": "Sanctified Stalker"
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/sacred-flame.webp",
    "wiki": "https://bg3.wiki/wiki/Sacred_Flame"
  },
  {
    "id": "sacrifice-soul",
    "name": "Sacrifice Soul",
    "level": 5,
    "school": "Necromancy",
    "desc": "Offer the soul of a recently killed humanoid to Vlaakith in return for heightened powers.",
    "cost": null,
    "damage": null,
    "save": null,
    "range": "30 m (100 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": null,
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/sacrifice-soul.webp",
    "wiki": "https://bg3.wiki/wiki/Sacrifice_Soul"
  },
  {
    "id": "sanctuary",
    "name": "Sanctuary",
    "level": 1,
    "school": "Abjuration",
    "desc": "You or an ally cannot be targeted until you attack or harm a creature. You can still take damage from area spells. Until the affected entity attacks or harms another creature, it cannot be targeted by enemy attacks. However, it can still take damage from spells that influence a larger area.",
    "cost": "Bonus Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Cleric",
      "Bard"
    ],
    "subclasses": [
      "Oath of Devotion",
      "College of Lore"
    ],
    "races": [],
    "availability": [
      {
        "name": "Cleric",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Oath of Devotion",
        "kind": "subclass",
        "level": 3,
        "via": "Oath Spell"
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/sanctuary.webp",
    "wiki": "https://bg3.wiki/wiki/Sanctuary"
  },
  {
    "id": "sanctuary-of-loss",
    "name": "Sanctuary of Loss",
    "level": 1,
    "school": "Enchantment",
    "desc": "Shield yourself or an ally from harm after they are attacked. This protection will wane when the protected creature attacks. Viconia can still use Heartwrench and keep this protection.",
    "cost": null,
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": null,
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/sanctuary-of-loss.webp",
    "wiki": "https://bg3.wiki/wiki/Sanctuary_of_Loss"
  },
  {
    "id": "scorching-ray",
    "name": "Scorching Ray",
    "level": 2,
    "school": "Evocation",
    "desc": "Hurl 3 rays of fire. Each ray deals 2d6 Fire damage.",
    "cost": "Action + Level 2 Spell Slot",
    "damage": "2d6 Fire",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 6,
    "damageMax": 36,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Fire"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level hurls an additional ray for each spell slot level above 2nd.",
    "upcastDice": null,
    "classes": [
      "Sorcerer",
      "Wizard",
      "Bard"
    ],
    "subclasses": [
      "Light Domain",
      "The Fiend",
      "College of Lore",
      "Eldritch Knight",
      "Arcane Trickster"
    ],
    "races": [],
    "availability": [
      {
        "name": "Light Domain",
        "kind": "subclass",
        "level": 3,
        "via": "Domain Spell"
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "The Fiend",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 7,
        "via": null
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 8,
        "via": null
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/scorching-ray.webp",
    "wiki": "https://bg3.wiki/wiki/Scorching_Ray"
  },
  {
    "id": "searing-smite",
    "name": "Searing Smite",
    "level": 1,
    "school": "Evocation",
    "desc": "Your weapon flares with white-hot intensity. It deals, on top of weapon damage, an extra 1d6 Fire damage and marks the target with Searing Smite.",
    "cost": "on hit Bonus Action + Level 1 Spell Slot",
    "damage": "1d6 Fire",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 2,
    "damageMax": 12,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Fire"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level deals an extra 1d6 Fire initial damage for each spell slot level above 1st.",
    "upcastDice": {
      "count": 1,
      "size": 6
    },
    "classes": [
      "Paladin"
    ],
    "subclasses": [],
    "races": [
      "Zariel Tiefling"
    ],
    "availability": [
      {
        "name": "Paladin",
        "kind": "class",
        "level": 2,
        "via": null
      },
      {
        "name": "Zariel Tiefling",
        "kind": "race",
        "level": 3,
        "via": null
      }
    ],
    "icon": "icons/spells/searing-smite.webp",
    "wiki": "https://bg3.wiki/wiki/Searing_Smite"
  },
  {
    "id": "searing-smite-azer",
    "name": "Searing Smite (Azer)",
    "level": 1,
    "school": "Evocation",
    "desc": "Your weapon flares with white-hot intensity. It deals, on top of weapon damage, an extra 1d6 Fire damage and marks the target with Searing Smite.",
    "cost": "Action",
    "damage": "1d6 Fire",
    "save": "CON",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 2,
    "damageMax": 12,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Fire"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/searing-smite-azer.webp",
    "wiki": "https://bg3.wiki/wiki/Searing_Smite_(Azer)"
  },
  {
    "id": "see-invisibility-spell",
    "name": "See Invisibility (spell)",
    "level": 2,
    "school": "Divination",
    "desc": "Become able to see Invisible creatures, and possibly reveal them to others.",
    "cost": "Action + Level 2 Spell Slot",
    "damage": null,
    "save": "DEX",
    "range": "Self",
    "aoe": "9 m (30 ft) Radius",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Bard",
      "Sorcerer",
      "Wizard"
    ],
    "subclasses": [
      "Arcane Trickster",
      "Eldritch Knight"
    ],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 8,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 8,
        "via": null
      }
    ],
    "icon": "icons/spells/see-invisibility-spell.webp",
    "wiki": "https://bg3.wiki/wiki/See_Invisibility_(spell)"
  },
  {
    "id": "seeming",
    "name": "Seeming",
    "level": 5,
    "school": "Illusion",
    "desc": "Disguise up to 4 members of your adventuring party.",
    "cost": "Action + Level 5 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Bard",
      "Sorcerer",
      "Wizard"
    ],
    "subclasses": [
      "The Archfey",
      "Trickery Domain"
    ],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 9,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 9,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 9,
        "via": null
      },
      {
        "name": "The Archfey",
        "kind": "subclass",
        "level": 9,
        "via": null
      },
      {
        "name": "Trickery Domain",
        "kind": "subclass",
        "level": 9,
        "via": "Domain Spell"
      }
    ],
    "icon": "icons/spells/seeming.webp",
    "wiki": "https://bg3.wiki/wiki/Seeming"
  },
  {
    "id": "sel-ne-s-dream",
    "name": "Selûne's Dream",
    "level": 0,
    "school": "Evocation",
    "desc": "An ally you touch regains 1d8 Hit Points, but possibly falls asleep. No effect on undead and constructs.",
    "cost": "Action Healing: 1~8 1d8 Healing",
    "damage": "1d8 Healing",
    "save": "CON",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": null,
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/sel-ne-s-dream.webp",
    "wiki": "https://bg3.wiki/wiki/Selûne%27s_Dream"
  },
  {
    "id": "sel-ne-s-ire-spell",
    "name": "Selûne's Ire (spell)",
    "level": 5,
    "school": "Evocation",
    "desc": "Strike back at an attacker with holy righteousness. It can use Selûne's Ire again after its next turn.",
    "cost": "Action",
    "damage": "12d12 Radiant",
    "save": "DEX",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 12,
    "damageMax": 144,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Radiant"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/sel-ne-s-ire-spell.webp",
    "wiki": "https://bg3.wiki/wiki/Selûne%27s_Ire_(spell)"
  },
  {
    "id": "sethan-reduce",
    "name": "Sethan: Reduce",
    "level": 2,
    "school": "Transmutation",
    "desc": "Make a creature smaller. Its weapons deal 1d4 less damage (minimum of 1 damage). It has Disadvantage on Strength Checks and Strength Saving Throws.",
    "cost": "Action",
    "damage": null,
    "save": "CON",
    "range": "9 m (30 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/sethan-reduce.webp",
    "wiki": "https://bg3.wiki/wiki/Sethan:_Reduce"
  },
  {
    "id": "sethan-spiritual-greataxe",
    "name": "Sethan: Spiritual Greataxe",
    "level": 6,
    "school": "Evocation",
    "desc": "Summon a spiritual twin of Sethan in a point you can see, dealing 3d8 + 1 + Spellcasting modifier Force damage on a hit.",
    "cost": "Bonus Action",
    "damage": "3d8 + 1",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 4,
    "damageMax": 25,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Force"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/sethan-spiritual-greataxe.webp",
    "wiki": "https://bg3.wiki/wiki/Sethan:_Spiritual_Greataxe"
  },
  {
    "id": "shadow-blade",
    "name": "Shadow Blade",
    "level": 2,
    "school": "Illusion",
    "desc": "Weave a shadowy shortsword in your hand that deals 2d8 Psychic damage. When you use the sword to attack a target that is in dim light or darkness, you make the Attack Roll with Advantage. The shadow blade can be unequipped and equipped again, but must remain on the spellcaster's person.",
    "cost": "Bonus Action + Level 2 Spell Slot",
    "damage": "2d8",
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": 2,
    "damageMax": 16,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Psychic"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "When you cast this spell using a 3rd or 4th-level spell slot, the damage increases to 3d8 Psychic. Upcasting: When you cast this spell using a 5th or 6th-level spell slot, the damage increases to 4d8 Psychic.",
    "upcastDice": null,
    "classes": [
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "subclasses": [
      "Arcane Trickster",
      "Eldritch Knight"
    ],
    "races": [],
    "availability": [
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Warlock",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 7,
        "via": "spell replacement"
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 8,
        "via": null
      }
    ],
    "icon": "icons/spells/shadow-blade.webp",
    "wiki": "https://bg3.wiki/wiki/Shadow_Blade"
  },
  {
    "id": "shar-s-aegis",
    "name": "Shar's Aegis",
    "level": 1,
    "school": "Abjuration",
    "desc": "Encase yourself with a shimmering field of magic that increases your Armour Class by 2. Spell ends if the armour is unequipped.",
    "cost": "Bonus Action",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/shar-s-aegis.webp",
    "wiki": "https://bg3.wiki/wiki/Shar%27s_Aegis"
  },
  {
    "id": "shar-s-darkness",
    "name": "Shar's Darkness",
    "level": 2,
    "school": "Evocation",
    "desc": "Create a dark shroud that Heavily Obscures and Blinds creatures within. Creatures cannot make ranged attacks into or out of it.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/shar-s-darkness.webp",
    "wiki": "https://bg3.wiki/wiki/Shar%27s_Darkness"
  },
  {
    "id": "share-untenable-secret",
    "name": "Share Untenable Secret",
    "level": 4,
    "school": "Enchantment",
    "desc": "Share a secret with an ally to prevent the damage caused by Untenable Secret. The ally must pass a Wisdom Saving Throw or is forced to pass on the secret to another ally.",
    "cost": "Bonus Action",
    "damage": "3d8 Psychic",
    "save": "WIS",
    "range": "2 m (7 ft)",
    "aoe": null,
    "damageMin": 3,
    "damageMax": 24,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Psychic",
      "Necrotic"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/share-untenable-secret.webp",
    "wiki": "https://bg3.wiki/wiki/Share_Untenable_Secret"
  },
  {
    "id": "shatter",
    "name": "Shatter",
    "level": 2,
    "school": "Evocation",
    "desc": "Damages all nearby creatures and objects. Creatures made of inorganic material such as stone have Disadvantage on their Saving Throw.",
    "cost": "Action + Level 2 Spell Slot",
    "damage": "3d8 Thunder",
    "save": "CON",
    "range": "18 m (60 ft)",
    "aoe": "3 m (10 ft) Radius",
    "damageMin": 3,
    "damageMax": 24,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Thunder"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level deals an extra 1d8 Thunder damage for each spell slot level above 2nd.",
    "upcastDice": {
      "count": 1,
      "size": 8
    },
    "classes": [
      "Bard",
      "Sorcerer",
      "Wizard",
      "Warlock"
    ],
    "subclasses": [
      "Tempest Domain",
      "Eldritch Knight",
      "Arcane Trickster"
    ],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Warlock",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Tempest Domain",
        "kind": "subclass",
        "level": 3,
        "via": "Domain Spell"
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 7,
        "via": null
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 8,
        "via": null
      }
    ],
    "icon": "icons/spells/shatter.webp",
    "wiki": "https://bg3.wiki/wiki/Shatter"
  },
  {
    "id": "shield-spell",
    "name": "Shield (spell)",
    "level": 1,
    "school": "Abjuration",
    "desc": "When you are about to be hit by an enemy, use your Reaction to increase your Armour Class by 5. You also take no damage from Magic Missile. These effects last until the start of your next turn.",
    "cost": "Reaction + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "subclasses": [
      "The Hexblade",
      "Arcane Trickster",
      "Eldritch Knight"
    ],
    "races": [],
    "availability": [
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "The Hexblade",
        "kind": "subclass",
        "level": 1,
        "via": null
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 3,
        "via": null
      }
    ],
    "icon": "icons/spells/shield-spell.webp",
    "wiki": "https://bg3.wiki/wiki/Shield_(spell)"
  },
  {
    "id": "shield-of-devotion-aid",
    "name": "Shield of Devotion: Aid",
    "level": 3,
    "school": "Abjuration",
    "desc": "Heal yourself and increase your hit point maximum by 10 hit points.",
    "cost": "Action Healing: 10 10 Healing",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/shield-of-devotion-aid.webp",
    "wiki": "https://bg3.wiki/wiki/Shield_of_Devotion:_Aid"
  },
  {
    "id": "shield-of-faith",
    "name": "Shield of Faith",
    "level": 1,
    "school": "Abjuration",
    "desc": "Surround a creature with a shimmering field of magic that increases its Armour Class by 2.",
    "cost": "Bonus Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Cleric",
      "Paladin"
    ],
    "subclasses": [
      "War Domain"
    ],
    "races": [],
    "availability": [
      {
        "name": "Cleric",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "War Domain",
        "kind": "subclass",
        "level": 1,
        "via": "Domain Spell"
      },
      {
        "name": "Paladin",
        "kind": "class",
        "level": 2,
        "via": null
      }
    ],
    "icon": "icons/spells/shield-of-faith.webp",
    "wiki": "https://bg3.wiki/wiki/Shield_of_Faith"
  },
  {
    "id": "shield-of-screams",
    "name": "Shield of Screams",
    "level": 3,
    "school": "Abjuration",
    "desc": "Recall the voices of all who scorned you - and how they screamed in the end. They form a shield around you. Your Armour Class increases by 3, and anyone who hits you with a melee attack takes 2d6 Psychic damage.",
    "cost": "Bonus Action + Level 1 Spell Slot",
    "damage": "2d6 Psychic",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 2,
    "damageMax": 12,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Psychic"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/shield-of-screams.webp",
    "wiki": "https://bg3.wiki/wiki/Shield_of_Screams"
  },
  {
    "id": "shillelagh",
    "name": "Shillelagh",
    "level": 0,
    "school": "Transmutation",
    "desc": "Quarterstaff or Club Required. Your staff or club becomes magical: it deals 1d8 + Spellcasting modifier Bludgeoning damage, and uses your Spellcasting modifier for Attack Rolls.",
    "cost": "Bonus Action",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": null,
    "upcastDice": null,
    "classes": [
      "Druid"
    ],
    "subclasses": [
      "Nature Domain"
    ],
    "races": [],
    "availability": [
      {
        "name": "Druid",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Nature Domain",
        "kind": "subclass",
        "level": 1,
        "via": "Domain Spell"
      }
    ],
    "icon": "icons/spells/shillelagh.webp",
    "wiki": "https://bg3.wiki/wiki/Shillelagh"
  },
  {
    "id": "shocking-grasp",
    "name": "Shocking Grasp",
    "level": 0,
    "school": "Evocation",
    "desc": "The target cannot use Reactions. This spell has Advantage on creatures with metal Armour.",
    "cost": "Action",
    "damage": "1d8 Lightning",
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": 1,
    "damageMax": 8,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Lightning"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [
      {
        "level": 5,
        "count": 2,
        "size": 8
      },
      {
        "level": 10,
        "count": 3,
        "size": 8
      }
    ],
    "upcast": null,
    "upcastDice": null,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "subclasses": [
      "Eldritch Knight",
      "Arcane Trickster"
    ],
    "races": [
      "High Elf",
      "High Half-Elf"
    ],
    "availability": [
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "High Elf",
        "kind": "race",
        "level": 1,
        "via": null
      },
      {
        "name": "High Half-Elf",
        "kind": "race",
        "level": 1,
        "via": null
      }
    ],
    "icon": "icons/spells/shocking-grasp.webp",
    "wiki": "https://bg3.wiki/wiki/Shocking_Grasp"
  },
  {
    "id": "sights-of-the-seelie-summon-deva",
    "name": "Sights of the Seelie: Summon Deva",
    "level": 6,
    "school": "Conjuration",
    "desc": "Conjure a Celestial Deva to fight alongside you. It can cast Wrathful Smite, Revivify, and Concussive Smash.",
    "cost": "Action + Level 6 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/sights-of-the-seelie-summon-deva.webp",
    "wiki": "https://bg3.wiki/wiki/Sights_of_the_Seelie:_Summon_Deva"
  },
  {
    "id": "silence",
    "name": "Silence",
    "level": 2,
    "school": "Illusion",
    "desc": "Create a sound-proof sphere. All within are Silenced and Immune to Thunder damage. Using this spell might turn targets hostile.",
    "cost": "Action + Level 2 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Bard",
      "Cleric",
      "Ranger"
    ],
    "subclasses": [
      "Circle of the Land",
      "Oath of Devotion"
    ],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Cleric",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Circle of the Land",
        "kind": "subclass",
        "level": 3,
        "via": "Desert"
      },
      {
        "name": "Ranger",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Oath of Devotion",
        "kind": "subclass",
        "level": 5,
        "via": "Oath Spell"
      }
    ],
    "icon": "icons/spells/silence.webp",
    "wiki": "https://bg3.wiki/wiki/Silence"
  },
  {
    "id": "silvered-bulwark",
    "name": "Silvered Bulwark",
    "level": 6,
    "school": "Abjuration",
    "desc": "Form an impenetrable barrier of moonlight around a target that follows them and makes all creatures within Immune to damage.",
    "cost": "Bonus Action",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/silvered-bulwark.webp",
    "wiki": "https://bg3.wiki/wiki/Silvered_Bulwark"
  },
  {
    "id": "sizzling-cataclysm",
    "name": "Sizzling Cataclysm",
    "level": 4,
    "school": "Evocation",
    "desc": "Embrace Kereska's acid to gain resistance to Acid damage. Your acid spells deal additional Acid damage equal to your proficiency bonus. When you deal spell damage, possibly inflict 3 [ See Notes ] turns of Noxious Fumes upon the target. While attuned to Kereska's acid you can cast Melf's Acid Arr...",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/sizzling-cataclysm.webp",
    "wiki": "https://bg3.wiki/wiki/Sizzling_Cataclysm"
  },
  {
    "id": "slash-the-weak",
    "name": "Slash the Weak",
    "level": 1,
    "school": "Transmutation",
    "desc": "Make an enemy Vulnerable to Slashing damage. This effect lasts 3 turns, or until the target takes damage.",
    "cost": "Bonus Action",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/slash-the-weak.webp",
    "wiki": "https://bg3.wiki/wiki/Slash_the_Weak"
  },
  {
    "id": "sleep",
    "name": "Sleep",
    "level": 1,
    "school": "Enchantment",
    "desc": "Put creatures into a magical slumber. Select targets up to a combined 24 Hit Points. The condition ends upon taking damage.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Affect creatures with more hit points at higher levels. The total hit points of creatures this spell can affect is increased by 8 hit points per level.",
    "upcastDice": null,
    "classes": [
      "Bard",
      "Sorcerer",
      "Wizard"
    ],
    "subclasses": [
      "Knowledge Domain",
      "The Archfey",
      "Draconic Bloodline",
      "Arcane Trickster",
      "Eldritch Knight"
    ],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Knowledge Domain",
        "kind": "subclass",
        "level": 1,
        "via": "Domain Spell"
      },
      {
        "name": "The Archfey",
        "kind": "subclass",
        "level": 1,
        "via": null
      },
      {
        "name": "Draconic Bloodline",
        "kind": "subclass",
        "level": 1,
        "via": "Brass/Fire Ancestry"
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 3,
        "via": null
      }
    ],
    "icon": "icons/spells/sleep.webp",
    "wiki": "https://bg3.wiki/wiki/Sleep"
  },
  {
    "id": "sleet-storm",
    "name": "Sleet Storm",
    "level": 3,
    "school": "Conjuration",
    "desc": "Call forth a storm that douses fire, creates an Ice surface, and forces spellcasters to succeed at a Concentration Saving Throw in order to maintain Concentration. Ice is a surface that is considered Difficult Terrain. Creatures moving through it have their Movement Speed halved, and will fall Pr...",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": "CON",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Druid",
      "Sorcerer",
      "Wizard",
      "Bard"
    ],
    "subclasses": [
      "Nature Domain",
      "Tempest Domain",
      "Circle of the Land",
      "Storm Sorcery",
      "College of Lore"
    ],
    "races": [],
    "availability": [
      {
        "name": "Druid",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Nature Domain",
        "kind": "subclass",
        "level": 5,
        "via": "Domain Spell"
      },
      {
        "name": "Tempest Domain",
        "kind": "subclass",
        "level": 5,
        "via": "Domain Spell"
      },
      {
        "name": "Circle of the Land",
        "kind": "subclass",
        "level": 5,
        "via": "Arctic or Coast"
      },
      {
        "name": "Storm Sorcery",
        "kind": "subclass",
        "level": 6,
        "via": null
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/sleet-storm.webp",
    "wiki": "https://bg3.wiki/wiki/Sleet_Storm"
  },
  {
    "id": "slow",
    "name": "Slow",
    "level": 3,
    "school": "Transmutation",
    "desc": "Alter time around up to 6 enemies to Slow them. They won't get far, they can't do much, and they're easier to hit.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Sorcerer",
      "Wizard",
      "Bard"
    ],
    "subclasses": [
      "The Great Old One",
      "Knowledge Domain",
      "College of Lore"
    ],
    "races": [],
    "availability": [
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "The Great Old One",
        "kind": "subclass",
        "level": 5,
        "via": null
      },
      {
        "name": "Knowledge Domain",
        "kind": "subclass",
        "level": 5,
        "via": "Domain Spell"
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/slow.webp",
    "wiki": "https://bg3.wiki/wiki/Slow"
  },
  {
    "id": "smite",
    "name": "Smite",
    "level": null,
    "school": null,
    "desc": "Smite is a category of unique weapon attacks that, unlike regular attacks, which generally only cost an Action, additionally expend spell slots (and often a Bonus Action) to activate. Though requiring a spell slot, they do not consume the spell slot (nor bonus action, when applicable) on a miss....",
    "cost": null,
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": null,
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/smite.webp",
    "wiki": "https://bg3.wiki/wiki/Smite"
  },
  {
    "id": "sorrowful-lash",
    "name": "Sorrowful Lash",
    "level": 0,
    "school": "Transmutation",
    "desc": "Pulls the creature 3 m (10 ft) closer to you. The target cannot be pulled if it is Huge in size.",
    "cost": "Bonus Action",
    "damage": "1d4",
    "save": null,
    "range": "9 m (30 ft)",
    "aoe": null,
    "damageMin": 1,
    "damageMax": 4,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Piercing"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": null,
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/sorrowful-lash.webp",
    "wiki": "https://bg3.wiki/wiki/Sorrowful_Lash"
  },
  {
    "id": "soul-ascension",
    "name": "Soul Ascension",
    "level": 6,
    "school": "Evocation",
    "desc": "Create a column of writhing souls that transforms allied Cambions into Hellfire Cambions and deals 6d10 Necrotic to any non-fiend caught inside. Cambions ascended by this cascade deal Hellfire damage, which ignores Resistance and Immunity to Fire damage.",
    "cost": null,
    "damage": "6d10 Necrotic",
    "save": "DEX",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 6,
    "damageMax": 60,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Necrotic"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/soul-ascension.webp",
    "wiki": "https://bg3.wiki/wiki/Soul_Ascension"
  },
  {
    "id": "soul-drain",
    "name": "Soul Drain",
    "level": 6,
    "school": null,
    "desc": "Drain the life force of an Infernally Stunned creature, restoring your hit points by half the damage dealt.",
    "cost": null,
    "damage": "6d12 Necrotic",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 6,
    "damageMax": 72,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Necrotic"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/soul-drain.webp",
    "wiki": "https://bg3.wiki/wiki/Soul_Drain"
  },
  {
    "id": "soul-offering",
    "name": "Soul Offering",
    "level": 3,
    "school": null,
    "desc": "Numb a creature's soul and offer it to Yeenoghu to prevent it from taking Bonus Actions or Reactions.",
    "cost": "Bonus Action",
    "damage": null,
    "save": "CHA",
    "range": "8 m (27 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/soul-offering.webp",
    "wiki": "https://bg3.wiki/wiki/Soul_Offering"
  },
  {
    "id": "speak-with-animals",
    "name": "Speak with Animals",
    "level": 1,
    "school": "Divination",
    "desc": "Gain the ability to comprehend and communicate with beasts.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Bard",
      "Druid",
      "Ranger"
    ],
    "subclasses": [
      "Nature Domain",
      "Oath of the Ancients",
      "Wildheart",
      "Knowledge Domain"
    ],
    "races": [
      "Forest Gnome"
    ],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Druid",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Nature Domain",
        "kind": "subclass",
        "level": 1,
        "via": "Domain Spell"
      },
      {
        "name": "Ranger",
        "kind": "class",
        "level": 2,
        "via": null
      },
      {
        "name": "Oath of the Ancients",
        "kind": "subclass",
        "level": 3,
        "via": "Oath Spell"
      },
      {
        "name": "Wildheart",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Knowledge Domain",
        "kind": "subclass",
        "level": 6,
        "via": null
      },
      {
        "name": "Forest Gnome",
        "kind": "race",
        "level": 1,
        "via": null
      }
    ],
    "icon": "icons/spells/speak-with-animals.webp",
    "wiki": "https://bg3.wiki/wiki/Speak_with_Animals"
  },
  {
    "id": "speak-with-dead",
    "name": "Speak with Dead",
    "level": 3,
    "school": "Necromancy",
    "desc": "Grant a semblance of life to a corpse, allowing it to answer questions. Skeletons and creatures killed with Acid, Fire, Lightning, Necrotic, Radiant damage no longer have a mouth and can't be made to talk using this spell. Doesn't work on Undead.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": null,
    "range": "9 m (30 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": true,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Bard",
      "Cleric"
    ],
    "subclasses": [],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Cleric",
        "kind": "class",
        "level": 5,
        "via": null
      }
    ],
    "icon": "icons/spells/speak-with-dead.webp",
    "wiki": "https://bg3.wiki/wiki/Speak_with_Dead"
  },
  {
    "id": "spike-growth",
    "name": "Spike Growth",
    "level": 2,
    "school": "Transmutation",
    "desc": "Shape a piece of ground into hard spikes. A creature walking on the spikes takes 2d4 Piercing damage for every 1.5 m (5 ft) it moves. The spikes are Difficult Terrain, halving a creature's Movement Speed.",
    "cost": "Action + Level 2 Spell Slot",
    "damage": "2d4 Piercing",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 2,
    "damageMax": 8,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Piercing"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Druid",
      "Ranger",
      "Bard"
    ],
    "subclasses": [
      "Nature Domain",
      "Circle of the Land",
      "College of Lore"
    ],
    "races": [],
    "availability": [
      {
        "name": "Druid",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Nature Domain",
        "kind": "subclass",
        "level": 3,
        "via": "Domain Spell"
      },
      {
        "name": "Circle of the Land",
        "kind": "subclass",
        "level": 3,
        "via": "Arctic or Mountain"
      },
      {
        "name": "Ranger",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/spike-growth.webp",
    "wiki": "https://bg3.wiki/wiki/Spike_Growth"
  },
  {
    "id": "spindleweb-sanctuary",
    "name": "Spindleweb Sanctuary",
    "level": 5,
    "school": "Abjuration",
    "desc": "Protect yourself from attackers in the Absolute's gaze. If you attack or harm another creature, the sanctuary shatters, dealing 3d8 Psychic to nearby creatures. Until the affected entity attacks or harms another creature, it cannot be targeted by enemy attacks. However, it can still take damage f...",
    "cost": "Bonus Action + Level 4 Spell Slot",
    "damage": "3d8 Psychic",
    "save": "INT",
    "range": "18 m (60 ft)",
    "aoe": "3 m (10 ft) Radius",
    "damageMin": 3,
    "damageMax": 24,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Psychic"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/spindleweb-sanctuary.webp",
    "wiki": "https://bg3.wiki/wiki/Spindleweb_Sanctuary"
  },
  {
    "id": "spirit-guardians",
    "name": "Spirit Guardians",
    "level": 3,
    "school": "Conjuration",
    "desc": "Call forth spirits to protect you. Nearby enemies take 3d8 Radiant or 3d8 Necrotic damage per turn, and their Movement Speed is halved. Caster can't become Invisible while Concentrating on this spell.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": "WIS",
    "range": "Self",
    "aoe": "3 m (10 ft) Radius",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Radiant",
      "Necrotic"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "When the spell is cast using a 4th Level spell slot or higher, damage increases by 1d8 Radiant or 1d8 Necrotic damage for each spell slot level above 3rd.",
    "upcastDice": {
      "count": 1,
      "size": 8
    },
    "classes": [
      "Cleric",
      "Bard"
    ],
    "subclasses": [
      "War Domain",
      "College of Lore",
      "Oath of the Crown"
    ],
    "races": [],
    "availability": [
      {
        "name": "Cleric",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "War Domain",
        "kind": "subclass",
        "level": 5,
        "via": "Domain Spell"
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Oath of the Crown",
        "kind": "subclass",
        "level": 9,
        "via": "Oath Spell"
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/spirit-guardians.webp",
    "wiki": "https://bg3.wiki/wiki/Spirit_Guardians"
  },
  {
    "id": "spirit-guardians-necrotic",
    "name": "Spirit Guardians (Necrotic)",
    "level": 3,
    "school": "Conjuration",
    "desc": "Call forth spirits to protect the area around you. Nearby enemies take 3d8 Necrotic damage per turn, and their Movement Speed is halved. Lasts for 10 turns. Caster can't become Invisible while Concentrating on this spell.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": "3d8 Necrotic",
    "save": "WIS",
    "range": "Self",
    "aoe": "3 m (10 ft) Radius",
    "damageMin": 3,
    "damageMax": 24,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Necrotic"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "When the spell is cast using a 4th Level spell slot or higher, damage increases by 1d8 Necrotic damage for each spell slot level above 3rd.",
    "upcastDice": {
      "count": 1,
      "size": 8
    },
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/spirit-guardians-necrotic.webp",
    "wiki": "https://bg3.wiki/wiki/Spirit_Guardians_(Necrotic)"
  },
  {
    "id": "spirit-guardians-radiant",
    "name": "Spirit Guardians (Radiant)",
    "level": 3,
    "school": "Conjuration",
    "desc": "Call forth spirits to protect the area around you. Nearby enemies take 3d8 Radiant damage per turn, and their Movement Speed is halved. Lasts for 10 turns. Caster can't become Invisible while Concentrating on this spell.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": "3d8 Radiant",
    "save": "WIS",
    "range": "Self",
    "aoe": "3 m (10 ft) Radius",
    "damageMin": 3,
    "damageMax": 24,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Radiant"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "When the spell is cast using a 4th Level spell slot or higher, damage increases by 1d8 Radiant damage for each spell slot level above 3rd.",
    "upcastDice": {
      "count": 1,
      "size": 8
    },
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/spirit-guardians-radiant.webp",
    "wiki": "https://bg3.wiki/wiki/Spirit_Guardians_(Radiant)"
  },
  {
    "id": "spiritual-weapon",
    "name": "Spiritual Weapon",
    "level": 2,
    "school": "Evocation",
    "desc": "Summon a floating, spectral weapon that attacks your enemies alongside you.",
    "cost": "Bonus Action + Level 2 Spell Slot",
    "damage": "1d8 + 1",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 2,
    "damageMax": 9,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Force"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "For every 2 spell slot levels higher than 2nd, the weapon gains 8 hit points and deals an additional 1d8 Force damage.",
    "upcastDice": null,
    "classes": [
      "Cleric",
      "Bard"
    ],
    "subclasses": [
      "War Domain",
      "Oath of the Crown",
      "College of Lore"
    ],
    "races": [],
    "availability": [
      {
        "name": "Cleric",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "War Domain",
        "kind": "subclass",
        "level": 3,
        "via": "Domain Spell"
      },
      {
        "name": "Oath of the Crown",
        "kind": "subclass",
        "level": 5,
        "via": "Oath Spell"
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/spiritual-weapon.webp",
    "wiki": "https://bg3.wiki/wiki/Spiritual_Weapon"
  },
  {
    "id": "spiritual-weapon-greataxe",
    "name": "Spiritual Weapon: Greataxe",
    "level": 2,
    "school": "Evocation",
    "desc": "Create a floating, spectral greataxe.",
    "cost": "Bonus Action + Level 2 Spell Slot",
    "damage": "1d8 + 1",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 2,
    "damageMax": 9,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Force"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "For every 2 spell slot levels higher than 2nd, the weapon gains 8 hit points and deals an additional 1d8 Force damage.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/spiritual-weapon-greataxe.webp",
    "wiki": "https://bg3.wiki/wiki/Spiritual_Weapon:_Greataxe"
  },
  {
    "id": "spiritual-weapon-greatsword",
    "name": "Spiritual Weapon: Greatsword",
    "level": 2,
    "school": "Evocation",
    "desc": "Create a floating, spectral greatsword.",
    "cost": "Bonus Action + Level 2 Spell Slot",
    "damage": "1d8 + 1",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 2,
    "damageMax": 9,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Force"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "For every 2 spell slot levels higher than 2nd, the weapon gains 8 hit points and deals an additional 1d8 Force damage.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/spiritual-weapon-greatsword.webp",
    "wiki": "https://bg3.wiki/wiki/Spiritual_Weapon:_Greatsword"
  },
  {
    "id": "spiritual-weapon-halberd",
    "name": "Spiritual Weapon: Halberd",
    "level": 2,
    "school": "Evocation",
    "desc": "Create a floating, spectral halberd.",
    "cost": "Bonus Action + Level 2 Spell Slot",
    "damage": "1d8 + 1",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 2,
    "damageMax": 9,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Force"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "For every 2 spell slot levels higher than 2nd, the weapon gains 8 hit points and deals an additional 1d8 Force damage.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/spiritual-weapon-halberd.webp",
    "wiki": "https://bg3.wiki/wiki/Spiritual_Weapon:_Halberd"
  },
  {
    "id": "spiritual-weapon-maul",
    "name": "Spiritual Weapon: Maul",
    "level": 2,
    "school": "Evocation",
    "desc": "Create a floating, spectral maul.",
    "cost": "Bonus Action + Level 2 Spell Slot",
    "damage": "1d8 + 1",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 2,
    "damageMax": 9,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Force"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "For every 2 spell slot levels higher than 2nd, the weapon gains 8 hit points and deals an additional 1d8 Force damage.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/spiritual-weapon-maul.webp",
    "wiki": "https://bg3.wiki/wiki/Spiritual_Weapon:_Maul"
  },
  {
    "id": "spiritual-weapon-spear",
    "name": "Spiritual Weapon: Spear",
    "level": 2,
    "school": "Evocation",
    "desc": "Create a floating, spectral spear.",
    "cost": "Bonus Action + Level 2 Spell Slot",
    "damage": "1d8 + 1",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 2,
    "damageMax": 9,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Force"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "For every 2 spell slot levels higher than 2nd, the weapon gains 8 hit points and deals an additional 1d8 Force damage.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/spiritual-weapon-spear.webp",
    "wiki": "https://bg3.wiki/wiki/Spiritual_Weapon:_Spear"
  },
  {
    "id": "spiritual-weapon-trident",
    "name": "Spiritual Weapon: Trident",
    "level": 2,
    "school": "Evocation",
    "desc": "Create a floating, spectral trident.",
    "cost": "Bonus Action + Level 2 Spell Slot",
    "damage": "1d8 + 1",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 2,
    "damageMax": 9,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Force"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "For every 2 spell slot levels higher than 2nd, the weapon gains 8 hit points and deals an additional 1d8 Force damage.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/spiritual-weapon-trident.webp",
    "wiki": "https://bg3.wiki/wiki/Spiritual_Weapon:_Trident"
  },
  {
    "id": "staggering-smite",
    "name": "Staggering Smite",
    "level": 4,
    "school": "Evocation",
    "desc": "Possibly Stagger your target. It can't take reactions and is more likely to miss.",
    "cost": "on hit Bonus Action + Level 4 Spell Slot",
    "damage": "4d6 Psychic",
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 4,
    "damageMax": 24,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Psychic"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [
      "The Hexblade"
    ],
    "races": [],
    "availability": [
      {
        "name": "The Hexblade",
        "kind": "subclass",
        "level": 7,
        "via": null
      }
    ],
    "icon": "icons/spells/staggering-smite.webp",
    "wiki": "https://bg3.wiki/wiki/Staggering_Smite"
  },
  {
    "id": "star-map-guiding-bolt",
    "name": "Star Map: Guiding Bolt",
    "level": 1,
    "school": "Evocation",
    "desc": "The next attack roll against this target has Advantage.",
    "cost": "Action + Star Map",
    "damage": "4d6 Radiant",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 4,
    "damageMax": 24,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Radiant"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [
      "Circle of the Stars"
    ],
    "races": [],
    "availability": [
      {
        "name": "Circle of the Stars",
        "kind": "subclass",
        "level": 2,
        "via": null
      }
    ],
    "icon": "icons/spells/star-map-guiding-bolt.webp",
    "wiki": "https://bg3.wiki/wiki/Star_Map:_Guiding_Bolt"
  },
  {
    "id": "stinking-cloud",
    "name": "Stinking Cloud",
    "level": 3,
    "school": "Conjuration",
    "desc": "Create a cloud of gas so nauseating it prevents creatures from taking actions.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": "CON",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Bard",
      "Sorcerer",
      "Wizard"
    ],
    "subclasses": [
      "The Fiend",
      "Circle of the Land"
    ],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "The Fiend",
        "kind": "subclass",
        "level": 5,
        "via": null
      },
      {
        "name": "Circle of the Land",
        "kind": "subclass",
        "level": 5,
        "via": "Swamp or Underdark"
      }
    ],
    "icon": "icons/spells/stinking-cloud.webp",
    "wiki": "https://bg3.wiki/wiki/Stinking_Cloud"
  },
  {
    "id": "stoneskin",
    "name": "Stoneskin",
    "level": 4,
    "school": "Abjuration",
    "desc": "Turn a creature's flesh hard as stone. It takes only half the damage of all non-magical Bludgeoning, Piercing, and Slashing damage.",
    "cost": "Action + Level 4 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Druid",
      "Sorcerer",
      "Wizard"
    ],
    "subclasses": [
      "War Domain",
      "Circle of the Land"
    ],
    "races": [],
    "availability": [
      {
        "name": "Druid",
        "kind": "class",
        "level": 7,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 7,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 7,
        "via": null
      },
      {
        "name": "War Domain",
        "kind": "subclass",
        "level": 7,
        "via": "Domain Spell"
      },
      {
        "name": "Circle of the Land",
        "kind": "subclass",
        "level": 7,
        "via": "Mountain"
      }
    ],
    "icon": "icons/spells/stoneskin.webp",
    "wiki": "https://bg3.wiki/wiki/Stoneskin"
  },
  {
    "id": "strengthened-shillelagh",
    "name": "Strengthened Shillelagh",
    "level": 0,
    "school": "Transmutation",
    "desc": "Your staff or club becomes magical: it deals 4d8 Bludgeoning damage, and uses your Spellcasting Ability for Attack Rolls. Quarterstaff or Club Required.",
    "cost": "Bonus Action",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": null,
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/strengthened-shillelagh.webp",
    "wiki": "https://bg3.wiki/wiki/Strengthened_Shillelagh"
  },
  {
    "id": "summon-gilded-hellsboar",
    "name": "Summon Gilded Hellsboar",
    "level": 1,
    "school": "Conjuration",
    "desc": "Summon a boar, its tusks and tapered body agleam with gold, to fight alongside you.",
    "cost": "Action + Level 5 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/summon-gilded-hellsboar.webp",
    "wiki": "https://bg3.wiki/wiki/Summon_Gilded_Hellsboar"
  },
  {
    "id": "summon-quothe-the-raven",
    "name": "Summon Quothe the Raven",
    "level": 3,
    "school": "Conjuration",
    "desc": "Summon a raven familiar that can Blind enemies with its beak. When a hostile creature kills the raven familiar, they must succeed a Dexterity Saving Throw or become Ensnared.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/summon-quothe-the-raven.webp",
    "wiki": "https://bg3.wiki/wiki/Summon_Quothe_the_Raven"
  },
  {
    "id": "sunbeam",
    "name": "Sunbeam",
    "level": 6,
    "school": "Evocation",
    "desc": "A beam of brilliant light sears and Blinds all creatures in its path. Until the spell ends, you can recast Sunbeam without expending a spell slot.",
    "cost": "Action + Level 6 Spell Slot",
    "damage": "6d8 Radiant",
    "save": "CON",
    "range": "18 m (60 ft)",
    "aoe": "18 m (60 ft) Line",
    "damageMin": 6,
    "damageMax": 48,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Radiant"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Druid",
      "Sorcerer",
      "Wizard"
    ],
    "subclasses": [],
    "races": [],
    "availability": [
      {
        "name": "Druid",
        "kind": "class",
        "level": 11,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 11,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 11,
        "via": null
      }
    ],
    "icon": "icons/spells/sunbeam.webp",
    "wiki": "https://bg3.wiki/wiki/Sunbeam"
  },
  {
    "id": "tasha-s-hideous-laughter",
    "name": "Tasha's Hideous Laughter",
    "level": 1,
    "school": "Enchantment",
    "desc": "Leave a creature Prone with laughter, without the ability to get up. The creature must have an Intelligence of 5 or more. The target can try to shake off the effect each time it takes damage.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Bard",
      "Wizard"
    ],
    "subclasses": [
      "The Great Old One",
      "Draconic Bloodline",
      "Arcane Trickster",
      "Eldritch Knight"
    ],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "The Great Old One",
        "kind": "subclass",
        "level": 1,
        "via": null
      },
      {
        "name": "Draconic Bloodline",
        "kind": "subclass",
        "level": 1,
        "via": "Copper/Acid Ancestry"
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 3,
        "via": null
      }
    ],
    "icon": "icons/spells/tasha-s-hideous-laughter.webp",
    "wiki": "https://bg3.wiki/wiki/Tasha%27s_Hideous_Laughter"
  },
  {
    "id": "telekinesis",
    "name": "Telekinesis",
    "level": 5,
    "school": "Transmutation",
    "desc": "Throw a creature or object up to 18 m (60 ft) with a thought. Once per turn, you can use Telekinesis again without expending a Spell Slot. Heavier items deal more damage.",
    "cost": "Action + Level 5 Spell Slot",
    "damage": null,
    "save": "STR",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "subclasses": [
      "Knowledge Domain",
      "The Great Old One"
    ],
    "races": [],
    "availability": [
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 9,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 9,
        "via": null
      },
      {
        "name": "Knowledge Domain",
        "kind": "subclass",
        "level": 9,
        "via": null
      },
      {
        "name": "The Great Old One",
        "kind": "subclass",
        "level": 9,
        "via": null
      }
    ],
    "icon": "icons/spells/telekinesis.webp",
    "wiki": "https://bg3.wiki/wiki/Telekinesis"
  },
  {
    "id": "teleport-to-submersible",
    "name": "Teleport to Submersible",
    "level": 5,
    "school": "Conjuration",
    "desc": "Teleport yourself and up to one ally back to the Submersible.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/teleport-to-submersible.webp",
    "wiki": "https://bg3.wiki/wiki/Teleport_to_Submersible"
  },
  {
    "id": "terrifying-visage",
    "name": "Terrifying Visage",
    "level": 5,
    "school": null,
    "desc": "Accentuate your unnatural form, Frightening nearby creatures. No effect on undead.",
    "cost": "Action",
    "damage": null,
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": "10 m (33 ft) Radius",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/terrifying-visage.webp",
    "wiki": "https://bg3.wiki/wiki/Terrifying_Visage"
  },
  {
    "id": "terrifying-visage-tactician",
    "name": "Terrifying Visage (Tactician)",
    "level": 5,
    "school": null,
    "desc": "Accentuate your unnatural form, Frightening nearby creatures and dealing 3d10 Necrotic damage. Creatures take half the damage on successful Wisdom Saving Throws. No effect on undead.",
    "cost": "Action",
    "damage": "3d10 Necrotic",
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": "10 m (33 ft) Radius",
    "damageMin": 3,
    "damageMax": 30,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Necrotic"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/terrifying-visage-tactician.webp",
    "wiki": "https://bg3.wiki/wiki/Terrifying_Visage_(Tactician)"
  },
  {
    "id": "thaumaturgy",
    "name": "Thaumaturgy",
    "level": 0,
    "school": "Transmutation",
    "desc": "Gain Advantage on Intimidation and Performance Checks.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": null,
    "upcastDice": null,
    "classes": [
      "Cleric"
    ],
    "subclasses": [
      "Giant"
    ],
    "races": [
      "Zariel Tiefling"
    ],
    "availability": [
      {
        "name": "Cleric",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Giant",
        "kind": "subclass",
        "level": 3,
        "via": "barbarian subclass"
      },
      {
        "name": "Zariel Tiefling",
        "kind": "race",
        "level": 1,
        "via": null
      }
    ],
    "icon": "icons/spells/thaumaturgy.webp",
    "wiki": "https://bg3.wiki/wiki/Thaumaturgy"
  },
  {
    "id": "the-closed-fist-of-bane",
    "name": "The Closed Fist of Bane",
    "level": 6,
    "school": "Conjuration",
    "desc": "Conjure the divine aspect of Bane the Accursed - a fist that hangs in the air until the end of the round before falling, crushing anyone under it for 12d10 Force damage.",
    "cost": "Bonus Action",
    "damage": "12d10 Force",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 12,
    "damageMax": 120,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Force"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/the-closed-fist-of-bane.webp",
    "wiki": "https://bg3.wiki/wiki/The_Closed_Fist_of_Bane"
  },
  {
    "id": "the-dead-wastes",
    "name": "The Dead Wastes",
    "level": 3,
    "school": "Necromancy",
    "desc": "Open a necrotic rift from a new corpse that heals Undead 4d6 Hit Points and deals 4d6 Necrotic to living creatures at the start of their turns.",
    "cost": null,
    "damage": "4d6 Necrotic",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 4,
    "damageMax": 24,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Necrotic"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": null,
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/the-dead-wastes.webp",
    "wiki": "https://bg3.wiki/wiki/The_Dead_Wastes"
  },
  {
    "id": "thorn-whip",
    "name": "Thorn Whip",
    "level": 0,
    "school": "Transmutation",
    "desc": "Pulls the creature 3 m (10 ft) closer to you. The target cannot be pulled if it is Huge in size.",
    "cost": "Action",
    "damage": "1d6 Piercing",
    "save": null,
    "range": "9 m (30 ft)",
    "aoe": null,
    "damageMin": 1,
    "damageMax": 6,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Piercing"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [
      {
        "level": 5,
        "count": 2,
        "size": 6
      },
      {
        "level": 10,
        "count": 3,
        "size": 6
      }
    ],
    "upcast": null,
    "upcastDice": null,
    "classes": [
      "Druid",
      "Warlock"
    ],
    "subclasses": [
      "Nature Domain"
    ],
    "races": [],
    "availability": [
      {
        "name": "Druid",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Nature Domain",
        "kind": "subclass",
        "level": 1,
        "via": "Domain Spell"
      },
      {
        "name": "Warlock",
        "kind": "class",
        "level": 3,
        "via": "Pact of the Tome"
      }
    ],
    "icon": "icons/spells/thorn-whip.webp",
    "wiki": "https://bg3.wiki/wiki/Thorn_Whip"
  },
  {
    "id": "thunderous-smite",
    "name": "Thunderous Smite",
    "level": 1,
    "school": "Evocation",
    "desc": "Your melee weapon rings with thunder as you strike, pushing your target 3 m (10 ft) away and possibly knocking them Prone.",
    "cost": "on hit Bonus Action + Level 1 Spell Slot",
    "damage": "2d6 Thunder",
    "save": "STR",
    "range": "9 m (30 ft)",
    "aoe": null,
    "damageMin": 2,
    "damageMax": 12,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Thunder"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Paladin",
      "Bard"
    ],
    "subclasses": [
      "College of Lore"
    ],
    "races": [],
    "availability": [
      {
        "name": "Paladin",
        "kind": "class",
        "level": 2,
        "via": null
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/thunderous-smite.webp",
    "wiki": "https://bg3.wiki/wiki/Thunderous_Smite"
  },
  {
    "id": "thunderwave",
    "name": "Thunderwave",
    "level": 1,
    "school": "Evocation",
    "desc": "Release a wave of thunderous force that pushes away all creatures and objects in an area, while also dealing Thunder damage.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": "2d8 Thunder",
    "save": "CON",
    "range": "9 m (30 ft)",
    "aoe": "5 m (17 ft) Cube",
    "damageMin": 2,
    "damageMax": 16,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Thunder"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level deals an extra 1d8 Thunder damage for each spell slot level above 1st.",
    "upcastDice": {
      "count": 1,
      "size": 8
    },
    "classes": [
      "Bard",
      "Druid",
      "Sorcerer",
      "Wizard"
    ],
    "subclasses": [
      "Tempest Domain",
      "Arcane Trickster",
      "Eldritch Knight",
      "Storm Sorcery"
    ],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Druid",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Tempest Domain",
        "kind": "subclass",
        "level": 1,
        "via": "Domain Spell"
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Storm Sorcery",
        "kind": "subclass",
        "level": 6,
        "via": "Storm Spell"
      }
    ],
    "icon": "icons/spells/thunderwave.webp",
    "wiki": "https://bg3.wiki/wiki/Thunderwave"
  },
  {
    "id": "toll-the-dead",
    "name": "Toll the Dead",
    "level": 0,
    "school": "Necromancy",
    "desc": "Ring the bell of impending doom. If the target is at full health, you deal 1d8 Necrotic damage instead.",
    "cost": "Action",
    "damage": "1d12 Necrotic",
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 1,
    "damageMax": 12,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Necrotic"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [
      {
        "level": 5,
        "count": 2,
        "size": 12
      },
      {
        "level": 10,
        "count": 3,
        "size": 12
      }
    ],
    "upcast": null,
    "upcastDice": null,
    "classes": [
      "Cleric",
      "Warlock",
      "Wizard"
    ],
    "subclasses": [
      "Death Domain",
      "Eldritch Knight",
      "Arcane Trickster"
    ],
    "races": [
      "High Elf",
      "High Half-Elf"
    ],
    "availability": [
      {
        "name": "Cleric",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Warlock",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Death Domain",
        "kind": "subclass",
        "level": 1,
        "via": "Domain Spell"
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "High Elf",
        "kind": "race",
        "level": 1,
        "via": null
      },
      {
        "name": "High Half-Elf",
        "kind": "race",
        "level": 1,
        "via": null
      }
    ],
    "icon": "icons/spells/toll-the-dead.webp",
    "wiki": "https://bg3.wiki/wiki/Toll_the_Dead"
  },
  {
    "id": "true-resurrection",
    "name": "True Resurrection",
    "level": 9,
    "school": "Necromancy",
    "desc": "Resurrect a companion. They return to life with all their hit points.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "9 m (30 ft)",
    "aoe": "9 m (30 ft) Radius",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/true-resurrection.webp",
    "wiki": "https://bg3.wiki/wiki/True_Resurrection"
  },
  {
    "id": "true-strike",
    "name": "True Strike",
    "level": 0,
    "school": "Divination",
    "desc": "Gain Advantage on your next Attack Roll. This spell can be cast while you are Silenced.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": null,
    "upcastDice": null,
    "classes": [
      "Bard",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "subclasses": [
      "Arcane Archer",
      "Arcane Trickster",
      "Eldritch Knight"
    ],
    "races": [
      "High Elf",
      "High Half-Elf"
    ],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Warlock",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Arcane Archer",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "High Elf",
        "kind": "race",
        "level": 1,
        "via": null
      },
      {
        "name": "High Half-Elf",
        "kind": "race",
        "level": 1,
        "via": null
      }
    ],
    "icon": "icons/spells/true-strike.webp",
    "wiki": "https://bg3.wiki/wiki/True_Strike"
  },
  {
    "id": "tyr-s-protection",
    "name": "Tyr's Protection",
    "level": 1,
    "school": "Abjuration",
    "desc": "Protect a creature from attacks: increases its Armour Class by 2. Spell ends when the Sword of Justice is unequipped.",
    "cost": "Bonus Action",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/tyr-s-protection.webp",
    "wiki": "https://bg3.wiki/wiki/Tyr%27s_Protection"
  },
  {
    "id": "tyrant-s-bindings",
    "name": "Tyrant's Bindings",
    "level": 6,
    "school": "Conjuration",
    "desc": "Create heavy magical chains that bind to your targets, halving their Movement speed. If the chains are still present at the beginning of your next turn, they break, dealing 8d8 Force damage to all targets.",
    "cost": "Bonus Action",
    "damage": "8d8 Force",
    "save": "WIS",
    "range": "12 m (40 ft)",
    "aoe": null,
    "damageMin": 8,
    "damageMax": 64,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Force"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/tyrant-s-bindings.webp",
    "wiki": "https://bg3.wiki/wiki/Tyrant%27s_Bindings"
  },
  {
    "id": "umbral-ally",
    "name": "Umbral Ally",
    "level": 3,
    "school": null,
    "desc": "Transform a nearby corpse into a shadow that fights by your side. The target must be a Medium or Small corpse.",
    "cost": "Bonus Action",
    "damage": null,
    "save": null,
    "range": "3 m (10 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/umbral-ally.webp",
    "wiki": "https://bg3.wiki/wiki/Umbral_Ally"
  },
  {
    "id": "untenable-secret",
    "name": "Untenable Secret",
    "level": 4,
    "school": "Enchantment",
    "desc": "Inflict a mind-scarring secret upon a creature that it must pass on to an ally or receive damage after 1 turn. The afflicted creature learns the spell Share Untenable Secret.",
    "cost": "Action",
    "damage": "3d8 Psychic",
    "save": "WIS",
    "range": "2 m (7 ft)",
    "aoe": null,
    "damageMin": 3,
    "damageMax": 24,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Psychic",
      "Necrotic"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/untenable-secret.webp",
    "wiki": "https://bg3.wiki/wiki/Untenable_Secret"
  },
  {
    "id": "vampiric-swarm",
    "name": "Vampiric Swarm",
    "level": 6,
    "school": "Conjuration",
    "desc": "Call forth a swarm of vampire bats. Targets are pushed backwards 7 m (23 ft) and may become Swarmed.",
    "cost": null,
    "damage": "12d12 Piercing",
    "save": "DEX",
    "range": "10 m (33 ft)",
    "aoe": "5 m (17 ft) Line",
    "damageMin": 12,
    "damageMax": 144,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Piercing"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/vampiric-swarm.webp",
    "wiki": "https://bg3.wiki/wiki/Vampiric_Swarm"
  },
  {
    "id": "vampiric-touch",
    "name": "Vampiric Touch",
    "level": 3,
    "school": "Necromancy",
    "desc": "Touch an enemy to siphon their life force and regain half as many Hit Points. For 10 turns, you can use Vampiric Touch again without expending an additional Spell Slot.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": "3d6 Necrotic",
    "save": null,
    "range": "10 m (33 ft)",
    "aoe": null,
    "damageMin": 3,
    "damageMax": 18,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Necrotic"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level deals an extra 1d6 Necrotic damage for each spell slot level above 3rd.",
    "upcastDice": {
      "count": 1,
      "size": 6
    },
    "classes": [
      "Warlock",
      "Wizard",
      "Bard"
    ],
    "subclasses": [
      "Circle of the Land",
      "Death Domain",
      "College of Lore"
    ],
    "races": [],
    "availability": [
      {
        "name": "Warlock",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 5,
        "via": null
      },
      {
        "name": "Circle of the Land",
        "kind": "subclass",
        "level": 5,
        "via": "Swamp"
      },
      {
        "name": "Death Domain",
        "kind": "subclass",
        "level": 5,
        "via": "Domain Spell"
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/vampiric-touch.webp",
    "wiki": "https://bg3.wiki/wiki/Vampiric_Touch"
  },
  {
    "id": "veil-of-the-weird",
    "name": "Veil of the Weird",
    "level": 0,
    "school": "Illusion",
    "desc": "Channel Auntie Ethel's hag magic to render 5 creatures within range Invisible. Available only in combat. The caster can only use this feature once in their adventure.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "24 m (80 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": null,
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/veil-of-the-weird.webp",
    "wiki": "https://bg3.wiki/wiki/Veil_of_the_Weird"
  },
  {
    "id": "vicious-mockery",
    "name": "Vicious Mockery",
    "level": 0,
    "school": "Enchantment",
    "desc": "Insult a creature: it has Disadvantage on its next Attack Roll.",
    "cost": "Action",
    "damage": "1d4 Psychic",
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 1,
    "damageMax": 4,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Psychic"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [
      {
        "level": 5,
        "count": 2,
        "size": 4
      },
      {
        "level": 10,
        "count": 3,
        "size": 4
      }
    ],
    "upcast": null,
    "upcastDice": null,
    "classes": [
      "Bard",
      "Warlock"
    ],
    "subclasses": [],
    "races": [],
    "availability": [
      {
        "name": "Bard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Warlock",
        "kind": "class",
        "level": 3,
        "via": "Pact of the Tome"
      }
    ],
    "icon": "icons/spells/vicious-mockery.webp",
    "wiki": "https://bg3.wiki/wiki/Vicious_Mockery"
  },
  {
    "id": "vicious-mockery-auntie-ethel",
    "name": "Vicious Mockery (Auntie Ethel)",
    "level": 0,
    "school": "Enchantment",
    "desc": "Insult a creature: it has Disadvantage on its next Attack Roll.",
    "cost": "Bonus Action",
    "damage": "2d4 Psychic",
    "save": "WIS",
    "range": "26 m (87 ft)",
    "aoe": null,
    "damageMin": 2,
    "damageMax": 8,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Psychic"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": null,
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/vicious-mockery-auntie-ethel.webp",
    "wiki": "https://bg3.wiki/wiki/Vicious_Mockery_(Auntie_Ethel)"
  },
  {
    "id": "vicious-mockery-milil",
    "name": "Vicious Mockery (Milil)",
    "level": 0,
    "school": "Enchantment",
    "desc": "Insult a creature: it has Disadvantage on its next Attack Roll.",
    "cost": "Action",
    "damage": "2d8 Psychic",
    "save": "WIS",
    "range": "26 m (87 ft)",
    "aoe": null,
    "damageMin": 4,
    "damageMax": 32,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Psychic",
      "Radiant"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": null,
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/vicious-mockery-milil.webp",
    "wiki": "https://bg3.wiki/wiki/Vicious_Mockery_(Milil)"
  },
  {
    "id": "wail-of-loss-assistant",
    "name": "Wail of Loss (Assistant)",
    "level": 4,
    "school": null,
    "desc": "Confuse your foes with a shriek of absence. Pushes targets back by 3 m (10 ft).",
    "cost": null,
    "damage": "4d6 Psychic",
    "save": "WIS",
    "range": "26 m (87 ft)",
    "aoe": "4 m (13 ft) Radius",
    "damageMin": 4,
    "damageMax": 24,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Psychic"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/wail-of-loss-assistant.webp",
    "wiki": "https://bg3.wiki/wiki/Wail_of_Loss_(Assistant)"
  },
  {
    "id": "wall-of-fire",
    "name": "Wall of Fire",
    "level": 4,
    "school": "Evocation",
    "desc": "Create a blazing wall of fire, Burning anyone who dares stand too close. Deals Fire to anything that moves into or ends its turn in the area.",
    "cost": "Action + Level 4 Spell Slot",
    "damage": "5d8 Fire",
    "save": "DEX",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 5,
    "damageMax": 40,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Fire"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level deals an extra 1d8 Fire damage for each spell slot level above 4th.",
    "upcastDice": {
      "count": 1,
      "size": 8
    },
    "classes": [
      "Druid",
      "Sorcerer",
      "Wizard",
      "Bard"
    ],
    "subclasses": [
      "Light Domain",
      "The Fiend",
      "Circle of the Land"
    ],
    "races": [],
    "availability": [
      {
        "name": "Druid",
        "kind": "class",
        "level": 7,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 7,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 7,
        "via": null
      },
      {
        "name": "Light Domain",
        "kind": "subclass",
        "level": 7,
        "via": "Domain Spell"
      },
      {
        "name": "The Fiend",
        "kind": "subclass",
        "level": 7,
        "via": null
      },
      {
        "name": "Circle of the Land",
        "kind": "subclass",
        "level": 7,
        "via": "Desert"
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/wall-of-fire.webp",
    "wiki": "https://bg3.wiki/wiki/Wall_of_Fire"
  },
  {
    "id": "wall-of-ice",
    "name": "Wall of Ice",
    "level": 6,
    "school": "Evocation",
    "desc": "Raise a wall of solid ice that deals 10d6 Cold damage to anyone standing in its way. When the ice is broken, it leaves behind a cloud of frigid air that deals 10d6 Cold per turn to creatures within.",
    "cost": "Action + Level 6 Spell Slot",
    "damage": "10d6 Cold",
    "save": "DEX",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 20,
    "damageMax": 120,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Cold"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Wizard"
    ],
    "subclasses": [],
    "races": [],
    "availability": [
      {
        "name": "Wizard",
        "kind": "class",
        "level": 11,
        "via": null
      }
    ],
    "icon": "icons/spells/wall-of-ice.webp",
    "wiki": "https://bg3.wiki/wiki/Wall_of_Ice"
  },
  {
    "id": "wall-of-stone",
    "name": "Wall of Stone",
    "level": 5,
    "school": "Evocation",
    "desc": "Raise a wall of non-magical, solid stone. The wall can be created between any two points within range as long as there is a clear path between them. It is made up of Stone Pillars with 30 HP each, immune to Psychic and vulnerable to Force and Thunder damage. Pillars block movement and line of sight.",
    "cost": "Action + Level 5 Spell Slot",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Druid",
      "Sorcerer",
      "Wizard",
      "Bard"
    ],
    "subclasses": [
      "Nature Domain",
      "Circle of the Land"
    ],
    "races": [],
    "availability": [
      {
        "name": "Druid",
        "kind": "class",
        "level": 9,
        "via": null
      },
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 9,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 9,
        "via": null
      },
      {
        "name": "Nature Domain",
        "kind": "subclass",
        "level": 9,
        "via": "Domain Spell"
      },
      {
        "name": "Circle of the Land",
        "kind": "subclass",
        "level": 9,
        "via": "Desert or Mountain"
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/wall-of-stone.webp",
    "wiki": "https://bg3.wiki/wiki/Wall_of_Stone"
  },
  {
    "id": "wall-of-thorns",
    "name": "Wall of Thorns",
    "level": 6,
    "school": "Conjuration",
    "desc": "Create a wall of pliable, twisting thorns surrounded by Entangling vines. Creatures can move through the wall, but take 7d8 Piercing damage per turn, their Movement Speed is quartered.",
    "cost": "Action + Level 6 Spell Slot",
    "damage": "7d8 Piercing",
    "save": "DEX",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 7,
    "damageMax": 56,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Piercing"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Druid"
    ],
    "subclasses": [],
    "races": [],
    "availability": [
      {
        "name": "Druid",
        "kind": "class",
        "level": 11,
        "via": null
      }
    ],
    "icon": "icons/spells/wall-of-thorns.webp",
    "wiki": "https://bg3.wiki/wiki/Wall_of_Thorns"
  },
  {
    "id": "warden-of-vitality",
    "name": "Warden of Vitality",
    "level": 3,
    "school": "Evocation",
    "desc": "While this aura lasts, you can cast Restore Vitality as a Bonus Action to heal yourself or nearby allies by 2d6 Hit Points.",
    "cost": "Action + Level 3 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Paladin",
      "Bard"
    ],
    "subclasses": [
      "College of Lore"
    ],
    "races": [],
    "availability": [
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Paladin",
        "kind": "class",
        "level": 9,
        "via": null
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/warden-of-vitality.webp",
    "wiki": "https://bg3.wiki/wiki/Warden_of_Vitality"
  },
  {
    "id": "warding-bond",
    "name": "Warding Bond",
    "level": 2,
    "school": "Abjuration",
    "desc": "Ward an ally. They gain resistance to all damage, and a +1 bonus to their Armour Class and Saving Throws.",
    "cost": "Action + Level 2 Spell Slot",
    "damage": null,
    "save": null,
    "range": "Self",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Cleric"
    ],
    "subclasses": [
      "Oath of the Crown"
    ],
    "races": [],
    "availability": [
      {
        "name": "Cleric",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Oath of the Crown",
        "kind": "subclass",
        "level": 5,
        "via": "Oath Spell"
      }
    ],
    "icon": "icons/spells/warding-bond.webp",
    "wiki": "https://bg3.wiki/wiki/Warding_Bond"
  },
  {
    "id": "web",
    "name": "Web",
    "level": 2,
    "school": "Conjuration",
    "desc": "Cover an area in thick, flammable webbing that can Enweb creatures within. An ally can use its Help action to try and tear away the webs.",
    "cost": "Action + Level 2 Spell Slot",
    "damage": null,
    "save": "DEX",
    "range": "18 m (60 ft)",
    "aoe": "4 m (13 ft) Radius",
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Sorcerer",
      "Wizard",
      "Bard"
    ],
    "subclasses": [
      "Circle of the Land",
      "Swarmkeeper",
      "College of Lore",
      "Arcane Trickster",
      "Eldritch Knight"
    ],
    "races": [],
    "availability": [
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 3,
        "via": null
      },
      {
        "name": "Circle of the Land",
        "kind": "subclass",
        "level": 3,
        "via": "Underdark"
      },
      {
        "name": "Swarmkeeper",
        "kind": "subclass",
        "level": 5,
        "via": null
      },
      {
        "name": "College of Lore",
        "kind": "subclass",
        "level": 6,
        "via": "Magical Secrets"
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 8,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 8,
        "via": null
      },
      {
        "name": "Bard",
        "kind": "class",
        "level": 10,
        "via": "Magical Secrets"
      }
    ],
    "icon": "icons/spells/web.webp",
    "wiki": "https://bg3.wiki/wiki/Web"
  },
  {
    "id": "wicked-coercion",
    "name": "Wicked Coercion",
    "level": 2,
    "school": "Enchantment",
    "desc": "Invade an enemy's mind and force them to join your side. They also take 2d4 Psychic immediately, and 1d6 Psychic per turn.",
    "cost": "Action + Level 2 Spell Slot",
    "damage": "2d4 Psychic",
    "save": "WIS",
    "range": "16 m (53 ft)",
    "aoe": null,
    "damageMin": 2,
    "damageMax": 8,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Psychic"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit. Condition: Coerced Coerced Duration: 4 turns WIS Save (DC 14) Forced to fight for Nere and takes 1d6 Psychic each turn. Ends upon taking any non-Psychic damage.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/wicked-coercion.webp",
    "wiki": "https://bg3.wiki/wiki/Wicked_Coercion"
  },
  {
    "id": "wind-walk",
    "name": "Wind Walk",
    "level": 6,
    "school": "Transmutation",
    "desc": "Transform yourself and all nearby party members into tiny clouds of mist to avoid attacks. You become Resistant to non-magical damage, gain Advantage on Constitution, Dexterity, and Strength Saving Throws, and become Tiny in size. While transformed, you won't be able to attack, cast spells, or talk.",
    "cost": "Action + Level 6 Spell Slot",
    "damage": null,
    "save": null,
    "range": "9 m (30 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Druid"
    ],
    "subclasses": [],
    "races": [],
    "availability": [
      {
        "name": "Druid",
        "kind": "class",
        "level": 11,
        "via": null
      }
    ],
    "icon": "icons/spells/wind-walk.webp",
    "wiki": "https://bg3.wiki/wiki/Wind_Walk"
  },
  {
    "id": "witch-bolt",
    "name": "Witch Bolt",
    "level": 1,
    "school": "Evocation",
    "desc": "Link yourself to a target with a bolt of lightning. Deal an additional 1d12 Lightning damage each turn by activating it.",
    "cost": "Action + Level 1 Spell Slot",
    "damage": "1d12 Lightning",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 1,
    "damageMax": 12,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Lightning"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "The initial damage increases by 1d12 Lightning per level; damage on subsequent turns is always 1d12 Lightning.",
    "upcastDice": {
      "count": 1,
      "size": 12
    },
    "classes": [
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "subclasses": [
      "Draconic Bloodline",
      "Arcane Trickster",
      "Eldritch Knight"
    ],
    "races": [],
    "availability": [
      {
        "name": "Sorcerer",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Warlock",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Wizard",
        "kind": "class",
        "level": 1,
        "via": null
      },
      {
        "name": "Draconic Bloodline",
        "kind": "subclass",
        "level": 1,
        "via": "Blue/Lightning Ancestry"
      },
      {
        "name": "Arcane Trickster",
        "kind": "subclass",
        "level": 3,
        "via": null
      },
      {
        "name": "Eldritch Knight",
        "kind": "subclass",
        "level": 3,
        "via": null
      }
    ],
    "icon": "icons/spells/witch-bolt.webp",
    "wiki": "https://bg3.wiki/wiki/Witch_Bolt"
  },
  {
    "id": "withering-gift",
    "name": "Withering Gift",
    "level": 4,
    "school": "Necromancy",
    "desc": "Give your Withering Life Force to another creature.",
    "cost": "Action",
    "damage": null,
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": null,
    "damageMax": null,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/withering-gift.webp",
    "wiki": "https://bg3.wiki/wiki/Withering_Gift"
  },
  {
    "id": "withering-theft",
    "name": "Withering Theft",
    "level": 4,
    "school": "Necromancy",
    "desc": "Rob a creature of its life force and gain 20 temporary hit points.",
    "cost": "Action",
    "damage": "2d8 Necrotic",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 2,
    "damageMax": 16,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Necrotic"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/withering-theft.webp",
    "wiki": "https://bg3.wiki/wiki/Withering_Theft"
  },
  {
    "id": "withering-touch",
    "name": "Withering Touch",
    "level": 4,
    "school": "Necromancy",
    "desc": "Touch a nearby creature and pour your fetid magic through its very soul.",
    "cost": "Action",
    "damage": "4d8 + 3 Necrotic",
    "save": null,
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 7,
    "damageMax": 35,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Necrotic"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/withering-touch.webp",
    "wiki": "https://bg3.wiki/wiki/Withering_Touch"
  },
  {
    "id": "woad-s-ensnaring-strike",
    "name": "Woad's Ensnaring Strike",
    "level": 1,
    "school": "Conjuration",
    "desc": "Your attack summons thorny vines that possibly Ensnare your target.",
    "cost": "Bonus Action",
    "damage": "1d4 Bludgeoning",
    "save": "STR",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 1,
    "damageMax": 4,
    "attackRoll": false,
    "halfOnSave": false,
    "damageTypes": [
      "Bludgeoning",
      "Piercing"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/woad-s-ensnaring-strike.webp",
    "wiki": "https://bg3.wiki/wiki/Woad%27s_Ensnaring_Strike"
  },
  {
    "id": "wounding-ray",
    "name": "Wounding Ray",
    "level": 3,
    "school": "Necromancy",
    "desc": "Shoot an eye ray that deals immense damage.",
    "cost": "Action",
    "damage": "2d8 Necrotic",
    "save": "CON",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 2,
    "damageMax": 16,
    "attackRoll": false,
    "halfOnSave": true,
    "damageTypes": [
      "Necrotic"
    ],
    "concentration": false,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [],
    "subclasses": [],
    "races": [],
    "availability": [],
    "icon": "icons/spells/wounding-ray.webp",
    "wiki": "https://bg3.wiki/wiki/Wounding_Ray"
  },
  {
    "id": "wrathful-smite",
    "name": "Wrathful Smite",
    "level": 1,
    "school": "Evocation",
    "desc": "Your weapon absorbs your wrath as you strike, possibly Frightening your target.",
    "cost": "on hit Bonus Action + Level 1 Spell Slot",
    "damage": "1d6 Psychic",
    "save": "WIS",
    "range": "18 m (60 ft)",
    "aoe": null,
    "damageMin": 1,
    "damageMax": 6,
    "attackRoll": true,
    "halfOnSave": false,
    "damageTypes": [
      "Psychic"
    ],
    "concentration": true,
    "ritual": false,
    "scaling": [],
    "upcast": "Casting this spell at a higher level grants no additional benefit.",
    "upcastDice": null,
    "classes": [
      "Paladin"
    ],
    "subclasses": [
      "The Hexblade"
    ],
    "races": [],
    "availability": [
      {
        "name": "The Hexblade",
        "kind": "subclass",
        "level": 1,
        "via": null
      },
      {
        "name": "Paladin",
        "kind": "class",
        "level": 2,
        "via": null
      }
    ],
    "icon": "icons/spells/wrathful-smite.webp",
    "wiki": "https://bg3.wiki/wiki/Wrathful_Smite"
  }
];

if (typeof module !== "undefined") module.exports = SPELLS;

