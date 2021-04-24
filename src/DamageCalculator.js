import React from "react";
import "./Calculator.css";
import NumberInput from "./components/NumberInput";
import DynamicSelect from "./components/DynamicSelect";
import RadioInputGroup from "./components/RadioInputGroup";
import { weaponsPF2 } from "./data/weaponsPF2";
import { weaponsDnd5eSrd } from "./data/weaponsDnd5eSrd";

class DamageCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      strength: "0",
      dexterity: "0",
      selectedWeaponPF2: "",
      selectedWeaponPF2Group: "meele",
    };

    this.handleStrengthChange = this.handleStrengthChange.bind(this);
    this.handleDexterityChange = this.handleDexterityChange.bind(this);
    this.handleWeaponsPF2Change = this.handleWeaponsPF2Change.bind(this);
    this.handleWeaponsPF2GroupChange = this.handleWeaponsPF2GroupChange.bind(
      this
    );
  }

  handleStrengthChange(value) {
    console.log("handleStrengthChange value: " + value);
    this.setState({ strength: value });
  }

  handleDexterityChange(value) {
    this.setState({ dexterity: value });
  }

  handleWeaponsPF2Change(value) {
    // console.log("handleWeaponsPF2Change weapon: " + value);
    let selected =
      this.state.selectedWeaponPF2Group === "meele"
        ? weaponsPF2.meleeWeapons.find((x) => x.name === value)
        : weaponsPF2.rangeWeapons.find((x) => x.name === value);
    this.setState({ selectedWeaponPF2: selected });
  }

  handleWeaponsPF2GroupChange(value) {
    this.setState({ selectedWeaponPF2Group: value });
  }

  render() {
    const strength = this.state.strength;
    const dexterity = this.state.dexterity;
    const selectedWeaponPF2Group = this.state.selectedWeaponPF2Group;
    const weaponPF2Groups = [
      { label: "Melee", value: "meele" },
      { label: "Ranged", value: "ranged" },
    ];
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
              <td>Strength: </td>
              <td>
                <NumberInput
                  value={strength}
                  onValueChange={this.handleStrengthChange}
                />
              </td>
              <td>Dexterity: </td>
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
                <div className="middle-relative">
                  <RadioInputGroup
                    radios={weaponPF2Groups}
                    onValueChange={this.handleWeaponsPF2GroupChange}
                    name="weaponPF2Group"
                    selectedValue={selectedWeaponPF2Group}
                  />
                </div>
                PF Weapons:
                <DynamicSelect
                  options={
                    selectedWeaponPF2Group === "meele"
                      ? weaponsPF2.meleeWeapons
                      : weaponsPF2.rangeWeapons.filter(
                          (weapon) => weapon.category !== "Ammunition"
                        )
                  }
                  onValueChange={this.handleWeaponsPF2Change}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                {this.state.selectedWeaponPF2.name}
                <br />
                {this.state.selectedWeaponPF2.damage}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default DamageCalculator;
