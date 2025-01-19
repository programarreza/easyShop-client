"use client";

import { useState } from "react";
import { toast } from "sonner";

const Subscribe = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading("Please wait");

    try {
      toast.success("Thank you for subscribing!", {
        id: toastId,
        duration: 2000,
      });
      setEmail("");
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong", {
        id: toastId,
        duration: 1000,
      });
    }
  };

  return (
    <div className="bg-[#F2F4F8] text-white">
      <div className="min-h-[40vh] bg-[#F2F4F8] xl:mb-0 py-12">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="hero">
            <div className="flex flex-col md:flex-row rounded-xl justify-between">
              {/* Form area */}
              <div className="lg:w-[650px] bg-white text-black rounded-xl p-6">
                <div className="text-center py-8 text-2xl font-semibold">
                  <h3>Stay Ahead with Exclusive Deals!</h3>
                  <p className="text-gray-500 text-sm">
                    Get early access to special discounts, new arrivals, and
                    exclusive offers! Subscribe now and never miss out on the
                    best deals for your favorite products. 🎉
                  </p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="flex gap-3 justify-center">
                    <div className="w-full mt-3">
                      <div className="py-1 w-full">
                        <input
                          required
                          className="w-full p-2 border rounded-lg"
                          placeholder="Enter your email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <button
                      className="w-fit h-fit py-2 my-4 px-6 border rounded-lg hover:bg-white bg-gray-200"
                      type="submit"
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
