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