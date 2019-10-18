const data = require('./data.json');
const moment = require('moment-timezone')
const _ = require('lodash')
const table = {
  '0.8080814228090798': { available: true, tableName: 'test', tableStatus: 'Empty' }
}
function addTable(name) {
  // "TB01": {
  //   "available": true,
  //     "tableName": "Table 1",
  //       "tableStatus": "Ordered"
  // }
  const key = Math.random();
  const newTable = {
    [key]: {
      "available": true,
      "tableName": name,
      "tableStatus": "Empty"
    }
  }
  console.log(newTable)
  return newTable
}
//When table status != "Ordered" 
function editTable(table, name) {
  const key = Object.keys(table)
  let newTable = {
    [key]: {
      ...table[key],
      "tableName": name
    }
  }
  console.log(newTable);
}

editTable(table, "New")
