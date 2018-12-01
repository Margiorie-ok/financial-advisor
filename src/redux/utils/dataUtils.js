export const sortByProperty = ({ data, property }) => {
  const sortedData = {}
  const dataKeys = Object.keys(data)
  for (let i = 0; i < dataKeys.length; i++) {
    sortedData[data[dataKeys[i]][property]] = {
      ...sortedData[data[dataKeys[i]][property]],
      [dataKeys[i]]: data[dataKeys[i]]
    }
  }
  return sortedData
}
