"use client";

import { Button } from "@nextui-org/button";
import Image from "next/image";
import { FaRegStar, FaStar } from "react-icons/fa6";
import Rating from "react-rating";
import { useSelector } from "react-redux";
import { toast } from "sonner";

import Container from "@/src/components/ui/Container";
import useLoggedUser from "@/src/hooks/auth.hook";
import { addToCart } from "@/src/redux/features/cartSlice";
import { useAppDispatch } from "@/src/redux/hooks";

const ComparePage = () => {
  const compareProducts = useSelector(
    (state: any) => state.cart.compareProducts
  );

  const { user, selectedUser } = useLoggedUser();
  const dispatch = useAppDispatch();

  const handleAddToCart = (product: any) => {
    if (selectedUser) {
      if (user.role === "CUSTOMER") {
        dispatch(addToCart(product));
        toast.success(" Added to cart successfully!", { duration: 2000 });
      } else {
        toast.error("product purchase permeation only customers ");
      }
    }
  };

  return (
    <div>
      <Container>
        <div className="mt-12 grid grid-cols-3">
          {compareProducts?.map((product: any, index: number) => (
            <div key={index} className="shadow-xl mx-4 rounded-md">
              <div className=" max-w-96 p-3 ">
                <Image
                  alt={product?.name}
                  height={300}
                  src={product?.images}
                  width={300}
                />

                <p className="border-b h-16 ">
                  {product?.name.length > 80
                    ? `${product?.name.substring(0, 80)}...`
                    : product?.name}
                </p>
                <p className="border-b  py-2">Price: {product?.price}</p>
                <p className="border-b  py-2">
                  Category: {product?.categories?.name}
                </p>
                <div className="border-b  py-2 flex gap-2">
                  <p>Rating:</p>
                  <div className="mt-1">
                    <Rating
                      readonly
                      emptySymbol={<FaRegStar className="text-gray-400" />}
                      fullSymbol={<FaStar className="text-yellow-500" />}
                      initialRating={product?.rating}
                    />
                  </div>
                </div>
              </div>
              {/* Button container pinned to the bottom */}
              <div className="px-2 mt-auto flex justify-between items-center">
                {product?.inventoryCount > 0 ? (
                  <Button
                    className="w-full py-3 my-4 px-6 border rounded-lg hover:bg-gray-200"
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
                    className="w-full bg-white text-black font-semibold py-2 px-4 rounded-lg hover:bg-gray-800 hover: transition duration-300 shadow-md hover:shadow-lg hover:text-white"
                  >
                    Add to Cart
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ComparePage;
