"use client";

import Link from "next/link";

import CartDetails from "@/src/components/order/CartDetails";
import OrderSummary from "@/src/components/order/OrderSummary";
import Container from "@/src/components/ui/Container";
import { useAppSelector } from "@/src/redux/hooks";

const Cart = () => {
  const products = useAppSelector((store) => store?.cart?.products);

  return (
    <div className="bg-[#F2F4F8]  min-h-screen pt-24">
      <Container>
        {products?.length ? (
          <div className="flex gap-6 lg:gap-4 lg:flex-row flex-col-reverse  justify-between">
            <div>
              {products.length &&
                products.map((product: any) => (
                  <CartDetails key={product._id} product={product} />
                ))}
            </div>
            <div>
              <OrderSummary />
            </div>
          </div>
        ) : (
          <div className="h-screen bg-[#F2F4F8] flex flex-col justify-center items-center gap-4 ">
            <h2 className="">There are no items in this cart</h2>
            <Link href={"/products"}>
              <button className="bg-[#b33000]  font-semibold py-1.5 px-2 rounded-lg hover:bg-[#ff4500] transition duration-300 shadow-md hover:shadow-lg">
                Continue shopping
              </button>
            </Link>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Cart;
