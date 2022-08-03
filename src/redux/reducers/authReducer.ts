import { Dispatch } from "redux";
import { authApi } from "../../api/authApi";
import { AppStateType } from "../store";

const SET_USER_DATA = "SET_USER_DATA";
const setErrorText = "SET_ERROR";
const GET_CAPTCHA = "GET_CAPTCHA";

type InitialStateType = {
  userId: number | null;
  email: string | null;
  login: string | null;
  isFetching: boolean;
  isAuth: boolean | null;
  errorText: string;
  captchaUrl: string;
};

let initialState: InitialStateType = {
  userId: null,
  email: null,
  login: null,
  isFetching: false,
  isAuth: false,
  errorText: "",
  captchaUrl: "",
};
export const authReducer = (state = initialState, action:ActionType): InitialStateType => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.data,
      };
    case setErrorText:
      return {
        ...state,
        errorText: action.error,
      };
    case GET_CAPTCHA:
      return {
        ...state,
        captchaUrl: action.captchaUrl,
      };
    default:
      return state;
  }
};
type ActionType =
    SetErrorActionType
  | GetCaptchaActionType
  | SetAuthUserDataActionType

type DataActionType = {
  email: string | null;
  id: number | null;
  login: string | null;
  isAuth: boolean | null;
};

type SetAuthUserDataActionType = {
  type: typeof SET_USER_DATA;
  data: DataActionType;
};

export const setAuthUserData = (
  email: string | null,
  id: number | null,
  login: string | null,
  isAuth: boolean | null
): SetAuthUserDataActionType => {
  return {
    type: SET_USER_DATA,
    data: { email, id, login, isAuth },
  };
};

type SetErrorActionType = {
  type: typeof setErrorText;
  error: string;
};

const setError = (error: string): SetErrorActionType => {
  return {
    type: setErrorText,
    error,
  };
};

type GetCaptchaActionType = {
  type: typeof GET_CAPTCHA;
  captchaUrl: string;
};

const getCaptchaAC = (captchaUrl: string): GetCaptchaActionType => {
  return {
    type: GET_CAPTCHA,
    captchaUrl,
  };
};

type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionType>

export const authMe = () => {
  return async (dispatch:DispatchType ,getState:GetStateType) => {
    const data = await authApi.me();
    if (data.resultCode === 0) {
      let { email, id, login } = data.data;
      dispatch(setAuthUserData(email, id, login, true));
      dispatch(setError(""));
    }
  };
};

export const login = (email:string, password:string, rememberMe:boolean, captcha:string) => {
  return (dispatch:any) => {
    authApi.login(email, password, rememberMe, captcha).then((data) => {
      if (data.resultCode === 0) {
        dispatch(authMe());
      } else if (data.resultCode === 1) {
        dispatch(setError(data.messages[0]));
      } else if (data.resultCode === 10) {
        dispatch(setError(data.messages[0]));
        dispatch(getCaptcha());
      }
    });
  };
};
const getCaptcha = () => {
  return (dispatch:DispatchType ,getState:GetStateType) => {
    authApi.getCaptchaUrl().then((data) => {
      dispatch(getCaptchaAC(data.url));
    });
  };
};

export const logout = () => {
  return (dispatch:any) => {
    authApi.logout().then(dispatch(setAuthUserData(null, null, null, false)));
  };
};
