"use client";

import Container from "@/src/components/ui/Container";
import ProductCard from "@/src/components/ui/ProductCard";
import { useGetAllFlashSalesProductsQuery } from "@/src/redux/features/flashSales/flashSales";

const FlashSalesSection = () => {
  const { data, isLoading } = useGetAllFlashSalesProductsQuery("");
  const flashSalesProducts = data?.data;

  return (
    <div className="min-h-[50vh] m-1 bg-white">
      <Container>
        <h2 className="text-center border-b w-fit  text-2xl my-6">
          Flash Sales
        </h2>
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
