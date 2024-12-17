"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { User } from "@nextui-org/user";
import { ImSpinner6 } from "react-icons/im";

import ShopStatusChangeModal from "@/src/components/modals/ShopStatusChangeModal";
import { useGetAllShopsQuery } from "@/src/redux/features/shop/shopApi";
import { shopsRows } from "@/src/utils/constant";

const AllShopsPage = () => {
  const { data, isLoading } = useGetAllShopsQuery("");

  const shops = data?.data?.data;

  return (
    <div className="bg-[#F9FBFD]">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="flex w-fit mx-auto">
            <ImSpinner6 className="animate-spin m-auto" size={28} />
            <span>Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {shops?.length === 0 ? (
            <p className="flex justify-center items-center min-h-screen my-auto text-xl font-medium">
              shops not aboailvale
            </p>
          ) : (
            <Table
              aria-label="all categories from dashboard"
              className="bg-transparent bg-[#F9FBFD]"
              removeWrapper={true}
            >
              <TableHeader>
                {shopsRows.map((row) => (
                  <TableColumn key={row?.uid} className=" bg-white border-b">
                    {row?.name}
                  </TableColumn>
                ))}
              </TableHeader>

              <TableBody className="bg-white">
                {shops?.map((shop: any, index: number) => (
                  <TableRow key={shop?.id} className="bg-white border-b">
                    <TableCell width={20}>{index + 1}</TableCell>
                    <TableCell>
                      <User
                        avatarProps={{
                          size: "lg",
                          radius: "sm",
                          src: shop?.logo,
                        }}
                        className=" border"
                        description=""
                        name=""
                      />
                    </TableCell>
                    <TableCell>{shop?.name}</TableCell>
                    <TableCell width={200}>
                      {shop?.description?.length > 60
                        ? `${shop.description.substring(0, 60)}...`
                        : shop.description}
                    </TableCell>
                    <TableCell>{shop?.followerCount}</TableCell>

                    <TableCell>{shop?.status}</TableCell>
                    <TableCell>{shop?.vendor?.name}</TableCell>
                    <TableCell>{shop?.vendor?.phoneNumber}</TableCell>

                    <TableCell>
                      {/* Status change */}
                      <ShopStatusChangeModal
                        shopId={shop?.id}
                        status={shop?.status}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </>
      )}
    </div>
  );
};

export default AllShopsPage;
