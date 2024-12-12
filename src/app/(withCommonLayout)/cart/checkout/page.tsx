"use client";

import Image from "next/image";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { ImSpinner6 } from "react-icons/im";
import { useDispatch } from "react-redux";

import logo1 from "@/src/assets/images/logo1.png";
import logo2 from "@/src/assets/images/logo2.png";
import logo3 from "@/src/assets/images/logo3.png";
import logo4 from "@/src/assets/images/logo4.png";
import logo5 from "@/src/assets/images/logo5.png";
import RWForm from "@/src/components/form/RWForm";
import RWInput from "@/src/components/form/RWInput";
import Container from "@/src/components/ui/Container";
import useLoggedUser from "@/src/hooks/auth.hook";
import { clearCart } from "@/src/redux/features/cartSlice";
import { useCreateOrderMutation } from "@/src/redux/features/order/orderApi";
import { useAppSelector } from "@/src/redux/hooks";

const CheckoutPage = () => {
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const dispatch = useDispatch();
  const user = useLoggedUser();
  const { totalPrice, grandTotal, discount, selectedItems, products } =
    useAppSelector((store) => store.cart);

  const couponDiscount = products[0]?.shop?.coupon?.discount;

  // Transform the products array
  const transformedProducts = Array.isArray(products)
    ? products.map((product) => ({
        id: product.id,
        quantity: product.quantity,
        price: product.price,
        discount: product.discount,
        shopId: product.shopId,
      }))
    : [];

  const defaultValues = {
    name: user?.name,
    phoneNumber: user?.phoneNumber,
    address: user?.address,
  };

  // Handle form submission
  const onSubmit: SubmitHandler<FieldValues> = async () => {};

  const handleCreateOrder = async (shopId: string) => {
    const orderData = {
      shopId,
      totalPrice: Number(totalPrice),
      discountedAmount: Number(discount?.toFixed(2)),
      discount: Number(couponDiscount) || 0,
      grandTotal: Number(grandTotal),
      items: transformedProducts,
    };

    const res = await createOrder(orderData);

    if (res?.data?.data?.result) {
      dispatch(clearCart());
      window.location.href = res?.data?.data?.payment_url;
    }
  };

  return (
    <div className="bg-[#F2F4F8] min-h-screen">
      <div className="flex justify-center items-center min-h-[90vh]">
        <Container>
          <div className="">
            {/* customer info */}
            <div>
              <div className="hero">
                <div className="hero-content">
                  {/* form area */}
                  <div className="flex-shrink-0 shadow-xl">
                    <div className=" rounded-md">
                      <div className="space-y-5 pb-5 grid lg:grid-cols-2 xl:grid-cols-3 gap-4  bg-white">
                        <RWForm
                          defaultValues={defaultValues}
                          onSubmit={onSubmit}
                        >
                          <div className="p-4 space-y-4 mt-5 pt-16 ">
                            <h2 className="text-center text-xl font-bold pb-0">
                              Customer Info
                            </h2>

                            <div className="form-control text-black">
                              <RWInput label="Name" name="name" size="sm" />
                            </div>
                            <div className="form-control text-black">
                              <RWInput
                                label="Phone number"
                                name="phoneNumber"
                                size="sm"
                              />
                            </div>
                            <div className="form-control text-black">
                              <RWInput
                                label="Address"
                                name="address"
                                size="sm"
                              />
                            </div>
                          </div>{" "}
                        </RWForm>

                        {/* payment method */}
                        <div className="py-12 ">
                          <h2 className="text-center text-xl font-bold mt-5">
                            Payment Method
                          </h2>

                          <div className="p-3">
                            <p className="text-xl font-semibold pt-8 pb-3">
                              We Accept:{" "}
                            </p>
                            <div>
                              <h2 className="uppercase pb-4">
                                Online payment system
                              </h2>
                            </div>
                            <div className="flex justify-between gap-2">
                              <Image
                                alt="logo1"
                                className="size-12"
                                height={50}
                                src={logo1}
                                width={50}
                              />
                              <Image
                                alt="logo2"
                                className="size-12"
                                height={50}
                                src={logo2}
                                width={50}
                              />
                              <Image
                                alt="logo3"
                                className="size-12"
                                height={50}
                                src={logo3}
                                width={50}
                              />
                              <Image
                                alt="logo4"
                                className="size-12"
                                height={50}
                                src={logo4}
                                width={50}
                              />
                              <Image
                                alt="logo5"
                                className="size-12"
                                height={50}
                                src={logo5}
                                width={50}
                              />
                              {/* <img
                                  alt="logo2"
                                  className="size-12"
                                  src={logo2}
                                />
                                <img
                                  alt="logo3"
                                  className="size-12"
                                  src={logo3}
                                />
                                <img
                                  alt="logo4"
                                  className="size-12"
                                  src={logo4}
                                />
                                <img
                                  alt="logo5"
                                  className="size-12"
                                  src={logo5}
                                /> */}
                            </div>
                          </div>
                        </div>

                        {/* order summary */}
                        <div className="p-2 rounded-md bg-white pt-14 ">
                          <h2 className="text-xl text-center font-semibold py-3">
                            Order Summary
                          </h2>
                          <div className="space-y-2">
                            <p>Selected Items: {selectedItems}</p>
                            <div className="flex items-center">
                              <p>Total Price: {totalPrice?.toFixed(2)}</p>{" "}
                              <FaBangladeshiTakaSign size={15} />
                            </div>
                            {discount > 0 && (
                              <p className="flex items-center">
                                Discount Amount: {discount?.toFixed(2)}{" "}
                                <FaBangladeshiTakaSign size={15} />
                              </p>
                            )}

                            <div className="flex items-center">
                              <p>Grand Total: {grandTotal?.toFixed(2)}</p>{" "}
                              <FaBangladeshiTakaSign size={15} />
                            </div>
                          </div>

                          <button
                            className="w-full py-2 my-4 px-6 border rounded-lg hover:bg-gray-200 "
                            onClick={() =>
                              handleCreateOrder(transformedProducts[0].shopId)
                            }
                          >
                            {isLoading ? (
                              <ImSpinner6
                                className="animate-spin m-auto"
                                size={28}
                              />
                            ) : (
                              <span className="">Confirm Order</span>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default CheckoutPage;
