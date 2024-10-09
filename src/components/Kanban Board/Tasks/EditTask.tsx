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

interface EditColumnProps {
  taskId: ITask['id'];
}

export const EditTask = ({ taskId }: EditColumnProps) => {
  const [newTitle, setNewTitle] = useState<string>(''); // Store the new column title
  const [newDescription, setDescription] = useState<string>(''); // Store the new column title
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { data: taskData } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await axios.get<ITask>(
        `http://localhost:3000/tasks/${taskId}`
      );
      return response.data;
    },
  });

  // Set new title when column data is fetched
  useEffect(() => {
    if (taskData) {
      setNewTitle(taskData.task_title);
      setDescription(taskData.task_description);
    }
  }, [taskData]);

  const updateColumnMutation = useMutation({
    mutationFn: async () => {
      await axios.patch(`http://localhost:3000/tasks/${taskId}`, {
        task_title: newTitle,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setIsDialogOpen(false);
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

  // Handle updating the column title
  const handleSave = () => {
    if (newTitle.trim()) {
      updateColumnMutation.mutate();
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
            Edit Column Title
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-6">
          <div className="space-y-2">
            <label
              htmlFor="boardTitle"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Board Title
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
              Board Description
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
        </div>

        <DialogFooter>
          <Button
            onClick={handleSave}
            className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-indigo-600 dark:text-gray-200 dark:hover:bg-indigo-700 transition-colors duration-200 rounded-full px-6 py-2 shadow-md hover:shadow-lg"
          >
            Update Column
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
