import { connect } from "react-redux"
import ProportionsTable from "./ProportionsTable"

const mapStateToProps = state => {
  return {
    investmentCategoriesIds: state.entities.investmentCategories.allIds
      ? state.entities.investmentCategories.allIds
      : [],
    investmentCategories: state.entities.investmentCategories.byId
      ? state.entities.investmentCategories.byId
      : [],
    investmentSettingsByRiskPreference:
      state.idealPortfolio.investmentSettingsByRiskPreference
  }
}

export default connect(mapStateToProps)(ProportionsTable)
