export function objectByString(o, s) {
  s = s.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties
  s = s.replace(/^\./, ""); // strip a leading dot
  var a = s.split(".");
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i];
    if (k in o) {
      o = o[k];
    } else {
      return;
    }
  }
  return o;
}

export function getUnitedOptions(pf2Weapons, dndWeapons) {
  let melee = uniteWeapons(
    pf2Weapons.meleeWeapons,
    dndWeapons.filter((weapon) => weapon.category.includes("Melee")),
    "PF2",
    "DnD5"
  ).sort(sortName);
  let ranged = uniteWeapons(
    pf2Weapons.rangeWeapons.filter(
      (weapon) =>
        weapon.category !== "Ammunition" && weapon.name !== "Alchemical Bomb"
    ),
    dndWeapons.filter(
      (weapon) =>
        weapon.category.includes("Ranged") &&
        weapon.slug !== "net" &&
        weapon.slug !== "blowgun"
    ),
    "PF2",
    "DnD5"
  ).sort(sortName);
  return { "Melee Weapons": melee, "Ranged Weapons": ranged };
}

export function sortName(a, b) {
  var nameA = a.name.toUpperCase(); // ignore upper and lowercase
  var nameB = b.name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
}

function uniteWeapons(array1, array2, orgin1, orgin2) {
  let newArray = [];

  for (var i = 0; i < array1.length; i++) {
    newArray.push({ name: array1[i].name, orgin: orgin1 });
  }

  for (var j = 0; j < array2.length; j++) {
    let a2Weapon = array2[j];
    let both = false;
    for (var k = 0; k < newArray.length; k++) {
      if (a2Weapon.name === newArray[k].name) {
        newArray[k].orgin = "both";
        both = true;
        break;
      }
    }
    if (!both) {
      newArray.push({ name: a2Weapon.name, orgin: orgin2 });
    }
  }
  return newArray;
}

export function enrichDiceWithDamageType(dnd5weaponsArrray) {
  let newArray = JSON.parse(JSON.stringify(dnd5weaponsArrray));
  newArray.forEach(
    (item) =>
      (item.damage_dice =
        item.damage_dice + " " + item.damage_type.charAt(0).toUpperCase())
  );
  return newArray;
}
