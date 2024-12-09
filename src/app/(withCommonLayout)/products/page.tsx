"use client";
import { useEffect, useState } from "react";

import Container from "@/src/components/ui/Container";
import ProductCard from "@/src/components/ui/ProductCard";
import useInfiniteScroll from "@/src/hooks/infinityScroll";
import { TProduct } from "@/src/types";

const AllProducts = () => {
  const [contents, setContents] = useState<TProduct[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchProjects = async (page: number, pageSize: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `http://localhost:5000/api/v1/products?page=${page}&limit=${pageSize}`
      );

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setTotal(data?.data?.meta?.total);

      return data?.data?.data;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadProjects = async () => {
      const newProjects = await fetchProjects(page, pageSize);

      if (newProjects) {
        if (page > 1) {
          setContents((prevData) => [...prevData, ...newProjects]);
        } else {
          setContents(newProjects);
        }
      }
    };

    loadProjects();
  }, [page, pageSize]);

  // Set up infinite scroll
  useInfiniteScroll(page, setPage, total, pageSize);

  return (
    <div className="min-h-screen m-1">
      <Container>
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
      </Container>
    </div>
  );
};

export default AllProducts;
