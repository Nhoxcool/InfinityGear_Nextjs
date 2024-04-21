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

export interface NewBranchRequest {
  logo: File;
  brand: string;
  category: string;
}

export interface NewBrand {
  id: string;
  brand: string;
  category: string;
}

export interface NewBrandInfo {
  brand: string;
  category: string;
  logo?: File;
}

export interface NewProductInfo {
  title: string;
  description: string;
  bulletPoints: string[];
  mrp: number;
  salePrice: number;
  category: string;
  brand: string;
  quantity: number;
  thumbnail?: File;
  images: File[];
}
