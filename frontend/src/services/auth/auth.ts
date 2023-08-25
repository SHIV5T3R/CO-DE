import { AxiosError } from "axios";

import { removeField } from "@/utils/utils";

import axiosInstance from "../axiosInstance";
import {
  AuthFormErrorResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from "./types";

// TODO: add axios return types

export const signUp = async (
  data: SignUpRequest
): Promise<SignUpResponse | AuthFormErrorResponse<SignUpRequest>> => {
  // the server doesn't expect the confirmPassword field
  const filteredObj = removeField(data, ["confirmPassword"]);
  try {
    const res = await axiosInstance.post<SignUpResponse>("/users", filteredObj);
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError && err.response?.data) {
      return err.response.data as AuthFormErrorResponse<SignUpRequest>;
    }
    throw err;
  }
};

export const signIn = async (
  data: SignInRequest
): Promise<SignInResponse | AuthFormErrorResponse<SignInRequest>> => {
  try {
    const res = await axiosInstance.post("/users/login", data);
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError && err.response?.data) {
      return err.response.data as AuthFormErrorResponse<SignInRequest>;
    }
    throw err;
  }
};

export const getUser = async () => {
  const res = await axiosInstance.get<SignInResponse>("/users/");
  return res.data;
};
