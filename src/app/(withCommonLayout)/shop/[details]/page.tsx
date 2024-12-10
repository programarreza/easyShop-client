// "use client";

// import Container from "@/src/components/ui/Container";
// import ProductCard from "@/src/components/ui/ProductCard";
// import { useGetShopProductsQuery } from "@/src/redux/features/product/productApi";
// import { useGetSingleShopQuery } from "@/src/redux/features/shop/shopApi";
// import { TSearchParams } from "@/src/types";

// const ShopDetailsPage = ({ searchParams }: { searchParams: TSearchParams }) => {
//   //   get shop data
//   const { data: shopData } = useGetSingleShopQuery(searchParams?.id);

//   //   get shop product
//   const { data } = useGetShopProductsQuery(searchParams?.id);

//   const shopProducts = data?.data;

//   console.log(9, data?.data);

//   return (
//     <Container>
//       <div className="mt-24">
//         {/* header */}
//         <div className="border">sgfgfdsg</div>

//         {/* product  */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-5 py-24 min-h-screen">
//           {shopProducts?.map((product: any) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default ShopDetailsPage;

"use client";
import { useEffect, useState } from "react";

import Container from "@/src/components/ui/Container";
import ProductCard from "@/src/components/ui/ProductCard";
import useInfiniteScroll from "@/src/hooks/infinityScroll";
import { useGetSingleShopQuery } from "@/src/redux/features/shop/shopApi";
import { TProduct, TSearchParams } from "@/src/types";

const ShopDetailsPage = ({ searchParams }: { searchParams: TSearchParams }) => {
  const [contents, setContents] = useState<TProduct[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  // get shop data
  const { data: shopData } = useGetSingleShopQuery(searchParams?.id);

  const fetchProducts = async (
    page: number,
    pageSize: number,
    category?: string
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `http://localhost:5000/api/v1/products/${searchParams?.id}/shop-product?page=${page}&limit=${pageSize}${
          category ? `&categories=${category}` : ""
        }`
      );

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();

      setTotal(data?.data?.meta?.total);

      // Check if products are available

      return data?.data?.data;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadProducts = async () => {
      const category = searchParams?.category
        ? String(searchParams?.category)
        : undefined;

      // Check if the category exists and is valid
      if (category && category !== "undefined") {
        const newProjects = await fetchProducts(page, pageSize, category);

        if (newProjects) {
          if (page > 1) {
            setContents((prevData) => [...prevData, ...newProjects]);
          } else {
            setContents(newProjects);
          }
        }
      } else {
        // If no valid category, you can choose to load all products
        const newProjects = await fetchProducts(page, pageSize);

        if (newProjects) {
          if (page > 1) {
            setContents((prevData) => [...prevData, ...newProjects]);
          } else {
            setContents(newProjects);
          }
        }
      }
    };

    loadProducts();
  }, [page, pageSize, searchParams?.category]);

  // Set up infinite scroll
  useInfiniteScroll(page, setPage, total, pageSize);

  return (
    <div className="min-h-screen m-2">
      <Container>
        <h2 className="mt-24">heading area </h2>
        <div>
          {isLoading && page === 1 ? (
            // Full page loader for initial load
            <div className="flex justify-center items-center h-screen">
              <div className="loader flex justify-center items-center ">
                Loading...
              </div>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-5 py-24 min-h-screen">
                {contents?.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {isLoading && page > 1 && (
                // Loader at the bottom while loading more content
                <div className="flex justify-center mt-5">
                  <div className="loader">Loading more projects...</div>
                </div>
              )}
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ShopDetailsPage;
