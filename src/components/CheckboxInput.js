import React from "react";

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

export default CheckboxInput;