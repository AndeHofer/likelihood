import React from "react";
import "./Calculator.css";
import { dnd5Monsters } from "./data/monsterDnd5eSrd";
import DynamicSelectNumberValue from "./components/DynamicSelectNumberValue";
import NumberInput from "./components/NumberInput";
import CheckboxInput from "./components/CheckboxInput";
import { pf2Monsters } from "./data/monstersPF2";
import RadioInputGroup from "./components/RadioInputGroup";
import CollapseButton from "./components/CollapseButton";
import { calculateHitChance, calculateCritChance } from './calculatorFunctions'

class HitCritCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attack: "0",
      ac: "10",
      adv: "Normal",
      hluck: false,
      agile: false,
      sight: 0,
      keenEyes: false,
      collapseOpen: true,
    };

    this.handleAcChange = this.handleAcChange.bind(this);
    this.handleAttackChange = this.handleAttackChange.bind(this);
    this.handleAdvChange = this.handleAdvChange.bind(this);
    this.handleHluckChange = this.handleHluckChange.bind(this);
    this.handleMonsterChange = this.handleMonsterChange.bind(this);
    this.handleAgileChange = this.handleAgileChange.bind(this);
    this.handleSightChange = this.handleSightChange.bind(this);
    this.handleKeenEyesChange = this.handleKeenEyesChange.bind(this);
    this.handleCollapseButtonClick = this.handleCollapseButtonClick.bind(this);
  }

  handleAcChange(value) {
    console.log("handleAcChange vaule: " + value)
    this.setState({ ac: value });
  }

  handleAttackChange(value) {
    //console.log("handleAttackChange vaule: " + value)
    this.setState({ attack: value });
  }

  handleAdvChange(value) {
    this.setState({ adv: value });
  }

  handleHluckChange(value) {
    this.setState({ hluck: !this.state.hluck });
  }

  handleAgileChange(value) {
    this.setState({ agile: !this.state.agile });
  }

  handleMonsterChange(value) {
    this.setState({ ac: value });
  }

  handleSightChange(value) {
    //console.log(value);
    this.setState({ sight: value });
  }

  handleKeenEyesChange(value) {
    this.setState({ keenEyes: !this.state.keenEyes });
  }

  handleCollapseButtonClick(value) {
    this.setState({ collapseOpen: !this.state.collapseOpen });
  }

  render() {
    const ac = this.state.ac;
    const attack = this.state.attack;
    const adv = this.state.adv;
    const hluck = this.state.hluck;
    const agile = this.state.agile;
    const sight = Number(this.state.sight);
    const keenEyes = this.state.keenEyes;
    const sightEndValue = keenEyes && sight > 0 ? sight - 2 : sight;
    const collapseOpen = this.state.collapseOpen;
    const likelihoodHitDnD = calculateHitChance(
      attack,
      ac,
      adv,
      "DnD 5e",
      hluck,
      0
    );
    const likelihoodHitPF = calculateHitChance(
      attack,
      ac,
      "Normal",
      "PF 2e",
      false,
      sightEndValue
    );

    const likelihoodHitPF2nd = calculateHitChance(
      attack ? (agile ? attack - 4 : attack - 5) : attack,
      ac,
      "Normal",
      "PF 2e",
      false,
      sightEndValue
    );
    const likelihoodHitPF3rd = calculateHitChance(
      attack ? (agile ? attack - 8 : attack - 10) : attack,
      ac,
      "Normal",
      "PF 2e",
      false,
      sightEndValue
    );
    const likelihoodCritDnD = calculateCritChance(
      attack,
      ac,
      adv,
      "DnD 5e",
      hluck,
      0
    );
    const likelihoodCritPF = calculateCritChance(
      attack,
      ac,
      "Normal",
      "PF 2e",
      false,
      sightEndValue
    );
    const likelihoodCritPF2nd = calculateCritChance(
      attack ? (agile ? attack - 4 : attack - 5) : attack,
      ac,
      "Normal",
      "PF 2e",
      false,
      sightEndValue
    );
    const likelihoodCritPF3rd = calculateCritChance(
      attack ? (agile ? attack - 8 : attack - 10) : attack,
      ac,
      "Normal",
      "PF 2e",
      false,
      sightEndValue
    );

    const radioAdv = [
      { value: "Normal", label: "Normal" },
      { value: "Advantage", label: "Advantage" },
      { value: "Disadvantage", label: "Disadvantage" },
    ];

    // value is how many dices can fail, DC 5 is 4, DC 11 is 10 dices which can fail, keenEyes alters this too
    const radioSight = [
      { value: 0, label: "Observed" },
      { value: 4, label: "Concealed" },
      { value: 10, label: "Hidden" },
    ];

    const collapseText =
      likelihoodHitDnD.text +
      "\n" +
      likelihoodCritDnD.text +
      "\n1st " +
      likelihoodHitPF.text +
      "2nd " +
      likelihoodHitPF2nd.text +
      "3rd " +
      likelihoodHitPF3rd.text +
      "\n1st " +
      likelihoodCritPF.text +
      "2nd " +
      likelihoodCritPF2nd.text +
      "3rd " +
      likelihoodCritPF3rd.text;

    return (
      <div className="calculator">
        <table className="calc-input-table">
          <tbody>
            <tr>
              <th colSpan="4" className="input-header">
                Hit & Crit Input
              </th>
            </tr>
            <tr>
              <td>Attack: </td>
              <td>
                <NumberInput
                  value={attack}
                  onValueChange={this.handleAttackChange}
                />
              </td>
              <td>Armor Class: </td>
              <td>
                <NumberInput value={ac} onValueChange={this.handleAcChange} />
              </td>
            </tr>
            <tr>
              <td>Dnd Monster:</td>
              <td colSpan="3">
                <DynamicSelectNumberValue
                  options={dnd5Monsters}
                  onValueChange={this.handleMonsterChange}
                  valueName="Armor Class"
                />
              </td>
            </tr>
            <tr>
              <td>PF Monster:</td>
              <td colSpan="3">
                <DynamicSelectNumberValue
                  options={pf2Monsters}
                  onValueChange={this.handleMonsterChange}
                  valueName="AC"
                />
              </td>
            </tr>
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
                <div className="middle-relative">
                  <RadioInputGroup
                    radios={radioAdv}
                    onValueChange={this.handleAdvChange}
                    name="adv"
                    selectedValue={adv}
                  />
                </div>
              </td>
              <td>
                <div className="middle-relative">
                  <RadioInputGroup
                    radios={radioSight}
                    onValueChange={this.handleSightChange}
                    name="sight"
                    selectedValue={sight}
                  />
                  <CheckboxInput
                    value={keenEyes}
                    onValueChange={this.handleKeenEyesChange}
                  />{" "}
                  Keen Eyes
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="middle-relative">
                  <CheckboxInput
                    value={hluck}
                    onValueChange={this.handleHluckChange}
                  />{" "}
                  Halflings Luck
                </div>
              </td>
              <td>
                <div className="middle-relative">
                  <CheckboxInput
                    value={agile}
                    onValueChange={this.handleAgileChange}
                  />{" "}
                  Agile Weapon
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div>
                  Hit: <strong>{likelihoodHitDnD.value}%</strong>
                </div>
              </td>
              <td>
                <div>
                  Hit: 1st: <strong>{likelihoodHitPF.value}%</strong>, 2nd:{" "}
                  <strong>{likelihoodHitPF2nd.value}%</strong>, 3rd:{" "}
                  <strong>{likelihoodHitPF3rd.value}%</strong>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div>
                  Crit: <strong>{likelihoodCritDnD.value}%</strong>
                </div>
              </td>
              <td>
                <div>
                  Crit: 1st: <strong>{likelihoodCritPF.value}%</strong>, 2nd:{" "}
                  <strong>{likelihoodCritPF2nd.value}%</strong>, 3rd:{" "}
                  <strong>{likelihoodCritPF3rd.value}%</strong>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <div className="pre-wrap-div">
                  <CollapseButton
                    text={collapseText}
                    open={collapseOpen}
                    onButtonClick={this.handleCollapseButtonClick}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default HitCritCalculator;