import { profileApi } from './../../api/api';


const ADDPOST = "ADD-POST";
const UPDATENEWPOSTTEXT = 'UPDATE-NEW-POST-TEXT';
const SETUSERPROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';
const SET_ERROR = 'SET_ERROR';

let initialState = {
  posts: [
    { id: 1, message: "hi its post", likesCount: 12 },
    { id: 2, message: "hi", likesCount: 32 },
    { id: 3, message: "hi it third post", likesCount: 31 },
  ],
  newPostText: '',
  profile: null,
  status: '',
  error:''
}
export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDPOST:
      let newPost = {
        id: 4,
        message: state.newPostText,
        likesCount: 0
      };
      return {
        ...state,
        newPostText: '',
        posts: [...state.posts, newPost]
      }
    case UPDATENEWPOSTTEXT:
      return {
        ...state,
        newPostText: action.newText
      }
    case SETUSERPROFILE: {
      return {
        ...state,
        profile: action.profile
      }
    }
    case SET_STATUS: {
      return {
        ...state,
        status: action.status
      }
    }
    case SET_ERROR: {
      return {
        ...state,
        error: action.error
      }
    }
    case SAVE_PHOTO_SUCCESS: {
      return {
        ...state, profile: { ...state.profile, photos: action.photos }
      }
    }
    default:
      return state
  }
}

export const addPostActionCreator = () => {
  return {
    type: ADDPOST,
  };
};
export const updateNewPostTextActionCreator = (newText) => {
  return {
    type: UPDATENEWPOSTTEXT,
    newText,
  };
}
export const setUserProfile = (profile) => {
  return {
    type: SETUSERPROFILE,
    profile,
  };
};
export const setStatus = (status) => {
  return {
    type: SET_STATUS,
    status,
  };
};
export const savePhotoSuccess = (photos) => {
  return {
    type: SAVE_PHOTO_SUCCESS,
    photos,
  };
};
export const setError = (error) => {
  return {
    type: SET_ERROR,
    error,
  };
};


export const getProfile = (userId) => {
  return (dispatch) => {
    profileApi.getProfile(userId)
      .then(data => {
        dispatch(setUserProfile(data))
      })
  }
}
export const getStatus = (userId) => {
  return (dispatch) => {
    profileApi.getStatus(userId)
      .then(data => {
        dispatch(setStatus(data))
      })
  }
}
export const updateStatus = (status) => {
  return (dispatch) => {
    profileApi.updateStatus(status)
      .then(data => {
        if (data.resultCode === 0) {
          dispatch(setStatus(status))
        }
      })
  }
}

export const savePhoto = (file) => {
  return (dispatch) => {
    profileApi.savePhoto(file)
    .then(data => {
      if (data.resultCode === 0) {
        dispatch(savePhotoSuccess(data.data.photos))
      }
    })
  }
}

export const updateProfile = (profile) => {
  return async(dispatch) => {
    await profileApi.saveProfile(profile)
      .then(data => {
        if (data.resultCode === 1) {
           dispatch(setError(data.messages))
           setTimeout(() => {
            dispatch(setError(''))
           }, 2000);
         }
      })
  }
}
