import { connect } from "react-redux"
import ProportionsDonutChart from "./ProportionsDonutChart"

const mapStateToProps = state => {
  return {
    investmentCategories: state.entities.investmentCategories.byId
      ? state.entities.investmentCategories.byId
      : [],
    investmentSettings:
      state.idealPortfolio.investmentSettingsByRiskPreference[
        state.idealPortfolio.riskPreference
      ]
  }
}

export default connect(mapStateToProps)(ProportionsDonutChart)
