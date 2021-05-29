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
import {
  getUnitedOptions,
  sortName,
  enrichDiceWithDamageType,
  dnd5weaponForSneak,
} from "./helperFunctions";
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
      selectedRogueDnD5SneakDices: 0,
    };

    this.handleStrengthChange = this.handleStrengthChange.bind(this);
    this.handleDexterityChange = this.handleDexterityChange.bind(this);
    this.handleWeaponsPF2Change = this.handleWeaponsPF2Change.bind(this);
    this.handleStrikingRuneChange = this.handleStrikingRuneChange.bind(this);
    this.handleCritSpecChange = this.handleCritSpecChange.bind(this);
    this.handlePotencyRuneChange = this.handlePotencyRuneChange.bind(this);
    this.handleWeaponsDnD5Change = this.handleWeaponsDnD5Change.bind(this);
    this.handleWeaponsUnitedChange = this.handleWeaponsUnitedChange.bind(this);
    this.handleRogueDnD5SneakDicesChange =
      this.handleRogueDnD5SneakDicesChange.bind(this);
  }

  handleStrengthChange(value) {
    //console.log("handleStrengthChange value: " + value);
    this.setState({ strength: value });
  }

  handleDexterityChange(value) {
    this.setState({ dexterity: value });
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
    if (!dnd5weaponForSneak(selected)) {
      this.setState({ selectedRogueDnD5SneakDices: 0 });
    }
  }

  handleWeaponsPF2Change(value) {
    // console.log("handleWeaponsPF2Change weapon: " + value);
    let selected = weaponsPF2.meleeWeapons.find((x) => x.name === value);
    if (!selected) {
      selected = weaponsPF2.rangeWeapons.find((x) => x.name === value);
    }
    this.setState({ selectedWeaponPF2: selected });
  }

  handleWeaponsUnitedChange(value) {
    const selectedDnD5 = weaponsDnD5.find((x) => x.name === value);
    if (selectedDnD5) {
      this.setState({ selectedWeaponDnD5: selectedDnD5 });
      if (!dnd5weaponForSneak(selectedDnD5)) {
        this.setState({ selectedRogueDnD5SneakDices: 0 });
      }
    }
    let selectedPF2 = weaponsPF2.meleeWeapons.find((x) => x.name === value);
    if (!selectedPF2) {
      selectedPF2 = weaponsPF2.rangeWeapons.find((x) => x.name === value);
    }
    if (selectedPF2) {
      this.setState({ selectedWeaponPF2: selectedPF2 });
    }
  }

  handleRogueDnD5SneakDicesChange(value) {
    this.setState({ selectedRogueDnD5SneakDices: value });
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
      this.state.strength,
      this.state.dexterity
    );
    const strikingRuneOptions = [
      { value: "0", label: "No" },
      { value: "1", label: "Normal" },
      { value: "2", label: "Greater" },
      { value: "3", label: "Major" },
    ];

    const rogueDnD5SneakDices = [
      { value: 0, label: "No" },
      { value: 1, label: "1d6" },
      { value: 2, label: "2d6" },
      { value: 3, label: "3d6" },
      { value: 4, label: "4d6" },
      { value: 5, label: "5d6" },
      { value: 6, label: "6d6" },
      { value: 7, label: "7d6" },
      { value: 8, label: "8d6" },
      { value: 9, label: "9d6" },
      { value: 10, label: "10d6" },
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
              <td colSpan="4">
                <SelectWithOptGroup
                  optionValueAttribute="name"
                  optionLabelAttribute="name"
                  optionLabelAdditionAttribute="orgin"
                  options={getUnitedOptions(weaponsPF2, weaponsDnD5)}
                  onValueChange={this.handleWeaponsUnitedChange}
                  emptyLabel="Select Weapon"
                />
              </td>
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
                <div>
                  <SelectWithOptGroup
                    ref={this.dnd5WeaponSelect}
                    optionValueAttribute="name"
                    optionLabelAttribute="name"
                    optionLabelAdditionAttribute="damage_dice"
                    options={{
                      "Melee Weapons": enrichDiceWithDamageType(
                        weaponsDnD5
                          .filter((weapon) => weapon.category.includes("Melee"))
                          .sort(sortName)
                      ),
                      "Ranged Weapons": enrichDiceWithDamageType(
                        weaponsDnD5
                          .filter(
                            (weapon) =>
                              weapon.category.includes("Ranged") &&
                              weapon.slug !== "net" &&
                              weapon.slug !== "blowgun"
                          )
                          .sort(sortName)
                      ),
                    }}
                    onValueChange={this.handleWeaponsDnD5Change}
                    emptyLabel="Select Weapon"
                    id="DnD5Select"
                    selected={
                      this.state.selectedWeaponDnD5
                        ? this.state.selectedWeaponDnD5.name
                        : ""
                    }
                  />
                </div>
                <br />
                <div>
                  <DynamicSelect
                    options={rogueDnD5SneakDices}
                    onValueChange={this.handleRogueDnD5SneakDicesChange}
                    doNotRenderEmpty={true}
                    disabled={
                      !dnd5weaponForSneak(this.state.selectedWeaponDnD5)
                    }
                    selected={this.state.selectedRogueDnD5SneakDices}
                  />{" "}
                  Sneak Attack Dices
                </div>
              </td>
              <td>
                <div>
                  <SelectWithOptGroup
                    optionValueAttribute="name"
                    optionLabelAttribute="name"
                    optionLabelAdditionAttribute="damage"
                    options={{
                      "Melee Weapons": weaponsPF2.meleeWeapons.sort(sortName),
                      "Ranged Weapons": weaponsPF2.rangeWeapons
                        .filter(
                          (weapon) =>
                            weapon.category !== "Ammunition" &&
                            weapon.name !== "Alchemical Bomb"
                        )
                        .sort(sortName),
                    }}
                    onValueChange={this.handleWeaponsPF2Change}
                    emptyLabel="Select Weapon"
                    id="PF2Select"
                    selected={
                      this.state.selectedWeaponPF2
                        ? this.state.selectedWeaponPF2.name
                        : ""
                    }
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
                {weaponResultDnD5.min && (
                  <>
                    <strong>{weaponResultDnD5.min}</strong> to{" "}
                    <strong>{weaponResultDnD5.critMax}</strong> damage
                  </>
                )}
              </td>
              <td>
                {weaponResultPF2.min && (
                  <>
                    <strong>{weaponResultPF2.min}</strong> to{" "}
                    <strong>{weaponResultPF2.critMax}</strong> damage
                    {weaponResultPF2.critSpecMax}
                  </>
                )}
              </td>
            </tr>
            <tr>
              <td>
                {weaponResultDnD5.min && (
                  <table className="damage-result-table">
                    <tbody>
                      <tr>
                        <td>
                          <strong>Min:</strong>
                        </td>
                        <td> {weaponResultDnD5.min}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Min Crit:</strong>
                        </td>
                        <td> {weaponResultDnD5.critMin}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Med:</strong>
                        </td>
                        <td> {weaponResultDnD5.medium}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Med Crit:</strong>
                        </td>
                        <td> {weaponResultDnD5.critMedium}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Max:</strong>
                        </td>
                        <td> {weaponResultDnD5.max}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Max Crit:</strong>
                        </td>
                        <td> {weaponResultDnD5.critMax}</td>
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
                        <td>
                          <strong>Min:</strong>
                        </td>
                        <td>{weaponResultPF2.min}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Min Crit:</strong>
                        </td>
                        <td>
                          {weaponResultPF2.critMin}
                          {weaponResultPF2.critSpecMin}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Med: </strong>
                        </td>
                        <td>{weaponResultPF2.medium}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Med Crit:</strong>
                        </td>
                        <td>
                          {weaponResultPF2.critMedium}
                          {weaponResultPF2.critSpecMed}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Max:</strong>
                        </td>
                        <td> {weaponResultPF2.max}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Max Crit:</strong>
                        </td>
                        <td>
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
