export function calculateHitChance(attack, ac, adv, sys, hluck, sight) {
  var result = {
    text: sys === "DnD 5e" ? "DnD5e Hit: " : "PF2e Hit: ",
    value: Number(0),
  };
  result.value = sys === "DnD 5e" ? Number(1 / 20) : Number(0);

  if ((ac || ac === 0) && (attack || attack === 0)) {
    let overZero = Number(parseInt(attack) + 20 - parseInt(ac));
    if (overZero > -1) {
      if (overZero > 28 && sys === "PF 2e") {
        result.text = result.text + "(" + overZero + " > 28) -> 1\n";
        result.value = Number(1);
      } else {
        result.value = (overZero > 18 ? 19 : overZero + 1) / 20;
        result.text =
          result.text +
          "(" +
          overZero +
          " > 18 ? 19 : " +
          overZero +
          " + 1) -> " +
          (overZero > 18 ? 19 : overZero + 1) +
          " / 20 = " +
          fourDecimalPlaces(result.value) +
          "\n";
      }
    } else if (sys === "PF 2e" && overZero > -11) {
      result.text =
        result.text + "(0 > " + overZero + " > -11) -> 1/20 = 0.05\n";
      result.value = Number(1 / 20);
    } else {
      result.text =
        sys === "DnD 5e"
          ? result.text + " (1 / 20)  = 0.05\n"
          : result.text + "(" + overZero + " < -10) -> 0\n";
    }

    result = calculateAdvHit(adv, sys, result, overZero);
    result = calculateHluckHit(hluck, sys, result, overZero, adv);
    result = calculateSight(sight, sys, result);
  } else {
    if (sys === "DnD 5e") {
      result.text = result.text + "0.05\n";
    } else {
      result.text = result.text + "0\n";
    }
  }
  result.value = Math.round(result.value * 100 * 100) / 100;
  return result;
}

export function calculateCritChance(attack, ac, adv, sys, hluck, sight) {
  let result = {
    text: sys === "DnD 5e" ? "DnD5e Crit: " : "PF2e Crit: ",
    value: Number(0),
  };
  if (sys === "DnD 5e") {
    if (adv === "Normal") {
      result.text = result.text + "(1 / 20)";
      result.value = Number(1 / 20);
    } else if (adv === "Advantage") {
      result.text = result.text + "1 / 20 + (1 / 20) * (19 / 20)";
      result.value = Number(1 / 20 + (1 / 20) * (19 / 20));
    } else {
      result.text = result.text + "1 / 20 - (1 / 20) * (19 / 20)";
      result.value = Number(1 / 20 - (1 / 20) * (19 / 20));
    }
    result.text = result.text + " = " + fourDecimalPlaces(result.value) + "\n";
    // halflings luck gives you at 1 another chance to roll a 20
    if (hluck) {
      result.text =
        result.text +
        "  H Luck: " +
        fourDecimalPlaces(result.value) +
        " + (1 / 20) * (1 / 20)";
      result.value = result.value + (1 / 20) * (1 / 20);
      result.text =
        result.text + " = " + fourDecimalPlaces(result.value) + "\n";
    }
  } else {
    if ((ac || ac === 0) && (attack || attack === 0)) {
      let maxHit = Number(parseInt(attack) + 20 - parseInt(ac));
      if (maxHit > -1) {
        // you can reach the crit section only with a 20, so you stay at 5% chance
        if (maxHit < 11) {
          result.text = result.text + "(-1 < " + maxHit + " < 11) -> 1 / 20";
          result.value = Number(1 / 20);
          // you are also with a one in the crit section, but you can loose the crit because of the one
        } else if (maxHit > 28) {
          result.text = result.text + "(28 < " + maxHit + ") -> 19 / 20";
          result.value = Number(19 / 20);
        } else {
          result.text =
            result.text +
            "(10 < " +
            maxHit +
            " < 29) -> (" +
            maxHit +
            " - 9) / 20";
          result.value = (maxHit - 9) / 20;
        }
        result.text =
          result.text + " = " + fourDecimalPlaces(result.value) + "\n";
      } else {
        result.text = result.text + "(" + maxHit + " < 0) -> 0\n";
      }
    }
  }

  result = calculateSight(sight, sys, result);
  result.value = Math.round(result.value * 100 * 100) / 100;
  return result;
}

function calculateSight(sight, sys, result) {
  if (sys === "PF 2e" && sight > 0) {
    result.text =
      result.text +
      "  Sight: " +
      fourDecimalPlaces(result.value) +
      " * ((20 - " +
      sight +
      ") / 20)";
    result.value = result.value * ((20 - Number(sight)) / 20);
    result.text = result.text + " = " + fourDecimalPlaces(result.value) + "\n";
  }

  return result;
}

function fourDecimalPlaces(number) {
  return Math.round(number * 10000) / 10000;
}

function twoDecimalPlaces(number) {
  return Math.round(number * 100) / 100;
}

