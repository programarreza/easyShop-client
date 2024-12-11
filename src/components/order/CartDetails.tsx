// import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { FaRegStar, FaStar } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { FiMinus, FiPlus } from "react-icons/fi";
import { MdDeleteSweep } from "react-icons/md";
import Rating from "react-rating";

import { removeFromCart, updateQuantity } from "@/src/redux/features/cartSlice";
import { useAppDispatch } from "@/src/redux/hooks";

const CartDetails = ({ product }: { product: any }) => {
  const dispatch = useAppDispatch();

  const handleQuantity = (type: string, id: string) => {
    if (type === "increment" && product.quantity < 5) {
      const payload = { type, id };

      dispatch(updateQuantity(payload));
    } else if (type === "decrement" && product.quantity > 1) {
      const payload = { type, id };

      dispatch(updateQuantity(payload));
    }
  };

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    dispatch(removeFromCart({ id }));
  };

  const discountedPrice =
    product?.price && product?.discount
      ? product?.price * (1 - product?.discount / 100)
      : 0;

  return (
    <div className="">
      {/* product info */}
      <div className="flex flex-col md:flex-row lg:gap-6 xl:gap-32 items-center border mb-4 justify-between p-2 shadow-md rounded-md bg-white">
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <Image
            alt="product image"
            className="size-full md:size-28"
            height={500}
            src={product?.images}
            width={500}
          />
          <div>
            <h3 className="text-2xl font-semibold">
              {product.name.length > 25
                ? `${product.name.substring(0, 25)}...`
                : product.name}
            </h3>
            <p>
              <span className="text-gray-600">Category:</span>{" "}
              {product?.categories?.name}
            </p>
            <p>
              <span className="text-gray-600">Shop name:</span>{" "}
              {product?.shop?.name}
            </p>
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

        <div className=" flex justify-between items-center gap-44 md:gap-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FaBangladeshiTakaSign />
              {product?.discount > 0 ? (
                <p className="text-xl">{discountedPrice?.toFixed(0)}</p>
              ) : (
                <p className="text-xl">{product?.price}</p>
              )}
            </div>
            <button
              className="bg-red-600  p-1 rounded-full hover:bg-red-700"
              onClick={(e) => handleRemove(e, product.id)}
            >
              <MdDeleteSweep color="#fff" size={20} />
            </button>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <button
                className=" font-semibold py-1.5 px-2 rounded-lg hover:bg-gray-200 transition duration-300 shadow-md hover:shadow-lg"
                disabled={product.quantity <= 1}
                onClick={() => handleQuantity("decrement", product.id)}
              >
                <FiMinus size={18} />
              </button>
              <span className="text-lg font-semibold">{product.quantity}</span>
              <button
                className=" font-semibold py-1.5 px-3 rounded-lg hover:bg-gray-200 transition duration-300 shadow-md hover:shadow-lg"
                disabled={product.quantity >= 5}
                onClick={() => handleQuantity("increment", product.id)}
              >
                <FiPlus size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
