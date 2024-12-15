"use client";
import { useEffect, useState } from "react";

import Container from "@/src/components/ui/Container";
import ProductCard from "@/src/components/ui/ProductCard";
import useInfiniteScroll from "@/src/hooks/infinityScroll";
import { TProduct } from "@/src/types";

const AllProducts = ({ searchParams }: any) => {
  const [contents, setContents] = useState<TProduct[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [noProductsMessage, setNoProductsMessage] = useState<string | null>(
    null,
  );

  const fetchProducts = async (
    page: number,
    pageSize: number,
    category?: string,
  ) => {
    setIsLoading(true);
    setError(null);
    setNoProductsMessage(null);

    try {
      const res = await fetch(
        `http://localhost:5000/api/v1/products?page=${page}&limit=${pageSize}${
          category ? `&categories=${category}` : ""
        }`,
      );

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();

      setTotal(data?.data?.meta?.total);

      // Check if products are available
      if (data?.data?.data.length === 0) {
        setNoProductsMessage("No products available for this category.");
      }

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
    <div className="min-h-screen m-1 ">
      <Container>
        <h2 className="text-center border-b w-fit  text-2xl my-6">
          All products
        </h2>
        {isLoading && page === 1 ? (
          // Full page loader for initial load
          <div className="flex justify-center items-center h-screen">
            <div className="loader flex justify-center items-center ">
              Loading...
            </div>
          </div>
        ) : (
          <>
            {/* Show message if no products available */}
            {noProductsMessage ? (
              <div className="flex justify-center items-center min-h-[80vh]">
                <p className="text-xl text-red-500">{noProductsMessage}</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6  gap-5 pb-24 min-h-screen">
                {contents?.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {isLoading && page > 1 && (
              // Loader at the bottom while loading more content
              <div className="flex justify-center mt-5">
                <div className="loader">Loading more projects...</div>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default AllProducts;
