/*https://www.dnd5eapi.co/graphql
{
  equipments(filter: { equipment_category: { index: "weapon" } }) {
    index
    name
    damage {
      damage_dice
      damage_type {
        index
      }
    }
    properties {
      index
    }
    weapon_category
    weapon_range
    range {
      normal
      long
    }
    two_handed_damage {
      damage_dice
      damage_type {
        index
      }
    }
  }
}*/
export const weaponsDnd5Srd = [
  {
    index: "crossbow-hand",
    name: "Crossbow, hand",
    damage: {
      damage_dice: "1d6",
      damage_type: {
        index: "piercing",
      },
    },
    properties: [
      {
        index: "ammunition",
      },
      {
        index: "light",
      },
      {
        index: "loading",
      },
    ],
    weapon_category: "Martial",
    weapon_range: "Ranged",
    range: {
      normal: 30,
      long: 120,
    },
  },
  {
    index: "whip",
    name: "Whip",
    damage: {
      damage_dice: "1d4",
      damage_type: {
        index: "slashing",
      },
    },
    properties: [
      {
        index: "finesse",
      },
      {
        index: "reach",
      },
    ],
    weapon_category: "Martial",
    weapon_range: "Melee",
    range: {
      normal: 5,
      long: null,
    },
  },
  {
    index: "blowgun",
    name: "Blowgun",
    damage: {
      damage_dice: "1d1",
      damage_type: {
        index: "piercing",
      },
    },
    properties: [
      {
        index: "ammunition",
      },
      {
        index: "loading",
      },
    ],
    weapon_category: "Martial",
    weapon_range: "Ranged",
    range: {
      normal: 25,
      long: 100,
    },
  },
  {
    index: "crossbow-heavy",
    name: "Crossbow, heavy",
    damage: {
      damage_dice: "1d10",
      damage_type: {
        index: "piercing",
      },
    },
    properties: [
      {
        index: "ammunition",
      },
      {
        index: "light",
      },
      {
        index: "loading",
      },
      {
        index: "two-handed",
      },
    ],
    weapon_category: "Martial",
    weapon_range: "Ranged",
    range: {
      normal: 100,
      long: 400,
    },
  },
  {
    index: "club",
    name: "Club",
    damage: {
      damage_dice: "1d4",
      damage_type: {
        index: "bludgeoning",
      },
    },
    properties: [
      {
        index: "light",
      },
      {
        index: "monk",
      },
    ],
    weapon_category: "Simple",
    weapon_range: "Melee",
    range: {
      normal: 5,
      long: null,
    },
  },
  {
    index: "handaxe",
    name: "Handaxe",
    damage: {
      damage_dice: "1d6",
      damage_type: {
        index: "slashing",
      },
    },
    properties: [
      {
        index: "light",
      },
      {
        index: "thrown",
      },
      {
        index: "monk",
      },
    ],
    weapon_category: "Simple",
    weapon_range: "Melee",
    range: {
      normal: 5,
      long: null,
    },
  },
  {
    index: "spear",
    name: "Spear",
    damage: {
      damage_dice: "1d6",
      damage_type: {
        index: "piercing",
      },
    },
    properties: [
      {
        index: "thrown",
      },
      {
        index: "versatile",
      },
      {
        index: "monk",
      },
    ],
    weapon_category: "Simple",
    weapon_range: "Melee",
    range: {
      normal: 5,
      long: null,
    },
    two_handed_damage: {
      damage_dice: "1d8",
      damage_type: {
        index: "piercing",
      },
    },
  },
  {
    index: "quarterstaff",
    name: "Quarterstaff",
    damage: {
      damage_dice: "1d6",
      damage_type: {
        index: "bludgeoning",
      },
    },
    properties: [
      {
        index: "versatile",
      },
      {
        index: "monk",
      },
    ],
    weapon_category: "Simple",
    weapon_range: "Melee",
    range: {
      normal: 5,
      long: null,
    },
    two_handed_damage: {
      damage_dice: "1d8",
      damage_type: {
        index: "bludgeoning",
      },
    },
  },
  {
    index: "halberd",
    name: "Halberd",
    damage: {
      damage_dice: "1d10",
      damage_type: {
        index: "slashing",
      },
    },
    properties: [
      {
        index: "heavy",
      },
      {
        index: "reach",
      },
      {
        index: "two-handed",
      },
    ],
    weapon_category: "Martial",
    weapon_range: "Melee",
    range: {
      normal: 5,
      long: null,
    },
  },
  {
    index: "rapier",
    name: "Rapier",
    damage: {
      damage_dice: "1d8",
      damage_type: {
        index: "piercing",
      },
    },
    properties: [
      {
        index: "finesse",
      },
    ],
    weapon_category: "Martial",
    weapon_range: "Melee",
    range: {
      normal: 5,
      long: null,
    },
  },
  {
    index: "shortsword",
    name: "Shortsword",
    damage: {
      damage_dice: "1d6",
      damage_type: {
        index: "piercing",
      },
    },
    properties: [
      {
        index: "finesse",
      },
      {
        index: "light",
      },
      {
        index: "monk",
      },
    ],
    weapon_category: "Martial",
    weapon_range: "Melee",
    range: {
      normal: 5,
      long: null,
    },
  },
  {
    index: "warhammer",
    name: "Warhammer",
    damage: {
      damage_dice: "1d8",
      damage_type: {
        index: "bludgeoning",
      },
    },
    properties: [
      {
        index: "versatile",
      },
    ],
    weapon_category: "Martial",
    weapon_range: "Melee",
    range: {
      normal: 5,
      long: null,
    },
    two_handed_damage: {
      damage_dice: "1d10",
      damage_type: {
        index: "bludgeoning",
      },
    },
  },
  {
    index: "longsword",
    name: "Longsword",
    damage: {
      damage_dice: "1d8",
      damage_type: {
        index: "slashing",
      },
    },
    properties: [
      {
        index: "versatile",
      },
    ],
    weapon_category: "Martial",
    weapon_range: "Melee",
    range: {
      normal: 5,
      long: null,
    },
    two_handed_damage: {
      damage_dice: "1d10",
      damage_type: {
        index: "slashing",
      },
    },
  },
  {
    index: "mace",
    name: "Mace",
    damage: {
      damage_dice: "1d6",
      damage_type: {
        index: "bludgeoning",
      },
    },
    properties: [
      {
        index: "monk",
      },
    ],
    weapon_category: "Simple",
    weapon_range: "Melee",
    range: {
      normal: 5,
      long: null,
    },
  },
  {
    index: "shortbow",
    name: "Shortbow",
    damage: {
      damage_dice: "1d6",
      damage_type: {
        index: "piercing",
      },
    },
    properties: [
      {
        index: "ammunition",
      },
      {
        index: "two-handed",
      },
    ],
    weapon_category: "Simple",
    weapon_range: "Ranged",
    range: {
      normal: 80,
      long: 320,
    },
  },
  {
    index: "trident",
    name: "Trident",
    damage: {
      damage_dice: "1d6",
      damage_type: {
        index: "slashing",
      },
    },
    properties: [
      {
        index: "thrown",
      },
      {
        index: "versatile",
      },
    ],
    weapon_category: "Martial",
    weapon_range: "Melee",
    range: {
      normal: 5,
      long: null,
    },
    two_handed_damage: {
      damage_dice: "1d8",
      damage_type: {
        index: "piercing",
      },
    },
  },
  {
    index: "dagger",
    name: "Dagger",
    damage: {
      damage_dice: "1d4",
      damage_type: {
        index: "piercing",
      },
    },
    properties: [
      {
        index: "finesse",
      },
      {
        index: "light",
      },
      {
        index: "thrown",
      },
      {
        index: "monk",
      },
    ],
    weapon_category: "Simple",
    weapon_range: "Melee",
    range: {
      normal: 5,
      long: null,
    },
  },
  {
    index: "light-hammer",
    name: "Light hammer",
    damage: {
      damage_dice: "1d4",
      damage_type: {
        index: "bludgeoning",
      },
    },
    properties: [
      {
        index: "light",
      },
      {
        index: "thrown",
      },
      {
        index: "monk",
      },
    ],
    weapon_category: "Simple",
    weapon_range: "Melee",
    range: {
      normal: 5,
      long: null,
    },
  },
  {
    index: "sickle",
    name: "Sickle",
    damage: {
      damage_dice: "1d4",
      damage_type: {
        index: "slashing",
      },
    },
    properties: [
      {
        index: "light",
      },
      {
        index: "monk",
      },
    ],
    weapon_category: "Simple",
    weapon_range: "Melee",
    range: {
      normal: 5,
      long: null,
    },
  },
  {
    index: "battleaxe",
    name: "Battleaxe",
    damage: {
      damage_dice: "1d8",
      damage_type: {
        index: "slashing",
      },
    },
    properties: [
      {
        index: "versatile",
      },
    ],
    weapon_category: "Martial",
    weapon_range: "Melee",
    range: {
      normal: 5,
      long: null,
    },
    two_handed_damage: {
      damage_dice: "1d10",
      damage_type: {
        index: "slashing",
      },
    },
  },
  {
    index: "sling",
    name: "Sling",
    damage: {
      damage_dice: "1d4",
      damage_type: {
        index: "bludgeoning",
      },
    },
    properties: [
      {
        index: "ammunition",
      },
    ],
    weapon_category: "Simple",
    weapon_range: "Ranged",
    range: {
      normal: 30,
      long: 120,
    },
  },
  {
    index: "maul",
    name: "Maul",
    damage: {
      damage_dice: "2d6",
      damage_type: {
        index: "bludgeoning",
      },
    },
    properties: [
      {
        index: "heavy",
      },
      {
        index: "two-handed",
      },
    ],
    weapon_category: "Martial",
    weapon_range: "Melee",
    range: {
      normal: 5,
      long: null,
    },
  },
  {
    index: "dart",
    name: "Dart",
    damage: {
      damage_dice: "1d4",
      damage_type: {
        index: "piercing",
      },
    },
    properties: [
      {
        index: "finesse",
      },
      {
        index: "thrown",
      },
    ],
    weapon_category: "Simple",
    weapon_range: "Ranged",
    range: {
      normal: 20,
      long: 60,
    },
  },
  {
    index: "greataxe",
    name: "Greataxe",
    damage: {
      damage_dice: "1d12",
      damage_type: {
        index: "slashing",
      },
    },
    properties: [
      {
        index: "heavy",
      },
      {
        index: "two-handed",
      },
    ],
    weapon_category: "Martial",
    weapon_range: "Melee",
    range: {
      normal: 5,
      long: null,
    },
  },
  {
    index: "greatsword",
    name: "Greatsword",
    damage: {
      damage_dice: "2d6",
      damage_type: {
        index: "slashing",
      },
    },
    properties: [
      {
        index: "heavy",
      },
      {
        index: "two-handed",
      },
    ],
    weapon_category: "Martial",
    weapon_range: "Melee",
    range: {
      normal: 5,
      long: null,
    },
  },
  {
    index: "pike",
    name: "Pike",
    damage: {
      damage_dice: "1d10",
      damage_type: {
        index: "piercing",
      },
    },
    properties: [
      {
        index: "heavy",
      },
      {
        index: "reach",
      },
      {
        index: "two-handed",
      },
    ],
    weapon_category: "Martial",
    weapon_range: "Melee",
    range: {
      normal: 5,
      long: null,
    },
  },
  {
    index: "greatclub",
    name: "Greatclub",
    damage: {
      damage_dice: "1d8",
      damage_type: {
        index: "bludgeoning",
      },
    },
    properties: [
      {
        index: "two-handed",
      },
    ],
    weapon_category: "Simple",
    weapon_range: "Melee",
    range: {
      normal: 5,
      long: null,
    },
  },
  {
    index: "glaive",
    name: "Glaive",
    damage: {
      damage_dice: "1d10",
      damage_type: {
        index: "slashing",
      },
    },
    properties: [
      {
        index: "heavy",
      },
      {
        index: "reach",
      },
      {
        index: "two-handed",
      },
    ],
    weapon_category: "Martial",
    weapon_range: "Melee",
    range: {
      normal: 5,
      long: null,
    },
  },
  {
    index: "flail",
    name: "Flail",
    damage: {
      damage_dice: "1d8",
      damage_type: {
        index: "bludgeoning",
      },
    },
    properties: [],
    weapon_category: "Martial",
    weapon_range: "Melee",
    range: {
      normal: 5,
      long: null,
    },
  },
  {
    index: "javelin",
    name: "Javelin",
    damage: {
      damage_dice: "1d6",
      damage_type: {
        index: "piercing",
      },
    },
    properties: [
      {
        index: "thrown",
      },
      {
        index: "monk",
      },
    ],
    weapon_category: "Simple",
    weapon_range: "Melee",
    range: {
      normal: 5,
      long: null,
    },
  },
  {
    index: "crossbow-light",
    name: "Crossbow, light",
    damage: {
      damage_dice: "1d8",
      damage_type: {
        index: "piercing",
      },
    },
    properties: [
      {
        index: "ammunition",
      },
      {
        index: "loading",
      },
      {
        index: "two-handed",
      },
    ],
    weapon_category: "Simple",
    weapon_range: "Ranged",
    range: {
      normal: 80,
      long: 320,
    },
  },
  {
    index: "war-pick",
    name: "War pick",
    damage: {
      damage_dice: "1d8",
      damage_type: {
        index: "piercing",
      },
    },
    properties: [],
    weapon_category: "Martial",
    weapon_range: "Melee",
    range: {
      normal: 5,
      long: null,
    },
  },
  {
    index: "longbow",
    name: "Longbow",
    damage: {
      damage_dice: "1d8",
      damage_type: {
        index: "piercing",
      },
    },
    properties: [
      {
        index: "ammunition",
      },
      {
        index: "heavy",
      },
      {
        index: "two-handed",
      },
    ],
    weapon_category: "Martial",
    weapon_range: "Ranged",
    range: {
      normal: 150,
      long: 600,
    },
  },
  {
    index: "lance",
    name: "Lance",
    damage: {
      damage_dice: "1d12",
      damage_type: {
        index: "piercing",
      },
    },
    properties: [
      {
        index: "reach",
      },
      {
        index: "special",
      },
    ],
    weapon_category: "Martial",
    weapon_range: "Melee",
    range: {
      normal: 5,
      long: null,
    },
  },
  {
    index: "morningstar",
    name: "Morningstar",
    damage: {
      damage_dice: "1d8",
      damage_type: {
        index: "piercing",
      },
    },
    properties: [],
    weapon_category: "Martial",
    weapon_range: "Melee",
    range: {
      normal: 5,
      long: null,
    },
  },
  {
    index: "scimitar",
    name: "Scimitar",
    damage: {
      damage_dice: "1d6",
      damage_type: {
        index: "slashing",
      },
    },
    properties: [
      {
        index: "finesse",
      },
      {
        index: "light",
      },
    ],
    weapon_category: "Martial",
    weapon_range: "Melee",
    range: {
      normal: 5,
      long: null,
    },
  },
];
