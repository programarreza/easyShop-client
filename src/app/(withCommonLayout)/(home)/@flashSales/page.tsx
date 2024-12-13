"use client";

import Link from "next/link";

import Container from "@/src/components/ui/Container";
import ProductCard from "@/src/components/ui/ProductCard";
import { useGetAllFlashSalesProductsQuery } from "@/src/redux/features/flashSales/flashSales";

const FlashSalesSection = () => {
  const { data, isLoading } = useGetAllFlashSalesProductsQuery("");
  const flashSalesProducts = data?.data;

  return (
    <div className="min-h-[50vh] m-1 bg-[#F2F4F8]">
      <Container>
        <div>
          <div className="text-center border-b w-full  text-2xl py-8 flex justify-between items-center">
            <p>Flash Sales</p>
            <Link href={"/flash-sales"}>
              <button
                className="w-fit py-1 my-3 px-6 border-2 rounded-lg hover:bg-gray-200"
                type="submit"
              >
                Shop all products
              </button>
            </Link>
          </div>
        </div>
        {isLoading ? (
          // Full page loader for initial load
          <div className="flex justify-center items-center h-screen">
            <div className="loader flex justify-center items-center ">
              Loading...
            </div>
          </div>
        ) : (
          <>
            {/* Show message if no products available */}

            <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-5 pb-12 ">
              {flashSalesProducts
                ?.slice(0, 6)
                .map((flashSalesProduct: any) => (
                  <ProductCard
                    key={flashSalesProduct.id}
                    product={flashSalesProduct}
                  />
                ))}
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default FlashSalesSection;
