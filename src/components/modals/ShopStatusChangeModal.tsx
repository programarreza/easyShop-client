import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/modal";
import { Select, SelectItem } from "@nextui-org/select";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

import statusChangeIcon from "@/src/assets/images/block_status.png";
import { useStatusChangeMutation } from "@/src/redux/features/user/userApi";

const statusFiled = [
  { key: "ACTIVE", label: "Active" },
  { key: "BLOCKED", label: "Blocked" },
];

const ShopStatusChangeModal = ({ status, shopId }: any) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [selectedValue, setSelectedValue] = useState([status]);
  const [changeStatus] = useStatusChangeMutation();

  const handleStatusChange = async () => {
    const toastId = toast.loading("status updating...");
    const newStatus = selectedValue[0];

    const updatedStatus = {
      status: newStatus,
    };

    const args = {
      status: updatedStatus,
      shopId
    };

    const res = await changeStatus(args).unwrap();

    if (res?.success) {
      toast.success(res?.message, { id: toastId, duration: 1000 });
      onClose();
    }
  };

  return (
    <>
      <Button className="bg-transparent " size="sm" onPress={onOpen}>
        <Image
          alt="status change icon"
          height={30}
          src={statusChangeIcon}
          width={30}
        />
      </Button>
      <Modal
        className="bg-white"
        isOpen={isOpen}
        size="md"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <ModalBody>
              {/* form area */}
              <div className=" bg-white  rounded-xl p-5">
                <div className="text-center py-8 text-2xl font-semibold">
                  <h3> Current shop status : {status}</h3>
                </div>
                <div className="pb-4 ">
                  <Select
                    className=""
                    defaultSelectedKeys={[status]}
                    items={statusFiled}
                    label="Select new status"
                    selectedKeys={selectedValue}
                    variant="bordered"
                    onSelectionChange={(keys) =>
                      setSelectedValue(Array.from(keys) as string[])
                    }
                  >
                    {statusFiled.map((item) => (
                      <SelectItem key={item.key}>{item.label}</SelectItem>
                    ))}
                  </Select>

                  <button
                    className="w-full py-3 my-4 px-6 border rounded-lg hover:bg-gray-200"
                    onClick={() => handleStatusChange()}
                  >
                    Submit Now
                  </button>
                </div>
              </div>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ShopStatusChangeModal;
