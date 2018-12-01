import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
import TableIcon from "@material-ui/icons/TableChart"
import IdealPortfolioIcon from "@material-ui/icons/ShowChart"
import PersonalizedPortfolioIcon from "@material-ui/icons/Person"
import PieChartIcon from "@material-ui/icons/PieChart"
import { Link } from "react-router-dom"

const AppNavBar = props => {
  const { classes, riskPreference, showPieChart, switchPieChart } = props
  const pathname = props.location.pathname
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button
            color="inherit"
            component={Link}
            to="/ideal-portfolio"
            variant="outlined"
            className={classes.button}
          >
            <IdealPortfolioIcon className={classes.extendedIcon} />
            Ideal
          </Button>
          {pathname === "/ideal-portfolio" && riskPreference ? (
            <Button
              color="inherit"
              onClick={() => switchPieChart()}
              variant="outlined"
              className={classes.button}
            >
              {showPieChart ? (
                <TableIcon className={classes.extendedIcon} />
              ) : (
                <PieChartIcon className={classes.extendedIcon} />
              )}
              {showPieChart ? "All Settings" : "PieChart"}
            </Button>
          ) : null}

          <Button
            color="inherit"
            component={Link}
            to="/personalized-portfolio"
            variant="outlined"
            className={classes.button}
          >
            <PersonalizedPortfolioIcon className={classes.extendedIcon} />
            Personalized
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default AppNavBar
