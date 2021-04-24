import React from "react";

class NumberInput extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(e) {
      //console.log("e.target.value: " + e.target.value);
      this.props.onValueChange(e.target.value);
    }
  
    render() {
      const value = this.props.value;
      return (
        <div className="inputField">
          <input
            type="number"
            value={value}
            onChange={this.handleChange}
            max="1000"
            min="-1000"
          />
        </div>
      );
    }
  }

  export default NumberInput;