import axios from "axios"


const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '98f4ebc9-f85c-4248-acce-b3f3feb6f682'
  }
})
export const authApi = {
  me() {
    return instance
      .get(`auth/me`)
      .then(res => res.data)
  },
  login(email, password, rememberMe = false, captcha) {
    return instance
      .post(`auth/login`, { email, password, rememberMe, captcha })
      .then(res => res.data)
  },
  logout() {
    return instance
      .delete(`auth/login`)
  },
  getCaptchaUrl() {
    return instance
      .get(`security/get-captcha-url`)
      .then(res => res.data)
  },
}

export const usersApi = {
  getUsers(currentPage, pageSize) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then(res => res.data)
  },
  follow(userId) {
    return instance
      .post(`follow/${userId}`)
      .then(res => res.data)
  },
  unfollow(userId) {
    return instance
      .delete(`follow/${userId}`)
      .then(res => res.data)
  },
  getProfile(userId) {
    return profileApi.getProfile(userId)
  },
}
export const profileApi = {
  getProfile(userId) {
    return instance
      .get(`profile/${userId}`)
      .then(res => res.data)
  },
  getStatus(userId) {
    return instance
      .get(`profile/status/${userId}`)
      .then(res => res.data)
  },
  updateStatus(status) {
    return instance
      .put(`profile/status`, { status })
      .then(res => res.data)
  },
  savePhoto(file) {
    let formData = new FormData()
    formData.append("image", file)
    return instance
      .put(`profile/photo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => res.data)
  },
  saveProfile(profile) {
    return instance
      .put(`profile`, profile)
      .then(res => res.data)
  },

}
