import { useState, useEffect } from 'react';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Edit } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '../../ui/dialog';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { ITask } from '../../../types/Task';
import { Textarea } from '../../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import { useFetchUsers } from '../../../hooks/useFetchUsers';
import { IUser } from '../../../types/User';

interface EditColumnProps {
  task: ITask;
}

export const EditTask = ({ task }: EditColumnProps) => {
  const [newTitle, setNewTitle] = useState<string>(''); // Store the new column title
  const [newDescription, setDescription] = useState<string>(''); // Store the new column description
  const [newUser, setNewUser] = useState(''); // Store selected user's email
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { users, fetchLoading } = useFetchUsers(); // Fetch all users

  const { data: taskData } = useQuery({
    queryKey: ['tasks', task.id],
    queryFn: async () => {
      const response = await axios.get<ITask>(
        `http://localhost:3000/tasks/${task.id}`
      );
      return response.data;
    },
  });

  // Set new title and description when column data is fetched
  useEffect(() => {
    if (taskData) {
      setNewTitle(taskData.task_title);
      setDescription(taskData.task_description);
    }
  }, [taskData]);

  const updateTaskMutation = useMutation({
    mutationFn: async () => {
      const userAlreadyExists = task.task_users.some(
        (email) => email === newUser
      );
      if (userAlreadyExists) {
        console.log('User already exists in the task');
      }
      await axios.patch(`http://localhost:3000/tasks/${task.id}`, {
        task_title: newTitle,
        task_description: newDescription,
        task_users: [...task.task_users, newUser],
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setIsDialogOpen(false);
      setNewTitle('');
      setDescription('');
      setNewUser('');
    },
  });

  // Handle title change
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  // Handle description change
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  // Handle updating the column title and description
  const handleSave = () => {
    if (newTitle.trim()) {
      updateTaskMutation.mutate();
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full text-sm py-1 text-blue-600 hover:text-blue-700 dark:text-indigo-400 dark:hover:text-indigo-300 border-blue-200 hover:border-blue-300 dark:border-indigo-800 dark:hover:border-indigo-700 hover:bg-blue-50 dark:hover:bg-indigo-900 transition-colors duration-200"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white text-gray-800 border border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 rounded-lg shadow-xl max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-600 dark:text-indigo-400">
            Edit Task
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-6">
          <div className="space-y-2">
            <label
              htmlFor="boardTitle"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Task Title
            </label>
            <Input
              id="boardTitle"
              placeholder="Enter board title"
              autoComplete="off"
              value={newTitle}
              onChange={handleTitleChange}
              className="bg-gray-100 text-gray-800 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:focus:border-indigo-500 dark:focus:ring-indigo-500 rounded-md transition-all duration-200"
              required
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="boardDescription"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Task Description
            </label>
            <Textarea
              id="boardDescription"
              placeholder="Enter board description"
              value={newDescription}
              onChange={handleDescriptionChange}
              className="bg-gray-100 text-gray-800 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:focus:border-indigo-500 dark:focus:ring-indigo-500 rounded-md transition-all duration-200"
              required
            />
          </div>

          {/* Add User to Task */}
          <div className="space-y-2">
            <label
              htmlFor="userSelect"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Add User
            </label>
            {fetchLoading ? (
              <p className="text-gray-600 dark:text-gray-400">
                Loading users...
              </p>
            ) : (
              <Select value={newUser} onValueChange={setNewUser}>
                <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-indigo-500 focus:ring-blue-500 dark:focus:ring-indigo-500">
                  <SelectValue placeholder="Select a user" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                  {users?.map((user: IUser) => (
                    <SelectItem
                      key={user.id}
                      value={user.email}
                      className="text-gray-900 dark:text-gray-100 hover:bg-blue-100 dark:hover:bg-indigo-900 cursor-pointer"
                    >
                      {user.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleSave}
            className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-indigo-600 dark:text-gray-200 dark:hover:bg-indigo-700 transition-colors duration-200 rounded-full px-6 py-2 shadow-md hover:shadow-lg"
          >
            Update Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
