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
      <div className="space-x-2">
        <input
          className="border p-2 rounded-md"
          placeholder="Enter Coupon Code"
          type="text"
          value={customerProvidedCoupon}
          onChange={(e) => setCustomerProvidedCoupon(e.target.value)}
        />
        <button
          className=" py-2 my-2 px-1 border rounded-lg hover:bg-gray-200"
          onClick={handleApplyCoupon}
        >
          Apply Coupon
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
