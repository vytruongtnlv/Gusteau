import firebase from 'firebase'
import { checkAvaibleData, getFoodPriceByIdFood, checkFoodAvailable } from '../logics'
import store from '../../../store'
export const otherInput = ({ field, value }) => {
    return (dispatch) => {
        dispatch({ type: 'OTHER_INPUT', payload: { field, value } })
    }
}

export const getCurrentMember = (member) => {
    return (dispatch) => {
        dispatch({ type: 'GET_MEMBER', payload: member })
    }
}

export const retrieveMembers = () => {
    return (dispatch) => {
        firebase.database().ref(`members`)
            .on('value', snapshot => {
                const data = snapshot.val();
                dispatch({ type: 'RETRIEVE_MEMBERS', payload: data })
            })
    }
}
export const retrievePermissions = () => {
    return (dispatch) => {
        firebase.database().ref(`permissions`)
            .on('value', snapshot => {
                const data = checkAvaibleData(snapshot.val())
                dispatch({ type: 'RETRIEVE_PERMISSION', payload: data })
            })
    }
}

export const authInputChange = ({ field, value }) => {
    return (dispatch) => {
        dispatch({ type: 'AUTH_INPUT_CHANGE', payload: { field, value } })
    }
}

export const createUser = (email, password, name, permission) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function (firebaseUser) {
                const user = firebaseUser.user
                const type = permission == "order" ? "Nhân viên ghi món" : "Quản trị viên"
                firebase.database().ref("permissions")
                    .child(user.uid).set({
                        available: true,
                        email: email,
                        name: name,
                        type: type,
                        permission: permission
                    });
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
            });

    }
}

export const resetPassword = (email) => {
    return () => {
        var auth = firebase.auth();
        auth.sendPasswordResetEmail(email).then(function () {
            // Email sent.
        }).catch(function (error) {
            // An error happened.
        });
    }
}

export const updatePassword = (password) => {
    return () => {
        var user = firebase.auth().currentUser;
        // var newPassword = getASecureRandomPassword();

        user.updatePassword(password).then(function () {
            alert("Đổi mật khẩu thành công")
        }).catch(function (error) {
            // An error happened.
        });
    }
}

export const logout = () => {
    return (dispatch) => {
        firebase.auth().signOut().then(function () {
            dispatch({ type: 'LOGIN_SUCCESS', payload: {} })
        }).catch(function (error) {
            // An error happened.
        });
    }

}
export const login = ({ email, password }) => {
    return (dispatch) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => {
                dispatch({ type: 'LOGIN_SUCCESS', payload: user })
            })
            .catch(function (error) {
                alert("Mật khẩu hoặc tài khoản đăng nhập không đúng!")
                console.log('Login error: ' + error)
            });
    }
}

export const retrieveTableList = () => {
    return (dispatch) => {
        firebase.database().ref(`/table`)
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
                let data = checkFoodAvailable(snapshot.val())
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

export const currentFood = ({ id }) => {
    return (dispatch) => {
        dispatch({ type: 'CURRENT_FOOD', payload: { id } })
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

export const currenOrder = (orders) => {
    return (dispatch) => {
        dispatch({ type: 'CURRENT_ORDER', payload: orders })
    }
}
export const deleteOrder = () => {
    return (dispatch) => {
        dispatch({ type: 'DELETE_ORDER' })
    }
}
