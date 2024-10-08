import { KanbanHeader } from './KanbanHeader';
import { useSelectedBoardContext } from '../../context/SelectedBoardContext';
import { CreateColumn } from './CreateColumn';

export const KanbanBoard = () => {
  const { selectedBoard } = useSelectedBoardContext();
  //   const fetchColumns = async (): Promise<IColumn[]> => {
  //     const response = await axios.get('http://localhost:3000/columns');
  //     return response.data;
  //   };

  //   const { data: columns } = useQuery({
  //     queryKey: ['Columns'],
  //     queryFn: fetchColumns,
  //   });

  return (
    <div className="min-h-full w-full">
      <KanbanHeader />
      {selectedBoard && (
        <div className="flex gap-4 p-4 overflow-x-auto">
          {/* {filteredColumns?.map((column) => (
          <ColumnContainer key={column.id} column={column} />
        ))} */}
          <CreateColumn />
        </div>
      )}
    </div>
  );
};
