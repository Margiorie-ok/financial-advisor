import React, { Component } from "react"
import { DonutChart } from "../../common/dataDisplay/DonutChart"

class ProportionsDonutChart extends Component {
  constructor(props) {
    super(props)
    this.state = { hovered: false }
  }

  formatData = (investmentSettings, investmentCategories) => {
    const { hovered } = this.state
    let data = []
    let legendData = []
    for (let i = 0; i < Object.keys(investmentSettings).length; i++) {
      const investmentSettingsObject =
        investmentSettings[Object.keys(investmentSettings)[i]]
      if (investmentSettingsObject.proportion === 0) {
        continue
      }
      data = [
        ...data,
        {
          x: !hovered
            ? investmentCategories[investmentSettingsObject.investment_category]
                .name
            : investmentSettingsObject.proportion * 100 + " %",
          y: investmentSettingsObject.proportion
        }
      ]
      legendData = [
        ...legendData,
        {
          name:
            investmentCategories[investmentSettingsObject.investment_category]
              .name
        }
      ]
    }
    return { data: data, legendData: legendData }
  }
  render() {
    const { investmentSettings, investmentCategories } = this.props

    const propsData = this.formatData(investmentSettings, investmentCategories)
    return Object.keys(investmentCategories).length > 0 ? (
      <div
        style={{ maxHeight: "400px" }}
        onMouseEnter={() => this.setState({ hovered: true })}
        onMouseLeave={() => this.setState({ hovered: false })}
      >
        <DonutChart data={propsData.data} title="Ideal Portfolio" />
      </div>
    ) : null
  }
}

export default ProportionsDonutChart
