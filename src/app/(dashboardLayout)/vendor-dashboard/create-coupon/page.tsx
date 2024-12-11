"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import CalenderRange from "@/src/components/dashboard/Calender/Calender";
import RWForm from "@/src/components/form/RWForm";
import RWInput from "@/src/components/form/RWInput";
import { useCreateCouponMutation } from "@/src/redux/features/coupon/couponApi";

const CreateCouponPage = () => {
  const router = useRouter();
  const [createCoupon] = useCreateCouponMutation();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    try {
      const couponData = {
        code: data.code,
        discount: Number(data.discount),
        validFrom: new Date(startDate).toISOString(),
        validTo: new Date(endDate).toISOString(),
      };

      const res = await createCoupon(couponData).unwrap();

      if (res.success) {
        router.push("/vendor-dashboard/my-coupon");
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
                  <h3>Create Coupon</h3>
                </div>
                <RWForm onSubmit={onSubmit}>
                  <div className="flex gap-4">
                    <div className="py-1">
                      <RWInput
                        required
                        label="Discount code"
                        name="code"
                        type="text"
                      />
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

export default CreateCouponPage;
