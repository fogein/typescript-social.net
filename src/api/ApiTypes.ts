import { PhotosType, UsersType } from "../types/types";

export enum ResultCodesEnum {
  Success = 1,
  Error = 0,
  CaptchaIsRequired = 10,
}
export type ResponseTypesDefault<D = {}, RC = ResultCodesEnum> = {
  data: D;
  messages: Array<string>;
  resultCode: RC;
};

export type MeDataType = {
  id: number;
  email: string;
  login: string;
};

export type LoginDataType = {
  userId: number;
};

export type GetCaptchaUrlType = {
  url: string;
};

export type GetUsersType = {
  items: Array<UsersType>;
  totalCount: number;
  error: string;
};
export type SavePhotoDataType = {
  photos: PhotosType;
};
