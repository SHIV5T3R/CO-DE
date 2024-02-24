export interface SignUpRequest {
  username: string;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignUpResponse {
  status: true;
  data: {
    username: string;
    fullName: string;
    email: string;
    id: string;
  };
}
export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  status: true;
  data: {
    id: string;
    username: string;
    fullName: string;
    email: string;
    avatar: string;
  };
}
export interface GitHubAccessTokenRequest {
  code: string;
}
export type User = SignInResponse["data"];

export interface AuthFormErrorResponse<T> {
  status: false;
  message: string;
  errors?: {
    [k in keyof T]: string[];
  };
  error?: string;
}
