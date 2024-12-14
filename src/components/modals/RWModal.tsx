import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { ReactNode } from "react";

interface IProps {
  buttonText: string;
  title?: string;
  children: ReactNode;
  buttonVariant?:
    | "light"
    | "solid"
    | "bordered"
    | "flat"
    | "faded"
    | "shadow"
    | "ghost"
    | undefined;
  buttonClassName?: string;
  size?:
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "5xl"
    | "xs"
    | "3xl"
    | "4xl"
    | "full"
    | undefined;
}

export default function RWModal({
  buttonText,
  title,
  children,
  buttonVariant = "light",
  buttonClassName,
  size,
}: IProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        className={`${buttonClassName} bg-gray-200`}
        variant={buttonVariant}
        onPress={onOpen}
      >
        {buttonText}
      </Button>
      <Modal
        className=""
        isOpen={isOpen}
        size={size}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose: any) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>{children}</ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
