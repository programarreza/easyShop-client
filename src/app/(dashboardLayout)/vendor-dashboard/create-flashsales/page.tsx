"use client";

import { Select, SelectItem } from "@nextui-org/select";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import CalenderRange from "@/src/components/dashboard/Calender/Calender";
import RWForm from "@/src/components/form/RWForm";
import RWInput from "@/src/components/form/RWInput";
import { useCreateFlashSalesMutation } from "@/src/redux/features/flashSales/flashSales";
import { useGetMyShopProductsQuery } from "@/src/redux/features/product/productApi";

const CreateFlashSales = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const router = useRouter();
  const { data } = useGetMyShopProductsQuery("");
  const productsFields = data?.data;

  const [createFlashSales] = useCreateFlashSalesMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    try {
      const flashSalesProductData = {
        id: selectedValue,
        discount: Number(data.discount || 0),
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
      };

      const res = await createFlashSales(flashSalesProductData).unwrap();

      if (res.success) {
        router.push("/vendor-dashboard/flashsales-products");
        toast.success(res?.message, { id: toastId, duration: 1000 });
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong", {
        id: toastId,
        duration: 1000,
      });
    }
  };

  // Function to handle date range change
  const handleDateChange = (range: any) => {
    setStartDate(range.startDate);
    setEndDate(range.endDate);
  };

  return (
    <div className="text-black bg-[#F2F4F8] ">
      <div className="min-h-screen">
        <div className="w-full flex flex-col justify-center items-center my-auto">
          <div className="hero">
            <div className="flex flex-col md:flex-row rounded-xl justify-between ">
              {/* form area */}
              <div className="lg:w-[550px] bg-white border rounded-xl px-12">
                <div className="text-center py-2 text-2xl font-semibold">
                  <h3>Create Sales product</h3>
                </div>
                <RWForm onSubmit={onSubmit}>
                  <div className="">
                    <div className="py-1">
                      <Select
                        className=""
                        items={productsFields}
                        label="Select My Products"
                        selectedKeys={new Set([selectedValue])}
                        variant="bordered"
                        onSelectionChange={(keys) => {
                          const selected = Array.from(keys).join("");

                          setSelectedValue(selected); // Update the state with the string value
                        }}
                      >
                        {productsFields?.map((item: any) => (
                          <SelectItem key={item?.id}>{item?.name}</SelectItem>
                        ))}
                      </Select>
                    </div>
                    <div className="py-1">
                      <RWInput
                        required
                        label="Discount (%)"
                        name="discount"
                        type="number"
                      />
                    </div>
                  </div>

                  {/* Date Range Picker for validFrom and validTo */}
                  <div className="py-1">
                    <h2 className="block text-sm font-semibold mb-2">
                      Validity Period
                    </h2>
                    <CalenderRange onDateChange={handleDateChange} />
                  </div>

                  <button
                    className="w-full py-3 my-4 px-6 border rounded-lg hover:bg-gray-200"
                    type="submit"
                  >
                    Submit
                  </button>
                </RWForm>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFlashSales;
