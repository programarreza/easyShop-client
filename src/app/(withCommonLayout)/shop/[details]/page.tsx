"use client";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ImSpinner6 } from "react-icons/im";

import Container from "@/src/components/ui/Container";
import ProductCard from "@/src/components/ui/ProductCard";
import envConfig from "@/src/config/envConfig";
import useInfiniteScroll from "@/src/hooks/infinityScroll";
import { useCreateFollowMutation } from "@/src/redux/features/followed/followedApi";
import { useGetSingleShopQuery } from "@/src/redux/features/shop/shopApi";
import { TProduct, TSearchParams } from "@/src/types";

const ShopDetailsPage = ({ searchParams }: { searchParams: TSearchParams }) => {
  const [contents, setContents] = useState<TProduct[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const [createFollow] = useCreateFollowMutation();

  // get shop data
  const { data, isLoading: shopLoading } = useGetSingleShopQuery(
    searchParams?.id
  );
  const shopData = data?.data;
  const couponData = shopData?.coupon;

  const fetchProducts = async (
    page: number,
    pageSize: number,
    category?: string
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${envConfig.baseApi}/products/${searchParams?.id}/shop-product?page=${page}&limit=${pageSize}${
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

  // Format the validFrom and validTo dates
  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return new Date(date).toLocaleDateString("en-US", options);
  };

  const handleFollow = () => {
    createFollow({
      shopId: searchParams?.id,
    });
  };

  return (
    <div className=" m-2 bg-[#F2F4F8]">
      <Container>
        {shopLoading ? (
          <div className="flex justify-center items-center min-h-screen">
            <div className="flex w-fit mx-auto">
              <ImSpinner6 className="animate-spin m-auto" size={28} />
              <span>Loading...</span>
            </div>
          </div>
        ) : (
          <div>
            <div className=" pt-24">
              <div className="flex items-center justify-between gap-3 bg-white py-2">
                {/* shop info */}
                <div className="flex items-center gap-3 p-1">
                  <Image
                    alt={shopData?.name}
                    height={60}
                    src={shopData?.logo}
                    width={60}
                  />

                  <div>
                    <p className="font-bold text-xl">{shopData?.name}</p>
                    <p className="text-sm">
                      {" "}
                      {shopData?.description?.length > 30
                        ? `${shopData?.description.substring(0, 30)}`
                        : shopData?.description}
                    </p>
                    <p className="text-sm">
                      Followers: {shopData?.followerCount}
                    </p>
                  </div>
                  <div className="border p-2">
                    <Button
                      className="py-3 my-4 px-6 border rounded-lg hover:bg-gray-200"
                      onClick={handleFollow}
                    >
                      Follow
                    </Button>
                  </div>
                </div>

                {/* coupon info */}
                {shopData?.coupon && (
                  <div className=" bg-white rounded-lg  p-1">
                    <div className="space-y-2 flex gap-5">
                      <div>
                        <p className="text-lg text-gray-700">
                          <strong>Coupon Code:</strong> {couponData?.code}
                        </p>
                        <p className="text-lg text-gray-700">
                          <strong>Discount:</strong> {couponData?.discount}%
                        </p>
                      </div>

                      <div>
                        <p className="text-lg text-gray-700">
                          <strong>Valid From:</strong>{" "}
                          {formatDate(couponData?.validFrom)}
                        </p>
                        <p className="text-lg text-gray-700">
                          <strong>Valid To:</strong>{" "}
                          {formatDate(couponData?.validTo)}
                        </p>
                        <p className="text-lg text-gray-700">
                          <strong>Coupon Status:</strong>
                          <span
                            className={`font-semibold ${couponData?.isDeleted ? "text-red-500" : "text-green-500"}`}
                          >
                            {couponData?.isDeleted ? "Inactive" : "Active"}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

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
          </div>
        )}
      </Container>
    </div>
  );
};

export default ShopDetailsPage;
