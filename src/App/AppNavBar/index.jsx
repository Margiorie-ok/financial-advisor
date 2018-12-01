import { withStyles } from "@material-ui/core/styles"
import { compose } from "redux"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import { switchPieChart as switchPieChartAction } from "../../redux/actions/idealPortfolioActions"
import AppNavBar from "./AppNavBar"

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}

const mapStateToProps = state => {
  return {
    riskPreference: state.idealPortfolio.riskPreference,
    showPieChart: state.idealPortfolio.showPieChart
  }
}

const mapDispatchToProps = {
  switchPieChart: switchPieChartAction
}

export default compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(AppNavBar)
