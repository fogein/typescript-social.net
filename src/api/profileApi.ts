import { ProfileType } from "../types/types";
import {
  ResponseTypesDefault,
  SavePhotoDataType
  
} from "./ApiTypes";
import { instance } from "./api";





export const profileApi = {
  async getProfile(userId: number) {
    const res = await instance.get<ProfileType>(`profile/${userId}`);
    return res.data;
  },
  async getStatus(userId: number) {
    const res = await instance.get<string>(`profile/status/${userId}`);
    return res.data;
  },
  async updateStatus(status: string) {
    const res = await instance.put<ResponseTypesDefault>(`profile/status`, { status });
    return res.data;
  },
  async savePhoto(file: any) {
    let formData = new FormData();
    formData.append("image", file);
    const res = await instance.put<ResponseTypesDefault<SavePhotoDataType>>(`profile/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },
  async saveProfile(profile: ProfileType) {
    const res = await instance.put<ResponseTypesDefault>(`profile`, profile);
    return res.data;
  },
};
