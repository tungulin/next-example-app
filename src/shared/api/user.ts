import axios from "axios";
import { notifications } from "@mantine/notifications";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API + "/profile",
});

instance.interceptors.response.use(null, ({ response }) => {
  // if (response.data?.message) {
  //   notifications.show({
  //     color: "red",
  //     message: response.data?.message,
  //   });
  // }
});

export const login = async (params: { login: string; password: string }) => {
  return instance.post("/login", { params });
};

export const registry = async (params: { login: string; password: string }) => {
  return instance.post("/registry", { params });
};
