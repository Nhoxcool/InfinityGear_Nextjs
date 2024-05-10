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

export interface ProductResponse {
  id: string;
  title: string;
  description: string;
  quantity: number;
  price: {
    base: number;
    discounted: number;
  };
  bulletPoints?: string[];
  images?: {
    url: string;
    id: string;
  }[];
  thumbnail: {
    url: string;
    id: string;
  };
  category: string;
  brand: string;
}

export interface BrandResponse {
  id: string;
  logo: {
    url: string;
    id: string;
  };
  category: string;
  brand: string;
}

export interface ProductToUpdate {
  title: string;
  description: string;
  bulletPoints: string[];
  category: string;
  quantity: number;
  brand: string;
  price: {
    base: number;
    discounted: number;
  };
  thumbnail?: { url: string; id: string };
  images?: { url: string; id: string }[];
}

export interface BrandToUpdate {
  brand: string;
  category: string;
  logo?: { url: string; id: string };
}

export interface NewCartRequest {
  productId: string;
  quantity: number;
}

export interface NewFeaturedProduct {
  banner: { url: string; id: string };
  link: string;
  linkTitle: string;
  title: string;
}
