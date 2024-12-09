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
      {children}
      {banner}
      {categories}
    </div>
  );
};

export default CommonLayout;
