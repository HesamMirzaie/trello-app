import { Card } from '../ui/card';

import { useSelectedBoardContext } from '../../context/SelectedBoardContext';
import { IUser } from '../../types/User';
import { ScrollArea } from '../ui/scroll-area';
import { useFetchUsers } from '../../hooks/useFetchUsers';

export default function UsersContainer() {
  const { selectedBoard } = useSelectedBoardContext();

  return (
    <ScrollArea className="max-h-[190px] pr-4 pt-2 mb-2 overflow-y-auto scrollbar-hidden">
      {selectedBoard?.board_users.map((user: IUser['email']) => (
        <UserCard key={user} user={user} />
      ))}
    </ScrollArea>
  );
}

function UserCard({ user }: { user: string }) {
  const { users } = useFetchUsers();

  const matchedUser = users?.find((u: IUser) => u.email === user);

  return (
    <Card className="w-full flex items-center h-12 mb-2 transition-colors cursor-pointer rounded-md shadow-sm border border-gray-200 dark:border-indigo-800 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-indigo-300">
      <div className="flex items-center w-full p-2">
        <img
          src={matchedUser?.profile_picture}
          alt="img"
          className=" w-6 h-6 rounded-md"
        />
        <p className="flex-1 ml-2 text-lg font-medium truncate ">{user}</p>
      </div>
    </Card>
  );
}
