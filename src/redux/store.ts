import { Action, applyMiddleware, combineReducers, createStore } from "redux";
import { dialogsReducer } from "./reducers/dialogsReducer";
import { profileReducer } from "./reducers/profileReducer";
import { usersReducer } from "./reducers/usersReducer";
import { appReducer } from "./reducers/appReducer";
import { authReducer } from "./reducers/authReducer";
import thunkMiddleware, { ThunkAction } from "redux-thunk";

const reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
});

type RootReducerType = typeof reducers;
export type AppStateType = ReturnType<RootReducerType>;

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type ActionTypesFromStore<
  T extends { [key: string]: (...args: any[]) => any }
> = ReturnType<PropertiesTypes<T>>;

export type BaseThunkType<A extends Action, R = void> = ThunkAction<
  R,
  AppStateType,
  unknown,
  A
>;

export const store = createStore(reducers, applyMiddleware(thunkMiddleware));
// @ts-ignore
window.store = store;
