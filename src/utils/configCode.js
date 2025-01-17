export function getThermostatConfigCode(answers) {
  // 1) First digit → Heating
  const firstDigit = (function(){
    // If "None," we do 0:
    if (answers.heatingStage === "None") return "0";

    switch (answers.systemType) {
      case "Oil/gas":
        return (answers.heatingStage === "1-stage") ? "1" : "6";
      case "Electric":
        return (answers.heatingStage === "1-stage") ? "2" : "7";
      case "Heatpump":
        return (answers.heatingStage === "1-stage") ? "3" : "8";
      case "Hydronic":
        return (answers.heatingStage === "1-stage") ? "4" : "9";
      case "FCU":
        // Usually matches hydronic or your own custom digit:
        return (answers.heatingStage === "1-stage") ? "4" : "9";
      default:
        return "0"; // fallback
    }
  })();

  // 2) Second digit → Cooling + fan speeds
  const secondDigit = (function(){
    if (answers.coolingStage === "None") {
      // Check fan speed for "No cooling" scenarios:
      switch (answers.fanSpeed) {
        case "No":
        case "1-speed": return "0";
        case "2-speed": return "2";
        case "3-speed": return "3";
      }
    } else if (answers.coolingStage === "1-stage") {
      // 1-stage cooling can vary with fan speeds:
      switch (answers.fanSpeed) {
        case "1-speed": return "1";
        case "2-speed": return "4";
        case "3-speed": return "5";
      }
    } else if (answers.coolingStage === "2-stage") {
      // Typically "6" for 2-stage. If multi-speed is relevant, use 6 or custom:
      return "6";
    }
    // If no match:
    return "0";
  })();

  // 3) Third digit → Fan, HP, Emer. Heat, Reversing Valve
  const thirdDigit = (function(){
    const fan = answers.fanControlledByTstat; // true/false
    const isHP = (answers.systemType === "Heatpump");
    const emerg = isHP ? answers.hasEmergencyHeat : false; // true/false
    const rvCool = isHP ? (answers.reversingValve === "Cool") : false; // true/false

    // Non-heatpump
    if (!isHP) {
      // If no HP, ignore reversing valve & emerg:
      if (!fan) return "A";  // fan=No
      else {
        // fan=Yes
        return "B";
      }
    }
    // Heatpump:
    if (fan) {
      if (!emerg && !rvCool) return "D"; // HP, no emerg, RV=Heat
      if (!emerg && rvCool)  return "E"; // HP, no emerg, RV=Cool
      if (emerg && rvCool)   return "F"; // HP, emerg,    RV=Cool
      if (emerg && !rvCool)  return "G"; // HP, emerg,    RV=Heat
    } else {
      return "H"; // Rare HP scenario if the furnace/air handler controls the fan
    }
  })();

  return `${firstDigit}${secondDigit}${thirdDigit}`;
}
