import { withStyles } from "@material-ui/core/styles"
import { connect } from "react-redux"
import { compose } from "redux"
import FormRow from "./FormRow"

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing.unit
  }
})

const mapStateToProps = state => {
  return {
    categorySettings: state.personalizedPortfolio.categorySettings
  }
}

export default compose(withStyles(styles), connect(mapStateToProps))(FormRow)
