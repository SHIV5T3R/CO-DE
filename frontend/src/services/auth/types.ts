export interface SignUpRequest {
  username: string;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}
