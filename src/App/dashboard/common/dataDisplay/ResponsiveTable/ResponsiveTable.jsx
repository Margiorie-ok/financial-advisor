import React from "react"
import "./style.css"

export const ResponsiveTable = ({ labels, rows, selectedIndex }) => (
  <table className="table">
    <tbody className="labels">
      <tr key="labels">
        {labels.map((label, i) => <th key={"label-" + i}>{label}</th>)}
      </tr>
    </tbody>

    {rows.map((row, id) => (
      <tbody key={"tr-" + id}>
        <tr
          key={"row-" + id}
          className={selectedIndex === id ? "selected" : ""}
        >
          {row.map((element, i) => (
            <td key={"element-" + i}>
              {" "}
              <span className="table-responsive-label">{labels[i]}</span>
              {element}
            </td>
          ))}
        </tr>
      </tbody>
    ))}
  </table>
)
