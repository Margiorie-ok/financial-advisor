import App from "./App"
import { connect } from "react-redux"
import { fetchIdealPortfolio as fetchIdealPortfolioAction } from "../redux/actions/fetchDataActions.js"

const mapDispatchToProps = {
  fetchIdealPortfolio: fetchIdealPortfolioAction
}

const mapStateToProps = state => {
  return {
    investmentSettings:
      Object.keys(state.entities.investmentSettings).length > 0
        ? state.entities.investmentSettings.byId
        : {}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
