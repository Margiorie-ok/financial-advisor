const actions = [
  "IDEAL_PORTFOLIO_FETCH_REQUESTED",
  "SWITCH_IDEAL_PORTFOLIO",
  "SWITCH_PIE_CHART",
  "SET_INVESTMENT_CATEGORIES",
  "SET_INVESTMENT_SETTINGS",
  "SET_RISK_PREFERENCE",
  "SET_INVESTMENT_SETTINGS_BY_RISK_PREFERENCE",
  "SET_CURRENT_PROPORTION",
  "SET_DESIRED_PROPORTION",
  "SET_CURRENT_AMOUNT",
  "SET_TOTAL_AMOUNT"
]
const ActionTypes = type => {
  if (actions.indexOf(type) > -1) {
    return type
  }
  throw new Error(`${type} is not a valid Action Type`)
}

export default ActionTypes
