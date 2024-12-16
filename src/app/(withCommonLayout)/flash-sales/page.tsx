"use client";

import { ImSpinner6 } from "react-icons/im";

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
              <ImSpinner6 className="animate-spin m-auto" size={28} />{" "}
              Loading...
            </div>
          </div>
        ) : (
          <>
            {/* Show message if no products available */}
            {flashSalesProducts?.length === 0 ? (
              <p className="flex justify-center items-center min-h-[50vh] my-auto text-xl font-medium">
                flash sales products not aboailvale
              </p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-5 py-24">
                {flashSalesProducts
                  ?.slice(0, 6)
                  .map((flashSalesProduct: any) => (
                    <ProductCard
                      key={flashSalesProduct.id}
                      product={flashSalesProduct}
                    />
                  ))}
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default FlashSalesPage;
