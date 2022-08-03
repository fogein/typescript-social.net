import axios from "axios";

export const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "98f4ebc9-f85c-4248-acce-b3f3feb6f682",
  },
});