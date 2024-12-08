"use client";

import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import RWForm from "@/src/components/form/RWForm";
import RWInput from "@/src/components/form/RWInput";
import { useGetCategoriesQuery } from "@/src/redux/features/categories/categoriesApi";
import { useCreateProductMutation } from "@/src/redux/features/product/productApi";

const CreateProductPage = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const { data } = useGetCategoriesQuery("");
  const categoriesFields = data?.data;

  const categoryFiled = [
    { key: "ACTIVE", label: "Active" },
    { key: "BLOCKED", label: "Blocked" },
    { key: "SUSPENDED", label: "suspended" },
  ];

  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Processing please wait ...");

    try {
      const formData = new FormData();
      const jsonData = {
        name: data.name,
        description: data.description,
        categoryId: selectedValue,
        inventoryCount: Number(data.inventoryCount),
        discount: Number(data.discount),
        price: Number(data.price),
      };

      formData.append("data", JSON.stringify(jsonData));
      formData.append("image", data.image);

      const res = await createProduct(formData).unwrap();

      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 1000 });
        router.push("/vendor-dashboard/my-products");
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
                  <h3>create product</h3>
                </div>

                <RWForm onSubmit={onSubmit}>
                  {/* name and description */}
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

                  {/* price and discount */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="py-1">
                      <RWInput label="Price" name="price" type="number" />
                    </div>
                    <div className="py-1">
                      <RWInput
                        label="Discount (%)"
                        name="discount"
                        type="number"
                      />
                    </div>
                  </div>

                  {/* inventoryCount and categoryId */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="py-1">
                      <RWInput
                        label="Inventory Count"
                        name="inventoryCount"
                        type="number"
                      />
                    </div>

                    <div className="py-1">
                      <Select
                        className=""
                        items={categoryFiled}
                        label="Select Category"
                        selectedKeys={new Set([selectedValue])}
                        variant="bordered"
                        onSelectionChange={(keys) => {
                          const selected = Array.from(keys).join("");

                          setSelectedValue(selected); // Update the state with the string value
                        }}
                      >
                        {categoriesFields?.map((item: any) => (
                          <SelectItem key={item?.id}>{item?.name}</SelectItem>
                        ))}
                      </Select>
                    </div>
                  </div>

                  <div className="py-1">
                    <Controller
                      name="image"
                      render={({ field: { onChange, value, ...field } }) => (
                        <Input
                          required={true}
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

export default CreateProductPage;
