"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

import CustomerOrdersHistoryDetails from "@/src/components/modals/CustomerOrdersHistoryDetails";
import { useGetCustomerOrdersHistoryQuery } from "@/src/redux/features/order/orderApi";
import { customerOrdersHistoryRows } from "@/src/utils/constant";

const CustomerOrderHistoryPage = () => {
  const { data } = useGetCustomerOrdersHistoryQuery("");
  const customerOrders = data?.data;

  // Format the validFrom and validTo dates
  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return new Date(date).toLocaleDateString("en-US", options);
  };

  return (
    <div className="bg-[#F9FBFD]">
      {customerOrders?.length === 0 ? (
        <p className="flex justify-center items-center min-h-screen my-auto text-xl font-medium">
          orders not aboailvale
        </p>
      ) : (
        <Table
          aria-label="all categories from dashboard"
          className="bg-transparent bg-[#F9FBFD]"
          removeWrapper={true}
        >
          <TableHeader className="">
            {customerOrdersHistoryRows.map((row) => (
              <TableColumn key={row?.uid} className="">
                {row?.name}
              </TableColumn>
            ))}
          </TableHeader>

          <TableBody className="bg-white">
            {customerOrders?.map((customerOrder: any, index: number) => (
              <TableRow key={customerOrder?.id} className="bg-white">
                <TableCell width={20}>{index + 1}</TableCell>

                <TableCell className="flex gap-1 items-center mt-2">
                  <p>{customerOrder?.grandTotal}</p>{" "}
                  <p>
                    <FaBangladeshiTakaSign size={12} />
                  </p>
                </TableCell>
                <TableCell>{customerOrder?.discount} %</TableCell>
                <TableCell>{customerOrder?.status}</TableCell>
                <TableCell>{formatDate(customerOrder?.updatedAt)}</TableCell>
                <TableCell>
                  {customerOrder?.payments[0]?.transactionId}
                </TableCell>
                <TableCell>{customerOrder?.shop?.name}</TableCell>
                <TableCell>
                  {/* show all individual product */}
                  <CustomerOrdersHistoryDetails
                    buttonText="See details"
                    orderItems={customerOrder?.orderItems}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default CustomerOrderHistoryPage;
