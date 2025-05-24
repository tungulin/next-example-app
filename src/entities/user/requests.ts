import axios from "axios";
import { notifications } from "@mantine/notifications";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API + "/profile",
});

instance.interceptors.response.use(null, (error) => {
  const errMessage = error.response.data?.message || "Something going wrong...";
  notifications.show({
    color: "red",
    message: errMessage,
  });
  return Promise.reject(error);
});

export const login = (params: { login: string; password: string }) => {
  return instance.post("/login", params);
};

export const registry = (params: { login: string; password: string }) => {
  return instance.post("/registry", params);
};

export const getUserInfo = () => {
  return instance.get("/");
};
