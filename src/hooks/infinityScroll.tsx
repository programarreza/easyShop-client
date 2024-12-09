// import { Dispatch, SetStateAction, useEffect } from "react";

// const useInfiniteScroll = (
//   page: number,
//   setPage: Dispatch<SetStateAction<number>>,
//   totalItems: number,
//   limit: number
// ) => {
//   const totalPageCalc = Math.ceil(totalItems / limit);
//   const handelInfiniteScroll = async () => {

//     try {
//       if (
//         window.innerHeight + document.documentElement.scrollTop + 1 >=
//         document.documentElement.scrollHeight
//       ) {
//         setPage((prev) => prev + 1);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (page < totalPageCalc) {
//       window.addEventListener("scroll", handelInfiniteScroll);

//       return () => window.removeEventListener("scroll", handelInfiniteScroll);
//     }
//   }, [totalPageCalc, page]);
// };

// export default useInfiniteScroll;

import { Dispatch, SetStateAction, useEffect } from "react";

const useInfiniteScroll = (
  page: number,
  setPage: Dispatch<SetStateAction<number>>,
  totalItems: number,
  limit: number
) => {
  const totalPageCalc = Math.ceil(totalItems / limit);

  const handleInfiniteScroll = () => {
    if (page < totalPageCalc) {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 10
      ) {
        setPage((prevPage) => {
          if (prevPage < totalPageCalc) {
            return prevPage + 1;
          }

          return prevPage; // Prevent updates if at max page
        });
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);

    return () => {
      window.removeEventListener("scroll", handleInfiniteScroll);
    };
  }, [page, totalPageCalc]); // Ensure listener updates on dependency change
};

export default useInfiniteScroll;
