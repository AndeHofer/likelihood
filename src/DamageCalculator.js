import React from "react";
import "./Calculator.css";
import NumberInput from "./components/NumberInput";
import DynamicSelect from "./components/DynamicSelect";
import SelectWithOptGroup from "./components/SelectWithOptGroup";
import { weaponsPF2 } from "./data/weaponsPF2";
import { weaponsDnD5 } from "./data/weaponsDnd5e_open5e";
import {
  calculateDnD5WeaponDamage,
  calculatePF2WeaponDamage,
} from "./calculatorFunctions";
import CheckboxInput from "./components/CheckboxInput";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

class DamageCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      strength: "0",
      dexterity: "0",
      selectedWeaponPF2: "",
      selectedWeaponDnD5: "",
      selectedStrikingRune: "0",
      selectedPotencyRune: "0",
      criticalSpecialization: false,
    };

    this.handleStrengthChange = this.handleStrengthChange.bind(this);
    this.handleDexterityChange = this.handleDexterityChange.bind(this);
    this.handleWeaponsPF2Change = this.handleWeaponsPF2Change.bind(this);
    this.handleStrikingRuneChange = this.handleStrikingRuneChange.bind(this);
    this.handleCritSpecChange = this.handleCritSpecChange.bind(this);
    this.handlePotencyRuneChange = this.handlePotencyRuneChange.bind(this);
    this.handleWeaponsDnD5Change = this.handleWeaponsDnD5Change.bind(this);
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

  handleCritSpecChange(value) {
    this.setState({
      criticalSpecialization: !this.state.criticalSpecialization,
    });
  }

  handlePotencyRuneChange(value) {
    this.setState({ selectedPotencyRune: value });
  }

  handleWeaponsDnD5Change(value) {
    const selected = weaponsDnD5.find((x) => x.name === value);
    this.setState({ selectedWeaponDnD5: selected });
  }

  render() {
    const strength = this.state.strength;
    const dexterity = this.state.dexterity;
    const weaponResultPF2 = calculatePF2WeaponDamage(
      weaponsPF2,
      this.state.selectedWeaponPF2,
      this.state.strength,
      this.state.selectedStrikingRune,
      this.state.criticalSpecialization,
      this.state.selectedPotencyRune
    );
    const weaponResultDnD5 = calculateDnD5WeaponDamage(
      this.state.selectedWeaponDnD5,
      this.state.strength
    );
    const strikingRuneOptions = [
      { value: "0", label: "No" },
      { value: "1", label: "Normal" },
      { value: "2", label: "Greater" },
      { value: "3", label: "Major" },
    ];

    const potencyRuneOptions = [
      { value: "0", label: "No" },
      { value: "1", label: "+ 1" },
      { value: "2", label: "+ 2" },
      { value: "3", label: "+ 3" },
    ];
    const criticalSpecialization = this.state.criticalSpecialization;
    const renderCritSpecTooltip = (props) => (
      <Tooltip id="critspec-tooltip" {...props}>
        {this.state.selectedWeaponPF2 &&
        weaponsPF2.critSpecialization.find(
          (critspec) => critspec.name === this.state.selectedWeaponPF2.group
        )
          ? weaponsPF2.critSpecialization.find(
              (critspec) => critspec.name === this.state.selectedWeaponPF2.group
            ).text
          : null}
      </Tooltip>
    );
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
              <td>
                {" "}
                <div>
                  <SelectWithOptGroup
                    optionValueAttribute="name"
                    optionLabelAttribute="name"
                    optionLabelAdditionAttribute="damage_dice"
                    options={{
                      "Melee Weapons": weaponsDnD5.filter((weapon) =>
                        weapon.category.includes("Melee")
                      ),
                      "Ranged Weapons": weaponsDnD5.filter(
                        (weapon) =>
                          weapon.category.includes("Ranged") &&
                          weapon.slug !== "net"
                      ),
                    }}
                    onValueChange={this.handleWeaponsDnD5Change}
                    emptyLabel="Select Weapon"
                  />
                </div>
              </td>
              <td>
                <div>
                  <SelectWithOptGroup
                    optionValueAttribute="name"
                    optionLabelAttribute="name"
                    optionLabelAdditionAttribute="damage"
                    options={{
                      "Melee Weapons": weaponsPF2.meleeWeapons,
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
                  <DynamicSelect
                    options={strikingRuneOptions}
                    onValueChange={this.handleStrikingRuneChange}
                    doNotRenderEmpty={true}
                    selectClassName="select-runes"
                  />{" "}
                  Striking Rune
                </div>
                <div>
                  <DynamicSelect
                    options={potencyRuneOptions}
                    onValueChange={this.handlePotencyRuneChange}
                    doNotRenderEmpty={true}
                    selectClassName="select-runes"
                  />{" "}
                  Potency Rune
                </div>
                <div>
                  <CheckboxInput
                    onValueChange={this.handleCritSpecChange}
                    value={criticalSpecialization}
                  />{" "}
                  Critical Specialization{" "}
                  <OverlayTrigger
                    //placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderCritSpecTooltip}
                  >
                    <span>
                      {this.state.selectedWeaponPF2
                        ? "(" + this.state.selectedWeaponPF2.group + ")"
                        : ""}
                    </span>
                  </OverlayTrigger>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <strong>
                  {weaponResultDnD5.min ? weaponResultDnD5.min : ""}
                </strong>
                {weaponResultDnD5.min ? " to " : ""}
                <strong>
                  {weaponResultDnD5.critMax ? weaponResultDnD5.critMax : ""}
                </strong>
                {weaponResultDnD5.min ? " damage " : ""}
              </td>
              <td>
                <strong>
                  {weaponResultPF2.min ? weaponResultPF2.min : ""}
                </strong>
                {weaponResultPF2.min ? " to " : ""}
                <strong>
                  {weaponResultPF2.critMax ? weaponResultPF2.critMax : ""}
                </strong>
                {weaponResultPF2.min ? " damage " : ""}
                {weaponResultPF2.critSpecMax ? weaponResultPF2.critSpecMax : ""}

                <br />
              </td>
            </tr>
            <tr>
              <td>
                {weaponResultDnD5.min && (
                  <table className="damage-result-table">
                    <tbody>
                      <tr>
                        <td>Min: {weaponResultDnD5.min}</td>
                      </tr>
                      <tr>
                        <td>Min Crit: {weaponResultDnD5.critMin}</td>
                      </tr>
                      <tr>
                        <td>Med: {weaponResultDnD5.medium}</td>
                      </tr>
                      <tr>
                        <td>Med Crit: {weaponResultDnD5.critMedium}</td>
                      </tr>
                      <tr>
                        <td>Max: {weaponResultDnD5.max}</td>
                      </tr>
                      <tr>
                        <td>Max Crit: {weaponResultDnD5.critMax}</td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </td>
              <td>
                {weaponResultPF2.min && (
                  <table className="damage-result-table">
                    <tbody>
                      <tr>
                        <td>Min: {weaponResultPF2.min}</td>
                      </tr>
                      <tr>
                        <td>
                          Min Crit:
                          {weaponResultPF2.critMin}
                          {weaponResultPF2.critSpecMin}
                        </td>
                      </tr>
                      <tr>
                        <td>Med: {weaponResultPF2.medium}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Med Crit: </strong>
                          {weaponResultPF2.critMedium}
                          {weaponResultPF2.critSpecMed}
                        </td>
                      </tr>
                      <tr>
                        <td>Max: {weaponResultPF2.max}</td>
                      </tr>
                      <tr>
                        <td>
                          Max Crit:
                          {weaponResultPF2.critMax}
                          {weaponResultPF2.critSpecMax}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </td>
            </tr>
            <tr>
              <td></td>
              <td>TODO: bonus dices for rogues</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default DamageCalculator;
