
const initialState = {
  tableList: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'RETRIEVE_TABLE':
      return {
        ...state, tableList: action.payload
      }
    // case 'LOGIN_SUCCESS':
    //     console.log('Connect! ', action.payload)
    //     return { ...state, user: action.payload };
    default:
      return state
  }

}