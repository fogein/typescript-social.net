import axios from "axios";
import { ProfileType } from "../types/types";
import {
  FollowType,
  GetCaptchaUrlType,
  GetProfileType,
  GetUsersType,
  LoginType,
  LogoutType,
  MeType,
  SaveProfileType,
  UnfollowType,
  UpdateStatusType,
} from "./ApiTypes";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "98f4ebc9-f85c-4248-acce-b3f3feb6f682",
  },
});




export const authApi = {
  async me() {
    const res = await instance.get<MeType>(`auth/me`);
    return res.data;
  },
  async login(
    email: string,
    password: string,
    rememberMe = false,
    captcha: string | null
  ) {
    const res = await instance.post<LoginType>(`auth/login`, {
      email,
      password,
      rememberMe,
      captcha,
    });
    return res.data;
  },
  logout() {
    return instance.delete<LogoutType>(`auth/login`);
  },
  async getCaptchaUrl() {
    const res = await instance.get<GetCaptchaUrlType>(
      `security/get-captcha-url`
    );
    return res.data;
  },
};




export const usersApi = {
  async getUsers(currentPage: number, pageSize: number) {
    const res = await instance.get<GetUsersType>(
      `users?page=${currentPage}&count=${pageSize}`
    );
    return res.data;
  },
  async follow(userId: number) {
    const res = await instance.post<FollowType>(`follow/${userId}`);
    return res.data;
  },
  async unfollow(userId: number) {
    const res = await instance.delete<UnfollowType>(`follow/${userId}`);
    return res.data;
  },
  getProfile(userId: number) {
    return profileApi.getProfile(userId);
  },
};



export const profileApi = {
  async getProfile(userId: number) {
    const res = await instance.get<GetProfileType>(`profile/${userId}`);
    return res.data;
  },
  async getStatus(userId: number) {
    const res = await instance.get<any>(`profile/status/${userId}`);
    return res.data;
  },
  async updateStatus(status: string) {
    const res = await instance.put<UpdateStatusType>(`profile/status`, { status });
    return res.data;
  },
  async savePhoto(file: any) {
    let formData = new FormData();
    formData.append("image", file);
    const res = await instance.put(`profile/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },
  async saveProfile(profile: ProfileType) {
    const res = await instance.put<SaveProfileType>(`profile`, profile);
    return res.data;
  },
};
