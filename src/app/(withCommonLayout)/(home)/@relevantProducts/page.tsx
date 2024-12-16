"use client";

import { useEffect } from "react";
import { ImSpinner6 } from "react-icons/im";

import Container from "@/src/components/ui/Container";
import ProductCard from "@/src/components/ui/ProductCard";
import { useGetRelevantProductsMutation } from "@/src/redux/features/product/productApi";
import { useAppSelector } from "@/src/redux/hooks";

const RelevantProducts = () => {
  const { recentProducts } = useAppSelector((store) => store.cart);
  const [getRelevantData, { data, isLoading }] =
    useGetRelevantProductsMutation();

  useEffect(() => {
    if (recentProducts && recentProducts.length > 0) {
      const categoryIds = recentProducts.map(
        (product) => product?.categories?.id,
      );
      const uniqueCategoryIds = Array.from(new Set(categoryIds));

      getRelevantData({ categories: uniqueCategoryIds });
    }
  }, [recentProducts, getRelevantData]);

  const relevantProducts = data?.data;

  return (
    <div>
      <div className="min-h-[50vh] m-1  bg-[#F2F4F8]">
        <Container>
          <h2 className="text-center border-b w-fit  text-2xl py-8">
            Related productsd
          </h2>
          {isLoading ? (
            // Full page loader for initial load
            <div className="flex justify-center items-center min-h-[50vh]">
              <div className="flex w-fit mx-auto">
                <ImSpinner6 className="animate-spin m-auto" size={28} />
                <span>Loading...</span>
              </div>
            </div>
          ) : (
            <>
              {!relevantProducts ? (
                <p className="flex justify-center items-center  my-auto text-xl font-medium">
                  Related products not aboailvale
                </p>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-5 pb-12 ">
                  {relevantProducts
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
    </div>
  );
};

export default RelevantProducts;
