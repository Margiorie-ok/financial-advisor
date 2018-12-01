import ActionTypes from "./actionTypes"

export function fetchIdealPortfolio() {
  return {
    type: ActionTypes("IDEAL_PORTFOLIO_FETCH_REQUESTED")
  }
}
