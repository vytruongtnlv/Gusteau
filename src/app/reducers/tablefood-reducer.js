
const initialState = {
  idTable: "",
  tableList: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'RETRIEVE_TABLE':
      return {
        ...state, tableList: action.payload
      }
    case 'CURRENT_TABLE':
      return {
        ...state, idTable: action.payload
      }
    default:
      return state
  }

}