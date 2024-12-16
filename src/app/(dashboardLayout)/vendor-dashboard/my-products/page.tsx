"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { Tooltip } from "@nextui-org/tooltip";
import { User } from "@nextui-org/user";
import { ImSpinner6 } from "react-icons/im";
import Swal from "sweetalert2";

import MyShopProductUpdate from "@/src/components/modals/MyShopProductUpdate";
import {
  useDeleteMyShopProductMutation,
  useGetMyShopProductsQuery,
} from "@/src/redux/features/product/productApi";
import { myShopProductsRows } from "@/src/utils/constant";

const UsersPage = () => {
  const [deleteMyShopProduct] = useDeleteMyShopProductMutation();
  const { data, isLoading } = useGetMyShopProductsQuery("");
  const products = data?.data;

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff7527",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      width: "350px",
      customClass: {
        popup: "",
        title: "",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMyShopProduct(id);
        Swal.fire({
          title: "Deleted!",
          text: "Your product has been deleted.",
          icon: "success",
          width: "350px",
          customClass: {
            popup: "",
            title: "",
          },
        });
      }
    });
  };

  return (
    <div className="bg-[#F9FBFD]">
      {products?.length === 0 ? (
        <p className="flex justify-center items-center min-h-screen my-auto text-xl font-medium">
          products not aboailvale. please add products
        </p>
      ) : (
        <>
          {isLoading ? (
            <div className="flex justify-center items-center min-h-screen">
              <div className="flex w-fit mx-auto">
                <ImSpinner6 className="animate-spin m-auto" size={28} />
                <span>Loading...</span>
              </div>
            </div>
          ) : (
            <Table
              aria-label="all categories from dashboard"
              className="bg-transparent bg-[#F9FBFD]"
              removeWrapper={true}
            >
              <TableHeader className="">
                {myShopProductsRows.map((row) => (
                  <TableColumn key={row?.uid} className=" bg-white">
                    {row?.name}
                  </TableColumn>
                ))}
              </TableHeader>

              <TableBody className="bg-white">
                {products?.map((product: any, index: number) => (
                  <TableRow key={product?.id} className="bg-white">
                    <TableCell>
                      <User
                        avatarProps={{
                          size: "lg",
                          radius: "sm",
                          src: product?.images,
                        }}
                        className=" "
                        description=""
                        name=""
                      />
                    </TableCell>
                    <TableCell>
                      {" "}
                      {product?.name?.length > 30
                        ? `${product.name.substring(0, 30)}...`
                        : product.name}
                    </TableCell>
                    <TableCell>
                      {" "}
                      {product?.description?.length > 30
                        ? `${product.description.substring(0, 30)}...`
                        : product.description}
                    </TableCell>
                    <TableCell>{product?.price}</TableCell>

                    <TableCell>{product?.discount}</TableCell>
                    <TableCell>{product?.rating}</TableCell>
                    <TableCell>{product?.categories?.name}</TableCell>
                    <TableCell>{product?.inventoryCount}</TableCell>

                    <TableCell>
                      {/* Update Product */}
                      <Tooltip className="" content="Update ">
                        <button className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          <MyShopProductUpdate
                            buttonText="update product"
                            product={product}
                            title=""
                          />
                        </button>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      {/* Delete Product */}
                      <Tooltip color="danger" content="Delete user">
                        <button
                          className="text-lg text-danger cursor-pointer active:opacity-50"
                          onClick={() => handleDelete(product?.id)}
                        >
                          <svg
                            className="size-7"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              clipRule="evenodd"
                              d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                              fillRule="evenodd"
                            />
                          </svg>
                        </button>
                      </Tooltip>
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

export default UsersPage;
