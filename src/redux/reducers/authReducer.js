import { authApi } from './../../api/api';

const SET_USER_DATA = 'SET_USER_DATA';
const setErrorText = 'SET_ERROR';
const GET_CAPTCHA = 'GET_CAPTCHA';


let initialState = {
  userId: null,
  email: null,
  login: null,
  isFetching: false,
  isAuth: false,
  errorText:'',
  captchaUrl:''

}
export const authReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_USER_DATA:
      return {
        ...state,
        ...action.data
      }
      case setErrorText:
        return {
          ...state,
          errorText:action.error
        }
      case GET_CAPTCHA:
        return {
          ...state,
          captchaUrl:action.captchaUrl
        }
    default:
      return state
  }
}

export const setAuthUserData = (email, id, login,isAuth) => {
  return {
    type: SET_USER_DATA,
    data: { email, id, login, isAuth }
  };
};
const setError = (error) => {
  return {
    type: setErrorText,
    error
  };
};
const getCaptchaAC = (captchaUrl) => {
  return {
    type: GET_CAPTCHA,
    captchaUrl
  };
};

export const authMe = () => {
  return (dispatch) => {
   return authApi.me()
      .then(data => {
        if (data.resultCode === 0) {
          let { email, id, login } = data.data
          dispatch(setAuthUserData(email, id, login,true))
          dispatch(setError(''))
        }
      })
  }
}

export const login = (email,password,rememberMe,captcha) => {
  return (dispatch) => {
    authApi.login(email,password,rememberMe,captcha)
      .then(data => {
        if (data.resultCode === 0) {   
          dispatch(authMe())
          
        } else if (data.resultCode === 1 ) {
          dispatch(setError(data.messages))
        }
        else if (data.resultCode === 10 ) {
          dispatch(setError(data.messages))
          dispatch(getCaptcha())
        }
      })
  }
}
const getCaptcha = () => {
  return (dispatch) => {
    authApi.getCaptchaUrl()
      .then(data => {
          dispatch(getCaptchaAC(data.url))        
      })
  }
}

export const logout = () => {
  return (dispatch) => {
    authApi.logout()
      .then(
          dispatch(setAuthUserData(null, null,null,false))
      )
  }
}