"use client";

import Container from "@/src/components/ui/Container";
import ProductCard from "@/src/components/ui/ProductCard";
import { useAppSelector } from "@/src/redux/hooks";

const ResentProductsPage = () => {
  const { recentProducts } = useAppSelector((store) => store.cart);

  return (
    <div className="min-h-screen m-1 pt-12">
      <Container>
        <>
          {recentProducts?.length ? (
            <>
              <h2 className="text-center border-b w-fit  text-2xl my-6">
                Resent products
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 pb-24 min-h-screen">
                {recentProducts?.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500 py-24">
              No recent products available.
            </div>
          )}
        </>
      </Container>
    </div>
  );
};

export default ResentProductsPage;
