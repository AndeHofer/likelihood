import React, { Component } from "react";

class DynamicSelect extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onValueChange(event.target.value);
    console.log("Dynamic Select handleChange: " + event.target.value);
  }

  renderOptions() {
    const { options } = this.props;
    const { optionLabelValue } = this.props;
    return (
      options &&
      options.length > 0 &&
      options.map((option, index) => {
        return (
          option && (
            <option
              key={index}
              label={
                optionLabelValue
                  ? option[optionLabelValue]
                  : option.label
                  ? option.label
                  : option
              }
              value={
                optionLabelValue
                  ? option[optionLabelValue]
                  : (option.value || option.value === 0)
                  ? option.value
                  : option
              }
            />
          )
        );
      })
    );
  }

  render() {
    const { doNotRenderEmpty } = this.props;
    const { selectClassName } = this.props;
    const { disabled } = this.props;
    const { selected } = this.props;
    return (
      <>
        <select
          style={disabled ? { pointerEvents: "none", opacity: "0.4" } : {}}
          onChange={this.handleChange}
          className={selectClassName}
          value={selected}
        >
          {!doNotRenderEmpty && <option value="" key="0" label="" />}
          {this.renderOptions()}
        </select>
      </>
    );
  }
}

export default DynamicSelect;
