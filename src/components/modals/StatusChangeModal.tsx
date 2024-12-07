import statusChangeIcon from "@/src/assets/images/block_status.png";
import { useStatusChangeMutation } from "@/src/redux/features/user/userApi";
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

const statusFiled = [
  { key: "ACTIVE", label: "Active" },
  { key: "BLOCKED", label: "Blocked" },
  { key: "SUSPENDED", label: "suspended" },
];

const StatusChangeModal = ({ status, userId }: any) => {
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
      userId: userId,
    };

	console.log({args})

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
          src={statusChangeIcon}
          alt="status change icon"
          height={30}
          width={30}
        />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="bg-white"
        size="md"
      >
        <ModalContent>
          {(onClose) => (
            <ModalBody>
              {/* form area */}
              <div className=" bg-white  rounded-xl p-5">
                <div className="text-center py-8 text-2xl font-semibold">
                  <h3> Current user status : {status}</h3>
                </div>
                <div className="pb-4 ">
                  <Select
                    items={statusFiled}
                    label="Select new status"
                    className=""
                    variant="bordered"
                    selectedKeys={selectedValue}
                    defaultSelectedKeys={[status]}
                    onSelectionChange={(keys) =>
                      setSelectedValue(Array.from(keys) as string[])
                    }
                  >
                    {statusFiled.map((item) => (
                      <SelectItem key={item.key}>{item.label}</SelectItem>
                    ))}
                  </Select>

                  <button
                    onClick={() => handleStatusChange()}
                    className="w-full py-3 my-4 px-6 border rounded-lg hover:bg-gray-200"
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

export default StatusChangeModal;
