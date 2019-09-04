import { combineReducers } from "redux";
import authenticationReducer from "./authentication-reducer";

export default combineReducers({
    auth: authenticationReducer
})