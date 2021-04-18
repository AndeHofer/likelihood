import React from "react";

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

export default RadioDisadvantage;
