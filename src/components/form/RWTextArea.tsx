"use client ";

import { Textarea } from "@nextui-org/input";
import { useFormContext, useWatch } from "react-hook-form";

import { IInput } from "@/src/types";

interface IProps extends IInput {}

const RWTextArea = ({ name, label, variant = "bordered" }: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const currentValue = useWatch({ name });

  return (
    <Textarea
      {...register(name)}
      label={label}
      minRows={3}
      value={currentValue || ""}
      variant={variant}
    />
  );
};

export default RWTextArea;
