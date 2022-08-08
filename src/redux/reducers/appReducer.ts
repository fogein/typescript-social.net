import { ActionTypesFromStore, BaseThunkType } from '../store';
import { authMe } from './authReducer';


let initialState = {
  initialized: false,
};
type InitialStateType = typeof initialState

export const appReducer = (state = initialState, action:ActionType): InitialStateType => {
  switch (action.type) {
    case "INITIALIZE_SUCCESS":
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};

type ActionType = ActionTypesFromStore<typeof actions>;

const actions = {
  setAuthUserData : () => {
    return {
      type: "INITIALIZE_SUCCESS",
    }as const;
  },
}

type ThunkType = BaseThunkType<ActionType>

export const initializeApp = ():ThunkType => {
  return (dispatch:any) => {
    let promise = dispatch(authMe());
    promise.then(() => {
      dispatch(actions.setAuthUserData());
    });
  };
};
