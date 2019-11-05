
const initialState = {
  member: {},
  members: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_MEMBER':
      console.log('Connect!')
      return { ...state, member: action.payload };
    case 'RETRIEVE_MEMBERS':
      return { ...state, members: action.payload };
    default:
      return state
  }

}