import React from "react"
import { VictoryPie } from "victory"

export const DonutChart = ({ data, legendData, title }) => {
  return (
    <div style={{ maxWidth: "450px", marginLeft: "auto", marginRight: "auto" }}>
      <VictoryPie
        colorScale={["tomato", "gold", "#00695C", "orange", "navy"]}
        data={data}
        labelRadius={90}
        innerRadius={50}
        style={{ labels: { fill: "white", fontSize: 12, fontWeight: "bold" } }}
      />
    </div>
  )
}
