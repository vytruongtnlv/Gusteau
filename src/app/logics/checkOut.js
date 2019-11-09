const moment = require('moment-timezone')

function getBillByTable(billList, table, discount) {
  var value = {}
  var id = "";
  const key = "bill"
  Object.keys(billList).forEach(idBill => {
    if (billList[idBill]["idTable"] == table && !billList[idBill]["served"]) {
      value = billList[idBill]
      id = idBill
      const price = calPrice(billList[idBill]["billInfo"])
      value = {
        ...value,
        "price": price,
        "discount": discount ? discount : 0,
      }
      return { key, value, id }
    }
  })
  return { key, value, id }
}

export function servedToCustomer(billList, table) {
  var value = {}
  var id = "";
  const key = "bill"
  Object.keys(billList).forEach(idBill => {
    if (billList[idBill]["idTable"] == table && !billList[idBill]["served"]) {
      value = billList[idBill]
      id = idBill
      value = {
        ...value,
        "served": true,
      }
      return { value, id }
    }
  })
  return { key, value, id }

}

function calPrice(billInfo) {
  var totalPrice = 0
  if (Object.keys(billInfo).length > 0)
    Object.keys(billInfo).forEach(idBillInfo => {
      var order = billInfo[idBillInfo]
      totalPrice += order["price"] * order["quantity"]
    })
  return totalPrice
}

export function checkOut(billList, table, discount) {
  const bill = getBillByTable(billList, table, discount)
  return bill;
}



