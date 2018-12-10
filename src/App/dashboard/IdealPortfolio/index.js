import { connect } from "react-redux"
import { setRiskPreference as setRiskPreferenceAction } from "../../../redux/actions/idealPortfolioActions"
import IdealPortfolio from "./IdealPortfolio"

const mapStateToProps = state => {
  return {
    possibleRisks:
      Object.keys(state.idealPortfolio.investmentSettingsByRiskPreference)
        .length > 0
        ? Object.keys(state.idealPortfolio.investmentSettingsByRiskPreference)
        : [],
    riskPreference: state.idealPortfolio.riskPreference,
    showPieChart: state.idealPortfolio.showPieChart
  }
}

const mapDispatchToProps = {
  setRiskPreference: setRiskPreferenceAction
}

export default connect(mapStateToProps, mapDispatchToProps)(IdealPortfolio)
