import { removeField } from "@/utils/utils";

import axiosInstance from "../axiosInstance";
import { SignInRequest, SignUpRequest } from "./types";

export const signUp = (data: SignUpRequest) => {
  // the server doesn't expect the confirmPassword field
  const filteredObj = removeField(data, ["confirmPassword"]);
  axiosInstance.post("/users", filteredObj).then((res) => res.data);
};

export const signIn = (data: SignInRequest) => {
  axiosInstance.post("/users/login", data).then((res) => res.data);
};
