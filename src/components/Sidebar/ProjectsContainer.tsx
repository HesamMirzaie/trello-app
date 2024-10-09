import axios from 'axios';
import { IBoard } from '../../types/Board';
import { useQuery } from '@tanstack/react-query';
import { ScrollArea } from '../ui/scroll-area';
import { Card } from '../ui/card';
import { useAuthUser } from '../../context/UserContext';
import { EditBoard } from './EditBoard';
import { DeleteBoard } from './DeleteBoard';
import { useSelectedBoardContext } from '../../context/SelectedBoardContext';
import { EllipsisButton } from '../ui/EllipsisButton';

export default function ProjectsContainer() {
  const { user } = useAuthUser();

  const fetchBoards = async (): Promise<IBoard[]> => {
    const response = await axios.get('http://localhost:3000/boards');
    return response.data;
  };

  const {
    data: boards,
    error,
    isLoading,
  } = useQuery<IBoard[], Error>({
    queryKey: ['boards'],
    queryFn: fetchBoards,
  });

  if (isLoading) return <div>Loading boards...</div>;
  if (error) return <div>Error fetching boards: {error.message}</div>;

  const filteredBoards = boards?.filter((board) =>
    board.board_users.includes(user?.email || '')
  );

  if (!filteredBoards || filteredBoards.length === 0) {
    return <div className="my-2">No boards found</div>;
  }

  return (
    <ScrollArea className="max-h-[190px] pr-4 pt-2 mb-2 overflow-y-auto scrollbar-hidden">
      {filteredBoards.map((board) => (
        <BoardCard key={board.id} board={board} />
      ))}
    </ScrollArea>
  );
}

function BoardCard({ board }: { board: IBoard }) {
  const { selectedBoard, setSelectedBoard } = useSelectedBoardContext();

  return (
    <Card
      onClick={() => setSelectedBoard(board)}
      className={`w-full flex items-center h-12 mb-2 transition-colors cursor-pointer rounded-md shadow-sm border border-gray-200 dark:border-indigo-800 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-indigo-300 ${
        selectedBoard?.id === board.id &&
        'border-green-700 dark:border-green-300'
      }`}
    >
      <div className="flex items-center w-full p-2">
        <img
          src={board.board_image || '/fallback-image.png'}
          alt={board.board_title}
          className=" w-6 h-6 rounded-md"
        />
        <p className="flex-1 ml-2 text-lg font-medium truncate ">
          {board.board_title}
        </p>
        <EllipsisButton>
          <EditBoard boardId={board.id} />
          <DeleteBoard boardId={board.id} />
        </EllipsisButton>
      </div>
    </Card>
  );
}
