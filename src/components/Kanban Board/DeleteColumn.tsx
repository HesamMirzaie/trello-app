import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
} from '../ui/alert-dialog';
import { IColumn } from '../../types/Column';
import { Button } from '../ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
interface DeleteColumnProps {
  columnId: IColumn['id'];
}

export const DeleteColumn = ({ columnId }: DeleteColumnProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const deleteColumnMutation = useMutation({
    mutationFn: async () => {
      await axios.delete(`http://localhost:3000/columns/${columnId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['columns'] }); // Invalidate the columns query
      setIsDialogOpen(false);
    },
    onError: (error) => {
      console.error('Error deleting column:', error);
      // Implement user-friendly error handling here (e.g., toast notifications)
      alert('Failed to delete the column. Please try again.'); // Consider using a toast instead
    },
  });
  const handleDelete = () => {
    deleteColumnMutation.mutate();
  };

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full text-sm py-1 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 border-red-200 hover:border-red-300 dark:border-red-800 dark:hover:border-red-700 hover:bg-red-50 dark:hover:bg-red-900 transition-colors duration-200"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white text-gray-800 border border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-bold text-red-600 dark:text-red-400">
            Confirm Deletion
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm">
            Are you sure you want to delete this column? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="space-x-2">
          <AlertDialogCancel asChild>
            <Button
              variant="outline"
              className="text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              Cancel
            </Button>
          </AlertDialogCancel>
          <Button
            onClick={handleDelete}
            className="bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 transition-colors duration-200 rounded-full px-6 py-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
