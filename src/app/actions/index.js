import firebase from 'firebase'
import { checkAvaibleData } from '../logics'

export const authInputChange = ({ field, value }) => {
    return (dispatch) => {
        dispatch({ type: 'AUTH_INPUT_CHANGE', payload: { field, value } })
    }
}

export const foodInputChange = ({ field, value }) => {
    return (dispatch) => {
        dispatch({ type: 'FOOD_INPUT_CHANGE', payload: { field, value } })
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
                let data = checkAvaibleData(snapshot.val())
                dispatch({ type: 'RETRIEVE_TABLE', payload: data })
            })
    }
}

export const retrieveFoodList = () => {
    return (dispatch) => {
        firebase.database().ref(`food`)
            .on('value', snapshot => {
                let data = checkAvaibleData(snapshot.val())
                dispatch({ type: 'RETRIEVE_FOOD_LIST', payload: data })
            })
    }
}

export const retrievePriceList = () => {
    return (dispatch) => {
        firebase.database().ref(`price`)
            .on('value', snapshot => {
                let data = checkAvaibleData(snapshot.val())
                dispatch({ type: 'RETRIEVE_PRICE_LIST', payload: data })
            })
    }
}

export const updateData = ({ key, value }) => {
    //key stand for property, value is an object
    var idItem = firebase.database().ref().child(key).push().key;
    var updates = {}
    updates[`/${key}/${idItem}`] = value
    return () => {
        firebase.database().ref().update(updates)
    }
}

export const orderInputChange = ({ field, value }) => {
    return (dispatch) => {
        dispatch({ type: 'ORDER_INPUT_CHANGE', payload: { field, value } })
    }
}

export const createOrder = (orders) => {
    return (dispatch) => {
        dispatch({ type: 'ORDERS', payload: orders })
        //Create new key of bill
        //Insert field: dateCheckIn, idTable
        //Insert a record to billInfo
    }
} 
