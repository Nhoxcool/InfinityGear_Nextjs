export interface MenuItems {
  href: string;
  icon: React.JSX.Element;
  label: string;
}

export interface NewUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface EmailVerifyRequest {
  token: string;
  userId: string;
}

export interface ForgetPassword {
  email: string;
}

export interface UpdatePasswordRequest {
  password: string;
  token: string;
  userId: string;
}

export interface SessionUserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: "user" | "admin";
  verified: boolean;
}
