import axios from 'axios';
import { useUser } from '../context/UserContext';
import { IBoard } from '../types/Board';
import { useQuery } from '@tanstack/react-query';
import { ScrollArea } from './ui/scroll-area';

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
        <p>{board.board_title}</p>
      ))}
    </ScrollArea>
  );
}

// function BoardCard({
//   board,
//   selectedBoard,
//   setSelectedBoard,
// }: {
//   board: IBoard;
//   selectedBoard: IBoard | null;
//   setSelectedBoard: (board: IBoard) => void;
// }) {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   return (
//     <Card
//       className={`w-full flex items-center h-12 mb-2 transition-colors cursor-pointer rounded-md shadow-sm border ${
//         selectedBoard?.id === board.id
//           ? 'border-blue-500 dark:border-indigo-500 bg-blue-50 dark:bg-indigo-900/20'
//           : 'border-transparent hover:bg-gray-50 dark:hover:bg-gray-800/50'
//       }`}
//       onClick={() => setSelectedBoard(board)}
//     >
//       <div className="flex items-center w-full p-2">
//         <p className="flex-1 ml-3 font-medium truncate">{board.board_title}</p>
//         <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
//           <DropdownMenuTrigger asChild>
//             <Button
//               variant="ghost"
//               size="icon"
//               className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
//               onClick={(e) => e.stopPropagation()}
//               aria-label="Board options"
//             >
//               <EllipsisVertical className="w-5 h-5" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent
//             className="space-y-1 bg-white dark:bg-gray-800 dark:text-gray-200 border dark:border-gray-700 rounded-md shadow-lg p-2 w-32"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <EditBoard boardId={board.id} />
//             <DeleteBoard boardId={board.id} />
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//     </Card>
//   );
// }
