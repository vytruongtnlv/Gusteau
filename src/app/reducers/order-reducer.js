const initialState = {
  idFood: '',
  idPrice: '',
  quantity: 1,
  orders: {}, //idFood, quantity, idPrice, idBill, orderStatus
  bill: {}
}


export default (state = initialState, action) => {
  switch (action.type) {
    case 'ORDER_INPUT_CHANGE':
      return { ...state, [action.payload.field]: action.payload.value };
    case 'ORDERS': {
      let key = Object.keys(action.payload)
      let obj = action.payload
      return {
        ...state,
        orders: {
          ...state.orders,
          [key]: obj[key]
        }
      }
    }
    case 'RETRIEVE_BILL_LIST':
      return {
        ...state,
        bill: action.payload
      };
    case 'DELETE_ORDER':
      return {
        ...state,
        orders: {}
      }
    default:
      return state
  }

}