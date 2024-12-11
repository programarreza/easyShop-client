"use client";

import { Tab, Tabs } from "@nextui-org/tabs";
import Link from "next/link";

import useLoggedUser from "@/src/hooks/auth.hook";

const DashboardSidebar = () => {
  const loggedUser = useLoggedUser();

  return (
    <div>
      <div className="w-full min-h-screen ">
        <Tabs
          aria-label="Options"
          classNames={{
            tabList: "gap-2 w-full relative rounded-none p-0 border-divider ",
            cursor: "w-full bg-[#22d3ee]",
            tab: "w-full px-0 h-10",
            tabContent: "group-data-[selected=true]:text-[#06b6d4]",
          }}
          color="primary"
          fullWidth={true}
          isVertical={true}
          variant="underlined"
        >
          {/* admin accusable tab */}
          {(loggedUser?.role as unknown as "ADMIN" | "VENDOR" | "CUSTOMER") ===
            "ADMIN" && (
            <>
              <Tab
                key="admin-dashboard"
                title={
                  <Link href="/admin-dashboard">
                    <div className="flex items-center space-x-2">
                      <span>dashboard</span>
                    </div>
                  </Link>
                }
              />

              <Tab
                key="create category"
                title={
                  <Link href="/admin-dashboard/create-category">
                    <div className="flex items-center space-x-2">
                      <span>create category</span>
                    </div>
                  </Link>
                }
              />

              <Tab
                key="all categories"
                title={
                  <Link href="/admin-dashboard/categories">
                    <div className="flex items-center space-x-2">
                      <span>all categories</span>
                    </div>
                  </Link>
                }
              />

              <Tab
                key="all users"
                title={
                  <Link href="/admin-dashboard/users">
                    <div className="flex items-center space-x-2">
                      <span>all users</span>
                    </div>
                  </Link>
                }
              />
            </>
          )}

          {/* vendor accusable tab */}
          {(loggedUser?.role as unknown as "ADMIN" | "VENDOR" | "CUSTOMER") ===
            "VENDOR" && (
            <>
              <Tab
                key="vendor-dashboard"
                title={
                  <Link href="/vendor-dashboard">
                    <div className="flex items-center space-x-2">
                      <span>dashboard</span>
                    </div>
                  </Link>
                }
              />
              <Tab
                key="create shop"
                title={
                  <Link href="/vendor-dashboard/create-shop">
                    <div className="flex items-center space-x-2">
                      <span>create shop</span>
                    </div>
                  </Link>
                }
              />
              <Tab
                key="create product"
                title={
                  <Link href="/vendor-dashboard/create-product">
                    <div className="flex items-center space-x-2">
                      <span>create product</span>
                    </div>
                  </Link>
                }
              />
              <Tab
                key="my products"
                title={
                  <Link href="/vendor-dashboard/my-products">
                    <div className="flex items-center space-x-2">
                      <span>my products</span>
                    </div>
                  </Link>
                }
              />
              <Tab
                key="create coupon"
                title={
                  <Link href="/vendor-dashboard/create-coupon">
                    <div className="flex items-center space-x-2">
                      <span>create coupon</span>
                    </div>
                  </Link>
                }
              />
              <Tab
                key="my coupon"
                title={
                  <Link href="/vendor-dashboard/my-coupon">
                    <div className="flex items-center space-x-2">
                      <span>my coupon</span>
                    </div>
                  </Link>
                }
              />
              <Tab
                key="order-history"
                title={
                  <Link href="/vendor-dashboard/order-history">
                    <div className="flex items-center space-x-2">
                      <span>order history</span>
                    </div>
                  </Link>
                }
              />
            </>
          )}

          {(loggedUser?.role as unknown as "ADMIN" | "VENDOR" | "CUSTOMER") ===
            "CUSTOMER" && (
            <>
              <Tab
                key="my reviews"
                title={
                  <Link href="/my-reviews">
                    <div className="flex items-center space-x-2">
                      <span>my reviews</span>
                    </div>
                  </Link>
                }
              />

              <Tab
                key="order history"
                title={
                  <Link href="/dashboard/order-history">
                    <div className="flex items-center space-x-2">
                      <span>order history</span>
                    </div>
                  </Link>
                }
              />
            </>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardSidebar;
