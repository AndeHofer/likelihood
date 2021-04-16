import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import reportWebVitals from "./reportWebVitals";
import 'bootstrap/dist/css/bootstrap.css';

function calculateHitChance(attack, ac, adv, sys) {
  let result;
  if (sys === "DnD 5e") {
    if (adv === "Normal") {
      result = Number(0.05);
    } else if (adv === "Advantage") {
      result = Number(0.05 + 0.95 * 0.05);
    } else {
      result = Number(0.05 - 0.05 * 0.95);
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
          result = Number(0.95);
        }
      } else {
        result = overZero / 20;
        if (sys === "DnD 5e") {
          if (adv === "Advantage") {
            result = result + (1 - result) * result;
          } else if (adv === "Disadvantage") {
            result = result - result * (1 - result);
          }
        }
      }
    } else if (sys === "PF 2e" && overZero > -11) {
      result = Number(0.05);
    }
  }

  return Math.round(result * 100 * 100) / 100;
}

function calculateCritChance(attack, ac, adv, sys) {
  let result = Number(0);
  if (sys === "DnD 5e") {
    if (adv === "Normal") {
      result = Number(0.05);
    } else if (adv === "Advantage") {
      result = Number(0.05 + 0.95 * 0.05);
    } else {
      result = Number(0.05 - 0.05 * 0.95);
    }
  } else {
    if (!Number.isNaN(ac) && !Number.isNaN(attack)) {
      let overZero = Number(parseInt(attack) + 20 - parseInt(ac));
      if (overZero > 0) {
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

// class RadioSystem extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleChange = this.handleChange.bind(this);
//   }

//   handleChange(e) {
//     this.props.onValueChange(e.target.value);
//   }

//   render() {
//     const value = this.props.value;
//     return (
//       <div>
//         <input
//           type="radio"
//           value="DnD 5e"
//           checked={value === "DnD 5e"}
//           name="sys"
//           onChange={this.handleChange}
//         />
//         DnD 5e{" "}
//         <input
//           type="radio"
//           value="PF 2e"
//           checked={value === "PF 2e"}
//           name="sys"
//           onChange={this.handleChange}
//         />
//         PF 2e{" "}
//       </div>
//     );
//   }
// }

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
    this.state = { attack: "0", ac: "10", adv: "Normal" };

    this.handleAcChange = this.handleAcChange.bind(this);
    this.handleAttackChange = this.handleAttackChange.bind(this);
    this.handleAdvChange = this.handleAdvChange.bind(this);
    // this.handleSysChange = this.handleSysChange.bind(this);
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

  // handleSysChange(value) {
  //   this.setState({ sys: value });
  // if(value === "PF 2e"){
  //   this.setState({adv : "Normal"});
  // }
  // }

  render() {
    const ac = this.state.ac;
    const attack = this.state.attack;
    // const sys = this.state.sys;
    const adv = this.state.adv;
    const likelihoodHitDnD = calculateHitChance(attack, ac, adv, "DnD 5e");
    const likelihoodHitPF = calculateHitChance(attack, ac, "Normal", "PF 2e");
    const likelihoodCritDnD = calculateCritChance(attack, ac, adv, "DnD 5e");
    const likelihoodCritPF = calculateCritChance(attack, ac, "Normal", "PF 2e");

    return (
      <div>
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
          label="AC: "
        />
        <div>&nbsp;</div>
        <RadioDisadvantage onValueChange={this.handleAdvChange} value={adv} />
        <p>
          <div>Likelihood DnD Hit: {likelihoodHitDnD} %</div>
          <div>Likelihood PF Hit: {likelihoodHitPF} %</div>
          <div>&nbsp;</div>
          <div>Likelihood DnD Crit: {likelihoodCritDnD} %</div>
          <div>Likelihood PF Crit: {likelihoodCritPF} %</div>
        </p>
      </div>
    );
  }
}

ReactDOM.render(<Calculator />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
