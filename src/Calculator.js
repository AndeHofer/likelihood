import React from "react";
import "./Calculator.css";

function calculateHitChance(attack, ac, adv, sys, hluck) {
  let result;
  if (sys === "DnD 5e") {
    if (adv === "Normal") {
      result = Number(0.05);
    } else if (adv === "Advantage") {
      result = Number(0.05 + 0.95 * 0.05);
    } else if (adv === "Disadvantage") {
      result = Number(0.05 - 0.05 * 0.95);
    }
    if (hluck) {
      result = result + 0.05 * 0.05;
    }
  } else {
    result = Number(0);
  }

  if (!Number.isNaN(ac) && !Number.isNaN(attack)) {
    let overZero = Number(parseInt(attack) + 20 - parseInt(ac));
    if (overZero > 0) {
      if (overZero > 19) {
        if (overZero > 29 && sys === "PF 2e") {
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
        result = overZero / 20;
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
      result = Number(0.05);
    }
  }

  return Math.round(result * 100 * 100) / 100;
}

function calculateCritChance(attack, ac, adv, sys, hluck) {
  let result = Number(0);
  if (sys === "DnD 5e") {
    if (adv === "Normal") {
      result = Number(0.05);
    } else if (adv === "Advantage") {
      result = Number(0.05 + 0.95 * 0.05);
    } else {
      result = Number(0.05 - 0.05 * 0.95);
    }
    // halflings luck gives you at 1 another chance to roll a 20
    if (hluck) {
      result = result + 0.05 * 0.05;
    }
  } else {
    if (!Number.isNaN(ac) && !Number.isNaN(attack)) {
      let overZero = Number(parseInt(attack) + 20 - parseInt(ac));
      if (overZero > -1) {
        if (overZero < 11) {
          result = Number(0.05);
        } else if (overZero > 29) {
          result = Number(0.95);
        } else {
          result = (overZero - 10) / 20;
        }
      }
    }
  }

  return Math.round(result * 100 * 100) / 100;
}

class RadioDisadvantage extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onValueChange(e.target.value);
  }

  render() {
    const value = this.props.value;
    return (
      <div>
        <input
          type="radio"
          value="Normal"
          checked={value === "Normal"}
          name="adv"
          onChange={this.handleChange}
        />{" "}
        Normal
        <br />
        <input
          type="radio"
          value="Advantage"
          checked={value === "Advantage"}
          name="adv"
          onChange={this.handleChange}
        />{" "}
        Advantage
        <br />
        <input
          type="radio"
          value="Disadvantage"
          name="adv"
          checked={value === "Disadvantage"}
          onChange={this.handleChange}
        />{" "}
        Disadvantage
      </div>
    );
  }
}

class ValueInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onValueChange(e.target.value);
  }

  render() {
    const value = this.props.value;
    return (
      <div className="inputField">
        <input
          type="number"
          value={value}
          onChange={this.handleChange}
          max="1000"
          min="-1000"
        />
      </div>
    );
  }
}

class CheckboxInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onValueChange(e.target.value);
  }
  render() {
    const value = this.props.value;
    return (
      <input type="checkbox" onChange={this.handleChange} checked={value} />
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { attack: "0", ac: "10", adv: "Normal", hluck: false };

    this.handleAcChange = this.handleAcChange.bind(this);
    this.handleAttackChange = this.handleAttackChange.bind(this);
    this.handleAdvChange = this.handleAdvChange.bind(this);
    this.handleHluckChange = this.handleHluckChange.bind(this);
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

  render() {
    const ac = this.state.ac;
    const attack = this.state.attack;
    const adv = this.state.adv;
    const hluck = this.state.hluck;
    const likelihoodHitDnD = calculateHitChance(
      attack,
      ac,
      adv,
      "DnD 5e",
      hluck
    );
    const likelihoodHitPF = calculateHitChance(
      attack,
      ac,
      "Normal",
      "PF 2e",
      false
    );
    const likelihoodCritDnD = calculateCritChance(
      attack,
      ac,
      adv,
      "DnD 5e",
      hluck
    );
    const likelihoodCritPF = calculateCritChance(
      attack,
      ac,
      "Normal",
      "PF 2e",
      false
    );

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
                <div className="adv-radio">
                  <RadioDisadvantage
                    onValueChange={this.handleAdvChange}
                    value={adv}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="adv-radio">
                  <CheckboxInput
                    value={hluck}
                    onValueChange={this.handleHluckChange}
                  />{" "}
                  Halflings Luck
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div>DnD Hit: {likelihoodHitDnD} %</div>
              </td>
              <td>
                <div>PF Hit: {likelihoodHitPF} %</div>
              </td>
            </tr>
            <tr>
              <td>
                <div>DnD Crit: {likelihoodCritDnD} %</div>
              </td>
              <td>
                <div>PF Crit: {likelihoodCritPF} %</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Calculator;
