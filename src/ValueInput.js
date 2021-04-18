import React from "react";

class ValueInput extends React.Component {
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

  export default ValueInput;