import React, { Component } from "react"
import { withRouter } from "react-router"
import AppContainer from "../common/layout/AppContainer"
import Grid from "@material-ui/core/Grid"
import FormRow from "./FormRow"
import { connect } from "react-redux"
import {
  setDesiredProportion as setDesiredProportionAction,
  setCurrentAmount as setCurrentAmountAction,
  setCurrentProportion as setCurrentProportionAction,
  setTotalAmount as setTotalAmountAction
} from "../../../redux/actions/personalizedPortfolioActions.js"
import CalculatorIcon from "@material-ui/icons/LowPriority"
import Button from "@material-ui/core/Button"
import { compose } from "redux"
import { withStyles } from "@material-ui/core/styles"
import Calculator from "./Calculator"
import "./style.css"

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

class PersonalizedPortfolio extends Component {
  constructor(props) {
    super(props)
    this.state = { recalculateProportions: false, calculate: false }
  }
  componentWillMount() {
    const {
      riskPreference,
      preferences,
      setDesiredProportion,
      setCurrentAmount,
      history
    } = this.props
    if (!riskPreference) {
      history.push("/")
    } else {
      for (let i = 0; i < Object.keys(preferences).length; i++) {
        const preference = preferences[Object.keys(preferences)[i]]
        setDesiredProportion(
          preference.investment_category,
          preference.proportion
        )
        // setCurrentAmount(
        //   preference.investment_category,
        //   preference.amount ? Number(preference.amount).toFixed(2) : 0
        // )
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.recalculate !== this.state.recalculate) {
      this.recalculateCurrentProportions()
    }
  }

  recalculateCurrentProportions = () => {
    const { categorySettings, setTotalAmount } = this.props
    let totalAmount = 0
    for (let i = 0; i < Object.keys(categorySettings).length; i++) {
      const setting = categorySettings[Object.keys(categorySettings)[i]]
      let amount = typeof setting.amount !== "undefined" ? setting.amount : 0
      totalAmount += amount
    }
    if (!isNaN(totalAmount)) {
      setTotalAmount(totalAmount)
      for (let i = 0; i < Object.keys(categorySettings).length; i++) {
        const setting = categorySettings[Object.keys(categorySettings)[i]]
        let amount = typeof setting.amount !== "undefined" ? setting.amount : 0
        const desiredProportion = Number(
          Number(amount / totalAmount).toFixed(2)
        )
        this.props.setCurrentProportion(
          Object.keys(categorySettings)[i],
          desiredProportion
        )
      }
    }
  }

  onCategoryValueChange = (category, value) => {
    const { setCurrentAmount } = this.props
    setCurrentAmount(category, value)
    this.setState({ recalculate: !this.state.recalculate })
  }

  categoryRows = () => {
    const { categorySettings, totalAmount } = this.props
    const categoryRows = Object.keys(categorySettings).map((key, index) => (
      <Grid item xs={12} key={"category-grid-" + index}>
        <FormRow
          key={"category-row-" + index}
          category={key}
          name={categorySettings[key].name}
          onCategoryValueChange={this.onCategoryValueChange}
          newAmountValue={totalAmount * categorySettings[key].desired}
        />
      </Grid>
    ))
    return categoryRows
  }

  render() {
    const { categorySettings, key, classes } = this.props
    return (
      <AppContainer>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={() => this.setState({ calculate: !this.state.calculate })}
          >
            <CalculatorIcon className={classes.leftIcon} />
            Calculate
          </Button>
        </Grid>
        <Grid container spacing={24}>
          {this.categoryRows()}
        </Grid>
        <Grid item xs={12}>
          <Calculator calculate={this.state.calculate} />
        </Grid>
      </AppContainer>
    )
  }
}

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
