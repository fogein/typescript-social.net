import {
  GetCaptchaUrlType,
  LoginDataType,
  MeDataType,
  ResponseTypesDefault,
} from "./ApiTypes";
import { instance } from "./api";

export const authApi = {
  async me() {
    const res = await instance.get<ResponseTypesDefault<MeDataType>>(`auth/me`);
    return res.data;
  },
  async login(
    email: string,
    password: string,
    rememberMe = false,
    captcha: string | null
  ) {
    const res = await instance.post<ResponseTypesDefault<LoginDataType>>(
      `auth/login`,
      {
        email,
        password,
        rememberMe,
        captcha,
      }
    );
    return res.data;
  },
  logout() {
    return instance.delete<ResponseTypesDefault>(`auth/login`);
  },
  async getCaptchaUrl() {
    const res = await instance.get<GetCaptchaUrlType>(
      `security/get-captcha-url`
    );
    return res.data;
  },
};
