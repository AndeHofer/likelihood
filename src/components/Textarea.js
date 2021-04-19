import React, { Component } from "react";

class Textarea extends Component {
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
      <div>
        <textarea
          className="textarea"
          value={value}
          onChange={this.handleChange}
          readOnly={true}
        />
      </div>
    );
  }
}

export default Textarea;
