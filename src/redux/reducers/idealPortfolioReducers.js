const initialState = {
  showPieChart: false,
  riskPreference: null,
  investmentSettingsByRiskPreference: {}
}

const idealPortfolioReducers = (state = initialState, action) => {
  switch (action.type) {
    case "SWITCH_PIE_CHART":
      return { ...state, showPieChart: !state.showPieChart }
    case "SET_RISK_PREFERENCE":
      return { ...state, riskPreference: action.riskPreference }
    case "SET_INVESTMENT_SETTINGS_BY_RISK_PREFERENCE":
      return { ...state, investmentSettingsByRiskPreference: action.payload }
    default:
      return state
  }
}

export default idealPortfolioReducers
