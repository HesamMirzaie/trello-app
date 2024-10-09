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
import { Avatar, AvatarFallback } from '../../ui/avatar';
import { useSelectedBoardContext } from '../../../context/SelectedBoardContext';
import { useEffect, useState } from 'react';

interface TaskContainerProps {
  columnId: IColumn['id'];
}

export const TaskContainer = ({ columnId }: TaskContainerProps) => {
  const [filteredTasks, setFilteredTasks] = useState<ITask[]>([]);

  const { selectedBoard } = useSelectedBoardContext();
  const { data: tasks, isLoading } = useQuery<ITask[]>({
    queryKey: ['tasks', selectedBoard?.id],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:3000/tasks?boardId=${selectedBoard?.id}`
      );
      return response.data;
    },
  });

  useEffect(() => {
    if (tasks) {
      // Filter tasks based on the columnId prop
      const updatedFilteredTasks = tasks.filter(
        (task) => task.columnId === columnId
      );
      setFilteredTasks(updatedFilteredTasks);
    }
  }, [tasks, columnId]); // Dependency array includes tasks and columnId

  if (isLoading) {
    return <div>Loading tasks...</div>;
  }

  return (
    <ScrollArea className="w-full h-full max-h-[500px] p-2 overflow-y-auto scrollbar-hidden">
      {filteredTasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </ScrollArea>
  );
};

function TaskCard({ task }: { task: ITask }) {
  return (
    <Card className="w-full h-40 max-h-40 mt-4 flex flex-col dark:bg-gray-950">
      {/* Header */}
      <div className="flex justify-between p-2">
        <Badge
          className="bg-blue-200 text-blue-600 dark:bg-indigo-200 dark:text-indigo-600 rounded-full"
          variant="outline"
        >
          <p className="">Badge</p>
        </Badge>
        <EllipsisButton>
          <EditTask task={task} />
          <DeleteTask taskId={task.id} />
        </EllipsisButton>
      </div>

      {/* Body */}
      <div className="flex-1 px-4 py-1">
        <h1 className="font-bold text-xl truncate">{task.task_title}</h1>
        <h2 className="text-gray-600 dark:text-gray-400 text-sm truncate">
          {task.task_description}
        </h2>
      </div>

      {/* Footer */}
      <div className="p-2 flex justify-end">
        {task.task_users.map((user) => (
          <Avatar key={user} className="ml-[-10px]">
            <AvatarFallback>
              {user.length > 1 ? user.slice(0, 2).toUpperCase() : '?'}
            </AvatarFallback>
          </Avatar>
        ))}
      </div>
    </Card>
  );
}
