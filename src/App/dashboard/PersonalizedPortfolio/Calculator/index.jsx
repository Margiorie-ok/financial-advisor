import React, { Component } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
})

class Calculator extends Component {
  constructor(props) {
    super(props)
    this.state = { stepsLog: [] }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.calculate !== this.props.calculate) {
      this.calculate()
    }
  }

  balance = (giversArray, receiversArray) => {
    const { totalAmount } = this.props
    let givers = giversArray
    let receivers = receiversArray
    let fullLog = []
    while (givers.length > 0) {
      if (givers[0].charge <= receivers[0].charge) {
        const log =
          this.state.stepsLog +
          "Transfer " +
          (givers[0].charge * totalAmount).toFixed(2) +
          "$ from " +
          givers[0].name +
          " to " +
          receivers[0].name +
          ". \n"
        fullLog.push(log)
        receivers[0].charge = receivers[0].charge - givers.shift().charge

        if (Math.abs(receivers[0].charge) < 1e-10) {
          receivers.shift()
        }
      } else {
        const log =
          this.state.stepsLog +
          "Transfer " +
          (receivers[0].charge * totalAmount).toFixed(2) +
          "$ from " +
          givers[0].name +
          " to " +
          receivers[0].name +
          ". \n"
        fullLog.push(log)
        givers[0].charge = givers[0].charge - receivers.shift().charge
        if (Math.abs(givers[0].charge) < 1e-10) {
          givers.shift()
        }
      }
    }
    this.setState({ stepsLog: fullLog })
  }

  calculate = () => {
    const { categorySettings } = this.props
    const receivers = []
    const givers = []
    for (let i = 0; i < Object.keys(categorySettings).length; i++) {
      const setting = categorySettings[Object.keys(categorySettings)[i]]
      if (setting.current < setting.desired) {
        receivers.push({
          ...setting,
          category: Object.keys(categorySettings)[i],
          charge: setting.desired - setting.current
        })
      } else if (setting.current > setting.desired) {
        givers.push({
          ...setting,
          category: Object.keys(categorySettings)[i],
          charge: setting.current - setting.desired
        })
      }
    }
    this.balance(givers, receivers)
  }

  render() {
    const { classes } = this.props
    return this.state.stepsLog.length > 0 ? (
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3">
          Recomended Steps
        </Typography>
        {this.state.stepsLog.map(log => (
          <Typography component="p">{log}</Typography>
        ))}
      </Paper>
    ) : null
  }
}

const mapStateToProps = state => {
  return {
    categorySettings: state.personalizedPortfolio.categorySettings,
    totalAmount: state.personalizedPortfolio.totalAmount
  }
}

export default compose(withStyles(styles), connect(mapStateToProps))(Calculator)
