import { ReactNode } from "react";

import Footer from "@/src/components/ui/Footer";
import ScrollToTopButton from "@/src/components/ui/ScrollToTopButton";

const CommonLayout = ({
  children,
  banner,
  categories,
  flashSales,
  relevantProducts,
  subscribe,
}: {
  children: ReactNode;
  banner: ReactNode;
  flashSales: ReactNode;
  categories: ReactNode;
  relevantProducts: ReactNode;
  subscribe: ReactNode;
}) => {
  return (
    <div>
      {banner}
      {flashSales}
      {categories}
      {relevantProducts}
      {children}
      {subscribe}
      <ScrollToTopButton />
      <Footer />
    </div>
  );
};

export default CommonLayout;
