import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/modal";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { BsStar, BsStarFill } from "react-icons/bs";
import Rating from "react-rating";
import { toast } from "sonner";

import RWForm from "../form/RWForm";
import RWTextArea from "../form/RWTextArea";

import { useCreateReviewMutation } from "@/src/redux/features/review/reviewApi";

const CreateReviewModal = ({
  buttonText,
  productId,
  name,
}: {
  buttonText: string;
  productId: string;
  name: string;
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [createReview] = useCreateReviewMutation();
  const [rating, setRating] = useState(0);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Review Creating...");

    try {
      const reviewData = {
        productId,
        reviewText: data.reviewText,
        rating: Number(rating || 0),
      };

      console.log("reviewData", reviewData);
      const res = await createReview(reviewData).unwrap();

      console.log(res);

      if (res.success) {
        onClose();
        toast.success(res?.message, { id: toastId, duration: 1000 });
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong", {
        id: toastId,
        duration: 1000,
      });
    }
  };

  return (
    <>
      <Button className="" size="sm" onPress={onOpen}>
        create review
      </Button>
      <Modal
        className="bg-white"
        isOpen={isOpen}
        size="xl"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <ModalBody>
              {/* form area */}
              <div>
                <div className="text-black">
                  <div className="">
                    <div className="w-full flex flex-col justify-center items-center my-auto">
                      <div className="hero">
                        <div className="flex flex-col md:flex-row rounded-xl justify-between ">
                          {/* form area */}
                          <div className="min-w-[500px]  border rounded-xl px-3">
                            <div className="py-2 text-sm font-semibold">
                              <h3>
                                {name?.length > 130
                                  ? `${name.substring(0, 130)}...`
                                  : name}
                              </h3>
                            </div>
                            <RWForm onSubmit={onSubmit}>
                              <div className="">
                                <div className="py-1">
                                  <h2 className="text-sm">Select Rating </h2>
                                  <Rating
                                    emptySymbol={
                                      <BsStar
                                        className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                                        size={30}
                                      />
                                    }
                                    fractions={2} // Adding fractions manually
                                    fullSymbol={
                                      <BsStarFill
                                        className="text-yellow-400"
                                        size={30}
                                      />
                                    }
                                    onClick={(value: number) =>
                                      setRating(value)
                                    }
                                    {...({ fractions: 2 } as any)}
                                  />
                                </div>
                                <div className="py-1">
                                  <RWTextArea
                                    required
                                    label="Review Text"
                                    name="reviewText"
                                    size="lg"
                                    type="text"
                                  />
                                </div>
                              </div>

                              <button
                                className="w-full py-3 my-4 px-6 border rounded-lg hover:bg-gray-200"
                                type="submit"
                              >
                                Submit
                              </button>
                            </RWForm>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateReviewModal;
