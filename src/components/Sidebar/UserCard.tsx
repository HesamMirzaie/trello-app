import { useAuthUser } from '../../context/UserContext';
import { Button } from '../ui/button';

export const UserCard = () => {
  const { user } = useAuthUser();
  return (
    <Button
      className="w-1/2 px-4 py-2 flex items-center gap-x-2 border-dashed  border-blue-600 text-blue-600 hover:text-blue-600 dark:hover:bg-gray-800 dark:border-indigo-600 dark:text-indigo-300"
      variant="outline"
      size="icon"
    >
      <img src={user?.profile_picture} alt="profile" className=" w-5 h-5" />
      <p className="truncate">{user?.username}</p>
    </Button>
  );
};
