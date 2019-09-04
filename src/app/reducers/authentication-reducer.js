
const initialState = {
    email:'',
    password: '',
    user: {},
    error: ''
}

export default(state = initialState , action)=> {
    switch(action.type) {
        case 'LOGIN_SUCCESS':
            console.log('Connect!')
            return {...state, user: action.payload}
        default:
            return state
    }

}