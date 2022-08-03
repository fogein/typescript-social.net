import { PhotosType, UsersType } from "../types/types";

export enum ResultCodesEnum {
  Success = 1,
  Error = 0,
  CaptchaIsRequired = 10,
}

export type MeType = {
  data: {
    id: number;
    email: string;
    login: string;
  };
  resultCode: ResultCodesEnum;
  messages: Array<string>;
};

export type LoginType = {
  data: {
    userId: number;
  };
  resultCode: ResultCodesEnum;
  messages: Array<string>;
};
export type LogoutType = {
  data: {};
  resultCode: ResultCodesEnum;
  messages: Array<string>;
};
export type GetCaptchaUrlType = {
  url: string;
};
export type GetUsersType = {
  items: Array<UsersType>;
  totalCount: number;
  error: string;
};
export type FollowType = {
  data: {};
  resultCode: ResultCodesEnum;
  messages: Array<string>;
};
export type UnfollowType = {
  data: {};
  resultCode: ResultCodesEnum;
  messages: Array<string>;
};
export type GetProfileType = {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  aboutMe: string;
  contacts: {
    github: string;
    vk: string;
    facebook: string;
    instagram: string;
    twitter: string;
    website: string;
    youtube: string;
    mainLink: string;
  };
  photos: PhotosType;
};
export type UpdateStatusType = {
  data: {};
  resultCode: ResultCodesEnum;
  messages: Array<string>;
}
export type SavePhotoType = {
  data: PhotosType;
  resultCode: ResultCodesEnum;
  messages: Array<string>;
}
export type SaveProfileType = {
  data: {};
  resultCode: ResultCodesEnum;
  messages: Array<string>;
}
