import store from "../../../store";
import { groupBy } from "./billAnalyzer";
import { checkOut } from "./checkOut";
import { updateData } from "../actions";

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

export const checkFoodAvailable = (data) => {
  let newData = {}
  if (Object.keys(data)[0])
    Object.keys(data).map(key => {
      if (data[key]["available"]) {
        let category = data[key];
        category = {
          ...category,
          "dishes": data[key]["dishes"] ? filterFood(data[key]["dishes"]) : {}
        }
        newData = {
          ...newData,
          [key]: category
          // {
          //   "available": data[key]["available"],
          //   "dish_type_name": data[key]["dish_type_name"],
          //   "dishes": data[key]["dishes"] ? filterFood(data[key]["dishes"]) : {}
          // }
        }
      }
    })
  return newData;
}

export const filterFood = (obj) => {
  let foodList = {}
  Object.keys(obj).map(key => {
    if (obj[key]["is_available"])
      foodList = {
        ...foodList,
        [key]: obj[key]
      }
  })
  return foodList;
}

export const getBillByIdTable = (idTable) => {
  const billList = store.getState().bill.bill;
  let id = "";
  Object.keys(billList).forEach(idBill => {
    if (billList[idBill]["idTable"] == idTable && !billList[idBill]["served"])
      id = idBill;
  })
  return id;
}

export const billAnalyzer = (type) => {
  const bill = store.getState().bill.bill;
  const analyzer = groupBy(bill, type);
  return analyzer;
}

export const changeTableStatus = (id, status) => {
  const tableList = store.getState().tableDB.tableList;
  const key = "table";
  var value = tableList[id];
  value = {
    ...value,
    ["tableStatus"]: status
  }
  return { key, value, id }
}

export const checkOutByTable = (idTable, discount) => {
  const billList = store.getState().bill.bill;
  if (!billList) {
    setTimeout(() => {
      checkOutByTable(idTable, discount)
    }, 3000)
  }
  else {
    const obj = checkOut(billList, idTable, discount)
    return obj
  }
}

export const setFoodPrice = (idFood, price) => {
  const key = `food/${idFood}/price`;
  const value = {
    "available": true,
    "dateEnd": "",
    "dateStart": new Date().getTime(),
    "price": price
  }

  return { key, value };

}

export function updateBill(idBill) {
  const key = `bill/${idBill}/billInfo`; // idBillinfo , idFood, Quantity, idPrice, idBill, available
  const orders = store.getState().orders.orders;
  var value = {}
  Object.keys(orders).forEach(idFood => {
    var order = orders[idFood]
    var obj = {
      "idFood": idFood,
      "foodName": order["foodName"],
      "quantity": order["quantity"],
      "price": order["price"],
      "idPrice": order["idPrice"]
    }
    value = {
      ...value,
      obj
    }
  })
  return { key, value }
}
