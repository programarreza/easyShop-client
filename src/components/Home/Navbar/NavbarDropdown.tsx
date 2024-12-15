"use client";

import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "universal-cookie";

import useLoggedUser from "@/src/hooks/auth.hook";
import { logout } from "@/src/redux/features/auth/authSlice";
import { useAppDispatch } from "@/src/redux/hooks";

const NavbarDropdown = () => {
  let userPath: string;
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useLoggedUser();
  const dispatch = useAppDispatch();
  const cookies = new Cookies();

  const handleLogout = () => {
    // Remove the accessToken cookie
    cookies.remove("accessToken", { path: "/" });
    dispatch(logout());

    router.push("/");
  };

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  if (user?.role === "ADMIN") {
    userPath = "/admin-dashboard";
  } else if (user?.role === "VENDOR") {
    userPath = "/vendor-dashboard";
  } else if (user?.role === "CUSTOMER") {
    userPath = "/dashboard";
  }

  return (
    <div>
      <Dropdown>
        <DropdownTrigger onClick={(e: any) => e.preventDefault()}>
          <Avatar
            className="cursor-pointer border-2 border-green-600"
            src={user?.profilePhoto}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem>
            <div className="flex gap-2">
              {/* <Avatar src={user?.profilePhoto} /> */}
              <div>
                <p>{user?.name}</p>
                <p>{user?.email}</p>
              </div>
            </div>
          </DropdownItem>

          <DropdownItem onClick={() => handleNavigation(`${userPath}`)}>
            My Dashboard
          </DropdownItem>
          <DropdownItem
            className="text-danger"
            color="danger"
            onClick={() => handleLogout()}
          >
            Log out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default NavbarDropdown;
