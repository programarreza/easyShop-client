import { ReactNode } from "react";

const CommonLayout = ({
  children,
  banner,
  categories,
  flashSales,
}: {
  children: ReactNode;
  banner: ReactNode;
  flashSales: ReactNode;
  categories: ReactNode;
}) => {
  return (
    <div>
      {banner}
      {flashSales}
      {categories}
      {children}
    </div>
  );
};

export default CommonLayout;
