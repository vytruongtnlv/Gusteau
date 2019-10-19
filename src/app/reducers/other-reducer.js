const initialState = {
  idItem: ""
}


export default (state = initialState, action) => {
  switch (action.type) {
    case 'CURRENT_KEY':
      return { ...state, idItem: action.payload.idItem }
    default:
      return state
  }

}