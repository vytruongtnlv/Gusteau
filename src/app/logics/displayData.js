
export const displayTableArea = (tableList) => {
  let area = [];

  Object.keys(tableList).forEach(key => {
    const tableArea = tableList[key]["area"]
    if (area.indexOf(tableArea) == -1) {
      area.push(tableArea)
    }
  })
  return area
}