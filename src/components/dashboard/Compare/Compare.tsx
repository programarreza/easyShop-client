"use client";

import { Select, SelectItem } from "@nextui-org/select";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import RWForm from "@/src/components/form/RWForm";
import { setCompareProducts } from "@/src/redux/features/cartSlice";
import {
  useCompareProductsMutation,
  useGetAllProductsQuery,
} from "@/src/redux/features/product/productApi";

const Compare = () => {
  const [selectedValue1, setSelectedValue1] = useState<string>("");
  const [selectedValue2, setSelectedValue2] = useState<string>("");
  const [selectedValue3, setSelectedValue3] = useState<string>("");
  const router = useRouter();
  const dispatch = useDispatch();

  const { data } = useGetAllProductsQuery("");
  const productsFields = data?.data?.data;

  const [compareProduct] = useCompareProductsMutation();

  const onSubmit: SubmitHandler<FieldValues> = async () => {
    const toastId = toast.loading("Comparing products...");

    try {
      const compareProductData = {
        productIds: [selectedValue1, selectedValue2, selectedValue3],
      };

      const res = await compareProduct(compareProductData).unwrap();

      if (res.success) {
        dispatch(setCompareProducts(res?.data));
        toast.success("Products compared successfully!", {
          id: toastId,
          duration: 1000,
        });
        router.push("/products/compare");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong", {
        id: toastId,
        duration: 1000,
      });
    }
  };

  return (
    <div className=" w-full flex justify-center pt-16">
      {/* Form area */}
      <div className="w-full lg:w-[350px] bg-white rounded-xl px-2 shadow-lg">
        <div className="text-center py-4 text-2xl font-semibold">
          <h3>Compare Products</h3>
          <h3 className="text-sm font-normal">
            Choose Two or Three Products to Compare
          </h3>
        </div>
        <RWForm onSubmit={onSubmit}>
          <div className="space-y-4">
            {/* Product 1 Select */}
            <div>
              <Select
                items={productsFields}
                label="Select Product 1"
                selectedKeys={
                  selectedValue1 ? new Set([selectedValue1]) : undefined
                }
                variant="bordered"
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys).join("");

                  setSelectedValue1(selected);
                }}
              >
                {productsFields?.map((item: any) => (
                  <SelectItem key={item?.id} className="h-[30px]">
                    {item?.name}
                  </SelectItem>
                ))}
              </Select>
            </div>

            {/* Product 2 Select */}
            <div>
              <Select
                items={productsFields}
                label="Select Product 2"
                selectedKeys={
                  selectedValue2 ? new Set([selectedValue2]) : undefined
                }
                variant="bordered"
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys).join("");

                  setSelectedValue2(selected);
                }}
              >
                {productsFields?.map((item: any) => (
                  <SelectItem key={item?.id}>{item?.name}</SelectItem>
                ))}
              </Select>
            </div>

            {/* Product 3 Select */}
            <div>
              <Select
                items={productsFields}
                label="Select Product 3"
                selectedKeys={
                  selectedValue3 ? new Set([selectedValue3]) : undefined
                }
                variant="bordered"
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys).join("");

                  setSelectedValue3(selected);
                }}
              >
                {productsFields?.map((item: any) => (
                  <SelectItem key={item?.id}>{item?.name}</SelectItem>
                ))}
              </Select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            className="w-full my-6 py-3 px-6 border rounded-lg bg-gray-200 hover:bg-gray-100"
            type="submit"
          >
            Compare
          </button>
        </RWForm>
      </div>
    </div>
  );
};

export default Compare;
