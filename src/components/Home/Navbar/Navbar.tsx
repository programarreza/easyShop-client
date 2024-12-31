"use client";

import { Input } from "@nextui-org/input";
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Navbar as NextUINavbar,
} from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import clsx from "clsx";
import Link, { default as NextLink } from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";

import NavbarDropdown from "./NavbarDropdown";

import { Logo, SearchIcon } from "@/src/components/icons";
import { siteConfig } from "@/src/config/site";
import useLoggedUser from "@/src/hooks/auth.hook";
import { updateSearchValue } from "@/src/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const { selectedItems } = useAppSelector((store) => store?.cart);
  const searchValue = useAppSelector((state) => state?.cart?.search);
  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSearchValue(e.target.value));
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchValue.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  const { selectedUser } = useLoggedUser();
  const [scrollDirection, setScrollDirection] = useState("up");

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";

      if (
        direction !== scrollDirection &&
        Math.abs(scrollY - lastScrollY) > 10
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDirection);

    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
    };
  }, [scrollDirection]);

  const getDashboardLink = () => {
    switch (selectedUser?.role as unknown as "ADMIN" | "VENDOR" | "CUSTOMER") {
      case "ADMIN":
        return "/admin-dashboard";
      case "VENDOR":
        return "/vendor-dashboard";
      case "CUSTOMER":
        return "/dashboard";
      default:
        return "/login"; // Redirect to login if no role matches
    }
  };

  return (
    <div
      className={`border-b fixed top-0 left-0 w-full z-50 transition-transform duration-300 ease-in-out ${
        scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
      }`}
      style={{ backdropFilter: "blur(10px)" }}
    >
      <NextUINavbar className="bg-transparent" maxWidth="xl" position="sticky">
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className=" gap-3 w-full">
            <NextLink
              className="flex justify-start items-center gap-1"
              href="/"
            >
              <Logo />
              <span className=""> EasyShop</span>
            </NextLink>

            {/* search by content */}
            <div className="min-w-[260px] md:min-w-[550px] mx-auto my-4">
              <Input
                classNames={{
                  label: "text-black/50 dark:text-white/90",
                  input: [
                    "bg-transparent",
                    "text-black/90 dark:text-white/90",
                    "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                  ],
                  innerWrapper: "bg-transparent",
                  inputWrapper: [
                    "shadow-xl border rounded-md",
                    "bg-white dark:bg-default/60 backdrop-blur-xl backdrop-saturate-200",
                    "hover:bg-default-200/70 dark:hover:bg-default/70",
                    "!cursor-text",
                  ],
                }}
                endContent={
                  <button
                    aria-label="Search"
                    className="border p-2 text-black/50 mb-0.5 dark:text-white/90 text-slate-400 flex-shrink-0 bg-gray-200"
                    onClick={() =>
                      searchValue.trim() &&
                      router.push(`/products?search=${searchValue.trim()}`)
                    }
                  >
                    <SearchIcon />
                  </button>
                }
                placeholder="Search by product..."
                radius="lg"
                value={searchValue}
                onChange={handleSearchChange}
                onKeyPress={handleSearchKeyPress}
              />
            </div>
          </NavbarBrand>
        </NavbarContent>
        <NavbarBrand as="li" className=" max-w-fit">
          {/* content-2 */}
          <div className="navbar-end  flex items-center gap-8 font-medium text-lg ">
            <ul className="hidden lg:flex gap-4 justify-start ml-2">
              {siteConfig.navItems.map((item) => (
                <NavbarItem key={item.href}>
                  <NextLink
                    className={clsx(
                      " mt-2", // Default text color set to white
                      linkStyles({ color: "foreground" }),
                      "data-[active=true]:text-primary data-[active=true]:font-medium",
                    )}
                    color="foreground"
                    href={item.href}
                  >
                    {item.label}
                  </NextLink>
                </NavbarItem>
              ))}

              {(selectedUser?.role as unknown as
                | "ADMIN"
                | "VENDOR"
                | "CUSTOMER") === "CUSTOMER" && (
                <Link href={"/cart"}>
                  <div className="relative mt-2">
                    <IoCartOutline size={30} />
                    <span className="rounded-full absolute top-[-8px] left-[20px] bg-transparent border-2 border-green-700 text-black text-center size-2 font-bold flex items-center justify-center p-2">
                      {selectedItems}
                    </span>
                  </div>
                </Link>
              )}

              <Link href={getDashboardLink()}>
                {selectedUser ? (
                  <div className="flex justify-center items-center gap-2">
                    <NavbarDropdown />
                  </div>
                ) : (
                  <Link href={"/login"}>
                    <p className="mt-2 cursor-pointer">login</p>
                  </Link>
                )}
              </Link>
            </ul>
          </div>
        </NavbarBrand>
      </NextUINavbar>
    </div>
  );
};
