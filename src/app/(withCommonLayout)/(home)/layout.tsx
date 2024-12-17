import { ReactNode } from "react";

import Footer from "@/src/components/ui/Footer";
import ScrollToTopButton from "@/src/components/ui/ScrollToTopButton";

const CommonLayout = ({
  children,
  banner,
  categories,
  flashSales,
  relevantProducts,
}: {
  children: ReactNode;
  banner: ReactNode;
  flashSales: ReactNode;
  categories: ReactNode;
  relevantProducts: ReactNode;
}) => {
  return (
    <div>
      {banner}
      {flashSales}
      {categories}
      {relevantProducts}
      {children}
      <ScrollToTopButton />
      <Footer />
    </div>
  );
};

export default CommonLayout;
