import { ReactNode } from "react";

const CommonLayout = ({
  children,
  banner,
  categories,
}: {
  children: ReactNode;
  banner: ReactNode;
  categories: ReactNode;
}) => {
  return (
    <div>
      {banner}
      {categories}
      {children}
    </div>
  );
};

export default CommonLayout;
