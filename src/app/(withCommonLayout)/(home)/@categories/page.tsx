"use client";

import Image from "next/image";

import Container from "@/src/components/ui/Container";
import { useGetCategoriesQuery } from "@/src/redux/features/categories/categoriesApi";

const CategoriesPage = () => {
  const { data } = useGetCategoriesQuery("");
  const categories = data?.data;

  return (
    <Container>
      <div className="min-h-[90vh] border border-yellow-500 mt-2 bg-[#F2F4F8]">
        <div className="grid grid-cols-8 gap-32">
          {categories?.map((category: any) => (
            <div key={category?.id} className="">
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
          ))}
        </div>
      </div>
    </Container>
  );
};

export default CategoriesPage;
