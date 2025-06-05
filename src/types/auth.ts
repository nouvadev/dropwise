interface LoginRequest {
  email: string;
  password: string;
}

interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

interface SignupResponse {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface LoginResponse {
  token: string;
  user_id: string;
  email: string;
}

export type { LoginRequest, SignupRequest, SignupResponse, LoginResponse };



