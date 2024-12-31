"use client";
import { Select, SelectItem } from "@nextui-org/select";
import { Slider } from "@nextui-org/slider";
import { usePathname } from "next/navigation";
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
  const [priceRange, setPriceRange] = useState<[number, number]>([10, 100000]);
  const { data } = useGetCategoriesQuery("");
  const categoriesFields = data?.data;

  const { search } = useAppSelector((store) => store.cart);
  const pathname = usePathname();

  const fetchProducts = async (
    page: number,
    pageSize: number,
    category?: string,
    minPrice?: number,
    maxPrice?: number,
  ) => {
    setIsLoading(true);
    setError(null);

    const searchQuery = search ? `&searchTerm=${search}` : "";
    const filterQuery = filters
      ? `&categories=${filters}`
      : category
        ? `&categories=${category}`
        : "";
    const priceQuery =
      minPrice !== undefined && maxPrice !== undefined
        ? `&minPrice=${minPrice}&maxPrice=${maxPrice}`
        : "";

    try {
      const res = await fetch(
        `${envConfig.baseApi}/products?page=${page}&limit=${pageSize}${filterQuery}${searchQuery}${priceQuery}`,
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

      const newProducts = await fetchProducts(
        page,
        pageSize,
        category,
        priceRange[0],
        priceRange[1],
      );

      if (newProducts) {
        setContents((prevData) =>
          page > 1 ? [...prevData, ...newProducts] : newProducts,
        );
      }
    };

    loadProducts();
    setPage(1); // Reset the page when filters change
  }, [searchParams?.category, search, filters, priceRange]);

  useInfiniteScroll(page, setPage, total, pageSize);

  return (
    <div className="min-h-screen m-1 mt-12">
      <Container>
        <h2 className="text-center border-b w-fit text-xl mt-16 py-2">
          Products
        </h2>
        <div className="flex gap-4">
          {pathname === "/products" && (
            <div className=" p-4 w-[300px] shadow-large h-screen">
              {/* Price Range Slider */}
              <div className="mb-6">
                <h2 className="block text-lg font-medium mb-2">Price Range</h2>
                <Slider
                  className="max-w-md"
                  defaultValue={[100, 500]}
                  formatOptions={{ style: "currency", currency: "BDT" }}
                  // label="Price Range"
                  maxValue={100000}
                  minValue={10}
                  step={500}
                  value={priceRange}
                  onChange={(value: number | number[]) => {
                    if (Array.isArray(value)) {
                      setPriceRange(value as [number, number]);
                    }
                  }}
                />
                <div className="flex justify-between text-sm mt-2">
                  <span className="border p-1">{priceRange[0]}</span>
                  <span className="border p-1">{priceRange[1]}</span>
                </div>
              </div>

              {/* Filter by Category */}
              <div className="w-full mb-6">
                <Select
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
          )}

          {/* Product Display */}
          <div className="w-full">
            {isLoading && page === 1 ? (
              <div className="h-[50vh] flex justify-center items-center ">
                <div className=" w-fit flex gap-2">
                  <ImSpinner6 className="animate-spin m-auto" size={28} />
                  <span>Loading...</span>
                </div>
              </div>
            ) : contents?.length === 0 ? (
              <div className="flex justify-center items-center min-h-[50vh]">
                <span>No products found</span>
              </div>
            ) : (
              <div
                className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${pathname === "/products" ? "xl:grid-cols-5" : "xl:grid-cols-6"}  gap-3 py-8 `}
              >
                {contents?.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {isLoading && page > 1 && (
              <div className="flex justify-center items-center">
                <ImSpinner6 className="animate-spin m-auto" size={28} />
                <span>Loading More Products...</span>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AllProducts;
