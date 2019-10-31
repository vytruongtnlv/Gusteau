const initialState = {
  bill: {}
}


export default (state = initialState, action) => {
  switch (action.type) {
    case 'RETRIEVE_BILL_LIST':
      return {
        bill: action.payload
      };
    default:
      return state
  }

}