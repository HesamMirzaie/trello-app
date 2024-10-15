import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { IUser } from '../types/User';

export const useFetchUsers = () => {
  const {
    data: users,
    isLoading: fetchLoading,
    error: fetchError,
  } = useQuery<IUser[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await axios.get('http://37.152.180.88:3000/users');
      return response.data;
    },
  });
  return { users, fetchLoading, fetchError };
};
