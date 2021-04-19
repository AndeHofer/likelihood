import React from "react";
import "./Calculator.css";
import { dnd5Monsters } from "./data/monsterDnd5eSrd";
import DynamicSelect from "./components/DynamicSelect";
import ValueInput from "./components/NumberInput";
import CheckboxInput from "./components/CheckboxInput";
import { pf2Monsters } from "./data/monstersPF2";
import RadioInputGroup from "./components/RadioInputGroup";

class HitCritCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attack: "0",
      ac: "10",
      adv: "Normal",
      hluck: false,
      agile: false,
      sight: 0,
      keenEyes: false,
    };

    this.handleAcChange = this.handleAcChange.bind(this);
    this.handleAttackChange = this.handleAttackChange.bind(this);
    this.handleAdvChange = this.handleAdvChange.bind(this);
    this.handleHluckChange = this.handleHluckChange.bind(this);
    this.handleMonsterChange = this.handleMonsterChange.bind(this);
    this.handleAgileChange = this.handleAgileChange.bind(this);
    this.handleSightChange = this.handleSightChange.bind(this);
    this.handleKeenEyesChange = this.handleKeenEyesChange.bind(this);
  }

  handleAcChange(value) {
    this.setState({ ac: value });
  }

  handleAttackChange(value) {
    this.setState({ attack: value });
  }

  handleAdvChange(value) {
    this.setState({ adv: value });
  }

  handleHluckChange(value) {
    this.setState({ hluck: !this.state.hluck });
  }

  handleAgileChange(value) {
    this.setState({ agile: !this.state.agile });
  }

  handleMonsterChange(value) {
    this.setState({ ac: value });
  }

  handleSightChange(value) {
    //console.log(value);
    this.setState({ sight: value });
  }

  handleKeenEyesChange(value) {
    this.setState({ keenEyes: !this.state.keenEyes });
  }

  render() {
    const ac = this.state.ac;
    const attack = this.state.attack;
    const adv = this.state.adv;
    const hluck = this.state.hluck;
    const agile = this.state.agile;
    const sight = Number(this.state.sight);
    const keenEyes = this.state.keenEyes;
    const sightEndValue = keenEyes && sight > 0 ? sight - 2 : sight;
    const likelihoodHitDnD = calculateHitChance(
      attack,
      ac,
      adv,
      "DnD 5e",
      hluck,
      0
    );
    const likelihoodHitPF = calculateHitChance(
      attack,
      ac,
      "Normal",
      "PF 2e",
      false,
      sightEndValue
    );

    const likelihoodHitPF2nd = calculateHitChance(
      attack ? (agile ? attack - 4 : attack - 5) : attack,
      ac,
      "Normal",
      "PF 2e",
      false,
      sightEndValue
    );
    const likelihoodHitPF3rd = calculateHitChance(
      attack ? (agile ? attack - 8 : attack - 10) : attack,
      ac,
      "Normal",
      "PF 2e",
      false,
      sightEndValue
    );
    const likelihoodCritDnD = calculateCritChance(
      attack,
      ac,
      adv,
      "DnD 5e",
      hluck,
      0
    );
    const likelihoodCritPF = calculateCritChance(
      attack,
      ac,
      "Normal",
      "PF 2e",
      false,
      sightEndValue
    );
    const likelihoodCritPF2nd = calculateCritChance(
      attack ? (agile ? attack - 4 : attack - 5) : attack,
      ac,
      "Normal",
      "PF 2e",
      false,
      sightEndValue
    );
    const likelihoodCritPF3rd = calculateCritChance(
      attack ? (agile ? attack - 8 : attack - 10) : attack,
      ac,
      "Normal",
      "PF 2e",
      false,
      sightEndValue
    );

    const radioAdv = [
      { value: "Normal", label: "Normal" },
      { value: "Advantage", label: "Advantage" },
      { value: "Disadvantage", label: "Disadvantage" },
    ];

    // value is how many dices can fail, DC 5 is 4, DC 11 is 10 dices which can fail, keenEyes alters this too
    const radioSight = [
      { value: 0, label: "Observed" },
      { value: 4, label: "Concealed" },
      { value: 10, label: "Hidden" },
    ];

    return (
      <div className="calculator">
        <table className="calc-input-table">
          <tbody>
            <tr>
              <th colSpan="4" className="input-header">
                Hit & Crit Input
              </th>
            </tr>
            <tr>
              <td>Attack: </td>
              <td>
                <ValueInput
                  value={attack}
                  onValueChange={this.handleAttackChange}
                />
              </td>
              <td>Armor Class: </td>
              <td>
                <ValueInput value={ac} onValueChange={this.handleAcChange} />
              </td>
            </tr>
            <tr>
              <td>Dnd Monster:</td>
              <td colSpan="3">
                <DynamicSelect
                  options={dnd5Monsters}
                  onValueChange={this.handleMonsterChange}
                  acName="Armor Class"
                />
              </td>
            </tr>
            <tr>
              <td>PF Monster:</td>
              <td colSpan="3">
                <DynamicSelect
                  options={pf2Monsters}
                  onValueChange={this.handleMonsterChange}
                  acName="AC"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <table className="calc-result-table">
          <colgroup className="colgroup-result" />
          <tbody>
            <tr>
              <th>Dungeons & Dragons 5e</th>
              <th>Pathfinder 2e</th>
            </tr>
            <tr>
              <td>
                <div className="middle-relative">
                  <RadioInputGroup
                    radios={radioAdv}
                    onValueChange={this.handleAdvChange}
                    name="adv"
                    selectedValue={adv}
                  />
                </div>
              </td>
              <td>
                <div className="middle-relative">
                  <RadioInputGroup
                    radios={radioSight}
                    onValueChange={this.handleSightChange}
                    name="sight"
                    selectedValue={sight}
                  />
                  <CheckboxInput
                    value={keenEyes}
                    onValueChange={this.handleKeenEyesChange}
                  />{" "}
                  Keen Eyes
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="middle-relative">
                  <CheckboxInput
                    value={hluck}
                    onValueChange={this.handleHluckChange}
                  />{" "}
                  Halflings Luck
                </div>
              </td>
              <td>
                <div className="middle-relative">
                  <CheckboxInput
                    value={agile}
                    onValueChange={this.handleAgileChange}
                  />{" "}
                  Agile Weapon
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div>Hit: {likelihoodHitDnD.value}%</div>
              </td>
              <td>
                <div>
                  Hit: 1st: {likelihoodHitPF.value}%, 2nd:{" "}
                  {likelihoodHitPF2nd.value}%, 3rd: {likelihoodHitPF3rd.value}%
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div>Crit: {likelihoodCritDnD.value}%</div>
              </td>
              <td>
                <div>
                  Crit: 1st: {likelihoodCritPF.value}%, 2nd:{" "}
                  {likelihoodCritPF2nd.value}
                  %, 3rd: {likelihoodCritPF3rd.value}%
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <div className="formula-div">
                  <div>
                    {likelihoodHitDnD.text +
                      "\n" +
                      likelihoodCritDnD.text +
                      "\n1st " +
                      likelihoodHitPF.text +
                      "2nd " +
                      likelihoodHitPF2nd.text +
                      "3rd " +
                      likelihoodHitPF3rd.text +
                      "\n1st " +
                      likelihoodCritPF.text +
                      "2nd " +
                      likelihoodCritPF2nd.text +
                      "3rd " +
                      likelihoodCritPF3rd.text}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

function calculateHitChance(attack, ac, adv, sys, hluck, sight) {
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

function calculateCritChance(attack, ac, adv, sys, hluck, sight) {
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
          result.text = result.text + "(" + maxHit + " < 11) -> 1 / 20";
          result.value = Number(1 / 20);
          // you are also with a one in the crit section, but you can loose the crit because of the one
        } else if (maxHit > 28) {
          result.text = result.text + "(" + maxHit + " > 28) -> 19 / 20";
          result.value = Number(19 / 20);
        } else {
          result.text =
            result.text +
            "(11 < " +
            maxHit +
            " < 28) -> (" +
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

export default HitCritCalculator;
