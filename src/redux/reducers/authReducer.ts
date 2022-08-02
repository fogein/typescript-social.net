import { authApi } from "../../api/api";

const SET_USER_DATA = "SET_USER_DATA";
const setErrorText = "SET_ERROR";
const GET_CAPTCHA = "GET_CAPTCHA";

type InitialStateType = {
  userId: number | null;
  email: string | null;
  login: string | null;
  isFetching: boolean;
  isAuth: boolean;
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
export const authReducer = (state = initialState, action:any): InitialStateType => {
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

export const authMe = () => {
  return (dispatch:any) => {
    return authApi.me().then((data) => {
      if (data.resultCode === 0) {
        let { email, id, login } = data.data;
        dispatch(setAuthUserData(email, id, login, true));
        dispatch(setError(""));
      }
    });
  };
};

export const login = (email:string, password:string, rememberMe:boolean, captcha:string) => {
  return (dispatch:any) => {
    authApi.login(email, password, rememberMe, captcha).then((data) => {
      if (data.resultCode === 0) {
        dispatch(authMe());
      } else if (data.resultCode === 1) {
        dispatch(setError(data.messages));
      } else if (data.resultCode === 10) {
        dispatch(setError(data.messages));
        dispatch(getCaptcha());
      }
    });
  };
};
const getCaptcha = () => {
  return (dispatch:any) => {
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
