"use client";
import { Select, SelectItem } from "@nextui-org/select";
import { useEffect, useState } from "react";
import { ImSpinner6 } from "react-icons/im";

import Container from "@/src/components/ui/Container";
import ProductCard from "@/src/components/ui/ProductCard";
import envConfig from "@/src/config/envConfig";
import useInfiniteScroll from "@/src/hooks/infinityScroll";
import { useGetCategoriesQuery } from "@/src/redux/features/categories/categoriesApi";
import { useAppSelector } from "@/src/redux/hooks";
import { TProduct } from "@/src/types";

const AllProducts = ({ searchParams }: any) => {
  const [contents, setContents] = useState<TProduct[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const [filters, setFilters] = useState("");
  const { data } = useGetCategoriesQuery("");
  const categoriesFields = data?.data;

  const { search } = useAppSelector((store) => store.cart);

  console.log({ search });

  const fetchProducts = async (
    page: number,
    pageSize: number,
    category?: string,
  ) => {
    setIsLoading(true);
    setError(null);

    // const searchQuery = searchValue ? `&searchTerm=${searchValue}` : "";
    const searchQuery = search ? `&searchTerm=${search}` : "";

    console.log({ searchQuery });
    const filterQuery = filters
      ? `&categories=${filters}`
      : category
        ? `&categories=${category}`
        : "";

    try {
      const res = await fetch(
        `${envConfig.baseApi}/products?page=${page}&limit=${pageSize}${filterQuery}${searchQuery}`,
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
    const loadProducts = async () => {
      const category = searchParams?.category
        ? String(searchParams?.category)
        : undefined;

      const newProducts = await fetchProducts(page, pageSize, category);

      if (newProducts) {
        setContents((prevData) =>
          page > 1 ? [...prevData, ...newProducts] : newProducts,
        );
      }
    };

    loadProducts();
    // Reset the page when search or filters change
    setPage(1);
  }, [searchParams?.category, search, filters]);

  useEffect(() => {
    if (page > 1) {
      const loadMoreProducts = async () => {
        const category = searchParams?.category
          ? String(searchParams?.category)
          : undefined;

        const moreProducts = await fetchProducts(page, pageSize, category);

        if (moreProducts) {
          setContents((prevData) => [...prevData, ...moreProducts]);
        }
      };

      loadMoreProducts();
    }
  }, [page]);

  useInfiniteScroll(page, setPage, total, pageSize);

  return (
    <div className="min-h-screen m-1 mt-12">
      <Container>
        <div className="flex gap-2">
          <div className="border border-red-500">
            <h2 className="text-center border-b w-fit  text-2xl my-6">
              All products
            </h2>

            {/* filter category */}
            <div className="w-[250px] hidden md:flex">
              <Select
                className=""
                items={[
                  { name: "All Categories" },
                  ...(categoriesFields || []),
                ]}
                label="Filter category"
                selectedKeys={new Set([filters])}
                size="sm"
                variant="bordered"
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys).join("");

                  if (selected === "All Categories") {
                    setFilters(""); // Reset filters
                  } else {
                    setFilters(selected);
                  }
                }}
              >
                <SelectItem key="All Categories">All Categories</SelectItem>
                {(categoriesFields || []).map((item: any) => (
                  <SelectItem key={item?.name}>{item?.name}</SelectItem>
                ))}
              </Select>
            </div>
          </div>
          <div className="w-full">
            {isLoading && page === 1 ? (
              <div className="flex justify-center items-center min-h-[50vh] mx-auto w-full ">
                <div className="flex w-fit mx-auto ">
                  <ImSpinner6 className="animate-spin m-auto" size={28} />
                  <span>Loading...</span>
                </div>
              </div>
            ) : (
              <>
                {contents?.length === 0 ? (
                  <div className="flex justify-center items-center min-h-[50vh]">
                    <div className="flex w-fit mx-auto">
                      <span>Product not found</span>
                    </div>
                  </div>
                ) : (
                  <>
                    {" "}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-3 py-8 min-h-[50vh]">
                      {contents?.map((product: any) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                    {isLoading && page > 1 && (
                      // Loader at the bottom while loading more content
                      <div className="flex justify-center items-center ">
                        <div className="flex w-fit mx-auto">
                          <ImSpinner6
                            className="animate-spin m-auto"
                            size={28}
                          />
                          <span>Loading More Products...</span>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AllProducts;
