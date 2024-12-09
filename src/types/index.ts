import { ReactNode, SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type TUserStatus = {
  status: "ACTIVE" | "BLOCKED" | "DELETED" | "SUSPENDED";
};

export type TUserRole = {
  role: "ADMIN" | "VENDOR" | "CUSTOMER";
};

export type TUser = {
  email: string;
  status: TUserStatus;
  role: TUserRole;
  iat: number;
  exp: number;
};

export interface IInput {
  variant?: "bordered" | "flat" | "faded" | "underlined";
  size?: "md" | "sm" | "lg";
  required?: boolean;
  type?: "text" | "email" | "password" | "number";
  label?: ReactNode;
  name: string;
  placeholder?: string;
  disabled?: boolean;
}

export type TCategories = {
  id: string;
  name: string;
  description: string;
  images: string;
};

export type IUser = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  profilePhoto: string;
  status: TUserStatus;
  role: TUserRole;
};

export type TShop = {
  id: string;
  name: string;
  description: string;
  logo: string;
};

export type TProduct = {
  categoryId: TCategories;
  createdAt: string;
  description: string;
  discount: number;
  id: string;
  images: string;
  inventoryCount: number;
  name: string;
  price: number;
  rating: number;
  shopId: TShop;
};
