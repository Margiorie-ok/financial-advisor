import { ResponsiveTable } from "../../common/dataDisplay/ResponsiveTable/ResponsiveTable"
import React from "react"
import { sortByProperty } from "../../../../redux/utils/dataUtils"
const labels = props => {
  const { investmentCategories, investmentCategoriesIds } = props
  let labels = ["Risk"]
  for (let i = 0; i < investmentCategoriesIds.length; i++) {
    labels = [
      ...labels,
      investmentCategories[investmentCategoriesIds[i]].name + " %"
    ]
  }
  return labels
}

const generateRow = (props, i, risks) => {
  const { investmentCategoriesIds, investmentSettingsByRiskPreference } = props
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

const rows = props => {
  const { investmentSettingsByRiskPreference } = props
  let rows = []
  const risks = Object.keys(investmentSettingsByRiskPreference)
  for (let i = 0; i < risks.length; i++) {
    rows = [...rows, generateRow(props, i, risks)]
  }
  return rows
}

const ProportionsTable = props => {
  const investmentSettingsByRisk = props.investmentSettingsByRiskPreference
  const { selected } = props
  const selectedIndex = Object.keys(investmentSettingsByRisk).indexOf(selected)
  return Object.keys(investmentSettingsByRisk).length > 0 ? (
    <ResponsiveTable
      labels={labels(props)}
      rows={rows(props)}
      selectedIndex={selectedIndex}
    />
  ) : null
}

export default ProportionsTable
