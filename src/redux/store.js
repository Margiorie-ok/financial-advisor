import { compose, createStore, combineReducers, applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga"
import idealPortfolioReducers from "./reducers/idealPortfolioReducers.js"
import personalizedPortfolioReducers from "./reducers/personalizedPortfolioReducers.js"
import entitiesReducers from "./reducers/entitiesReducers.js"
import rootSaga from "./sagas/sagas.js"

const sagaMiddleware = createSagaMiddleware()
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  combineReducers({
    idealPortfolio: idealPortfolioReducers,
    personalizedPortfolio: personalizedPortfolioReducers,
    entities: entitiesReducers
  }),
  composeEnhancer(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootSaga)
