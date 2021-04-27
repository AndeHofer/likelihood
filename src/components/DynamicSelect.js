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
                  : option.value
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
    return (
      <>
        <select
          onChange={(e) => this.handleChange(e)}
          className={selectClassName}
        >
          {!doNotRenderEmpty && <option value="" key="0" label="" />}
          {this.renderOptions()}
        </select>
      </>
    );
  }
}

export default DynamicSelect;
