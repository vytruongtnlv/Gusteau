const initialState = {
  idFood: '',
  idPrice: '',
  quantity: 1,
  orders: {} //idFood, quantity, idPrice, idBill, orderStatus
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
    case 'RETRIEVE_ORDER_LIST':
      return { ...state, foodList: action.payload };
    default:
      return state
  }

}