const initialState = {
  idItem: "",
  paid: false,
  text: "",
}


export default (state = initialState, action) => {
  switch (action.type) {
    case 'CURRENT_KEY':
      return { ...state, idItem: action.payload.idItem }
    case 'OTHER_INPUT':
      return { ...state, [action.payload.field]: action.payload.value };
    default:
      return state
  }

}