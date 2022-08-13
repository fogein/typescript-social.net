import { authApi } from "../../api/authApi";
import { ActionTypesFromStore, BaseThunkType } from "../store";

type InitialStateType = {
  userId: number | null;
  email: string | null;
  login: string | null;
  isFetching: boolean;
  isAuth: boolean;
  errorText: string;
  captchaUrl: string;
  id:number | null
};

let initialState: InitialStateType = {
  userId: null,
  id:null,
  email: null,
  login: null,
  isFetching: false,
  isAuth: false,
  errorText: "",
  captchaUrl: "",
  
};
export const authReducer = (state = initialState, action:ActionType): InitialStateType => {
  switch (action.type) {
    case "SET_USER_DATA":
      return {
        ...state,
        ...action.data,
      };
    case "SET_ERROR_TEXT":
      return {
        ...state,
        errorText: action.error,
      };
    case "GET_CAPTCHA":
      return {
        ...state,
        captchaUrl: action.captchaUrl,
      };
    default:
      return state;
  }
};

type ActionType = ActionTypesFromStore<typeof actions>;


export const actions ={
  setAuthUserData : (
    email: string | null,
    id: number | null,
    login: string | null,
    isAuth: boolean 
  ) => {
    return {
      type: "SET_USER_DATA",
      data: { email, id, login, isAuth },
    }as const
  },
  setError : (error: string) => {
    return {
      type: "SET_ERROR_TEXT",
      error,
    }as const
  },
  getCaptchaAC : (captchaUrl: string) => {
    return {
      type: "GET_CAPTCHA",
      captchaUrl,
    }as const
  },
}

type ThunkType = BaseThunkType<ActionType>

export const authMe = ():ThunkType => {
  return async (dispatch) => {
    const data = await authApi.me();
    if (data.resultCode === 0) {
      let { email, id, login } = data.data;
      dispatch(actions.setAuthUserData(email, id, login, true));
      dispatch(actions.setError(""));
    }
  };
};

export const login = (email:string, password:string, rememberMe:boolean, captcha:string):ThunkType => {
  return (dispatch) => {
    authApi.login(email, password, rememberMe, captcha).then((data) => {
      if (data.resultCode === 0) {
        dispatch(authMe());
      } else if (data.resultCode === 1) {
        dispatch(actions.setError(data.messages[0]));
      } else if (data.resultCode === 10) {
        dispatch(actions.setError(data.messages[0]));
        dispatch(getCaptcha());
      }
    });
  };
};
const getCaptcha = ():ThunkType => {
  return (dispatch) => {
    authApi.getCaptchaUrl().then((data) => {
      dispatch(actions.getCaptchaAC(data.url));
    });
  };
};

export const logout = ():ThunkType => {
  return (dispatch:any) => {
    authApi.logout().then(dispatch(actions.setAuthUserData(null, null, null, false)));
  };
};
