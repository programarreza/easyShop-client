"use client";

import { Button } from "@nextui-org/button";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
} from "@nextui-org/drawer";
import { useDisclosure } from "@nextui-org/modal";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

import DashboardSidebar from "./DashboardSidebar";

const SMDashboardSidebar = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [placement, setPlacement] = useState<
    "left" | "top" | "right" | "bottom"
  >("left");

  const handleOpen = (placement: "left" | "top" | "right" | "bottom") => {
    setPlacement(placement);
    onOpen();
  };

  return (
    <>
      <div className="">
        <Button
          key={placement}
          className="capitalize w-fit "
          onPress={() => handleOpen(placement)}
        >
          <GiHamburgerMenu />
        </Button>
      </div>
      <Drawer
        className="max-w-52"
        isOpen={isOpen}
        placement={placement}
        size="xs"
        onOpenChange={onOpenChange}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="" />
              <DrawerBody>
                <DashboardSidebar />
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SMDashboardSidebar;
