import React, { Component } from "react";
import RadioInput from "./RadioInput";

class InputRadioGroup extends Component {

  renderRadios() {
    const { radios } = this.props;
    const name = this.props.name;
    const selectedValue = this.props.selectedValue;
    const onValueChange = this.props.onValueChange;
    return (
      radios &&
      radios.length > 0 &&
      radios.map((radio, index) => {
        return (
          radio && (
            <div key={index}>
              <RadioInput
                value={radio.value}
                label={radio.label}
                name={name}
                selectedValue={selectedValue}
                onValueChange={onValueChange}
              />
              <br />
            </div>
          )
        );
      })
    );
  }

  render() {
    return <div>{this.renderRadios()}</div>;
  }
}

export default InputRadioGroup;
