
const initialState = {
    email: '',
    password: '',
    user: {},
    error: '',
    permission: '',
    permissionList: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'AUTH_INPUT_CHANGE':
            return { ...state, [action.payload.field]: action.payload.value };
        case 'LOGIN_SUCCESS':
            console.log('Connect!')
            return { ...state, user: action.payload };
        case 'RETRIEVE_PERMISSION':
            return { ...state, permissionList: action.payload };
        default:
            return state
    }

}