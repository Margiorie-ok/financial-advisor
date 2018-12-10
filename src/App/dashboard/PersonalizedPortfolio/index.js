import { withRouter } from "react-router"
import { connect } from "react-redux"
import {
  setDesiredProportion as setDesiredProportionAction,
  setCurrentAmount as setCurrentAmountAction,
  setCurrentProportion as setCurrentProportionAction,
  setTotalAmount as setTotalAmountAction
} from "../../../redux/actions/personalizedPortfolioActions.js"
import { compose } from "redux"
import { withStyles } from "@material-ui/core/styles"
import PersonalizedPortfolio from "./PersonalizedPortfolio"

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
})

const mapStateToProps = state => {
  return {
    riskPreference: state.idealPortfolio.riskPreference,
    preferences:
      state.idealPortfolio.investmentSettingsByRiskPreference[
        state.idealPortfolio.riskPreference
      ],
    categorySettings: state.personalizedPortfolio.categorySettings,
    totalAmount: state.personalizedPortfolio.totalAmount
  }
}

const mapDispatchToProps = {
  setDesiredProportion: setDesiredProportionAction,
  setCurrentAmount: setCurrentAmountAction,
  setCurrentProportion: setCurrentProportionAction,
  setTotalAmount: setTotalAmountAction
}
export default compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(PersonalizedPortfolio)
