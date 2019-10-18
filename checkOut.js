const data = require('./data.json');
const moment = require('moment-timezone')
const _ = require('lodash')

// const idBill = "LqWGuFbp6t5kNJLO5Wc";
const billList = data["bill"];

function getBillByTable(table) {
  var bill = {}
  Object.keys(billList).forEach(idBill => {
    if (billList[idBill]["idTable"] == table && !billList[idBill]["dateCheckOut"]) {
      bill = billList[idBill];
      const price = calPrice(billList[idBill]["billInfo"])
      const dateCheckOut = moment().valueOf()
      bill = {
        ...bill,
        "price": price,
        "dateCheckOut": dateCheckOut,
        "discount": 0,
      }
    }
  })
  return bill
}

function calPrice(billInfo) {
  var totalPrice = 0
  Object.keys(billInfo).forEach(idBillInfo => {
    var order = billInfo[idBillInfo]
    totalPrice += order["price"] * order["quantity"]
  })
  return totalPrice
}

function checkOut(table) {
  const bill = getBillByTable(table)
  console.log(bill)
}

const idTable = "TB01";
checkOut(idTable)
