const data = require('./data.json');
const moment = require('moment-timezone')
const _ = require('lodash')

let dateArr = [];
const bill = data["bill"]
Object.keys(bill).forEach(idBill => {
  if (bill[idBill]["price"]) {
    dateArr.push(bill[idBill])
  }
})

function calTotalPrice(arr) {
  let totalPrice = 0;
  arr.forEach(item => {
    totalPrice += item["price"];

  })
  return totalPrice;
}

function groupBy(type) {

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
    return a["dateCheckOut"] - b["dateCheckOut"]
  })
}

groupBy('week')