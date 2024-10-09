import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { useState, memo } from 'react';
import { Button } from '../../ui/button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { ITask } from '../../../types/Task';
import { IColumn } from '../../../types/Column';
import { useAuthUser } from '../../../context/UserContext';
import { useSelectedBoardContext } from '../../../context/SelectedBoardContext';

interface CreateTaskProps {
  columnId: IColumn['id'];
}

export const CreateTask = memo(({ columnId }: CreateTaskProps) => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [newTaskDescription, setNewTaskDescription] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { user } = useAuthUser();
  const { selectedBoard } = useSelectedBoardContext();

  // Fetch existing tasks
  const { data: tasks } = useQuery<ITask[]>({
    queryKey: ['tasks'],
  });

  // Add task mutation
  const addTaskMutation = useMutation({
    mutationFn: async (newTask: ITask) => {
      const response = await axios.post('http://localhost:3000/tasks', newTask);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  // Handle task creation
  const handleAddTask = () => {
    if (!newTaskTitle || !newTaskDescription || !user?.email) return;

    const newTask: ITask = {
      id: uuidv4(),
      task_title: newTaskTitle,
      task_description: newTaskDescription,
      task_users: [user.email],
      columnId,
      BoardId: selectedBoard!.id,
    };

    addTaskMutation.mutate(newTask);
    resetForm();
  };

  const resetForm = () => {
    setNewTaskTitle('');
    setNewTaskDescription('');
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-blue-600 dark:text-white bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 border-blue-200 dark:border-indigo-500 px-4 py-2 flex items-center space-x-2 transition-colors duration-200"
          onClick={() => setIsDialogOpen(true)}
        >
          <Plus className="h-5 w-5" />
          <span>Add New Task</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-indigo-500 rounded-lg shadow-xl max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Create a new task
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400 mt-2">
            Add a title and description for your new task.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-6">
          <div className="space-y-2">
            <label
              htmlFor="taskTitle"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Task Title
            </label>
            <Input
              id="taskTitle"
              placeholder="Enter task title"
              value={newTaskTitle}
              autoComplete="off"
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-opacity-50 rounded-md transition-all duration-200 placeholder:text-gray-500 dark:placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="taskDescription"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Task Description
            </label>
            <Textarea
              id="taskDescription"
              placeholder="Enter task description"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-opacity-50 rounded-md transition-all duration-200 min-h-[100px] placeholder:text-gray-500 dark:placeholder:text-gray-400"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleAddTask}
            disabled={
              !newTaskTitle || !newTaskDescription || addTaskMutation.isPending
            }
            className="bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200 rounded-full px-6 py-2 shadow-md hover:shadow-lg"
          >
            {addTaskMutation.isPending ? 'Adding...' : 'Add Task'}
          </Button>
        </DialogFooter>

        {addTaskMutation.isError && (
          <p className="text-red-500 mt-2">
            Error adding task. Please try again.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
});
