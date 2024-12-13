"use client";

import Image from "next/image";
import Link from "next/link";

import Container from "@/src/components/ui/Container";
import { useGetCategoriesQuery } from "@/src/redux/features/categories/categoriesApi";
import { TCategories } from "@/src/types";

const CategoriesPage = () => {
  const { data } = useGetCategoriesQuery("");
  const categories = data?.data;

  return (
    <div className="min-h-[50vh] border mt-2 bg-[#F2F4F8] pb-12">
      <Container>
        <h2 className="text-center border-b w-fit  text-2xl my-6">
          Categories
        </h2>
        <div className="grid grid-cols-8 gap-32 ">
          {categories?.map((category: TCategories) => (
            <Link
              key={category?.id}
              href={`/products?category=${category?.name}`}
            >
              <div className="">
                <div className="border size-40 h-full bg-white">
                  <Image
                    alt={category?.name}
                    height={120}
                    src={category?.images}
                    width={120}
                  />
                  <p>{category?.name}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default CategoriesPage;
