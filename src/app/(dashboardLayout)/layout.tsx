import { ReactNode } from "react";

import DashboardSidebar from "@/src/components/DashboardSidebar/DashboardSidebar";
import Container from "@/src/components/ui/Container";

const dashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Container>
        <div className="flex gap-2 min-h-[calc(100vh-70px)] pt-[70px]">
          {/* sidebar */}
          <div className="shadow-large min-w-52">
            <DashboardSidebar />
          </div>

          {/* dashboard children */}
          <div className="w-full ">{children}</div>
        </div>
      </Container>
    </div>
  );
};

export default dashboardLayout;
