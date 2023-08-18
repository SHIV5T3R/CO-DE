import axios, { AxiosError } from "axios";
import { camelCase, isPlainObject, mapKeys, snakeCase } from "lodash";

import config from "@/config";

const axiosInstance = axios.create({
  baseURL: config.BASE_URL,
  withCredentials: true,
});

/* Converts request payloads from camelCase to snake_case and response payloads
    from snake_case to camelCase
*/
const transformKeys = (
  obj: Record<string, any>,
  request: boolean = true
): any => {
  return mapKeys(obj, (value, key) => {
    if (isPlainObject(value)) {
      return transformKeys(value);
    }
    if (request) {
      return snakeCase(key);
    }
    return camelCase(key);
  });
};

axiosInstance.interceptors.request.use((req) => {
  const { data } = req;

  req.data = transformKeys(data, true);

  return req;
});

axiosInstance.interceptors.response.use(
  (response) => {
    response.data = transformKeys(response.data);
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // TODO: token expired and the user must login again. Handle it when we decide neavigation
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
