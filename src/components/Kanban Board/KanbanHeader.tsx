// import { AddUserToBoardButton } from './AddUserToBoardButton';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { AddUserToBoardButton } from './AddUserToBoard';

export const KanbanHeader = () => {
  return (
    <div className="flex justify-between items-center px-4 py-4 border-b ">
      <h2 className="text-2xl font-semibold">PlaceHolder</h2>
      <div className="flex items-center space-x-4">
        <div className=" flex space-x-[-5px]">
          <Avatar className="w-8 h-8 bg-indigo-100 dark:bg-indigo-500 dark:text-indigo-100 flex space-x-[-10px]">
            <AvatarImage src="/placeholder-user.jpg" alt="User" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <AddUserToBoardButton />
      </div>
    </div>
  );
};
