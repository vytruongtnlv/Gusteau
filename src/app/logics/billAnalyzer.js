const moment = require('moment-timezone')
const _ = require('lodash')

function calTotalPrice(arr) {
  let totalPrice = 0;
  arr.forEach(item => {
    totalPrice += item["price"];

  })
  return totalPrice;
}

export function groupBy(bill, type) {
  let dateArr = [];
  Object.keys(bill).forEach(idBill => {
    if (bill[idBill]["price"]) {
      dateArr.push(bill[idBill])
    }
  })

  var groups = _.groupBy(dateArr, function (date) {
    return moment(date["dateCheckOut"]).startOf(type).valueOf();
  });
  var sortable = [];
  for (var index in groups) {
    const value = calTotalPrice(groups[index]);
    sortable.push(
      {
        "startDate": parseInt(index),
        "byday": groups[index],
        "price": value
      }
    )
  }
  sortable.sort(function (a, b) {
    return a["startDate"] - b["startDate"]
  })
  console.log(sortable)
  return sortable;
}
