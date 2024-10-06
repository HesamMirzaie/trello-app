import axios from 'axios';
import { useUser } from '../context/UserContext';
import { IBoard } from '../types/Board';
import { useQuery } from '@tanstack/react-query';
import { ScrollArea } from './ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { EllipsisVertical } from 'lucide-react';
import { Card } from './ui/card';
import { useState } from 'react';

export default function ProjectsContainer() {
  const { user } = useUser();

  const fetchBoards = async (): Promise<IBoard[]> => {
    const response = await axios.get('http://localhost:3000/boards');
    return response.data;
  };

  const { data: boards } = useQuery<IBoard[], Error>({
    queryKey: ['boards'],
    queryFn: fetchBoards,
  });

  const filteredBoards = boards?.filter((board) =>
    board.board_users.includes(user?.email || '')
  );

  if (!filteredBoards || filteredBoards.length === 0) {
    return (
      <div className="text-gray-500">
        No boards found. Create a new board to get started.
      </div>
    );
  }

  return (
    <ScrollArea className="max-h-[200px] pr-4">
      {filteredBoards.map((board) => (
        <BoardCard key={board.id} board={board} />
      ))}
    </ScrollArea>
  );
}

function BoardCard({ board }: { board: IBoard }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <Card
      className={`w-full flex items-center h-12 mb-2 transition-colors cursor-pointer rounded-md shadow-sm border `}
    >
      <div className="flex items-center w-full p-2">
        <img
          src={board.board_image}
          alt="img"
          className=" w-6 h-6 rounded-md"
        />
        <p className="flex-1 ml-2 text-lg font-medium">{board.board_title}</p>
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger
            onClick={(e) => e.stopPropagation()}
            aria-label="Board options"
            asChild
          >
            <EllipsisVertical className=" text-gray-600" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="space-y-1 bg-white dark:bg-gray-800 dark:text-gray-200 border dark:border-gray-700 rounded-md shadow-lg p-2 w-32"
            onClick={(e) => e.stopPropagation()}
          >
            {/* <EditBoard boardId={board.id} />
            <DeleteBoard boardId={board.id} /> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
}
