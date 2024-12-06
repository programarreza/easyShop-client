"use client";

import RWForm from "@/src/components/form/RWForm";
import RWInput from "@/src/components/form/RWInput";
import { useRegisterMutation } from "@/src/redux/features/auth/authApi";
import registerValidationSchema from "@/src/schemas/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

const RegisterPage = () => {
  const [register] = useRegisterMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Registering...");

    try {
      const formData = new FormData();
      const jsonData = {
        name: data.name,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        address: data.address,
      };

      formData.append("data", JSON.stringify(jsonData));
      formData.append("profilePhoto", data.image);

      const res = await register(formData).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 1000 });
        router.push("/login");
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
              <div className="lg:w-[600px] bg-white border mt-24  rounded-xl p-12 ">
                <div className="text-center py-8 text-2xl font-semibold">
                  <h3>Welcome To EasyShop</h3>
                  <p className="text-medium">Please register</p>
                </div>

                <RWForm
                  resolver={zodResolver(registerValidationSchema)}
                  onSubmit={onSubmit}
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div className="py-1">
                      <RWInput name="name" type="text" label="Name" />
                    </div>
                    <div className="py-1">
                      <RWInput name="email" type="email" label="Email" />
                    </div>
                    <div className="py-1">
                      <RWInput
                        name="phoneNumber"
                        type="text"
                        label="Mobile Number"
                      />
                    </div>
                    <div className="py-1">
                      <RWInput
                        name="password"
                        type="password"
                        label="Password"
                      />
                    </div>
                    <div className="py-1 mt-2">
                      <RWInput name="address" type="text" label="Address" />
                    </div>
                    <div className="py-1">
                      <Controller
                        name="profilePhoto"
                        render={({ field: { onChange, value, ...field } }) => (
                          <Input
                            type="file"
                            required
                            value={value?.fileName}
                            {...field}
                            onChange={(e) => onChange(e.target.files?.[0])}
                            className=" bg-none bg-transparent cursor-pointer"
                            label="Select profile photo"
                          />
                        )}
                      />
                    </div>
                  </div>

                  <button
                    className="w-full py-3 my-4 px-6 border rounded-lg hover:bg-gray-200"
                    type="submit"
                  >
                    Register
                  </button>
                </RWForm>

                <div className="text-center">
                  Already have an account?{" "}
                  <Link className="underline" href={"/login"}>
                    Login Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
