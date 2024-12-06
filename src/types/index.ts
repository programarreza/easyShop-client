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
