import { combineReducers } from "redux";
import authenticationReducer from "./authentication-reducer";
import tablefoodReducer from "./tablefood-reducer";
import orderReducer from "./order-reducer";
import otherReducer from "./other-reducer";
import categoryReducer from "./category-reducer";
import billReducer from "./bill-reducer";
import memberReducer from "./member-reducer";
export default combineReducers({
    auth: authenticationReducer,
    tableDB: tablefoodReducer,
    orders: orderReducer,
    category: categoryReducer,
    bill: billReducer,
    other: otherReducer,
    members: memberReducer
})
