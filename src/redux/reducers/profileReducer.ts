import { profileApi } from "../../api/profileApi";
import { PhotosType, PostsType, ProfileType } from "../../types/types";
import { ActionTypesFromStore, BaseThunkType } from "../store";

let initialState = {
  posts: [
    { id: 1, message: "hi its post", likesCount: 12 },
    { id: 2, message: "hi", likesCount: 32 },
    { id: 3, message: "hi it third post", likesCount: 31 },
  ] as Array<PostsType>,
  newPostText: "",
  profile: null as ProfileType | null,
  status: "",
  error: "",
};

type InitialStateType = typeof initialState;

export const profileReducer = (
  state = initialState,
  action: ActionType
): InitialStateType => {
  switch (action.type) {
    case "ADD_POST":
      let newPost = {
        id: 4,
        message: state.newPostText,
        likesCount: 0,
      };
      return {
        ...state,
        newPostText: "",
        posts: [...state.posts, newPost],
      };
    case "UPDATE_NEW_POST_TEXT":
      return {
        ...state,
        newPostText: action.newText,
      };
    case "SET_USER_PROFILE": {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case "SET_STATUS": {
      return {
        ...state,
        status: action.status,
      };
    }
    case "SET_ERROR": {
      return {
        ...state,
        error: action.error,
      };
    }
    case "SAVE_PHOTO_SUCCESS": {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      };
    }
    default:
      return state;
  }
};

type ActionType = ActionTypesFromStore<typeof actions>;

export const actions = {
  addPostActionCreator: () => {
    return {
      type: "ADD_POST",
    } as const;
  },
  updateNewPostTextActionCreator: (newText: string) => {
    return {
      type: "UPDATE_NEW_POST_TEXT",
      newText,
    } as const;
  },
  setUserProfile: (profile: ProfileType) => {
    return {
      type: "SET_USER_PROFILE",
      profile,
    } as const;
  },
  setStatus: (status: string) => {
    return {
      type: "SET_STATUS",
      status,
    } as const;
  },
  savePhotoSuccess: (photos: PhotosType) => {
    return {
      type: "SAVE_PHOTO_SUCCESS",
      photos,
    } as const;
  },
  setError: (error: string) => {
    return {
      type: "SET_ERROR",
      error,
    } as const;
  },
};

type ThunkType = BaseThunkType<ActionType>

export const getProfile = (userId: number):ThunkType => {
  return (dispatch) => {
    profileApi.getProfile(userId).then((data) => {
      dispatch(actions.setUserProfile(data));
    });
  };
};
export const getStatus = (userId: number):ThunkType => {
  return (dispatch) => {
    profileApi.getStatus(userId).then((data) => {
      dispatch(actions.setStatus(data));
    });
  };
};
export const updateStatus = (status: string):ThunkType => {
  return (dispatch) => {
    profileApi.updateStatus(status).then((data) => {
      if (data.resultCode === 0) {
        dispatch(actions.setStatus(status));
      }
    });
  };
};

export const savePhoto = (file: any):ThunkType => {
  return (dispatch) => {
    profileApi.savePhoto(file).then((data) => {
      if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos));
      }
    });
  };
};

export const updateProfile = (profile: ProfileType, userId: number):ThunkType => {
  return async (dispatch) => {
    await profileApi.saveProfile(profile).then((data) => {
      if (data.resultCode === 0) {
        dispatch(getProfile(userId));
      } else if (data.resultCode === 1) {
        dispatch(actions.setError(data.messages[0]));
        setTimeout(() => {
          dispatch(actions.setError(""));
        }, 2000);
      }
    });
  };
};
