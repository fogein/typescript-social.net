import { applyMiddleware, combineReducers, createStore } from "redux";
import { dialogsReducer } from "./reducers/dialogsReducer";
import { profileReducer } from "./reducers/profileReducer";
import { usersReducer } from "./reducers/usersReducer";
import { appReducer } from "./reducers/appReducer";
import { authReducer } from './reducers/authReducer';
import thunkMiddleware from "redux-thunk"

const reducers = combineReducers({
  profilePage:profileReducer,
  dialogsPage:dialogsReducer,
  usersPage:usersReducer,
  auth:authReducer,
  app:appReducer
});

type RootReducerType = typeof reducers
export type AppStateType = ReturnType<RootReducerType>


export const store = createStore(reducers,applyMiddleware(thunkMiddleware));
// @ts-ignore
window.store = store