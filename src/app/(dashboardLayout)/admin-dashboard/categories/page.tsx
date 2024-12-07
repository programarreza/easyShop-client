"use client";

import UpdateCategories from "@/src/components/dashboard/updateCategories/updateCategories";
import { useGetCategoriesQuery } from "@/src/redux/features/categories/categoriesApi";
import { TCategories } from "@/src/types";
import { categoriesRows } from "@/src/utils/constant";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { User } from "@nextui-org/user";

const CategoriesPage = () => {
  const { data } = useGetCategoriesQuery("");
  const categories = data?.data;

  return (
    <div className="bg-[#F9FBFD]">
      <Table
        aria-label="all categories from dashboard"
        className="bg-transparent bg-[#F9FBFD]"
        removeWrapper={true}
      >
        <TableHeader className="">
          {categoriesRows.map((row) => (
            <TableColumn className=" bg-white" key={row?.uid}>
              {row?.name}
            </TableColumn>
          ))}
        </TableHeader>

        <TableBody className="bg-white">
          {categories?.map((category: TCategories, index: number) => (
            <TableRow key={category?.id} className="bg-white">
              <TableCell width={20}>{index + 1}</TableCell>
              <TableCell>
                <User
                  className=" "
                  name=""
                  description=""
                  avatarProps={{
                    size: "lg",
                    radius: "sm",
                    src: category?.images,
                  }}
                />
              </TableCell>
              <TableCell>{category?.name}</TableCell>
              <TableCell>{category?.description}</TableCell>
              <TableCell>
                <UpdateCategories category={category} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CategoriesPage;