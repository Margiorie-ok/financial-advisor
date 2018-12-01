import ActionTypes from "./actionTypes"

export function setRiskPreference(riskPreference) {
  return {
    type: ActionTypes("SET_RISK_PREFERENCE"),
    riskPreference: riskPreference
  }
}

export function switchPieChart() {
  return {
    type: ActionTypes("SWITCH_PIE_CHART"),
  }
}