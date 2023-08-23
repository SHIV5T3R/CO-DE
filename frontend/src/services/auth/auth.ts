import { removeField } from "@/utils/utils";

import axiosInstance from "../axiosInstance";
import { SignInRequest, SignUpRequest } from "./types";

// TODO: add axios return types

export const signUp = async (data: SignUpRequest) => {
  // the server doesn't expect the confirmPassword field
  const filteredObj = removeField(data, ["confirmPassword"]);
  const res = await axiosInstance.post("/users", filteredObj);
  return res.data;
};

export const signIn = async (data: SignInRequest) => {
  const res = await axiosInstance.post("/users/login", data);
  return res.data;
};
