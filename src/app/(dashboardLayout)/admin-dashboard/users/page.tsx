"use client";

import { useGetUsersQuery } from "@/src/redux/features/user/userApi";
import { IUser } from "@/src/types";
import { usersRows } from "@/src/utils/constant";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { User } from "@nextui-org/user";

const UsersPage = () => {
  const { data } = useGetUsersQuery("");
  console.log(data?.data?.data);
  const users = data?.data?.data;

  return (
    <div className="bg-[#F9FBFD]">
      <Table
        aria-label="all categories from dashboard"
        className="bg-transparent bg-[#F9FBFD]"
        removeWrapper={true}
      >
        <TableHeader className="">
          {usersRows.map((row) => (
            <TableColumn className=" bg-white" key={row?.uid}>
              {row?.name}
            </TableColumn>
          ))}
        </TableHeader>

        <TableBody className="bg-white">
          {users?.map((user: IUser, index: number) => (
            <TableRow key={user?.id} className="bg-white">
              {/* <TableCell width={20}>{index + 1}</TableCell> */}
              <TableCell>
                <User
                  className=" "
                  name=""
                  description=""
                  avatarProps={{
                    size: "lg",
                    radius: "sm",
                    src: user?.profilePhoto,
                  }}
                />
              </TableCell>
              <TableCell>{user?.name}</TableCell>
              <TableCell>{user?.email}</TableCell>
              <TableCell>{user?.phoneNumber}</TableCell>
              {/* <TableCell>{user?.address}</TableCell> */}
              <TableCell>{user?.status}</TableCell>
              <TableCell>{user?.role}</TableCell>
              <TableCell>status change</TableCell>
              <TableCell>role change</TableCell>
              <TableCell>delete</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersPage;
