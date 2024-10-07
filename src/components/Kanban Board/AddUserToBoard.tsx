import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
import { Select, SelectTrigger, SelectValue } from '../ui/select';

export const AddUserToBoardButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState('');
  const queryClient = useQueryClient();

  //   const addUserToBoard = async () => {
  //     const response = await axios.patch(
  //       `http://localhost:3000/boards/${selectedBoard.id}`,
  //       {}
  //     );
  //     return response.data;
  //   };

  //   const mutation = useMutation({
  //     mutationFn: addUserToBoard,
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({ queryKey: ['boards'] });
  //       setIsDialogOpen(false);
  //       setNewUser('');
  //     },
  //     onError: (error) => {
  //       console.error('Error adding user:', error);
  //       alert('Failed to add user. Please try again.');
  //     },
  //   });

  //   const handleAddUser = () => {
  //     if (newUser) {
  //       mutation.mutate();
  //     }
  //   };

  //   async function fetchUsers() {
  //     const response = await axios.get('http://localhost:3000/users');
  //     return response.data;
  //   }

  //   const { data: users, isLoading } = useQuery({
  //     queryKey: ['users'],
  //     queryFn: fetchUsers,
  //   });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="bg-blue-500 hover:bg-blue-600 text-white dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:text-white transition-colors duration-200"
        >
          <Plus className="h-5 w-5 mr-2" />
          <span>Add Member</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
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
            {/* {isLoading ? (
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
            )} */}
          </div>
        </div>
        <DialogFooter>
          <Button
            // onClick={handleAddUser}
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
