import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import PersonalizedPortfolio from "./dashboard/PersonalizedPortfolio"
import IdealPortfolio from "./dashboard/IdealPortfolio"
import AppNavBar from "./AppNavBar"

const AppRouter = () => (
  <Router>
    <React.Fragment>
      <AppNavBar />
      <Route exact path="/" component={IdealPortfolio} />
      <Route path="/ideal-portfolio" component={IdealPortfolio} />
      <Route path="/personalized-portfolio" component={PersonalizedPortfolio} />
    </React.Fragment>
  </Router>
)

export default AppRouter
