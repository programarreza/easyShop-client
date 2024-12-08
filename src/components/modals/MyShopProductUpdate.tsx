import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/modal";
import { Select, SelectItem } from "@nextui-org/select";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import RWForm from "../form/RWForm";
import RWInput from "../form/RWInput";

import { useGetCategoriesQuery } from "@/src/redux/features/categories/categoriesApi";
import { useUpdateMyShopProductMutation } from "@/src/redux/features/product/productApi";

const MyShopProductUpdate = ({ product }: any) => {
  const [updateProduct, { isLoading }] = useUpdateMyShopProductMutation();
  const { data } = useGetCategoriesQuery("");
  const categoriesFields = data?.data;

  const [selectedValue, setSelectedValue] = useState(
    product?.categoryId || categoriesFields?.[0]?.id || ""
  );
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const router = useRouter();

  const defaultValues = {
    name: product.name,
    description: product.description,
    inventoryCount: Number(product.inventoryCount),
    discount: Number(product.discount),
    price: Number(product.price),
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Processing please wait ...");

    try {
      const formData = new FormData();
      const jsonData = {
        name: data.name || product.name,
        description: data.description || product.description,
        categoryId: selectedValue || product?.categoryId,
        inventoryCount:
          Number(data.inventoryCount) || Number(product.inventoryCount),
        discount: Number(data.discount) || Number(product.discount),
        price: Number(data.price) || Number(product.price),
      };

      formData.append("data", JSON.stringify(jsonData));

      if (data.image) {
        formData.append("image", data.image);
      } else if (product.images) {
        formData.append("image", product.images);
      }

      const args = {
        productId: product?.id,
        productData: formData,
      };

      const res = await updateProduct(args).unwrap();

      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 1000 });
        router.push("/vendor-dashboard/my-products");
        onClose();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong", {
        id: toastId,
        duration: 1000,
      });
    }
  };

  return (
    <>
      <Button className="bg-transparent " size="sm" onPress={onOpen}>
        <svg
          className="size-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
          <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
        </svg>
      </Button>
      <Modal
        className="bg-white"
        isOpen={isOpen}
        size="2xl"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <ModalBody>
              {/* form area */}
              <div className=" bg-white  rounded-xl p-5">
                <div className="text-center py-8 text-2xl font-semibold">
                  <h3> Update product </h3>
                </div>

                <RWForm defaultValues={defaultValues} onSubmit={onSubmit}>
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
                        items={categoriesFields}
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
                          required={false}
                          type="file"
                          value={value?.fileName}
                          {...field}
                          className=" bg-none bg-transparent cursor-pointer w-full border p-1 mt-3 border-dashed "
                          label="Select Shop Logo (OPTIONAL)"
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
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default MyShopProductUpdate;
