import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { IUser } from '../../types/User';
import { useSelectedBoardContext } from '../../context/SelectedBoardContext';
import { useFetchUsers } from '../../hooks/useFetchUsers';

export const AddUserToBoardButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState('');
  const queryClient = useQueryClient();
  const { selectedBoard } = useSelectedBoardContext();
  const { users, fetchLoading } = useFetchUsers();

  const addUserToBoard = async () => {
    try {
      const userAlreadyExists = selectedBoard!.board_users.some(
        (email) => email === newUser
      );

      if (userAlreadyExists) return;

      const response = await axios.patch(
        `http://37.152.180.88:3000/boards/${selectedBoard!.id}`,
        {
          board_users: [...selectedBoard!.board_users, newUser],
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const mutation = useMutation({
    mutationFn: addUserToBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards'] });
      setIsDialogOpen(false);
      setNewUser('');
    },
    onError: (error) => {
      alert(`${error} | Failed to add user. Please try again.`);
    },
  });

  const handleAddUser = () => {
    if (newUser) {
      mutation.mutate();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleAddUser();
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="bg-blue-500 hover:bg-blue-600 text-white hover:text-whitex dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:text-white transition-colors duration-200"
        >
          <Plus className="h-5 w-5 mr-2" />
          <span>Add Member</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        onKeyDown={handleKeyDown} // Attach the keydown handler
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-blue-600 dark:text-indigo-400">
            Add User to Board
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Select a user to add to your board.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label
              htmlFor="userSelect"
              className="text-right text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              User
            </label>
            {fetchLoading ? (
              <p className="col-span-3 text-gray-600 dark:text-gray-400">
                Loading users...
              </p>
            ) : (
              <Select
                value={newUser}
                onValueChange={(value) => setNewUser(value)}
              >
                <SelectTrigger className="col-span-3 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-indigo-500 focus:ring-blue-500 dark:focus:ring-indigo-500">
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
            onClick={handleAddUser}
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:text-white transition-colors duration-200"
          >
            Add User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
