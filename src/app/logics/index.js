import store from "../../../store";

export const checkAvaibleData = (data) => {
  let newData = {};
  Object.keys(data).map(key => {
    if (data[key]["available"]) {
      newData = {
        ...newData,
        [key]: data[key]
      }
    }
  })
  return newData;
}

export const getFoodPriceByIdFood = (foodList) => {
  // const priceList = store.getState().foodList.priceList;
  let newData = {};
  Object.keys(foodList).forEach(idFood => {
    let newFood = foodList[idFood]
    let priceList = foodList[idFood]["price"];
    Object.keys(priceList).map(key => {
      if (priceList[key]["dateEnd"] == "") {
        newFood = {
          ...newFood,
          "price": {
            [key]: priceList[key]
          }
        }
      }
    })
    newData = {
      ...newData,
      [idFood]: newFood
    }
  })
  // store.dispatch({ type: 'RETRIEVE_FOOD_LIST', payload: newData })
  return newData
}

export const getBillByIdTable = (idTable) => {
  const billList = store.getState().orders.bill;
  let id = "";
  Object.keys(billList).forEach(idBill => {
    if (billList[idBill]["idTable"] == idTable && !billList[idBill]["dateCheckOut"])
      id = idBill;
  })
  return id;
}