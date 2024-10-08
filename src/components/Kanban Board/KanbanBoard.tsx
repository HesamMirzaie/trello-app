import { KanbanHeader } from './KanbanHeader';
import { useSelectedBoardContext } from '../../context/SelectedBoardContext';
import { CreateColumn } from './CreateColumn';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { IColumn } from '../../types/Column';
import { ColumnContainer } from './ColumnContainer';

export const KanbanBoard = () => {
  const { selectedBoard } = useSelectedBoardContext();
  const fetchColumns = async (): Promise<IColumn[]> => {
    if (!selectedBoard?.id) return [];
    const response = await axios.get(
      `http://localhost:3000/columns?boardId=${selectedBoard.id}`
    );
    return response.data;
  };

  const { data: columns, isLoading } = useQuery({
    queryKey: ['Columns', selectedBoard?.id],
    queryFn: fetchColumns,
    enabled: !!selectedBoard?.id, // Only run query if selectedBoard.id exists
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-full w-full">
      <KanbanHeader />
      {selectedBoard && (
        <div className="flex gap-4 p-4 overflow-x-auto">
          {columns?.map((column) => (
            <ColumnContainer key={column.id} column={column} />
          ))}
          <CreateColumn />
        </div>
      )}
    </div>
  );
};
