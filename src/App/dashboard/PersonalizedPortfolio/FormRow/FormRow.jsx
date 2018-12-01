import React from "react"
import { Component } from "react"
import TextField from "@material-ui/core/TextField"
import { withStyles } from "@material-ui/core/styles"
import { connect } from "react-redux"
import { compose } from "redux"

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
})

class FormRow extends Component {
  constructor(props) {
    super(props)
    this.state = { amount: "" }
  }
  onCategoryValueChange = e => {
    this.props.onCategoryValueChange(
      this.props.category,
      parseFloat(e.target.value)
    )
  }
  render() {
    const {
      classes,
      name,
      category,
      categorySettings,
      newAmountValue
    } = this.props
    console.log(typeof newAmountValue)
    const amountValue =
      typeof categorySettings[category].amount !== "undefined"
        ? categorySettings[category].amount
        : 0

    return (
      <div className={classes.container}>
        <TextField
          label={name + " ($)"}
          id="margin-none"
          className={classes.textField}
          helperText="Current Amount"
          onChange={this.onCategoryValueChange}
          defaultValue={amountValue}
        />
        <TextField
          label="Difference"
          id="margin-dense"
          className={classes.textField}
          helperText="Difference"
          value={newAmountValue}
          margin="dense"
        />
        <TextField
          label="New Amount"
          disabled
          id="margin-normal"
          className={classes.textField}
          helperText={
            "To fit " + categorySettings[category].desired * 100 + " %"
          }
          value={newAmountValue}
          margin="normal"
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    categorySettings: state.personalizedPortfolio.categorySettings
  }
}

export default compose(withStyles(styles), connect(mapStateToProps))(FormRow)
