import { useSelector } from "react-redux";

import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { useGetProfileQuery } from "../redux/features/user/userApi";

const useLoggedUser = () => {
  const { data, refetch } = useGetProfileQuery("");
  const selectedUser = useSelector(selectCurrentUser);

  return { user: data?.data, refetch, selectedUser };
};

export default useLoggedUser;
