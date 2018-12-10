import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom"
import PersonalizedPortfolio from "./dashboard/PersonalizedPortfolio"
import IdealPortfolio from "./dashboard/IdealPortfolio"
import AppNavBar from "./AppNavBar"

const AppRouter = () => (
  <Router>
    <React.Fragment>
      <AppNavBar />
      <Switch>
        <Route exact path="/" component={IdealPortfolio} />
        <Route path="/ideal-portfolio" component={IdealPortfolio} />
        <Route
          path="/personalized-portfolio"
          component={PersonalizedPortfolio}
        />
        <Route render={routeProps => <Redirect to={"/ideal-portfolio/"} />} />
      </Switch>
    </React.Fragment>
  </Router>
)

export default AppRouter
