"use client";

import Container from "@/src/components/ui/Container";
import ProductCard from "@/src/components/ui/ProductCard";
import { useGetAllFlashSalesProductsQuery } from "@/src/redux/features/flashSales/flashSales";

const FlashSalesPage = () => {
  const { data, isLoading } = useGetAllFlashSalesProductsQuery("");
  const flashSalesProducts = data?.data;

  return (
    <div className="min-h-screen m-1">
      <Container>
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

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6  gap-5 py-24 min-h-screen">
              {flashSalesProducts?.map((flashSalesProduct: any) => (
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

export default FlashSalesPage;
