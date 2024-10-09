import { useQuery } from '@tanstack/react-query';
import { ScrollArea } from '../../ui/scroll-area';
import { ITask } from '../../../types/Task';
import axios from 'axios';
import { IColumn } from '../../../types/Column';
import { Card } from '../../ui/card';
import { EllipsisButton } from '../../ui/EllipsisButton';
import { Badge } from '../../ui/badge';
import { EditTask } from './EditTask';
import { DeleteTask } from './DeleteTask';

interface TaskContainerProps {
  columnId: IColumn['id'];
}

export const TaskContainer = ({ columnId }: TaskContainerProps) => {
  const {
    data: tasks,
    isLoading,
    isError,
  } = useQuery<ITask[]>({
    queryKey: ['tasks', columnId],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:3000/tasks?columnId=${columnId}`
      );
      return response.data;
    },
  });

  if (isLoading) {
    return <div>Loading tasks...</div>;
  }

  if (isError) {
    return <div>Error loading tasks.</div>;
  }

  // If no tasks are found
  if (!tasks || tasks.length === 0) {
    return <div className="my-2">No Task found</div>;
  }

  return (
    <ScrollArea className="w-full h-full overflow-y-auto scrollbar-hidden  ">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </ScrollArea>
  );
};

function TaskCard({ task }: { task: ITask }) {
  return (
    <Card className="w-full h-48 my-2 flex flex-col ">
      {/* Header */}
      <div className="flex justify-between p-2">
        <Badge
          className=" bg-orange-200 text-orange-600 rounded-full"
          variant="outline"
        >
          <p className="">Title</p>
        </Badge>
        <EllipsisButton>
          <EditTask task={task} />
          <DeleteTask taskId={task.id} />
        </EllipsisButton>
      </div>
      {/* Body */}
      <div className=" flex-1 px-4 py-1">
        <h1 className=" font-bold text-xl">{task.task_title}</h1>
        <h2 className=" text-gray-600 dark:text-gray-400 text-sm truncate h-1/2">
          {task.task_description}
        </h2>
      </div>
      {/* Footer */}
      <div className=" border-t">
        {task.task_users.map((user) => (
          <p key={user} className=" p-2">
            {[...user].splice(0, 2).join('')}
          </p>
        ))}
      </div>
    </Card>
  );
}
