/* eslint-disable prettier/prettier */
"use client";

import { Button } from "@nextui-org/button";
import Image from "next/image";
import { FaRegStar, FaStar } from "react-icons/fa6";
import Rating from "react-rating";
import { toast } from "sonner";

import Container from "@/src/components/ui/Container";
import { addToCart } from "@/src/redux/features/cartSlice";
import { useGetSingleProductQuery } from "@/src/redux/features/product/productApi";
import { useAppDispatch } from "@/src/redux/hooks";
import { TSearchParams } from "@/src/types";

const ProductDetails = ({ searchParams }: { searchParams: TSearchParams }) => {
  const dispatch = useAppDispatch();
  const { data } = useGetSingleProductQuery(searchParams?.id || "");
  const product = data?.data;

  const discountedPrice =
    product?.price && product?.discount
      ? product?.price * (1 - product?.discount / 100)
      : 0;

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
    toast.success(" Added to cart successfully!", { duration: 2000 });
  };

  return (
    <div className="pt-16">
      <Container>
        <div className="flex justify-between gap-5">
          <div className=" flex-1 shadow-large p-3 rounded-md">
            <Image
              alt={product?.name}
              className="w-full h-[80vh] object-cover"
              height={500}
              src={product?.images}
              width={500}
            />
          </div>

          <div className="flex flex-col flex-1 shadow-large p-3 rounded-md">
            <div className="w-full space-y-4 flex-grow">
              <p className="text-xl mb-2 mt-1">{product?.name}</p>
              <p>
                {product?.description?.length > 430
                  ? `${product.description.substring(0, 430)}.`
                  : product?.description}
              </p>

              {/* rating */}
              <Rating
                readonly
                emptySymbol={<FaRegStar className="text-gray-400" />}
                fullSymbol={<FaStar className="text-yellow-500" />}
                initialRating={product?.rating}
              />

              <p>
                <span className="text-gray-600">Brand:</span>{" "}
                {product?.categories?.name}
              </p>

              {/* price */}
              <div className="flex gap-6">
                <div className="flex justify-center items-center">
                  <svg
                    className="size-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m8.25 7.5.415-.207a.75.75 0 0 1 1.085.67V10.5m0 0h6m-6 0h-1.5m1.5 0v5.438c0 .354.161.697.473.865a3.751 3.751 0 0 0 5.452-2.553c.083-.409-.263-.75-.68-.75h-.745M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-xl">{discountedPrice?.toFixed(0)}</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex justify-center items-center line-through">
                  <svg
                    className="size-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m8.25 7.5.415-.207a.75.75 0 0 1 1.085.67V10.5m0 0h6m-6 0h-1.5m1.5 0v5.438c0 .354.161.697.473.865a3.751 3.751 0 0 0 5.452-2.553c.083-.409-.263-.75-.68-.75h-.745M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-sm text-gray-700 ">{product?.price}</p>
                </div>
                <p className="text-sm text-gray-700">-{product?.discount}%</p>
              </div>
            </div>

            {/* Button container pinned to the bottom */}
            <div className="px-2 py-4 mt-auto ">
              {product?.stockQuantity > 0 ? (
                <Button
                  className="bg-[#b33000]  font-semibold py-2 px-4 rounded-lg hover:bg-[#ff4500] transition duration-300 shadow-md hover:shadow-lg hover:text-white cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                >
                  Add to Cart
                </Button>
              ) : (
                <Button
                  disabled
                  className="bg-white text-black font-semibold py-2 px-4 rounded-lg hover:bg-gray-800 hover: transition duration-300 shadow-md hover:shadow-lg hover:text-white cursor-pointer"
                >
                  Add to Cart
                </Button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductDetails;
