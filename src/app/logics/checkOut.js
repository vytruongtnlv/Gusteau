const moment = require('moment-timezone')

function getBillByTable(billList, table) {
  var value = {}
  var id = "";
  Object.keys(billList).forEach(idBill => {
    if (billList[idBill]["idTable"] == table && !billList[idBill]["dateCheckOut"]) {
      value = billList[idBill]
      id = idBill
      const price = calPrice(billList[idBill]["billInfo"])
      const dateCheckOut = moment().valueOf();
      value = {
        ...value,
        "price": price,
        "dateCheckOut": dateCheckOut,
        "discount": 0,
      }
    }
  })
  return { value, id }
}

function calPrice(billInfo) {
  var totalPrice = 0
  Object.keys(billInfo).forEach(idBillInfo => {
    var order = billInfo[idBillInfo]
    totalPrice += order["price"] * order["quantity"]
  })
  return totalPrice
}

export function checkOut(billList, table) {
  const bill = getBillByTable(billList, table)
  console.log(bill)
  return bill;
}



