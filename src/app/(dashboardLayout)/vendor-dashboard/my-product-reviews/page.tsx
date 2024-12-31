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
import { FaRegStar, FaStar } from "react-icons/fa6";
import { ImSpinner6 } from "react-icons/im";
import Rating from "react-rating";

import ReplayReviewModal from "@/src/components/modals/ReplayReview";
import { useGetMyProductReviewsQuery } from "@/src/redux/features/review/reviewApi";
import { myProductReviewsRows } from "@/src/utils/constant";

const MyProductReviewsPage = () => {
  const { data, isLoading } = useGetMyProductReviewsQuery("");
  const myProductReviews = data?.data;

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
      {myProductReviews?.length === 0 ? (
        <p className="flex justify-center items-center min-h-screen my-auto text-xl font-medium">
          Your product review not aboailvale
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
                {myProductReviewsRows.map((row) => (
                  <TableColumn key={row?.uid} className="">
                    {row?.name}
                  </TableColumn>
                ))}
              </TableHeader>

              <TableBody className="bg-white">
                {myProductReviews?.map((review: any, index: number) => (
                  <TableRow key={review?.id} className="bg-white  border-b">
                    <TableCell width={20}>{index + 1}</TableCell>

                    <TableCell>
                      <User
                        avatarProps={{
                          size: "lg",
                          radius: "sm",
                          src: review?.product?.images,
                        }}
                        className=" "
                        description=""
                        name=""
                      />
                    </TableCell>
                    <TableCell>
                      {review?.product?.name.length > 50
                        ? `${review?.product?.name.substring(0, 50)}...`
                        : review?.product?.name}
                    </TableCell>
                    <TableCell>
                      {/* rating */}
                      <Rating
                        readonly
                        emptySymbol={<FaRegStar className="text-gray-400" />}
                        fullSymbol={<FaStar className="text-yellow-500" />}
                        initialRating={review?.rating}
                      />
                    </TableCell>
                    <TableCell>
                      {review?.reviewText.length > 100
                        ? `${review?.reviewText.substring(0, 100)}...`
                        : review?.reviewText}
                    </TableCell>
                    <TableCell>
                      {review?.reviewReplay ? (
                        <>
                          {" "}
                          {review?.reviewReplay.length > 100
                            ? `${review?.reviewReplay.substring(0, 100)}...`
                            : review?.reviewReplay}
                        </>
                      ) : (
                        <p className="text-red-500">No replay</p>
                      )}
                    </TableCell>
                    <TableCell>{formatDate(review?.createdAt)}</TableCell>
                    <TableCell>
                      <ReplayReviewModal
                        reviewId={review?.id}
                        reviewText={review?.reviewText}
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

export default MyProductReviewsPage;
