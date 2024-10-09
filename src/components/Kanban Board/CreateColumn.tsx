import { Plus } from 'lucide-react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSelectedBoardContext } from '../../context/SelectedBoardContext';
import { IColumn } from '../../types/Column';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export const CreateColumn = () => {
  const [newColumnTitle, setNewColumnTitle] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { selectedBoard } = useSelectedBoardContext();

  const queryClient = useQueryClient(); // Access the QueryClient

  const addColumnMutation = useMutation({
    mutationFn: async (newCol: IColumn) => {
      const response = await axios.post(
        'http://localhost:3000/columns',
        newCol
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['columns'],
      });
      setNewColumnTitle('');
    },
  });

  function addColumn() {
    if (!newColumnTitle.trim()) return;

    const newCol: IColumn = {
      id: uuidv4(),
      column_title: newColumnTitle,
      boardId: selectedBoard!.id,
    };

    addColumnMutation.mutate(newCol);
    setIsDialogOpen(false);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setIsDialogOpen(true)}
          variant="outline"
          className="h-[40px] w-[350px] min-w-[350px] cursor-pointer flex gap-x-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 dark:border-indigo-500"
        >
          <Plus />
          Add Column
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded-lg shadow-xl max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            Create a new column
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400 mt-2">
            Add a title for your new column.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-y-3 py-2">
          <label
            htmlFor="columnTitle"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Column Title
          </label>
          <Input
            id="columnTitle"
            placeholder="Enter column title"
            value={newColumnTitle}
            autoComplete="off"
            onChange={(e) => setNewColumnTitle(e.target.value)}
            className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:ring-opacity-50 rounded-md transition-all duration-200 placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />
        </div>
        <DialogFooter>
          <Button
            onClick={addColumn}
            className="bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors duration-200 rounded-full px-6 py-2 shadow-md hover:shadow-lg"
          >
            Add Column
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
