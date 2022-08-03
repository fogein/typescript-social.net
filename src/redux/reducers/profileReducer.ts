import { Dispatch } from "redux";
import { profileApi } from "../../api/profileApi";
import { PhotosType, PostsType, ProfileType } from "../../types/types";
import { AppStateType } from "../store";

const ADDPOST = "ADD-POST";
const UPDATENEWPOSTTEXT = "UPDATE-NEW-POST-TEXT";
const SETUSERPROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";
const SET_ERROR = "SET_ERROR";

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
    case ADDPOST:
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
    case UPDATENEWPOSTTEXT:
      return {
        ...state,
        newPostText: action.newText,
      };
    case SETUSERPROFILE: {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case SET_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }
    case SET_ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }
    case SAVE_PHOTO_SUCCESS: {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      };
    }
    default:
      return state;
  }
};

type ActionType =
    AddPostActionCreatorAT
  | UpdateNewPostTextActionCreatorAT
  | SetUserProfileAT
  | SetErrorAT
  | SetStatusAT
  | SavePhotoSuccessAT;

type AddPostActionCreatorAT = {
  type: typeof ADDPOST;
};

export const addPostActionCreator = (): AddPostActionCreatorAT => {
  return {
    type: ADDPOST,
  };
};

type UpdateNewPostTextActionCreatorAT = {
  newText: string;
  type: typeof UPDATENEWPOSTTEXT;
};

export const updateNewPostTextActionCreator = (
  newText: string
): UpdateNewPostTextActionCreatorAT => {
  return {
    type: UPDATENEWPOSTTEXT,
    newText,
  };
};

type SetUserProfileAT = {
  profile: ProfileType;
  type: typeof SETUSERPROFILE;
};

export const setUserProfile = (profile: ProfileType): SetUserProfileAT => {
  return {
    type: SETUSERPROFILE,
    profile,
  };
};

type SetStatusAT = {
  type: typeof SET_STATUS;
  status: string;
};

export const setStatus = (status: string): SetStatusAT => {
  return {
    type: SET_STATUS,
    status,
  };
};

type SavePhotoSuccessAT = {
  type: typeof SAVE_PHOTO_SUCCESS;
  photos: PhotosType;
};

export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessAT => {
  return {
    type: SAVE_PHOTO_SUCCESS,
    photos,
  };
};

type SetErrorAT = {
  type: typeof SET_ERROR;
  error: string;
};

export const setError = (error: string): SetErrorAT => {
  return {
    type: SET_ERROR,
    error,
  };
};


type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionType>

export const getProfile = (userId: number) => {
  return (dispatch:DispatchType ,getState:GetStateType) => {
    profileApi.getProfile(userId).then((data) => {
      dispatch(setUserProfile(data));
    });
  };
};
export const getStatus = (userId: number) => {
  return (dispatch:DispatchType ,getState:GetStateType) => {
    profileApi.getStatus(userId).then((data) => {
      dispatch(setStatus(data));
    });
  };
};
export const updateStatus = (status: string) => {
  return (dispatch:DispatchType ,getState:GetStateType) => {
    profileApi.updateStatus(status).then((data) => {
      if (data.resultCode === 0) {
        dispatch(setStatus(status));
      }
    });
  };
};

export const savePhoto = (file: any) => {
  return (dispatch:DispatchType ,getState:GetStateType) => {
    profileApi.savePhoto(file).then((data) => {
      if (data.resultCode === 0) {
        dispatch(savePhotoSuccess(data.data.photos));
      }
    });
  };
};

export const updateProfile = (profile: ProfileType, userId: number) => {
  return async (dispatch: any) => {
    await profileApi.saveProfile(profile).then((data) => {
      if (data.resultCode === 0) {
        dispatch(getProfile(userId));
      } else if (data.resultCode === 1) {
        dispatch(setError(data.messages[0]));
        setTimeout(() => {
          dispatch(setError(""));
        }, 2000);
      }
    });
  };
};
