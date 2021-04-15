import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import reportWebVitals from "./reportWebVitals";
//import 'bootstrap/dist/css/bootstrap.css';

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
          result = result - result * (1 - result);
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
        />
        Normal{" "}
        <input
          type="radio"
          value="Advantage"
          checked={value === "Advantage"}
          name="adv"
          onChange={this.handleChange}
        />
        Advantage{" "}
        <input
          type="radio"
          value="Disadvantage"
          name="adv"
          checked={value === "Disadvantage"}
          onChange={this.handleChange}
        />
        Disadvantage{" "}
      </div>
    );
  }
}

class RadioSystem extends React.Component {
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
          value="DnD 5e"
          checked={value === "DnD 5e"}
          name="sys"
          onChange={this.handleChange}
        />
        DnD 5e{" "}
        <input
          type="radio"
          value="PF 2e"
          checked={value === "PF 2e"}
          name="sys"
          onChange={this.handleChange}
        />
        PF 2e{" "}
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
    this.state = { attack: "0", ac: "10", adv: "Normal", sys: "DnD 5e" };

    this.handleAcChange = this.handleAcChange.bind(this);
    this.handleAttackChange = this.handleAttackChange.bind(this);
    this.handleAdvChange = this.handleAdvChange.bind(this);
    this.handleSysChange = this.handleSysChange.bind(this);
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

  handleSysChange(value) {
    this.setState({ sys: value });
    // if(value === "PF 2e"){
    //   this.setState({adv : "Normal"});
    // }
  }

  render() {
    const ac = this.state.ac;
    const attack = this.state.attack;
    const sys = this.state.sys;
    let adv;
    let advElement;
    if (sys === "DnD 5e") {
      adv = this.state.adv;
      advElement = (
        <RadioDisadvantage onValueChange={this.handleAdvChange} value={adv}  />
      );
    } else {
      adv = "Normal";
      advElement = <div>&nbsp;</div>;
    }
    const likelihoodHit = calculateHitChance(attack, ac, adv);

    return (
      <div>
        <RadioSystem onValueChange={this.handleSysChange} value={sys} />
        <div>&nbsp;</div>
        <ValueInput
          value={attack}
          onValueChange={this.handleAttackChange}
          label="Attack: "
        />
        &nbsp;
        <ValueInput
          value={ac}
          onValueChange={this.handleAcChange}
          label="AC:"
        />
        <div>&nbsp;</div>
        {advElement}
        <p>Likelihood Hit: {likelihoodHit} %</p>
      </div>
    );
  }
}

ReactDOM.render(<Calculator />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
