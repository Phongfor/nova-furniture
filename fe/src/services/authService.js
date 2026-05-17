import axiosClient from "./axiosClient";

export const loginApi = async (data) => {
  return await axiosClient.post("/auth/login", data);
};

export const registerApi = async (data) => {
  return await axiosClient.post("/auth/register", data);
};