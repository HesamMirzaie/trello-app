import { useState, useEffect } from 'react';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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
  const [boardTitle, setBoardTitle] = useState<string>('');
  const [boardDescription, setBoardDescription] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { data: boardData } = useQuery({
    queryKey: ['boards', boardId],
    queryFn: async () => {
      const response = await axios.get<IBoard>(
        `http://37.152.180.88:3000/boards/${boardId}`
      );
      return response.data;
    },
  });

  // Set board title and description when board data is fetched
  useEffect(() => {
    if (boardData) {
      setBoardTitle(boardData.board_title);
      setBoardDescription(boardData.board_description);
    }
  }, [boardData]);

  const updateBoardMutation = useMutation({
    mutationFn: async () => {
      await axios.patch(`http://37.152.180.88:3000/boards/${boardId}`, {
        board_title: boardTitle,
        board_description: boardDescription,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards'] });
      setIsDialogOpen(false);
    },
  });

  // Handle title change
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardTitle(e.target.value);
  };

  // Handle description change
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setBoardDescription(e.target.value);
  };

  // Handle updating the board
  const handleUpdateBoard = () => {
    if (boardTitle.trim() && boardDescription.trim()) {
      updateBoardMutation.mutate();
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
            Edit Board
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400 mt-2">
            Update the title and description of your Kanban board.
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
              autoComplete="off"
              value={boardTitle}
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
              value={boardDescription}
              onChange={handleDescriptionChange}
              className="bg-gray-100 text-gray-800 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:focus:border-indigo-500 dark:focus:ring-indigo-500 rounded-md transition-all duration-200"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleUpdateBoard}
            className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-indigo-600 dark:text-gray-200 dark:hover:bg-indigo-700 transition-colors duration-200 rounded-full px-6 py-2 shadow-md hover:shadow-lg"
          >
            Update Board
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
