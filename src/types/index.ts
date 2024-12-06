import { SVGProps } from "react";

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
