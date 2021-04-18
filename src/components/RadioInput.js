import React, { Component } from "react";

class RadioInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    //console.log(this.props.value + " " + e.target.value)
    this.props.onValueChange(e.target.value);
  }

  render() {
    const { value } = this.props;
    const { selectedValue } = this.props;
    const { label } = this.props;
    const { name } = this.props;

    return (
      <label>
        <input
          type="radio"
          value={value}
          name={name}
          checked={value === selectedValue}
          onChange={this.handleChange}
        />{" "}
        {label}
      </label>
    );
  }
}

export default RadioInput;
