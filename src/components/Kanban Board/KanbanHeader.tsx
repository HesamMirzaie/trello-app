import { useSelectedBoardContext } from '../../context/SelectedBoardContext';
import { IUser } from '../../types/User';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { AddUserToBoardButton } from './AddUserToBoard';

export const KanbanHeader = () => {
  const { selectedBoard } = useSelectedBoardContext();
  return (
    <div className="flex justify-between items-center px-4 py-4 border-b ">
      <h2 className="text-2xl font-semibold">{selectedBoard?.board_title}</h2>
      <div className="flex items-center space-x-4">
        <div className=" flex space-x-[-5px]">
          {selectedBoard?.board_users.map((user: IUser['email']) => (
            <Avatar className="w-8 h-8 flex space-x-[-10px]">
              <AvatarImage src="/placeholder-user.jpg" alt="User" />
              <AvatarFallback>{[...user].splice(0, 2).join('')}</AvatarFallback>
            </Avatar>
          ))}
        </div>
        <AddUserToBoardButton />
      </div>
    </div>
  );
};
