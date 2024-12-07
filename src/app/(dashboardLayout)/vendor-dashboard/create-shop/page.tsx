"use client";

import { Input } from "@nextui-org/input";
import { useRouter } from "next/navigation";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import RWForm from "@/src/components/form/RWForm";
import RWInput from "@/src/components/form/RWInput";
import {
  useCreateShopMutation,
  useGetMyShopQuery,
  useUpdateMyShopMutation,
} from "@/src/redux/features/shop/shopApi";

const CreateShopPage = () => {
  const [createShop, { isLoading }] = useCreateShopMutation();
  const [updateShop] = useUpdateMyShopMutation();
  const { data } = useGetMyShopQuery("");

  const router = useRouter();
  const shopData = data?.data;

  const defaultValues = {
    name: shopData?.name || "",
    description: shopData?.description || "",
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Processing please wait ...");

    try {
      const formData = new FormData();
      const jsonData = {
        name: data.name,
        description: data.description,
      };

      formData.append("data", JSON.stringify(jsonData));

      if (data.image) {
        formData.append("image", data.image);
      } else if (shopData?.logo) {
        formData.append("image", shopData?.logo);
      }

      let res;

      if (shopData) {
        res = await updateShop(formData).unwrap();
      } else {
        res = await createShop(formData).unwrap();
      }
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 1000 });
        router.push("/admin-dashboard");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong", {
        id: toastId,
        duration: 1000,
      });
    }
  };

  return (
    <div className=" text-black bg-[#F2F4F8]">
      <div className=" min-h-screen ">
        <div className="w-full flex flex-col justify-center items-center my-auto">
          <div className="hero">
            <div className=" flex flex-col md:flex-row  rounded-xl justify-between">
              {/* form area */}
              <div className="lg:w-[800px] bg-white border mt-24  rounded-xl p-12 ">
                <div className="text-center py-8 text-2xl font-semibold">
                  <h3>{shopData ? "Update shop" : "Create shop"}</h3>
                </div>

                <RWForm defaultValues={defaultValues} onSubmit={onSubmit}>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="py-1">
                      <RWInput label="Name" name="name" type="text" />
                    </div>
                    <div className="py-1">
                      <RWInput
                        label="Description"
                        name="description"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="py-1">
                    <Controller
                      name="image"
                      render={({ field: { onChange, value, ...field } }) => (
                        <Input
                          required={!shopData}
                          type="file"
                          value={value?.fileName}
                          {...field}
                          className=" bg-none bg-transparent cursor-pointer w-full border p-1 mt-3 border-dashed "
                          label="Select Shop Logo"
                          radius="none"
                          onChange={(e) => onChange(e.target.files?.[0])}
                        />
                      )}
                    />
                  </div>

                  <button
                    className="w-full py-3 my-4 px-6 border rounded-lg hover:bg-gray-200"
                    type="submit"
                  >
                    {isLoading ? "Sending...." : "Submit now"}
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

export default CreateShopPage;
