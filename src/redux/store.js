import { applyMiddleware, combineReducers, createStore } from "redux";
import { authReducer } from "./reducers/authReducer";
import { dialogsReducer } from "./reducers/dialogsReducer";
import { profileReducer } from "./reducers/profileReducer";
import { usersReducer } from "./reducers/usersReducer";
import thunkMiddleware from "redux-thunk"
import { appReducer } from "./reducers/appReducer";


let reducers = combineReducers({
  profilePage:profileReducer,
  dialogsPage:dialogsReducer,
  usersPage:usersReducer,
  auth:authReducer,
  app:appReducer
});
export const store = createStore(reducers,applyMiddleware(thunkMiddleware));
window.store = store