function calculateAdvHit(adv, sys, result, overZero) {
  if (sys === "DnD 5e") {
    if (adv === "Advantage") {
      if (overZero > -1) {
        result.text =
          result.text +
          "  Adv: " +
          result.value +
          " + (1 - " +
          result.value +
          ") * " +
          result.value;
        result.value = result.value + (1 - result.value) * result.value;
        result.text =
          result.text + " = " + fourDecimalPlaces(result.value) + "\n";
      } else {
        // add the chance of a 20 next dice throw...
        result.text =
          result.text +
          "  Adv: " +
          result.value +
          " + (1 - " +
          result.value +
          ") * (1 / 20)";
        result.value = result.value + (1 - result.value) * (1 / 20);
        result.text =
          result.text + " = " + fourDecimalPlaces(result.value) + "\n";
      }
    } else if (adv === "Disadvantage") {
      result.text =
        result.text + "  Disadv: " + result.value + " * " + result.value;
      result.value = result.value + (1 - result.value) * (1 / 20);
      // if 2 probabilities success are needed, multiply (https://www.omnicalculator.com/statistics/dice)
      result.value = result.value * result.value;
      result.text =
        result.text + " = " + fourDecimalPlaces(result.value) + "\n";
    }
  }
  return result;
}
function calculateHluckHit(hluck, sys, result, overZero, adv) {
  if (sys === "DnD 5e" && hluck) {
    if (overZero > -1) {
      result.text =
        result.text +
        "  H Luck: " +
        fourDecimalPlaces(result.value) +
        " + (1 - " +
        fourDecimalPlaces(result.value) +
        ") * ((" +
        overZero +
        " > 18 ? 19 : " +
        overZero +
        " + 1) ->" +
        (overZero > 18 ? 19 : overZero + 1) +
        " / 20) *\n     (1 / (20 - (" +
        overZero +
        " > 18 ? 19 : (" +
        overZero +
        " + 1)) -> " +
        (overZero > 18 ? 19 : overZero + 1) +
        "))";
      if (adv !== "Normal") {
        result.text = result.text + " * 2";
      }
      // here we take the probability and add the fail probability multiplied with the chance to succeed now.
      // to roll a 1 is (1/20) and if adv/disadv it is (2/20) because we roll 2 times
      result.value =
        result.value +
        (1 - result.value) *
          ((overZero > 18 ? 19 : overZero + 1) / 20) *
          (1 / (20 - (overZero > 18 ? 19 : overZero + 1)));
      //* ((1 / 20) * (adv !== "Normal" ? 2 : 1));
      result.text =
        result.text + " = " + fourDecimalPlaces(result.value) + "\n";
    } else {
      result.text =
        result.text +
        "  H Luck: " +
        fourDecimalPlaces(result.value) +
        " + (1 / 20) * (1 / 20)";
      // only have success with 20 (0.05), so we add the possibility that it was a one and the possiltity to throw then a 20 ((1/20)*(1/20))
      result.value = result.value + (1 / 20) * (1 / 20);
      result.text =
        result.text + " = " + fourDecimalPlaces(result.value) + "\n";
    }
  }
  return result;
}

