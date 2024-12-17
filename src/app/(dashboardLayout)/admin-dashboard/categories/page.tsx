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

import UpdateCategories from "@/src/components/dashboard/updateCategories/updateCategories";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "@/src/redux/features/categories/categoriesApi";
import { TCategories } from "@/src/types";
import { categoriesRows } from "@/src/utils/constant";

const CategoriesPage = () => {
  const [deleteCategory] = useDeleteCategoryMutation();
  const { data, isLoading } = useGetCategoriesQuery("");
  const categories = data?.data;

  const handleDelete = async (id: string) => {
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCategory(id).unwrap(); // Ensures proper error handling
          Swal.fire({
            title: "Deleted!",
            text: "The category has been deleted successfully.",
            icon: "success",
            width: "350px",
            customClass: {
              popup: "",
              title: "",
            },
          });
        } catch (error: any) {
          Swal.fire({
            title: "Error!",
            text:
              error?.data?.message ||
              "An error occurred while deleting the category.",
            icon: "error",
            width: "350px",
            customClass: {
              popup: "",
              title: "",
            },
          });
        }
      }
    });
  };

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
          {categories?.length === 0 ? (
            <p className="flex justify-center items-center min-h-screen my-auto text-xl font-medium">
              categories not aboailvale. please create category
            </p>
          ) : (
            <Table
              aria-label="all categories from dashboard"
              className="bg-transparent bg-[#F9FBFD]"
              removeWrapper={true}
            >
              <TableHeader className="">
                {categoriesRows?.map((row) => (
                  <TableColumn key={row?.uid} className=" bg-white border-b">
                    {row?.name}
                  </TableColumn>
                ))}
              </TableHeader>

              <TableBody className="bg-white">
                {categories?.map((category: TCategories, index: number) => (
                  <TableRow key={category?.id} className="bg-white border-b">
                    <TableCell width={20}>{index + 1}</TableCell>
                    <TableCell>
                      <User
                        avatarProps={{
                          size: "lg",
                          radius: "sm",
                          src: category?.images,
                        }}
                        className=" "
                        description=""
                        name=""
                      />
                    </TableCell>
                    <TableCell>{category?.name}</TableCell>
                    <TableCell>{category?.description}</TableCell>
                    <TableCell>
                      <UpdateCategories category={category} />
                    </TableCell>
                    <TableCell>
                      {/* Delete category */}
                      <Tooltip color="danger" content="Delete user">
                        <button
                          className="text-lg text-danger cursor-pointer active:opacity-50"
                          onClick={() => handleDelete(category?.id)}
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

export default CategoriesPage;
