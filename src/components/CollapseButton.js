import React from "react";
import { Button, Collapse } from "react-bootstrap";

class CollapseButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.onButtonClick(e.target.value);
  }

  render() {
    const text = this.props.text;
    const open = this.props.open;

    return (
      <>
        <Button
          onClick={this.handleClick}
          aria-expanded={open}
          aria-controls="formula-div"
        >
          Toggle Formulas
        </Button>
        <Collapse in={open} className="collapse-button" dimension="height">
          <div className="formula-div" id="formula-div">
            {text}
          </div>
        </Collapse>
      </>
    );
  }
}

export default CollapseButton;
