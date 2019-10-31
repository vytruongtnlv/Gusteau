const initialState = {
  currentFood: '',
  name: '',
  price: '',
  quantity: 1,
  note: '',
  orders: {}, //idFood, quantity, idPrice, idBill, orderStatus
}


export default (state = initialState, action) => {
  switch (action.type) {
    case 'ORDER_INPUT_CHANGE':
      return { ...state, [action.payload.field]: action.payload.value };
    case 'CURRENT_FOOD':
      return { ...state, currentFood: action.payload.id }
    case 'ORDERS': {
      let key = Object.keys(action.payload)
      let obj = action.payload
      const newState = {
        ...state,
        orders: {
          ...state.orders,
          [key]: obj[key]
        }
      }
      return newState;
    }
    case 'DELETE_ORDER':
      return {
        ...state,
        quantity: 1,
        orders: {}
      }
    default:
      return state
  }

}