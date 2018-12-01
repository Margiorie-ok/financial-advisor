const initialState = {
  investmentCategories: {},
  investmentSettings: {}
}

const entitiesReducers = (state = initialState, action) => {
  switch (action.type) {
    case "SET_INVESTMENT_CATEGORIES":
      return { ...state, investmentCategories: action.payload }
    case "SET_INVESTMENT_SETTINGS":
      return { ...state, investmentSettings: action.payload }
    default:
      return state
  }
}

export default entitiesReducers
