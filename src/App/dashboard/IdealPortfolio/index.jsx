import React, { Component } from "react"
import AppContainer from "../common/layout/AppContainer"
import { connect } from "react-redux"
import Grid from "@material-ui/core/Grid"
import { setRiskPreference as setRiskPreferenceAction } from "../../../redux/actions/idealPortfolioActions"
import Fab from "@material-ui/core/Fab"
import Typography from "@material-ui/core/Typography"
import ProportionsTable from "./ProportionsTable/index"
import ProportionsDonutChart from "./ProportionsDonutChart"

class IdealPortfolio extends Component {
  constructor(props) {
    super(props)
    this.state = { selectedIndex: undefined }
  }

  riskButton = (risk, index) => {
    const { riskPreference } = this.props
    return (
      <Fab
        size="small"
        color={riskPreference === risk ? "secondary" : "primary"}
        aria-label="Add"
        onClick={() => {
          this.props.setRiskPreference(risk)
        }}
        key={"risk-button-" + risk}
      >
        {risk}
      </Fab>
    )
  }

  render() {
    const { possibleRisks, riskPreference, showPieChart } = this.props
    return (
      <AppContainer>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom className="instructions">
              {riskPreference
                ? "Risk level: " + riskPreference
                : "Please select a risk level"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {possibleRisks.length > 0 &&
              possibleRisks.map(value => this.riskButton(value))}
          </Grid>
          <Grid item xs={12}>
            {showPieChart ? (
              <ProportionsDonutChart />
            ) : (
              <ProportionsTable selected={riskPreference} />
            )}
          </Grid>
        </Grid>
      </AppContainer>
    )
  }
}

const mapStateToProps = state => {
  return {
    possibleRisks:
      Object.keys(state.idealPortfolio.investmentSettingsByRiskPreference)
        .length > 0
        ? Object.keys(state.idealPortfolio.investmentSettingsByRiskPreference)
        : [],
    riskPreference: state.idealPortfolio.riskPreference,
    showPieChart: state.idealPortfolio.showPieChart
  }
}

const mapDispatchToProps = {
  setRiskPreference: setRiskPreferenceAction
}

export default connect(mapStateToProps, mapDispatchToProps)(IdealPortfolio)
