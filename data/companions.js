// GENERE par scripts/scrape-companions.ps1 + build-companions.ps1 — ne pas editer.
const COMPANIONS = [
  {
    "id": "astarion",
    "name": "Astarion",
    "race": "Elf",
    "subrace": "High Elf",
    "subclass": "Arcane Trickster",
    "background": "Charlatan",
    "class": "Rogue",
    "scores": {
      "str": 8,
      "dex": 17,
      "con": 14,
      "int": 13,
      "wis": 13,
      "cha": 10
    },
    "portrait": "assets/portraits/astarion.webp",
    "wiki": "https://bg3.wiki/wiki/Astarion"
  },
  {
    "id": "shadowheart",
    "name": "Shadowheart",
    "race": "Half-elf",
    "subrace": "High Half-Elf",
    "subclass": "Trickery Domain",
    "background": "Acolyte",
    "class": "Cleric",
    "scores": {
      "str": 13,
      "dex": 13,
      "con": 14,
      "int": 10,
      "wis": 17,
      "cha": 8
    },
    "portrait": "assets/portraits/shadowheart.webp",
    "wiki": "https://bg3.wiki/wiki/Shadowheart"
  },
  {
    "id": "gale",
    "name": "Gale",
    "race": "Human",
    "subrace": null,
    "subclass": "Evocation School",
    "background": "Sage",
    "class": "Wizard",
    "scores": {
      "str": 8,
      "dex": 13,
      "con": 15,
      "int": 17,
      "wis": 10,
      "cha": 12
    },
    "portrait": "assets/portraits/gale.webp",
    "wiki": "https://bg3.wiki/wiki/Gale"
  },
  {
    "id": "laezel",
    "name": "Lae'zel",
    "race": "Githyanki",
    "subrace": null,
    "subclass": "Battle Master",
    "background": "Soldier",
    "class": "Fighter",
    "scores": {
      "str": 17,
      "dex": 13,
      "con": 15,
      "int": 10,
      "wis": 12,
      "cha": 8
    },
    "portrait": "assets/portraits/laezel.webp",
    "wiki": "https://bg3.wiki/wiki/Lae%27zel"
  },
  {
    "id": "wyll",
    "name": "Wyll",
    "race": "Human",
    "subrace": null,
    "subclass": "The Fiend",
    "background": "Folk Hero",
    "class": "Warlock",
    "scores": {
      "str": 8,
      "dex": 13,
      "con": 14,
      "int": 13,
      "wis": 10,
      "cha": 17
    },
    "portrait": "assets/portraits/wyll.webp",
    "wiki": "https://bg3.wiki/wiki/Wyll"
  },
  {
    "id": "karlach",
    "name": "Karlach",
    "race": "Tiefling",
    "subrace": "Zariel Tiefling",
    "subclass": "Berserker",
    "background": "Outlander",
    "class": "Barbarian",
    "scores": {
      "str": 17,
      "dex": 13,
      "con": 15,
      "int": 8,
      "wis": 12,
      "cha": 10
    },
    "portrait": "assets/portraits/karlach.webp",
    "wiki": "https://bg3.wiki/wiki/Karlach"
  },
  {
    "id": "halsin",
    "name": "Halsin",
    "race": "Elf",
    "subrace": "Wood Elf",
    "subclass": "Circle of the Moon",
    "background": "Outlander",
    "class": "Druid",
    "scores": {
      "str": 10,
      "dex": 14,
      "con": 14,
      "int": 8,
      "wis": 17,
      "cha": 12
    },
    "portrait": "assets/portraits/halsin.webp",
    "wiki": "https://bg3.wiki/wiki/Halsin"
  },
  {
    "id": "minthara",
    "name": "Minthara",
    "race": "Drow",
    "subrace": "Lolth-Sworn Drow",
    "subclass": "Oath of Vengeance",
    "background": null,
    "class": "Paladin",
    "scores": null,
    "portrait": "assets/portraits/minthara.webp",
    "wiki": "https://bg3.wiki/wiki/Minthara"
  },
  {
    "id": "jaheira",
    "name": "Jaheira",
    "race": "Half-elf",
    "subrace": "High Half-Elf",
    "subclass": "Circle of the Land",
    "background": "Soldier",
    "class": "Druid",
    "scores": {
      "str": 10,
      "dex": 14,
      "con": 14,
      "int": 8,
      "wis": 17,
      "cha": 12
    },
    "portrait": "assets/portraits/jaheira.webp",
    "wiki": "https://bg3.wiki/wiki/Jaheira"
  },
  {
    "id": "minsc",
    "name": "Minsc",
    "race": "Human",
    "subrace": null,
    "subclass": "Hunter",
    "background": "Folk Hero",
    "class": "Ranger",
    "scores": {
      "str": 12,
      "dex": 17,
      "con": 13,
      "int": 8,
      "wis": 15,
      "cha": 10
    },
    "portrait": "assets/portraits/minsc.webp",
    "wiki": "https://bg3.wiki/wiki/Minsc"
  }
]
;

if (typeof module !== "undefined") module.exports = COMPANIONS;

