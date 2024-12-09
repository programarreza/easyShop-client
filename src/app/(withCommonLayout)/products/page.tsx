/* eslint-disable prettier/prettier */
"use client";
import { useEffect, useState } from "react";

import Container from "@/src/components/ui/Container";
import ProductCard from "@/src/components/ui/ProductCard";
import useInfiniteScroll from "@/src/hooks/infinityScroll";
import { useGetAllProductsQuery } from "@/src/redux/features/product/productApi";
import { TProduct } from "@/src/types";

const AllProjects = () => {
  const [contents, setContents] = useState<TProduct[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [total, setTotal] = useState(0);

  const { data, isLoading, error } = useGetAllProductsQuery({
    page,
    limit: pageSize,
  });

  useEffect(() => {
    if (data?.data?.data) {
      setTotal(data?.data?.meta?.total);
      const newProjects = data?.data?.data;

      // Add only unique entries
      setContents((prevData) => {
        const uniqueProjects = newProjects.filter(
          (project: TProduct) =>
            !prevData.some((prevProject) => prevProject.id === project.id)
        );

        return page > 1 ? [...prevData, ...uniqueProjects] : uniqueProjects;
      });
    }
  }, [data, page]);

  // Set up infinite scroll
  useInfiniteScroll(page, setPage, total, pageSize);

  return (
    <div className="min-h-screen bg-[#F2F8F8] border ">
      <Container>
        {isLoading && page === 1 ? (
          // Full page loader for initial load
          <div className="flex justify-center items-center h-screen">
            <div className="loader">Loading...</div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            {/* An error occurred: {error?.message} */}
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-4 lg:grid-cols-6 gap-3 py-24 min-h-screen">
              {contents?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {isLoading && page > 1 && (
              <div className="flex justify-center mt-5">
                <div className="loader">Loading more products...</div>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default AllProjects;