export function calculatePF2WeaponDamage(
  weapons,
  weapon,
  strength,
  striking,
  critSpecBoolean,
  potency,
  sneakDices
) {
  if (weapon) {
    let critSpecMin = "";
    let critSpecMed = "";
    let critSpecMax = "";

    sneakDices = Number(sneakDices);

    const countDice =
      Number(weapon.damage.split("d")[0]) + Number(striking ? striking : 0);
    const diceValue = Number(weapon.damage.split("d")[1].split(" ")[0]);
    const deadlyTrait = weapon.weaponTraits.find((trait) =>
      trait.trim().startsWith("Deadly")
    );
    const fatalTrait = weapon.weaponTraits.find((trait) =>
      trait.trim().startsWith("Fatal")
    );
    const deadlyValue = Number(
      deadlyTrait ? deadlyTrait.trim().split(" ")[1].substring(1) : 0
    );
    const fatalValue = Number(
      fatalTrait ? fatalTrait.trim().split(" ")[1].substring(1) : 0
    );

    const strengthNumber =
      weapons.meleeWeapons.includes(weapon) ||
      weapon.weaponTraits.find((trait) => trait.trim() === "Thrown")
        ? Number(strength ? strength : 0)
        : weapon.weaponTraits.find((trait) => trait.trim() === "Propulsive")
        ? Number(strength ? Math.floor(strength / 2) : 0)
        : 0;
    const min = countDice + strengthNumber + sneakDices;
    const max = countDice * diceValue + strengthNumber + sneakDices * 6;
    const medium = twoDecimalPlaces(
      Number(
        ((1 + diceValue) * countDice) / 2 + strengthNumber + (3, 5 * sneakDices)
      )
    );

    const critMin =
      min * 2 +
      (deadlyValue ? (striking === "2" ? 2 : striking === "3" ? 3 : 1) : 0) +
      (fatalValue ? 1 : 0);

    const critMax =
      (fatalValue
        ? countDice * fatalValue + strengthNumber + 6 * sneakDices
        : max) *
        2 +
      (deadlyValue
        ? striking === "2"
          ? deadlyValue * 2
          : striking === "3"
          ? deadlyValue * 3
          : deadlyValue
        : 0) +
      (fatalValue ? fatalValue : 0);

    const critMedium =
      (fatalValue
        ? ((1 + fatalValue) * countDice) / 2 + strengthNumber + 3.5 * sneakDices
        : medium) *
        2 +
      (deadlyValue
        ? striking === "2"
          ? deadlyValue + 1
          : striking === "3"
          ? ((deadlyValue + 1) / 2) * 3
          : (deadlyValue + 1) / 2
        : 0) +
      (fatalValue ? (fatalValue + 1) / 2 : 0);

    if (critSpecBoolean) {
      switch (weapon.group) {
        case "Axe":
          critSpecMin = " + possible " + countDice + " to adjacent";
          critSpecMed =
            " + possible " +
            twoDecimalPlaces(Number(((1 + diceValue) * countDice) / 2)) +
            " to adjacent";
          critSpecMax = " + possible " + countDice * diceValue + " to adjacent";
          break;

        case "Bow":
          critSpecMin = " + possible stuck to surface";
          critSpecMed = " + possible stuck to surface";
          critSpecMax = " + possible stuck to surface";
          break;

        case "Brawling":
          critSpecMin = " + possilbe slowed 1";
          critSpecMed = " + possilbe slowed 1";
          critSpecMax = " + possilbe slowed 1";
          break;

        case "Club":
          critSpecMin = " + knocked away";
          critSpecMed = " + knocked away";
          critSpecMax = " + knocked away";
          break;

        case "Pick":
          critSpecMin = " + " + countDice * 2 + " P";
          critSpecMed = " + " + countDice * 2 + " P";
          critSpecMax = " + " + countDice * 2 + " P";
          break;

        case "Polearm":
          critSpecMin = " + moved 5 feet away";
          critSpecMed = " + moved 5 feet away";
          critSpecMax = " + moved 5 feet away";
          break;

        case "Shield":
          critSpecMin = " + knocked 5 feet away";
          critSpecMed = " + knocked 5 feet away";
          critSpecMax = " + knocked 5 feet away";
          break;

        case "Sling":
          critSpecMin = " + possible stunned 1";
          critSpecMed = " + possible stunned 1";
          critSpecMax = " + possible stunned 1";
          break;

        case "Spear":
          critSpecMin = " + clumsy 1";
          critSpecMed = " + clumsy 1";
          critSpecMax = " + clumsy 1";
          break;

        case "Sword":
          critSpecMin = " + flat-footed";
          critSpecMed = " + flat-footed";
          critSpecMax = " + flat-footed";
          break;

        case "Hammer":
        case "Flail":
          critSpecMin = " + knocked prone";
          critSpecMed = " + knocked prone";
          critSpecMax = " + knocked prone";
          break;

        case "Dart":
        case "Knife":
          critSpecMin = " + " + (1 + Number(potency)) + " bleeding";
          critSpecMed = " + " + (3.5 + Number(potency)) + " bleeding";
          critSpecMax = " + " + (6 + Number(potency)) + " bleeding";
          break;
        default:
          // do nothing
          break;
      }
    }

    return {
      min: min,
      medium: medium,
      max: max,
      critMin: critMin,
      critMax: critMax,
      critMedium: critMedium,
      critSpecMin: critSpecMin,
      critSpecMax: critSpecMax,
      critSpecMed: critSpecMed,
    };
  }
  return "";
}

export function calculateDnD5WeaponDamage(
  weapon,
  strength,
  dexterity,
  sneakDices
) {
  if (weapon) {
    const countDice = Number(weapon.damage_dice.split("d")[0]);
    const diceValue = Number(weapon.damage_dice.split("d")[1].split(" ")[0]);

    const abilityModifier = Number(
      weapon.category.includes("Melee")
        ? weapon.properties.includes("finesse") && dexterity > strength
          ? dexterity
          : strength
        : weapon.category.includes("Ranged")
        ? dexterity
        : 0
    );
    sneakDices = Number(sneakDices);

    const min = countDice + abilityModifier + sneakDices;
    const max = countDice * diceValue + abilityModifier + sneakDices * 6;

    const medium = twoDecimalPlaces(
      Number(
        ((1 + diceValue) * countDice) / 2 + abilityModifier + sneakDices * 3.5
      )
    );

    const critMin = min + countDice + sneakDices;
    const critMedium =
      medium + Number(((1 + diceValue) * countDice) / 2 + sneakDices * 3.5);
    const critMax = max + countDice * diceValue + sneakDices * 6;

    return {
      min: min,
      medium: medium,
      max: max,
      critMin: critMin,
      critMax: critMax,
      critMedium: critMedium,
    };
  }
  return "";
}
