import React from "react"
import { Component } from "react"
import TextField from "@material-ui/core/TextField"
import { withStyles } from "@material-ui/core/styles"
import { connect } from "react-redux"
import { compose } from "redux"

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    paddingLeft: "auto",
    paddingRight: "auto"
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
    const amountValue =
      typeof categorySettings[category].amount !== "undefined" &&
      !isNaN(categorySettings[category].amount)
        ? categorySettings[category].amount
        : 0
    const differenceValue = !isNaN(newAmountValue - amountValue)
      ? newAmountValue - amountValue > 0
        ? "+" + (newAmountValue - amountValue).toFixed(2)
        : (newAmountValue - amountValue).toFixed(2)
      : "-"
    const differenceHelper = !isNaN(newAmountValue - amountValue)
      ? newAmountValue - amountValue > 0 ? "To receive" : "To transfer"
      : ""

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
          disabled
          className={classes.textField}
          helperText={differenceHelper}
          value={differenceValue}
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
          value={!isNaN(newAmountValue) ? newAmountValue.toFixed(2) : "-"}
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
