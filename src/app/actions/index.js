import firebase from 'firebase'
export const authInputChange = ({ field, value }) => {
    return (dispatch) => {
        dispatch({ type: 'AUTH_INPUT_CHANGE', payload: { field, value } })
    }
}
export const login = ({ email, password }) => {
    return (dispatch) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => {
                dispatch({ type: 'LOGIN_SUCCESS', payload: user })
            })
            .catch(function (error) {
                console.log('Login error: ' + error)
            });
    }
}

export const retrieveTableList = () => {

    return (dispatch) => {
        firebase.database().ref(`/tableFood`)
            .on('value', snapshot => {
                dispatch({ type: 'RETRIEVE_TABLE', payload: snapshot.val() })
            })
    }
}