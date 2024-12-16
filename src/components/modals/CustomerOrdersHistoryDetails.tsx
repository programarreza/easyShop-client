import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { User } from "@nextui-org/user";
import { TbCoinTaka } from "react-icons/tb";

import CreateReviewModal from "./CreateReview";
import RWModal from "./RWModal";

import { customerOrdersHistoryDetailsRows } from "@/src/utils/constant";

const CustomerOrdersHistoryDetails = ({
  buttonText,
  orderItems,
}: {
  buttonText: string;
  orderItems: any[];
}) => {
  return (
    <RWModal buttonClassName="flex-1" buttonText={buttonText} size="5xl">
      <div>
        <Table
          aria-label="all product from dashboard"
          className=" "
          removeWrapper={true}
        >
          <TableHeader className=" ">
            {customerOrdersHistoryDetailsRows.map((row) => (
              <TableColumn key={row?.uid} className="">
                {row?.name}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody className="">
            {orderItems?.map((item, index: number) => (
              <TableRow key={index} className=" border-b">
                <TableCell width={20}>{index + 1}</TableCell>
                <TableCell>
                  <User
                    avatarProps={{
                      size: "lg",
                      radius: "sm",
                      src: item?.product?.images,
                    }}
                    className=" border"
                    description=""
                    name=""
                  />
                </TableCell>

                <TableCell>{item?.product?.name}</TableCell>
                <TableCell>
                  <div className="flex gap-2 items-center">
                    <span>{item?.price} </span>
                    <TbCoinTaka size={20} />
                  </div>
                </TableCell>
                <TableCell>{item?.discount}%</TableCell>
                <TableCell>{item?.grandTotal}</TableCell>
                <TableCell>
                  <CreateReviewModal
                    buttonText="create review"
                    name={item?.product?.name}
                    productId={item?.productId}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </RWModal>
  );
};

export default CustomerOrdersHistoryDetails;
