import { useGetProfileQuery } from "../redux/features/user/userApi";

const useLoggedUser = () => {
  const { data } = useGetProfileQuery("");

  return data?.data;
};

export default useLoggedUser;
