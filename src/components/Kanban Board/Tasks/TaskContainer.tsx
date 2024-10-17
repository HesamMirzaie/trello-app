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
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TaskContainerProps {
  columnId: IColumn['id'];
}

export const TaskContainer = ({ columnId }: TaskContainerProps) => {
  const [filteredTasks, setFilteredTasks] = useState<ITask[]>([]);

  const { selectedBoard } = useSelectedBoardContext();
  const {
    data: tasks,
    isLoading,
    refetch,
  } = useQuery<ITask[]>({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await axios.get(
        `http://37.152.180.88:3000/tasks?boardId=${selectedBoard?.id}&_sort=order&_order=asc`
      );
      return response.data;
    },
  });
  console.log(selectedBoard?.id);
  console.log(tasks);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      // Customize activation constraints
      activationConstraint: {
        distance: 5, // Activates drag after moving 5px
      },
    })
  );

  useEffect(() => {
    if (tasks) {
      const updatedFilteredTasks = tasks.filter(
        (task) => task.columnId === columnId
      );
      setFilteredTasks(updatedFilteredTasks);
    }
  }, [tasks, columnId]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = filteredTasks.findIndex((task) => task.id === active.id);
      const newIndex = filteredTasks.findIndex((task) => task.id === over?.id);

      // Reorder the tasks locally
      const updatedTasks = arrayMove(filteredTasks, oldIndex, newIndex);
      setFilteredTasks(updatedTasks);

      // Update the order field based on the new positions
      const reorderedTasks = updatedTasks.map((task, index) => ({
        ...task,
        order: index + 1,
      }));

      // Make API calls to update the order in the backend
      await Promise.all(
        reorderedTasks.map(async (task) => {
          await axios.put(`http://37.152.180.88:3000/tasks/${task.id}`, {
            ...task,
            order: task.order,
          });
        })
      );

      refetch();
    }
  };

  if (isLoading) {
    return <div className="w-full text-center pt-2">Loading tasks...</div>;
  }

  return (
    <ScrollArea className="w-full h-full max-h-[500px] p-2 overflow-y-auto scrollbar-hidden">
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <SortableContext
          items={filteredTasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {filteredTasks.map((task) => (
            <SortableTaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </DndContext>
    </ScrollArea>
  );
};

interface SortableTaskCardProps {
  task: ITask;
}

function SortableTaskCard({ task }: SortableTaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard task={task} />
    </div>
  );
}

function TaskCard({ task }: { task: ITask }) {
  return (
    <Card className="w-full h-40 max-h-40 mt-4 flex flex-col dark:bg-gray-950">
      {/* Header */}
      <div className="flex justify-between p-2">
        <Badge
          className="bg-blue-200 text-blue-600 dark:bg-indigo-200 dark:text-indigo-600 rounded-full"
          variant="outline"
        >
          <p className="">Task</p>
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
