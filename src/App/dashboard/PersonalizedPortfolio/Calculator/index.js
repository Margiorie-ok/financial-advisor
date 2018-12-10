import { connect } from "react-redux"
import { compose } from "redux"
import { withStyles } from "@material-ui/core/styles"
import Calculator from "./Calculator"

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
})

const mapStateToProps = state => {
  return {
    categorySettings: state.personalizedPortfolio.categorySettings,
    totalAmount: state.personalizedPortfolio.totalAmount
  }
}

export default compose(withStyles(styles), connect(mapStateToProps))(Calculator)
