/* eslint-disable prettier/prettier */
"use client";

import Image from "next/image";
import Link from "next/link";
import { FaRegStar, FaStar } from "react-icons/fa6";
import Rating from "react-rating";

const ProductCard = ({ product }: any) => {
  const discountedPrice =
    product?.price && product?.discount
      ? product?.price * (1 - product?.discount / 100)
      : 0;

  return (
    <>
      <Link href={`/products/details?id=${product?.id}`}>
        <div className="rounded-lg shadow-xl flex flex-col justify-between h-72 bg-white">
          <div className="relative h-[150px] overflow-hidden">
            <Image
              alt="Product image"
              height={500}
              src={product?.images}
              width={500}
            />
          </div>
          <div className="relative p-3 flex-grow">
            <div className="flex justify-between text-sm pb-2 mb-1 border-gray-700 font-semibold">
              <span>
                {product?.name?.length > 45
                  ? `${product.name.substring(0, 45)}`
                  : product?.name}
              </span>
            </div>

            {/* price */}
            <div className="flex gap-6 items-center">
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
                <p className="text-xl">{discountedPrice.toFixed(0)}</p>
              </div>
              <p className="text-sm text-gray-700">-{product.discount}%</p>
            </div>

            {/* rating */}
            <div>
              <Rating
                readonly
                emptySymbol={<FaRegStar className="text-gray-400" />}
                fullSymbol={<FaStar className="text-yellow-500" />}
                initialRating={product?.rating}
              />
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
