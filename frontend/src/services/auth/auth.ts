import { AxiosError } from "axios";

import { removeField } from "@/utils/utils";

import axiosInstance from "../axiosInstance";
import {
  AuthFormErrorResponse,
  GitHubAccessTokenRequest,
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
export const generateGithubToken = async (
  data: GitHubAccessTokenRequest
): Promise<{ status: true } | AuthFormErrorResponse<SignInRequest>> => {
  try {
    const githubAccessTokenEndpoint = import.meta.env
      .VITE_SERVER_GITHUB_ACCESS_TOKEN_ENDPOINT;
    const {
      data: { status },
    } = (await axiosInstance.post(githubAccessTokenEndpoint, data)) as Awaited<{
      data: { status: true };
    }>;

    return { status };
  } catch (err) {
    if (err instanceof AxiosError && err.response?.data) {
      return err.response.data as AuthFormErrorResponse<SignInRequest>;
    }
    throw err;
  }
};
export const getServerSession = async (): Promise<{
  status: boolean;
  message: string;
  username: string | null;
}> => {
  try {
    const res = await axiosInstance.get("/v1/get-session");
    return res.data;
  } catch (error) {
    return { message: "Internal server error", status: false, username: null };
  }
};
export const getUser = async () => {
  const res = await axiosInstance.get<SignInResponse>("/users/");
  return res.data;
};
export const logout = async () => {
  await axiosInstance.post("/v1/logout");
};
