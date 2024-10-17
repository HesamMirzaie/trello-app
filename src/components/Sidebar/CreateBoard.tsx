import { Plus } from 'lucide-react';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { IBoard } from '../../types/Board';
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
import { Textarea } from '../ui/textarea';
import { createAvatar } from '@dicebear/core';
import { icons } from '@dicebear/collection';
import { useAuthUser } from '../../context/UserContext';

export const CreateBoard = () => {
  const [newBoardTitle, setNewBoardTitle] = useState<string>('');
  const [newBoardDescription, setNewBoardDescription] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { user } = useAuthUser();
  const avatar = createAvatar(icons);

  const createBoardMutation = useMutation({
    mutationFn: async (newBoard: IBoard) => {
      const response = await axios.post<IBoard>(
        'http://37.152.180.88:3000/boards',
        newBoard
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards'] });
      setNewBoardTitle('');
      setNewBoardDescription('');
      setIsDialogOpen(false);
    },
    onError: (error) => {
      console.error('Error creating board:', error);
    },
  });

  const handleCreateBoard = () => {
    if (!newBoardTitle.trim()) {
      alert('Please enter a board title');
      return;
    }
    const newBoard: IBoard = {
      id: uuidv4(),
      board_title: newBoardTitle.trim(),
      board_description: newBoardDescription.trim(),
      board_image: avatar.toDataUri(),
      board_users: [user?.email!],
    };
    createBoardMutation.mutate(newBoard);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleCreateBoard();
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className=" w-full px-4 py-2 flex items-center space-x-2 border-dashed  border-blue-600 text-blue-600 hover:text-blue-600 dark:border-indigo-600 dark:text-indigo-300"
          variant="outline"
          onClick={() => setIsDialogOpen(true)}
        >
          {createBoardMutation.isPending ? (
            'Adding...'
          ) : (
            <>
              {' '}
              <Plus /> <p>Add Board</p>{' '}
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent
        onKeyDown={handleKeyDown} // Attach the keydown handler
        className="bg-white text-gray-800 border border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 rounded-lg shadow-xl max-w-md mx-auto"
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-600 dark:text-indigo-400">
            Create a new board
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400 mt-2">
            Add a title and description for your new Kanban board.
          </DialogDescription>
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
              value={newBoardTitle}
              autoComplete="off"
              onChange={(e) => setNewBoardTitle(e.target.value)}
              className="bg-gray-100 text-gray-800 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:focus:border-indigo-500 dark:focus:ring-indigo-500 rounded-md transition-all duration-200"
              required
              aria-required="true"
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
              value={newBoardDescription}
              onChange={(e) => setNewBoardDescription(e.target.value)}
              className="bg-gray-100 text-gray-800 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 rounded-md transition-all duration-200 min-h-[100px] dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:focus:border-indigo-500 dark:focus:ring-indigo-500"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleCreateBoard}
            disabled={
              !newBoardTitle ||
              !newBoardDescription ||
              createBoardMutation.isPending
            }
            className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-indigo-600 dark:text-gray-200 dark:hover:bg-indigo-700 transition-colors duration-200 rounded-full px-6 py-2 shadow-md hover:shadow-lg"
          >
            {createBoardMutation.isPending ? 'Creating...' : 'Create Board'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
