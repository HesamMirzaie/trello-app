import { useState, useEffect } from 'react';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Edit } from 'lucide-react';
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

interface EditBoardButtonProps {
  boardId: IBoard['id'];
}

export const EditBoard = ({ boardId }: EditBoardButtonProps) => {
  const [editBoard, setEditBoard] = useState<IBoard | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isDialogOpen && boardId) {
      setIsLoading(true);
      setError(null);
      const fetchBoard = async () => {
        try {
          const response = await axios.get<IBoard>(
            `http://localhost:3000/boards/${boardId}`
          );
          setEditBoard(response.data);
        } catch (error) {
          console.error('Error fetching board data:', error);
          setError('Failed to load board data. Please try again.');
        } finally {
          setIsLoading(false);
        }
      };
      fetchBoard();
    }
  }, [isDialogOpen, boardId]);

  const updateBoardMutation = useMutation({
    mutationFn: async () => {
      if (!editBoard) return;
      const updatedBoard = {
        id: editBoard.id,
        board_title: editBoard.board_title,
        board_description: editBoard.board_description,
        board_users: editBoard.board_users,
      };
      await axios.put(
        `http://localhost:3000/boards/${editBoard.id}`,
        updatedBoard
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards'] });
      setEditBoard(null);
      setIsDialogOpen(false);
    },
    onError: (error) => {
      console.error('Error updating board:', error);
      setError('Failed to update board. Please try again.');
    },
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditBoard((prev) =>
      prev ? { ...prev, board_title: e.target.value } : null
    );
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditBoard((prev) =>
      prev ? { ...prev, board_description: e.target.value } : null
    );
  };

  const handleUpdateBoard = () => {
    if (!editBoard?.board_title.trim()) {
      setError('Board title cannot be empty');
      return;
    }
    updateBoardMutation.mutate();
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full text-sm py-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 border-blue-200 hover:border-blue-300 dark:border-blue-800 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white text-gray-800 border border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 rounded-lg shadow-xl max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Edit Board
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400 mt-2">
            Update the title and description of your Kanban board.
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <div className="py-6 text-center">Loading board data...</div>
        ) : error ? (
          <div className="py-6 text-center text-red-600 dark:text-red-400">
            {error}
          </div>
        ) : (
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
                value={editBoard?.board_title || ''}
                autoComplete="off"
                onChange={handleTitleChange}
                className="bg-gray-100 text-gray-800 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:focus:border-blue-400 rounded-md transition-all duration-200 placeholder:text-gray-500 dark:placeholder:text-gray-400"
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
                value={editBoard?.board_description || ''}
                onChange={handleDescriptionChange}
                className="bg-gray-100 text-gray-800 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:focus:border-blue-400 focus:ring-opacity-50 rounded-md transition-all duration-200 min-h-[100px] placeholder:text-gray-500 dark:placeholder:text-gray-400"
              />
            </div>
          </div>
        )}
        <DialogFooter>
          <Button
            onClick={handleUpdateBoard}
            className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors duration-200 rounded-full px-6 py-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Update Board
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
