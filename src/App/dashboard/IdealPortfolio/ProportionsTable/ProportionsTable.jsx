import { ResponsiveTable } from "../../common/dataDisplay/ResponsiveTable/ResponsiveTable"
import React, { Component } from "react"
import { sortByProperty } from "../../../../redux/utils/dataUtils"

class ProportionsTable extends Component {
  labels = () => {
    const { investmentCategories, investmentCategoriesIds } = this.props
    let labels = ["Risk"]
    for (let i = 0; i < investmentCategoriesIds.length; i++) {
      labels = [
        ...labels,
        investmentCategories[investmentCategoriesIds[i]].name + " %"
      ]
    }
    return labels
  }

  generateRow = (i, risks) => {
    const {
      investmentCategoriesIds,
      investmentSettingsByRiskPreference
    } = this.props
    let newRow = [Object.keys(investmentSettingsByRiskPreference)[i]]
    const investmentSettingsByCategories = sortByProperty({
      data: investmentSettingsByRiskPreference[risks[i]],
      property: "investment_category"
    })

    for (let j = 0; j < investmentCategoriesIds.length; j++) {
      let settingObject =
        investmentSettingsByCategories[investmentCategoriesIds[j]]
      settingObject = settingObject[Object.keys(settingObject)[0]]
      newRow = [...newRow, settingObject.proportion * 100]
    }
    return newRow
  }

  rows = () => {
    const { investmentSettingsByRiskPreference } = this.props
    let rows = []
    const risks = Object.keys(investmentSettingsByRiskPreference)
    for (let i = 0; i < risks.length; i++) {
      rows = [...rows, this.generateRow(i, risks)]
    }
    return rows
  }
  render() {
    const investmentSettingsByRisk = this.props
      .investmentSettingsByRiskPreference
    const { selected } = this.props
    const selectedIndex = Object.keys(investmentSettingsByRisk).indexOf(
      selected
    )
    return Object.keys(investmentSettingsByRisk).length > 0 ? (
      <ResponsiveTable
        labels={this.labels()}
        rows={this.rows()}
        selectedIndex={selectedIndex}
      />
    ) : null
  }
}

export default ProportionsTable
