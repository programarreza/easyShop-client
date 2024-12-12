import { Button } from "@nextui-org/button";
import Link from "next/link";

type SearchParams = {
  transactionId: string;
  amount: string;
  date?: string;
  status: string;
};

const PaymentSuccessfulPage = ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const { transactionId, amount, date, status } = searchParams;

  // Convert and format the date if it exists
  const formattedDate = date ? new Date(date).toLocaleString() : "N/A";

  return (
    <div className=" flex justify-center items-center min-h-screen ">
      <div>
        <div className="flex justify-center items-center flex-col">
          <div className="flex justify-center items-center rounded-full">
            <svg
              className="size-24 text-[#4BB543]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h2 className="text-3xl font-semibold mt-4">Payment Successful</h2>
          <p className="text-lg mt-2">Thank you for your purchase!</p>
        </div>

        <div className="mt-6 space-y-2 shadow-md p-6 rounded-md">
          <h3 className="text-lg">
            Amount Paid: <span className="font-medium">{amount} BDT</span>
          </h3>
          <h3 className="text-lg">
            Payment Status: <span className="font-medium">{status}</span>
          </h3>
          <h3 className="text-lg">
            Date & Time: <span className="font-medium">{formattedDate}</span>
          </h3>
          <h3 className="text-lg">
            Transaction Number:{" "}
            <span className="font-medium">{transactionId}</span>
          </h3>
        </div>

        <div className="flex justify-center items-center mt-6">
          <Link href="/">
            <Button className="py-2 my-4 px-6 border rounded-lg hover:bg-gray-200 ">
              Back to home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessfulPage;
