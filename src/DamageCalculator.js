import React from "react";
import "./Calculator.css";

class DamageCalculator extends React.Component {
  render() {
    return (
      <div className="calculator">
        <table className="calc-input-table">
          <tbody>
            <tr>
              <th colSpan="4" className="input-header">
                Damage Input
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default DamageCalculator;
