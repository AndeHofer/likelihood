import React from "react";
import "./Calculator.css";
import NumberInput from "./components/NumberInput";
import DynamicSelect from "./components/DynamicSelect";
import SelectWithOptGroup from "./components/SelectWithOptGroup";
import { weaponsPF2 } from "./data/weaponsPF2";
import { weaponsDnd5Srd } from "./data/weaponsDnd5eSrd";
import { calculatePF2WeaponDamage } from "./calculatorFunctions";
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
      selectedWeaponDnd5: "",
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
    this.handleWeaponsDnd5Change = this.handleWeaponsDnd5Change.bind(this);
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

  handleWeaponsDnd5Change(value) {
    this.setState({ selectedWeaponDnd5: value });
  }

  render() {
    const strength = this.state.strength;
    const dexterity = this.state.dexterity;
    const weaponResult = calculatePF2WeaponDamage(
      weaponsPF2,
      this.state.selectedWeaponPF2,
      this.state.strength,
      this.state.selectedStrikingRune,
      this.state.criticalSpecialization,
      this.state.selectedPotencyRune
    );
    const weaponDamage = this.state.selectedWeaponPF2
      ? "Min: " +
        weaponResult.min +
        "\n Min Crit: " +
        weaponResult.critMin +
        weaponResult.critSpecMin +
        "\nMed: " +
        weaponResult.medium +
        "\n Med Crit: " +
        weaponResult.critMedium +
        weaponResult.critSpecMed +
        "\nMax: " +
        weaponResult.max +
        "\n Max Crit: " +
        weaponResult.critMax +
        weaponResult.critSpecMax
      : "";
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
                    optionValueAttribute="index"
                    optionLabelAttribute="name"
                    optionLabelAdditionAttribute="damage.damage_dice"
                    options={{
                      "Melee Weapons": weaponsDnd5Srd.filter(
                        (weapon) => weapon.weapon_range === "Melee"
                      ),
                      "Ranged Weapons": weaponsDnd5Srd.filter(
                        (weapon) => weapon.weapon_range === "Ranged" && weapon.index !== "net"
                      ),
                    }}
                    onValueChange={this.handleWeaponsDnd5Change}
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
              <td></td>
              <td>
                <strong>{weaponResult.min ? weaponResult.min : ""}</strong>
                {weaponResult.min ? " to " : ""}
                <strong>
                  {weaponResult.critMax ? weaponResult.critMax : ""}
                </strong>
                {weaponResult.min ? " damage " : ""}
                {weaponResult.critSpecMax ? weaponResult.critSpecMax : ""}

                <br />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <div className="pre-wrap-div">{weaponDamage}</div>
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
