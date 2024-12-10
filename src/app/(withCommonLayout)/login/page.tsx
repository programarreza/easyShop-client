/* eslint-disable react/no-unescaped-entities */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import RWForm from "@/src/components/form/RWForm";
import RWInput from "@/src/components/form/RWInput";
import { useLoginMutation } from "@/src/redux/features/auth/authApi";
import { setUser } from "@/src/redux/features/auth/authSlice";
import { useAppDispatch } from "@/src/redux/hooks";
import loginValidationSchema from "@/src/schemas/login.schema";
import { TUser } from "@/src/types";
import { verifyToken } from "@/src/utils/verifyToken";

const LoginPage = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Logging in");

    try {
      const userData = {
        email: data.email,
        password: data.password,
      };

      const res = await login(userData).unwrap();
      const user = verifyToken(res?.data?.accessToken) as TUser;

      if (res.success) {
        dispatch(setUser({ user: user, token: res?.data?.accessToken }));
        router.push("/");
        toast.success("Logged in", { id: toastId, duration: 1000 });
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
                  <h3>Welcome Back</h3>
                  <p className="text-medium">Please login now</p>
                </div>
                <RWForm
                  resolver={zodResolver(loginValidationSchema)}
                  onSubmit={onSubmit}
                >
                  <div className="">
                    <div className="py-1">
                      <RWInput label="Email" name="email" type="email" />
                    </div>
                    <div className="py-1">
                      <RWInput
                        label="Password"
                        name="password"
                        type="password"
                      />
                    </div>
                  </div>

                  <button
                    className="w-full py-3 my-4 px-6 border rounded-lg hover:bg-gray-200"
                    type="submit"
                  >
                    Login
                  </button>
                </RWForm>

                <div className="text-center">
                  Don't have an account?{" "}
                  <Link className="underline" href={"/register"}>
                    Register Now
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

export default LoginPage;
