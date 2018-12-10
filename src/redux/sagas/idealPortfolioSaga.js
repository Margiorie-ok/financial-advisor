import { delay } from "redux-saga"
import { put, takeLatest, call } from "redux-saga/effects"
import { sortByProperty } from "../utils/dataUtils"
const response = require("../../mock/response.json")

export function* fetchIdealPortfolio(action) {
  yield call(delay, 1500)
  const responseData = response
  yield put({
    type: "SET_INVESTMENT_CATEGORIES",
    payload: responseData.entities.investmentCategories
  })
  yield put({
    type: "SET_INVESTMENT_SETTINGS",
    payload: responseData.entities.investmentSettings
  })
  yield put({
    type: "SET_INVESTMENT_SETTINGS_BY_RISK_PREFERENCE",
    payload: sortByProperty({
      data: responseData.entities.investmentSettings.byId,
      property: "riskPreference"
    })
  })
}

export default function* idealPortfolioSaga() {
  yield takeLatest("IDEAL_PORTFOLIO_FETCH_REQUESTED", fetchIdealPortfolio)
}
