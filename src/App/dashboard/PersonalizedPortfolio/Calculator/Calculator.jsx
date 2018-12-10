import React, { Component } from "react"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"

const sortCategorySettings = (categorySettings, givers, receivers) => {
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
}

const newLog = ({ transfer, from, to }) => {
  return "Transfer " + transfer + "$ from " + from + " to " + to + ". \n"
}

const transferCharge = ({
  givers,
  receivers,
  queueLess,
  queueGreat,
  totalAmount,
  fullLog
}) => {
  fullLog.push(
    newLog({
      transfer: (queueLess[0].charge * totalAmount).toFixed(2),
      from: givers[0].name,
      to: receivers[0].name
    })
  )
  queueGreat[0].charge = queueGreat[0].charge - queueLess.shift().charge
  if (Math.abs(queueGreat[0].charge) < 1e-10) {
    queueGreat.shift()
  }
}

const balanceLog = ({ giversArray, receiversArray, totalAmount }) => {
  let givers = giversArray
  let receivers = receiversArray
  let fullLog = []
  while (givers.length > 0) {
    if (givers[0].charge <= receivers[0].charge) {
      transferCharge({
        givers: givers,
        receivers: receivers,
        queueLess: givers,
        queueGreat: receivers,
        totalAmount: totalAmount,
        fullLog: fullLog
      })
    } else {
      transferCharge({
        givers: givers,
        receivers: receivers,
        queueLess: receivers,
        queueGreat: givers,
        totalAmount: totalAmount,
        fullLog: fullLog
      })
    }
  }
  return fullLog
}

const ascendingCharge = (a, b) => {
  if (a.charge < b.charge) return -1
  if (a.charge > b.charge) return 1
  return 0
}

const descendingCharge = (b, a) => {
  if (a.charge < b.charge) return -1
  if (a.charge > b.charge) return 1
  return 0
}

const ascendingSteps = (a, b) => {
  if (a.steps.length < b.steps.length) return -1
  if (a.steps.length > b.steps.length) return 1
  return 0
}

const runCriterias = (totalAmount, givers, receivers) => {
  let criterias = []
  criterias = [
    ...criterias,
    {
      name: "random",
      steps: balanceLog({
        giversArray: JSON.parse(JSON.stringify(givers)),
        receiversArray: JSON.parse(JSON.stringify(receivers)),
        totalAmount: totalAmount
      })
    }
  ]
  givers.sort(ascendingCharge)
  givers.sort(ascendingCharge)
  criterias = [
    ...criterias,
    {
      name: "both ascending",
      steps: balanceLog({
        giversArray: JSON.parse(JSON.stringify(givers)),
        receiversArray: JSON.parse(JSON.stringify(receivers)),
        totalAmount: totalAmount
      })
    }
  ]
  givers.sort(descendingCharge)
  givers.sort(descendingCharge)
  criterias = [
    ...criterias,
    {
      name: "both descending",
      steps: balanceLog({
        giversArray: JSON.parse(JSON.stringify(givers)),
        receiversArray: JSON.parse(JSON.stringify(receivers)),
        totalAmount: totalAmount
      })
    }
  ]
  givers.sort(ascendingCharge)
  criterias = [
    ...criterias,
    {
      name: "ascending givers, descending receivers",
      steps: balanceLog({
        giversArray: JSON.parse(JSON.stringify(givers)),
        receiversArray: JSON.parse(JSON.stringify(receivers)),
        totalAmount: totalAmount
      })
    }
  ]

  givers.sort(descendingCharge)
  receivers.sort(ascendingCharge)
  criterias = [
    ...criterias,
    {
      name: "descending givers, ascending receivers",
      steps: balanceLog({
        giversArray: JSON.parse(JSON.stringify(givers)),
        receiversArray: JSON.parse(JSON.stringify(receivers)),
        totalAmount: totalAmount
      })
    }
  ]
  return criterias
}

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
  calculate = () => {
    const { categorySettings, totalAmount } = this.props
    const receivers = []
    const givers = []
    sortCategorySettings(categorySettings, givers, receivers)
    const criterias = runCriterias(totalAmount, givers, receivers)
    criterias.sort(ascendingSteps)

    this.setState({
      criterias: criterias,
      stepsLog: criterias[0].steps
    })
  }

  render() {
    const { classes } = this.props
    return this.state.stepsLog.length > 0 ? (
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3">
          Recomended Steps
        </Typography>
        {this.state.stepsLog.map((log, index) => (
          <Typography component="p" key={"setp-label-" + index}>
            {log}
          </Typography>
        ))}
      </Paper>
    ) : null
  }
}

export default Calculator
