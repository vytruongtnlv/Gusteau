
const initialState = {
  tableList: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'RETRIEVE_TABLE':
      return {
        ...state, tableList: action.payload
      }
    default:
      return state
  }

}