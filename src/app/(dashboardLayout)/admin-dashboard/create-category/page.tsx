"use client";

import { Input } from "@nextui-org/input";
import { useRouter } from "next/navigation";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { useCreateCategoryMutation } from "@/src/redux/features/categories/categoriesApi";
import RWInput from "@/src/components/form/RWInput";
import RWForm from "@/src/components/form/RWForm";

const CreateCategoryPage = () => {
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    try {
      const formData = new FormData();
      const jsonData = {
        name: data.name,
        description: data.description,
      };

      formData.append("data", JSON.stringify(jsonData));
      formData.append("image", data.image);

      const res = await createCategory(formData).unwrap();

      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 1000 });
        router.push("/admin-dashboard/categories");
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
                  <h3>Create category</h3>
                </div>

                <RWForm onSubmit={onSubmit}>
                  <div className="grid lg:grid-cols-2 gap-3">
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
                          required
                          type="file"
                          value={value?.fileName}
                          {...field}
                          className=" bg-none bg-transparent cursor-pointer w-full border p-1 mt-3 border-dashed "
                          label="Select Category Image"
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

export default CreateCategoryPage;
