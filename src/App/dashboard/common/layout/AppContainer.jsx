import React from "react"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import { withStyles } from "@material-ui/core/styles"

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
})

const AppContainer = props => (
  <div className={props.classes.root}>
    <Grid container spacing={24} justify="center">
      <Grid item xs={12} sm={12} md={8} lg={8} xl={6}>
        <Paper className={props.classes.paper}>{props.children}</Paper>
      </Grid>
    </Grid>
  </div>
)

export default withStyles(styles)(AppContainer)
