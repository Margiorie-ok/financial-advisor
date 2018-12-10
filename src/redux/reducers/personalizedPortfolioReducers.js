const initialState = {
  investmentCategoryIds: [],
  categorySettings: {}
}

const personalizedPortfolioReducers = (state = initialState, action) => {
  switch (action.type) {
    case "SET_INVESTMENT_CATEGORIES":
      return { ...state, categorySettings: action.payload.byId }
    case "ADD_INVESTMENT_INPUT":
      return {
        ...state,
        investmentInputs: {
          ...state.investmentInputs,
          [action.investmentCategoryId]: action.value
        }
      }
    case "SET_CURRENT_PROPORTION":
      return {
        ...state,
        categorySettings: {
          ...state.categorySettings,
          [action.category]: {
            ...state.categorySettings[action.category],
            current: action.current
          }
        }
      }
    case "SET_DESIRED_PROPORTION":
      return {
        ...state,
        categorySettings: {
          ...state.categorySettings,
          [action.category]: {
            ...state.categorySettings[action.category],
            desired: action.desired
          }
        }
      }
    case "SET_CURRENT_AMOUNT":
      return {
        ...state,
        categorySettings: {
          ...state.categorySettings,
          [action.category]: {
            ...state.categorySettings[action.category],
            amount: action.amount
          }
        }
      }
    case "SET_TOTAL_AMOUNT":
      return {
        ...state,
        totalAmount: action.totalAmount
      }
    default:
      return state
  }
}

export default personalizedPortfolioReducers
