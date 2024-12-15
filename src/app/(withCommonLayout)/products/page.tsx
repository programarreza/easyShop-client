"use client";
import { Input } from "@nextui-org/input";
import { useEffect, useState } from "react";

import { SearchIcon } from "@/src/components/icons";
import Container from "@/src/components/ui/Container";
import ProductCard from "@/src/components/ui/ProductCard";
import useInfiniteScroll from "@/src/hooks/infinityScroll";
import { TProduct } from "@/src/types";

const AllProducts = ({ searchParams }: any) => {
  const [searchValue, setSearchValue] = useState(" ");
  const [contents, setContents] = useState<TProduct[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [noProductsMessage, setNoProductsMessage] = useState<string | null>(
    null
  );

  const fetchProducts = async (
    page: number,
    pageSize: number,
    category?: string
  ) => {
    setIsLoading(true);
    setError(null);
    setNoProductsMessage(null);

    try {
      const res = await fetch(
        `http://localhost:5000/api/v1/products?page=${page}&limit=${pageSize}${
          category ? `&categories=${category}` : ""
        }${searchValue ? `&searchTerm=${searchValue}` : ""}
          `
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
  }, [page, pageSize, searchParams?.category, searchValue]);

  // Set up infinite scroll
  useInfiniteScroll(page, setPage, total, pageSize);

  return (
    <div className="min-h-screen m-1 mt-12">
      <Container>
        <div className="flex items-center ">
          <h2 className="text-center border-b w-fit  text-2xl my-6">
            All products
          </h2>

          {/* search by content */}
          <div className="min-w-[200px] lg:min-w-[400px] mx-auto">
            <Input
              isClearable
              classNames={{
                label: "text-black/50 dark:text-white/90",
                input: [
                  "bg-transparent",
                  "text-black/90 dark:text-white/90",
                  "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                ],
                innerWrapper: "bg-transparent",
                inputWrapper: [
                  "shadow-xl",
                  "bg-default-200/50",
                  "dark:bg-default/60",
                  "backdrop-blur-xl",
                  "backdrop-saturate-200",
                  "hover:bg-default-200/70",
                  "dark:hover:bg-default/70",
                  "group-data-[focus=true]:bg-default-200/50",
                  "dark:group-data-[focus=true]:bg-default/60",
                  "!cursor-text",
                ],
              }}
              placeholder="Search by product..."
              radius="lg"
              startContent={
                <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
              }
              onChange={(e: any) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
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
