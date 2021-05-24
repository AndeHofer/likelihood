import React, { Component } from "react";
import {objectByString} from "./../helperFunctions";

class SelectWithOptGroup extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onValueChange(event.target.value);
    console.log("Dynamic Select handleChange: " + event.target.value);
  }

  renderOptions(optionGroup) {
    const { optionLabelAttribute } = this.props;
    const { optionValueAttribute } = this.props;
    const { optionLabelAdditionAttribute } = this.props;
    //console.log(optionGroup);
    return (
      optionGroup &&
      optionGroup.length > 0 &&
      optionGroup.map((option, index) => {
        return (
          option && (
            <option
              key={index}
              label={
                optionLabelAttribute
                  ? option[optionLabelAttribute] +
                    (optionLabelAdditionAttribute
                      ? " (" + objectByString(option, optionLabelAdditionAttribute) + ")"
                      : "")
                  : option
              }
              value={
                optionValueAttribute ? option[optionValueAttribute] : option
              }
            />
          )
        );
      })
    );
  }

  renderOptGroups() {
    const { options } = this.props;
    //console.log("renderOptGroups 0:" + Object.keys(options)[0]);
    return (
      options &&
      Object.keys(options).map((optionGroup, index) => {
        //console.log(optionGroup);
        return (
          optionGroup && (
            <optgroup key={index} label={optionGroup}>
              {this.renderOptions(options[optionGroup])}
            </optgroup>
          )
        );
      })
    );
  }

  render() {
    const { doNotRenderEmpty } = this.props;
    const { emptyLabel } = this.props;
    return (
      <>
        <select onChange={(e) => this.handleChange(e)}>
          {!doNotRenderEmpty && (
            <option value="" key="0" label={emptyLabel ? emptyLabel : ""} />
          )}
          {this.renderOptGroups()}
        </select>
      </>
    );
  }
}



export default SelectWithOptGroup;
