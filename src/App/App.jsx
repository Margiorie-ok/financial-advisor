import React, { Component } from "react"
import LinearProgress from "@material-ui/core/LinearProgress"
import AppRouter from "./AppRouter"
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    this.props.fetchIdealPortfolio()
  }

  loading = () => {
    return <LinearProgress color="primary" />
  }

  app = () => {
    return (
      <React.Fragment>
        <AppRouter />
      </React.Fragment>
    )
  }

  render() {
    const { investmentSettings } = this.props
    return Object.keys(investmentSettings).length > 0
      ? this.app()
      : this.loading()
  }
}

export default App
