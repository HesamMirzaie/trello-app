import { KanbanHeader } from './KanbanHeader';
import { useSelectedBoardContext } from '../../context/SelectedBoardContext';

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
    <div className="min-h-full w-full overflow-x-auto ">
      <KanbanHeader />
      <div className="p-4 overflow-x-hidden">
        {selectedBoard && JSON.stringify(selectedBoard)}
      </div>
      {/* <div className="flex gap-4 p-4">
        {filteredColumns?.map((column) => (
          <ColumnContainer key={column.id} column={column} />
        ))}
        <CreateColumn />
      </div> */}
    </div>
  );
};
