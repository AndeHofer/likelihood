import React from "react";
import "./Calculator.css";
import { dnd5Monsters } from "./monsterDnd5eSrd";
import DynamicSelect from "./DynamicSelect";
import ValueInput from "./NumberInput";
import CheckboxInput from "./CheckboxInput";
import { pf2Monsters } from "./monstersPF2";
import RadioInputGroup from "./RadioInputGroup";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attack: "0",
      ac: "10",
      adv: "Normal",
      hluck: false,
      agile: false,
      sight: "Observed",
    };

    this.handleAcChange = this.handleAcChange.bind(this);
    this.handleAttackChange = this.handleAttackChange.bind(this);
    this.handleAdvChange = this.handleAdvChange.bind(this);
    this.handleHluckChange = this.handleHluckChange.bind(this);
    this.handleMonsterChange = this.handleMonsterChange.bind(this);
    this.handleAgileChange = this.handleAgileChange.bind(this);
    this.handleSightChange = this.handleSightChange.bind(this);
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
    this.setState({ sight: value });
  }

  render() {
    const ac = this.state.ac;
    const attack = this.state.attack;
    const adv = this.state.adv;
    const hluck = this.state.hluck;
    const agile = this.state.agile;
    const sight = this.state.sight;
    const likelihoodHitDnD = calculateHitChance(
      attack,
      ac,
      adv,
      "DnD 5e",
      hluck,
      "Observed"
    );
    const likelihoodHitPF = calculateHitChance(
      attack,
      ac,
      "Normal",
      "PF 2e",
      false,
      sight
    );

    const likelihoodHitPF2nd = calculateHitChance(
      agile ? attack - 4 : attack - 5,
      ac,
      "Normal",
      "PF 2e",
      false,
      sight
    );
    const likelihoodHitPF3rd = calculateHitChance(
      agile ? attack - 8 : attack - 10,
      ac,
      "Normal",
      "PF 2e",
      false,
      sight
    );
    const likelihoodCritDnD = calculateCritChance(
      attack,
      ac,
      adv,
      "DnD 5e",
      hluck,
      "Observed"
    );
    const likelihoodCritPF = calculateCritChance(
      attack,
      ac,
      "Normal",
      "PF 2e",
      false,
      sight
    );
    const likelihoodCritPF2nd = calculateCritChance(
      agile ? attack - 4 : attack - 5,
      ac,
      "Normal",
      "PF 2e",
      false,
      sight
    );
    const likelihoodCritPF3rd = calculateCritChance(
      agile ? attack - 8 : attack - 10,
      ac,
      "Normal",
      "PF 2e",
      false,
      sight
    );

    const radioAdv = [
      { value: "Normal", label: "Normal" },
      { value: "Advantage", label: "Advantage" },
      { value: "Disadvantage", label: "Disadvantage" },
    ];

    const radioSight = [
      { value: "Observed", label: "Observed" },
      { value: "Concealed", label: "Concealed: DC 5 Flat Check" },
      { value: "Hidden", label: "Hidden: DC 11 Flat Check" },
    ];

    return (
      <div className="calculator">
        <table className="calc-input-table">
          <tbody>
            <tr>
              <th colSpan="4" className="input-header">
                Attack Input
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
                <div>Hit: {likelihoodHitDnD}%</div>
              </td>
              <td>
                <div>
                  Hit: 1st: {likelihoodHitPF}%, 2nd: {likelihoodHitPF2nd}%, 3rd:{" "}
                  {likelihoodHitPF3rd}%
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div>Crit: {likelihoodCritDnD}%</div>
              </td>
              <td>
                <div>
                  Crit: 1st: {likelihoodCritPF}%, 2nd: {likelihoodCritPF2nd}
                  %, 3rd: {likelihoodCritPF3rd}%
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
  let result;
  if (sys === "DnD 5e") {
    if (adv === "Normal") {
      result = Number(1 / 20);
    } else if (adv === "Advantage") {
      result = Number(1 / 20 + (19 / 20) * (1 / 20));
    } else if (adv === "Disadvantage") {
      result = Number(1 / 20 - (1 / 20) * (19 / 20));
    }
    if (hluck) {
      result = result + (1 / 20) * (1 / 20);
    }
  } else {
    result = Number(0);
  }

  if (!Number.isNaN(ac) && !Number.isNaN(attack)) {
    let overZero = Number(parseInt(attack) + 20 - parseInt(ac));
    if (overZero > 0) {
      if (overZero > 19) {
        if (overZero > 28 && sys === "PF 2e") {
          result = Number(1);
        } else {
          result = Number(19 / 20);
          if (sys === "DnD 5e") {
            if (hluck) {
              result = result + (19 / 20) * (1 - result);
            }
            if (adv === "Advantage") {
              result = result + (19 / 20) * (1 - result);
            } else if (adv === "Disadvantage") {
              result = result - (1 / 20) * result;
            }
          }
        }
      } else {
        result = (overZero + 1) / 20;
        if (sys === "DnD 5e") {
          if (adv === "Advantage") {
            result = result + (1 - result) * result;
          } else if (adv === "Disadvantage") {
            result = result - result * (1 - result);
          }
          if (hluck) {
            result = result + (1 - result) * (1 / 20);
          }
        }
      }
    } else if (sys === "PF 2e" && overZero > -11) {
      result = Number(1 / 20);
    }
  }

  result = calculateSight(sight, sys, result);

  return Math.round(result * 100 * 100) / 100;
}

function calculateCritChance(attack, ac, adv, sys, hluck, sight) {
  let result = Number(0);
  if (sys === "DnD 5e") {
    if (adv === "Normal") {
      result = Number(1 / 20);
    } else if (adv === "Advantage") {
      result = Number(1 / 20 + (19 / 20) * (1 / 20));
    } else {
      result = Number(1 / 20 - (1 / 20) * (19 / 20));
    }
    // halflings luck gives you at 1 another chance to roll a 20
    if (hluck) {
      result = result + (1 / 20) * (1 / 20);
    }
  } else {
    if (!Number.isNaN(ac) && !Number.isNaN(attack)) {
      let maxHit = Number(parseInt(attack) + 20 - parseInt(ac));
      if (maxHit > -1) {
        // you can reach the crit section only with a 20, so you stay at 5% chance
        if (maxHit < 11) {
          result = Number(1 / 20);
          // you are also with a one in the crit section, but you can loose the crit because of the one
        } else if (maxHit > 28) {
          result = Number(19 / 20);
        } else {
          result = (maxHit - 9) / 20;
        }
      }
    }
  }

  result = calculateSight(sight, sys, result);

  return Math.round(result * 100 * 100) / 100;
}

function calculateSight(sight, sys, result) {
  if (sys === "PF 2e") {
    if (sight === "Concealed") {
      result = result * (16 / 20);
    } else if (sight === "Hidden") {
      result = result * (10 / 20);
    }
  }
  return result;
}

export default Calculator;