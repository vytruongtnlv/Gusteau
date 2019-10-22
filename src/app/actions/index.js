import firebase from 'firebase'
import { checkAvaibleData } from '../logics'
import store from '../../../store'

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

export const currentTable = (idTable) => {
    return (dispatch) => {
        dispatch({ type: "CURRENT_TABLE", payload: idTable })
    }
}

export const retrieveCategory = () => {
    return (dispatch) => {
        firebase.database().ref(`category`)
            .on('value', snapshot => {
                let data = checkAvaibleData(snapshot.val())
                dispatch({ type: 'RETRIEVE_CATE_LIST', payload: data })
            })
    }
}

export const retrieveBillList = () => {
    return (dispatch) => {
        firebase.database().ref(`bill`)
            .on('value', snapshot => {
                let data = snapshot.val();
                dispatch({ type: 'RETRIEVE_BILL_LIST', payload: data })
            })
    }
}

export const updateData = ({ key, value, id }) => {
    //key stand for property, value is an object
    var idItem = id ? id : firebase.database().ref().child(key).push().key;
    store.dispatch({ type: 'CURRENT_KEY', payload: { idItem } })
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

export const currentFood = (item) => {
    return (dispatch) => {
        dispatch({ type: 'CURRENT_FOOD', payload: item })
    }
}

export const currentCategory = ({ id }) => {
    return (dispatch) => {
        dispatch({ type: 'CURRENT_CATEGORY', payload: { id } })
    }
}

export const createOrder = (orders) => {
    return (dispatch) => {
        dispatch({ type: 'ORDERS', payload: orders })
    }
}
export const deleteOrder = () => {
    return (dispatch) => {
        dispatch({ type: 'DELETE_ORDER' })
    }
}
