import Link from "next/link";
import { useState } from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

import { applyCoupon } from "@/src/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";

const OrderSummary = () => {
  const [customerProvidedCoupon, setCustomerProvidedCoupon] = useState("");
  const dispatch = useAppDispatch();
  const { totalPrice, grandTotal, discount, selectedItems } = useAppSelector(
    (store) => store.cart,
  );

  const handleApplyCoupon = () => {
    dispatch(applyCoupon({ couponCode: customerProvidedCoupon }));
  };

  return (
    <div className="p-2 shadow-md rounded-md bg-white">
      <h2 className="text-xl text-center font-semibold py-3">Order Summary</h2>
      <div className="space-y-2">
        <p>Selected Items: {selectedItems}</p>
        <div className="flex items-center">
          <p>Total Price: {totalPrice?.toFixed(2)}</p>{" "}
          <FaBangladeshiTakaSign size={15} />
        </div>
        {discount > 0 && (
          <p className="flex items-center">
            Discount: {discount?.toFixed(2)} <FaBangladeshiTakaSign size={15} />
          </p>
        )}

        <div className="flex items-center">
          <p>Grand Total: {grandTotal?.toFixed(2)}</p>{" "}
          <FaBangladeshiTakaSign size={15} />
        </div>
      </div>
      {/* coupon area */}
      <div className="space-x-2  flex justify-center items-center">
        <input
          className="border p-2 rounded-md"
          placeholder="Enter Coupon Code"
          type="text"
          value={customerProvidedCoupon}
          onChange={(e) => setCustomerProvidedCoupon(e.target.value)}
        />
        <button
          className="w-fit py-2 my-2 px-1 border rounded-lg hover:bg-gray-200"
          onClick={handleApplyCoupon}
        >
          Apply Coupon
        </button>
      </div>

      {/* process btn */}
      <Link href={"/cart/checkout"}>
        <button
          className="w-full py-2 my-4 px-6 border rounded-lg hover:bg-gray-200"
          type="submit"
        >
          Confirm Order
        </button>
      </Link>
    </div>
  );
};

export default OrderSummary;
