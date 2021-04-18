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
      attack ? (agile ? attack - 4 : attack - 5) : attack,
      ac,
      "Normal",
      "PF 2e",
      false,
      sight
    );
    const likelihoodHitPF3rd = calculateHitChance(
      attack ? (agile ? attack - 8 : attack - 10) : attack,
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
      attack ? (agile ? attack - 4 : attack - 5) : attack,
      ac,
      "Normal",
      "PF 2e",
      false,
      sight
    );
    const likelihoodCritPF3rd = calculateCritChance(
      attack ? (agile ? attack - 8 : attack - 10) : attack,
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
  let result = sys === "DnD 5e" ? Number(1 / 20) : Number(0);

  if (ac && attack) {
    let overZero = Number(parseInt(attack) + 20 - parseInt(ac));
    if (overZero > -1) {
      if (overZero > 28 && sys === "PF 2e") {
        result = Number(1);
      } else {
        result = (overZero > 18 ? 19 : overZero + 1) / 20;
      }
    } else if (sys === "PF 2e" && overZero > -11) {
      result = Number(1 / 20);
    }

    result = calculateAdvHit(adv, sys, result, overZero);
    result = calculateHluckHit(hluck, sys, result, overZero);
    result = calculateSight(sight, sys, result);
  }

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
    if (ac && attack) {
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

function calculateAdvHit(adv, sys, result, overZero) {
  if (sys === "DnD 5e") {
    if (adv === "Advantage") {
      if (overZero > -1) {
        result =
          result + (1 - result) * ((overZero > 18 ? 19 : overZero + 1) / 20);
      } else {
        // add the chance of a 20 next dice throw...
        result = result + (1 - result) * (1 / 20);
      }
    } else if (adv === "Disadvantage") {
      result = result - result * (1 - (overZero > 18 ? 19 : overZero + 1) / 20);
    }
  }
  return result;
}
function calculateHluckHit(hluck, sys, result, overZero) {
  if (sys === "DnD 5e" && hluck) {
    if (overZero > -1) {
      result =
        result +
        (1 - result) *
          ((overZero > 18 ? 19 : overZero + 1) / 20) *
          // here we look how many dices throws are possible at this time to not match the hit, because only a one can be rethrown
          // so when here is more then one possible dice (the one), we need to lower the probabilty that the halflings luck does anything..
          (1 / (20 - (overZero > 18 ? 19 : overZero)));
    } else {
      result = result + (1 / 20) * (1 / 20);
    }
  }
  return result;
}

export default HitCritCalculator;
