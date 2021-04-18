import React, { Component } from "react";

class DynamicSelect extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onValueChange(event.target.value);
    //console.log(event.target.value);
  }

  renderOptions() {
    const { options } = this.props;
    const { acName } = this.props;
    return (
      options &&
      options.length > 0 &&
      options.map((option, index) => {
        return (
          option &&
          option[acName] && (
            <option
              key={index}
              label={option.name + " (" + parseInt(option[acName]) + ")"}
              value={parseInt(option[acName])}
            />
          )
        );
      })
    );
  }

  render() {
    return (
      <div>
        <select onChange={this.handleChange}>
          <option value="0" key="0" label="" />
          {this.renderOptions()}
        </select>
      </div>
    );
  }
}

export default DynamicSelect;
