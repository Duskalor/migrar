import { useSelector } from 'react-redux';

export const useUserLogin = () => {
  const { user } = useSelector((state) => state.Auth);
  return user;
};

export const roles = {
  admin: 1,
};
