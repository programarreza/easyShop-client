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

import { useRoleChangeMutation } from "@/src/redux/features/user/userApi";
import roleChangeIcon from "@/src/assets/images/change.png";

const roles = [
  { key: "ADMIN", label: "Admin" },
  { key: "VENDOR", label: "Vendor" },
  { key: "CUSTOMER", label: "Customer" },
];

const RoleChangeModal = ({ role, userId }: any) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [selectedValue, setSelectedValue] = useState([role]);
  const [changeRole] = useRoleChangeMutation();

  const handleRoleChange = async () => {
    const toastId = toast.loading("role updating...");
    const newRole = selectedValue[0];

    const role = {
      role: newRole,
    };

    const args = {
      role: role,
      userId: userId,
    };

    const res = await changeRole(args).unwrap();

    if (res?.success) {
      toast.success(res?.message, { id: toastId, duration: 1000 });
      onClose();
    }
  };

  return (
    <>
      <Button className="bg-transparent " size="sm" onPress={onOpen}>
        <Image alt="change icon" height={25} src={roleChangeIcon} width={25} />
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
                  <h3> Current user role : {role}</h3>
                </div>
                <div className="pb-4">
                  <Select
                    className=""
                    defaultSelectedKeys={[role]}
                    items={roles}
                    label="Select new role"
                    selectedKeys={selectedValue}
                    variant="bordered"
                    onSelectionChange={(keys) =>
                      setSelectedValue(Array.from(keys) as string[])
                    }
                  >
                    {roles.map((role) => (
                      <SelectItem key={role.key}>{role.label}</SelectItem>
                    ))}
                  </Select>

                  <button
                    className="w-full py-3 my-4 px-6 border rounded-lg hover:bg-gray-200"
                    onClick={() => handleRoleChange()}
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

export default RoleChangeModal;
