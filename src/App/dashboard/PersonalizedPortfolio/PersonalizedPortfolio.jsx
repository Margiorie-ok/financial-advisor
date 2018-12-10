import React, { Component } from "react"
import AppContainer from "../common/layout/AppContainer"
import Grid from "@material-ui/core/Grid"
import FormRow from "./FormRow"
import CalculatorIcon from "@material-ui/icons/LowPriority"
import Button from "@material-ui/core/Button"
import Calculator from "./Calculator"

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
        const currentProportion = Number(
          Number(amount / totalAmount).toFixed(2)
        )
        this.props.setCurrentProportion(
          Object.keys(categorySettings)[i],
          currentProportion
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
    const { classes } = this.props
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

export default PersonalizedPortfolio
