import axios from "axios";
import { notifications } from "@mantine/notifications";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API + "/profile",
});

instance.interceptors.response.use(null, ({ response, ...other }) => {
  if (response.status !== 401) {
    const errMessage = response.data?.message || "Something going wrong...";
    notifications.show({
      color: "red",
      message: errMessage,
    });
    return Promise.reject({ response, ...other });
  }
});

export const login = (params: { login: string; password: string }) => {
  return instance.post("/login", params).then((resp) => resp?.data);
};

export const registry = (params: { login: string; password: string }) => {
  return instance.post("/registry", params).then((resp) => resp.data);
};

export const getUserInfo = () => {
  return instance.get("/").then((resp) => resp.data);
};
