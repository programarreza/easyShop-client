import { FaRegStar, FaStar } from "react-icons/fa6";
import Rating from "react-rating";

const ReviewCard = ({ reviews }: { reviews: any[] }) => {
  return (
    <div className="mt-6">
      {/* heading */}
      <div className="border-y py-3 px-2b">
        <h2 className="text-xl">Product reviews</h2>
      </div>

      {/* review details */}
      <div>
        {reviews?.map((review, index) => (
          <div key={index} className="space-y-2 py-4">
            <h2>{review?.customer?.name}</h2>

            {/* rating */}
            <div>
              <Rating
                readonly
                emptySymbol={<FaRegStar className="text-gray-400" />}
                fullSymbol={<FaStar className="text-yellow-500" />}
                initialRating={review?.rating}
              />
            </div>

            <div>
              <p>{review?.reviewText}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewCard;