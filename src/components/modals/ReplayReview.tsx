import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/modal";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import RWForm from "../form/RWForm";
import RWTextArea from "../form/RWTextArea";

import { useReplayMyProductReviewMutation } from "@/src/redux/features/review/reviewApi";

const ReplayReviewModal = ({
  reviewId,
  reviewText,
}: {
  reviewId: string;
  reviewText: string;
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [reviewReplay] = useReplayMyProductReviewMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Review Creating...");

    try {
      const reviewReplayData = {
        reviewId,
        reviewReplay: data.reviewReplay,
      };

      const res = await reviewReplay(reviewReplayData).unwrap();

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
        replay
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
                                {reviewText?.length > 130
                                  ? `${reviewText.substring(0, 130)}...`
                                  : reviewText}
                              </h3>
                            </div>
                            <RWForm onSubmit={onSubmit}>
                              <div className="">
                                <div className="py-1">
                                  <RWTextArea
                                    required
                                    label="Review Replay"
                                    name="reviewReplay"
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

export default ReplayReviewModal;
