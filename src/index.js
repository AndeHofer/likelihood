import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

function calculateHitChance(attack, ac, adv) {
  let result = Number(0);
  if (!Number.isNaN(ac) && !Number.isNaN(attack)) {
    let overZero = Number(parseInt(attack) + 20 - parseInt(ac));
    if (overZero > 0) {
      if (overZero > 19) {
        result = 1;
      } else {
        result = overZero / 20;
        if (adv === "Advantage") {
          result = result + (1 - result) * result;
        } else if (adv === "Disadvantage") {
          result = result - (result * (1 - result));
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
    return (
      <div>
        <input
          type="radio"
          value="Normal"
          name="adv"
          onChange={this.handleChange}
        />{" "}
        Normal
        <input
          type="radio"
          value="Advantage"
          name="adv"
          onChange={this.handleChange}
        />{" "}
        Advantage
        <input
          type="radio"
          value="Disadvantage"
          name="adv"
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
      <label>
        {this.props.label}
        <input type="number" value={value} onChange={this.handleChange} />
      </label>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { attack: "0", ac: "0", adv: "Normal" };

    this.handleAcChange = this.handleAcChange.bind(this);
    this.handleAttackChange = this.handleAttackChange.bind(this);
    this.handleAdvChange = this.handleAdvChange.bind(this);
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

  render() {
    const ac = this.state.ac;
    const attack = this.state.attack;
    const adv = this.state.adv;
    const likelihoodHit = calculateHitChance(attack, ac, adv);
    return (
      <div>
        <ValueInput
          value={attack}
          onValueChange={this.handleAttackChange}
          label="Attack: "
        />
        &nbsp;
        <ValueInput
          value={ac}
          onValueChange={this.handleAcChange}
          label="AC: "
        />
        <RadioDisadvantage onValueChange={this.handleAdvChange} value={adv} />
        <p>Likelihood Hit: {likelihoodHit} %</p>
      </div>
    );
  }
}

ReactDOM.render(<Calculator />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
