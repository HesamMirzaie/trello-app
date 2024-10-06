import ProjectsContainer from './ProjectsContainer';

export const Sidebar = () => {
  return (
    <div className="flex flex-col h-full w-64 p-4 bg-white border-r">
      <div className=" flex-1">
        <h1 className="text-xl font-semibold mb-4">Projects</h1>
        <ProjectsContainer />
      </div>
      <div>test</div>
      {/* <CreateBoard /> */}
    </div>
  );
};
