import { all } from "redux-saga/effects"
import idealPortfolioSaga from "./idealPortfolioSaga"

export default function* rootSaga() {
  yield all([idealPortfolioSaga()])
}
