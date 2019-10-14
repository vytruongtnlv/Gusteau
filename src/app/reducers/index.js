import { combineReducers } from "redux";
import authenticationReducer from "./authentication-reducer";
import tablefoodReducer from "./tablefood-reducer";
import foodReducer from "./food-reducer";
import orderReducer from "./order-reducer";
export default combineReducers({
    auth: authenticationReducer,
    tableDB: tablefoodReducer,
    foodList: foodReducer,
    orders: orderReducer,
})
