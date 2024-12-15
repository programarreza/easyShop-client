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
    <div className="min-h-[50vh] mt-2  pb-12">
      <Container>
        <h2 className="text-center border-b w-fit  text-2xl my-6">
          Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5  xl:grid-cols-8  gap-6">
          {categories?.map((category: TCategories) => (
            <Link
              key={category?.id}
              href={`/products?category=${category?.name}`}
            >
              <div className="">
                <div className="border size-44 h-full bg-white p-2 ">
                  <Image
                    alt={category?.name}
                    className="text-center mx-auto"
                    height={80}
                    src={category?.images}
                    width={80}
                  />
                  <p className="text-center">{category?.name}</p>
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
