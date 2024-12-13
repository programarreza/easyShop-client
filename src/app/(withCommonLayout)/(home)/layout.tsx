import { ReactNode } from "react";

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
    </div>
  );
};

export default CommonLayout;
