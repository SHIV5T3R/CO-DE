import { removeField } from "@/utils/utils";

import axiosInstance from "../axiosInstance";
import { SignInRequest, SignUpRequest } from "./types";

// TODO: add axios return types

export const signUp = (data: SignUpRequest) => {
  // the server doesn't expect the confirmPassword field
  const filteredObj = removeField(data, ["confirmPassword"]);
  return axiosInstance.post("/users", filteredObj).then((res) => res.data);
};

export const signIn = (data: SignInRequest) => {
  return axiosInstance.post("/users/login", data).then((res) => res.data);
};
