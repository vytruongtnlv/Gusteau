import { combineReducers } from "redux";
import authenticationReducer from "./authentication-reducer";
import tablefoodReducer from "./tablefood-reducer";
export default combineReducers({
    auth: authenticationReducer,
    tableDB: tablefoodReducer
})