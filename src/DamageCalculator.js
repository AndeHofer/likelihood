import React from "react";
import "./Calculator.css";
import NumberInput from "./components/NumberInput";
import DynamicSelect from "./components/DynamicSelect";
import SelectWithOptGroup from "./components/SelectWithOptGroup";
import { weaponsPF2 } from "./data/weaponsPF2";
//import { weaponsDnd5eSrd } from "./data/weaponsDnd5eSrd";

import { calculatePF2WeaponDamage } from "./calculatorFunctions";

class DamageCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      strength: "0",
      dexterity: "0",
      selectedWeaponPF2: "",
      selectedStrikingRune: "0",
    };

    this.handleStrengthChange = this.handleStrengthChange.bind(this);
    this.handleDexterityChange = this.handleDexterityChange.bind(this);
    this.handleWeaponsPF2Change = this.handleWeaponsPF2Change.bind(this);
    this.handleStrikingRuneChange = this.handleStrikingRuneChange.bind(this);
  }

  handleStrengthChange(value) {
    //console.log("handleStrengthChange value: " + value);
    this.setState({ strength: value });
  }

  handleDexterityChange(value) {
    this.setState({ dexterity: value });
  }

  handleWeaponsPF2Change(value) {
    // console.log("handleWeaponsPF2Change weapon: " + value);
    let selected = weaponsPF2.meleeWeapons.find((x) => x.name === value);
    if (!selected) {
      selected = weaponsPF2.rangeWeapons.find((x) => x.name === value);
    }
    this.setState({ selectedWeaponPF2: selected });
  }

  handleStrikingRuneChange(value) {
    this.setState({ selectedStrikingRune: value });
  }

  render() {
    const strength = this.state.strength;
    const dexterity = this.state.dexterity;
    const weaponResult = calculatePF2WeaponDamage(
      weaponsPF2,
      this.state.selectedWeaponPF2,
      this.state.strength,
      this.state.selectedStrikingRune
    );
    const weaponDamage = this.state.selectedWeaponPF2
      ? "Medium: " +
        weaponResult.medium +
        ", Crit: " +
        weaponResult.critMedium +
        "\nMin: " +
        weaponResult.min +
        ", Crit: " +
        weaponResult.critMin +
        "\nMax: " +
        weaponResult.max +
        ", Crit: " +
        weaponResult.critMax
      : "";
    const strikingRuneOptions = ["0", "1", "2", "3"];
    return (
      <div className="calculator">
        <table className="calc-input-table">
          <tbody>
            <tr>
              <th colSpan="4" className="input-header">
                Damage Input
              </th>
            </tr>
            <tr>
              <td>Strength bonus: </td>
              <td>
                <NumberInput
                  value={strength}
                  onValueChange={this.handleStrengthChange}
                />
              </td>
              <td>Dexterity bonus: </td>
              <td>
                <NumberInput
                  value={dexterity}
                  onValueChange={this.handleDexterityChange}
                />
              </td>
            </tr>
            <tr></tr>
          </tbody>
        </table>
        <table className="calc-result-table">
          <colgroup className="colgroup-result" />
          <tbody>
            <tr>
              <th>Dungeons & Dragons 5e</th>
              <th>Pathfinder 2e</th>
            </tr>
            <tr>
              <td></td>
              <td>
                <div>
                  <SelectWithOptGroup
                    optionValueAttribute="name"
                    optionLabelAttribute="name"
                    optionLabelAdditionAttribute="damage"
                    options={{
                      "Meele Weapons": weaponsPF2.meleeWeapons,
                      "Ranged Weapons": weaponsPF2.rangeWeapons.filter(
                        (weapon) =>
                          weapon.category !== "Ammunition" &&
                          weapon.name !== "Alchemical Bomb"
                      ),
                    }}
                    onValueChange={this.handleWeaponsPF2Change}
                    emptyLabel="Select Weapon"
                  />
                </div>
                <br />
                <div>
                  Striking Rune:{" "}
                  <DynamicSelect
                    options={strikingRuneOptions}
                    onValueChange={this.handleStrikingRuneChange}
                    doNotRenderEmpty={true}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <strong>{weaponResult.min ? weaponResult.min : ""}</strong>
                {weaponResult.min ? " to " : ""}
                <strong>
                  {weaponResult.critMax ? weaponResult.critMax : ""}
                </strong>
                {weaponResult.min ? " damage" : ""}
                <br />
                <div className="pre-wrap-div">{weaponDamage}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default DamageCalculator;
