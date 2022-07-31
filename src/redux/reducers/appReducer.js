import { authMe } from "./authReducer";


const INITIALIZE_SUCCESS = 'INITIALIZE_SUCCESS';



let initialState = {
  initialized: false


}
export const appReducer = (state = initialState, action) => {
  switch (action.type) {

    case INITIALIZE_SUCCESS:
      return {
        ...state,
        initialized: true
      }
    default:
      return state
  }
}

export const setAuthUserData = () => {
  return {
    type: INITIALIZE_SUCCESS,

  };
};

export const initializeApp = () => {
  return (dispatch) => {
    let promise = dispatch(authMe())
    promise.then(() => {
    dispatch(setAuthUserData())
    })


  }
}
