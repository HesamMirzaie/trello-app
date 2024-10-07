import { CreateBoard } from './CreateBoard';
import { DarkModeToggle } from './DarkModeToggle';
import ProjectsContainer from './ProjectsContainer';
import { UserCard } from './UserCard';
import { LogoutButton } from './LogoutButton';

export const Sidebar = () => {
  return (
    <div className="flex flex-col h-full w-64 p-4 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800">
      <div className=" flex-1">
        <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Projects
        </h1>{' '}
        <ProjectsContainer />
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
