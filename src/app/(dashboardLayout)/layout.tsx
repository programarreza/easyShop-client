import { ReactNode } from "react";

import DashboardSidebar from "@/src/components/DashboardSidebar/DashboardSidebar";
import SMDashboardSidebar from "@/src/components/DashboardSidebar/SMDashboardSidebar";
import Container from "@/src/components/ui/Container";

const dashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Container>
        <div className="flex gap-2 min-h-[calc(100vh-70px)] pt-[70px]">
          {/* sidebar */}
          <div className="hidden md:flex shadow-large min-w-52 ">
            <DashboardSidebar />
          </div>
          <div className="flex md:hidden ">
            <SMDashboardSidebar />
          </div>

          {/* dashboard children */}
          <div className="w-full ">{children}</div>
        </div>
      </Container>
    </div>
  );
};

export default dashboardLayout;
