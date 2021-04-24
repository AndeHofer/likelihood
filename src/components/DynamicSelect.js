import React, { Component } from "react";

class DynamicSelect extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onValueChange(event.target.value);
    //console.log("Dynamic Select handleChange: " + event.target.value);
  }

  renderOptions() {
    const { options } = this.props;
    return (
      options &&
      options.length > 0 &&
      options.map((option, index) => {
        return (
          option && <option key={index} label={option.name} value={option.name} />
        );
      })
    );
  }

  render() {
    return (
      <div>
        <select onChange={(e) => this.handleChange(e)}>
          <option value="0" key="0" label="" />
          {this.renderOptions()}
        </select>
      </div>
    );
  }
}

export default DynamicSelect;
