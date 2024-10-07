import { LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { useAuthUser } from '../../context/UserContext';

export const LogoutButton = () => {
  const { logout } = useAuthUser();
  return (
    <Button
      onClick={logout}
      variant="outline"
      className=" w-1/2 px-4 py-2 flex items-center justify-center gap-x-2 border-dashed  border-blue-600 text-blue-600 hover:text-blue-600 dark:hover:bg-gray-800 dark:border-indigo-600 dark:text-indigo-300"
    >
      <LogOut className="" />
    </Button>
  );
};
