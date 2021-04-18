import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import HitCritCalculator from "./HitCritCalculator";
import DamageCalculator from "./DamageCalculator";

class MainTab extends React.Component {
  render() {
    return (
      <Tabs defaultActiveKey="hitCritCalc">
        <Tab eventKey="hitCritCalc" title="Hit Crit Calculator">
          <HitCritCalculator />
        </Tab>
        <Tab eventKey="damageCalc" title="Damage Calculator">
          <DamageCalculator />
        </Tab>
      </Tabs>
    );
  }
}

export default MainTab;
