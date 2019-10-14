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

export const getFoodPriceByIdFood = (priceList) => {
  // const priceList = store.getState().foodList.priceList;
  const foodList = store.getState().foodList.foodList;
  let newData = {}
  Object.keys(foodList).forEach(idFood => {
    Object.keys(priceList).map(key => {
      let price = 0;
      let idPrice = ''
      if (priceList[key]["idFood"] == idFood && priceList[key]["dateEnd"] == "") {
        price = priceList[key]["price"];
        idPrice = key;
        let item = { idPrice, price };
        newData = {
          ...newData,
          [idFood]: item
        }
      }
    })
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