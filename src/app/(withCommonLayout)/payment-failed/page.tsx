import { Button } from "@nextui-org/button";
import Link from "next/link";

const PaymentFailedPage = () => {
  const status = "failed";

  return (
    <div className=" flex justify-center items-center min-h-screen ">
      <div className="text-center">
        <div className="flex justify-center items-center flex-col">
          <div className=" flex justify-center items-center rounded-full">
            <svg
              className="size-24 text-[#d3246c]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h2 className="text-3xl font-semibold mt-4 text-[#d3246c]">
            Payment Failed
          </h2>
          <p className="text-lg mt-2">Payment Status: {status}</p>
        </div>

        <div className="flex justify-center items-center mt-4">
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

export default PaymentFailedPage;
