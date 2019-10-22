import store from "../../../store";
import { groupBy } from "./billAnalyzer";
import { checkOut } from "./checkOut";
import { updateData } from "../actions";

export const checkAvaibleData = (data) => {
  let newData = {};
  Object.keys(data).map(key => {
    if (data[key]["is_available"]) {
      newData = {
        ...newData,
        [key]: data[key]
      }
    }
  })
  return newData;
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

export const billAnalyzer = (type) => {
  const bill = store.getState().orders.bill;
  const analyzer = groupBy(bill, type);
  return analyzer;
}

export const changeTableStatus = (id, status) => {
  const tableList = store.getState().tableDB.tableList;
  const key = "tableFood";
  var value = tableList[id];
  value = {
    ...value,
    ["tableStatus"]: status
  }
  return { key, value, id }
}

export const checkOutByTable = (idTable) => {
  const billList = store.getState().orders.bill;
  const { value, id } = checkOut(billList, idTable)
  const key = "bill";
  return { key, value, id }
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
