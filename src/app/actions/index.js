import firebase from 'firebase'

export const login = ({ email, password }) => {
    return (dispatch) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => {
            dispatch({type: 'LOGIN_SUCCESS', payload: user})
        })
        .catch(function (error) {
            console.log('Login error: '+error)
        });
    }
}