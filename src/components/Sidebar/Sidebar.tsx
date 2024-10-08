import { CreateBoard } from './CreateBoard';
import { DarkModeToggle } from './DarkModeToggle';
import ProjectsContainer from './ProjectsContainer';
import { UserCard } from './UserCard';
import { LogoutButton } from './LogoutButton';
import UsersContainer from './UsersContainer';
import { useSelectedBoardContext } from '../../context/SelectedBoardContext';

export const Sidebar = () => {
  const { selectedBoard } = useSelectedBoardContext();
  return (
    <div className="flex flex-col justify-between h-full w-64 p-4 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800">
      <div>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Projects
        </h1>
        <ProjectsContainer />
        {selectedBoard && (
          <>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Users
            </h1>
            <UsersContainer />
          </>
        )}
      </div>

      <div className=" w-full space-y-2">
        <DarkModeToggle />
        <div className=" flex items-center gap-x-1">
          <UserCard />
          <LogoutButton />
        </div>
        <CreateBoard />
      </div>
    </div>
  );
};
