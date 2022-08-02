import { authMe } from './authReducer';

const INITIALIZE_SUCCESS = "INITIALIZE_SUCCESS";

type InitialStateType = {
  initialized: boolean;
};

let initialState: InitialStateType = {
  initialized: false,
};

export const appReducer = (state = initialState, action:any): InitialStateType => {
  switch (action.type) {
    case INITIALIZE_SUCCESS:
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};
type SetAuthUserDataActionType = {
  type: typeof INITIALIZE_SUCCESS;
};

export const setAuthUserData = (): SetAuthUserDataActionType => {
  return {
    type: INITIALIZE_SUCCESS,
  };
};

export const initializeApp = () => {
  return (dispatch:any) => {
    let promise = dispatch(authMe());
    promise.then(() => {
      dispatch(setAuthUserData());
    });
  };
};
