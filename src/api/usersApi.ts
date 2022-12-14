import { GetUsersType, ResponseTypesDefault } from "./ApiTypes";
import { instance } from "./api";
import { profileApi } from "./profileApi";

export const usersApi = {
  async getUsers(
    currentPage: number,
    pageSize: number,
    term: string = "",
    friend: null | boolean = null
  ) {
    const res = await instance.get<GetUsersType>(
      `users?page=${currentPage}&count=${pageSize}&term=${term}`+(friend===null?'':`&friend=${friend}`)
    );
    return res.data;
  },
  async follow(userId: number) {
    const res = await instance.post<ResponseTypesDefault>(`follow/${userId}`);
    return res.data;
  },
  async unfollow(userId: number) {
    const res = await instance.delete<ResponseTypesDefault>(`follow/${userId}`);
    return res.data;
  },
  getProfile(userId: number) {
    return profileApi.getProfile(userId);
  },
};
