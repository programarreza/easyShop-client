"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/modal";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { useUpdateCategoryMutation } from "@/src/redux/features/categories/categoriesApi";
import RWInput from "@/src/components/form/RWInput";
import RWForm from "@/src/components/form/RWForm";

const UpdateCategories = ({ category }: any) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [updateCategory] = useUpdateCategoryMutation();

  const defaultValues = {
    name: category?.name || "",
    description: category?.description || "",
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("category updating...");

    try {
      const formData = new FormData();
      const jsonData = {
        name: data.name,
        description: data.description,
      };

      formData.append("data", JSON.stringify(jsonData));

      if (data.image) {
        formData.append("image", data.image);
      } else if (category?.images) {
        formData.append("image", category.images);
      }

      const args = {
        categoryData: formData,
        categoryId: category?.id,
      };

      const res = await updateCategory(args).unwrap();

      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 1000 });
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
      <Button className="p-0 m-0 w-0 bg-transparent " onPress={onOpen}>
        <svg
          className="size-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
          <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
        </svg>
        Edit
      </Button>
      <Modal
        className="bg-white"
        isOpen={isOpen}
        size="2xl"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                {/* form area */}
                <div className=" bg-white  rounded-xl p-5">
                  <div className="text-center py-8 text-2xl font-semibold">
                    <h3> Update category</h3>
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

                    <div className="flex justify-center items-center gap-3">
                      <div className="flex-1">
                        <Controller
                          name="image"
                          render={({
                            field: { onChange, value, ...field },
                          }) => (
                            <Input
                              type="file"
                              value={value?.fileName}
                              {...field}
                              className=" bg-none bg-transparent cursor-pointer w-full border p-1 mt-3 border-dashed "
                              label="Select category image"
                              radius="none"
                              onChange={(e) => onChange(e.target.files?.[0])}
                            />
                          )}
                        />
                      </div>
                    </div>

                    <button
                      className="w-full py-3 my-4 px-6 border rounded-lg hover:bg-gray-200"
                      type="submit"
                    >
                      Submit Now
                    </button>
                  </RWForm>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateCategories;
