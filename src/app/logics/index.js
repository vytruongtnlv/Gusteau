export const checkAvaibleData = (data) => {
  let newData = {};
  Object.keys(data).map(key => {
    if (data[key]["available"] === 'True') {
      newData = {
        ...newData,
        [key]: data[key]
      }
    }
  })
  return newData;
}

export const getFoodPriceByIdFood = (data, idFood) => {
  let price = 0;
  let idPrice = '0;'
  Object.keys(data).map(key => {
    if (data[key]["idFood"] === idFood && data[key]["dateEnd"] === "") {
      price = data[key]["price"]
      idPrice = key
    }
  })
  let item = { idFood, idPrice, price };
  return item
}