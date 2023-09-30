/* eslint-disable no-param-reassign */
import axios, { AxiosError } from "axios";
import { camelCase, isArray, isObject, snakeCase } from "lodash";

import config from "@/config";
import useAuthStore from "@/stores/authStore";

const axiosInstance = axios.create({
  baseURL: config.VITE_BASE_URL,
  withCredentials: true,
});

/* Converts request payloads from camelCase to snake_case and response payloads
    from snake_case to camelCase
*/
const transformKeys = (
  obj: Record<string, unknown>,
  isRequest: boolean = true
) => {
  const transformFunction = isRequest ? snakeCase : camelCase;

  // Create a new object to store the transformed keys and values
  const transformedResult: Record<string, unknown> = {};

  // Iterate through the original object and transform keys and values
  Object.entries(obj).forEach(([key, value]) => {
    const transformedKey = isArray(obj) ? key : transformFunction(key);
    transformedResult[transformedKey] = isObject(value)
      ? transformKeys(value as Record<string, unknown>, isRequest)
      : value;
  });

  return transformedResult;
};

axiosInstance.interceptors.request.use((req) => {
  const { data } = req;
  if (data && typeof data === "object") {
    req.data = transformKeys(data, true);
  }

  return req;
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data && typeof response.data === "object") {
      response.data = transformKeys(response.data, false);
    }
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.data && typeof error.response.data === "object") {
      error.response.data = transformKeys(
        error.response.data as Record<string, unknown>,
        false
      );
    }
    if (
      error.response?.status === 401 &&
      error.response.config.url !== "/users/login"
    ) {
      useAuthStore.getState().resetuser();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
