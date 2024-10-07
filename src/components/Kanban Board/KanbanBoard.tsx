import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { IColumn } from '../../types/Column';
import { KanbanHeader } from './KanbanHeader';

export const KanbanBoard = () => {
  const fetchColumns = async (): Promise<IColumn[]> => {
    const response = await axios.get('http://localhost:3000/columns');
    return response.data;
  };

  const { data: columns } = useQuery({
    queryKey: ['Columns'],
    queryFn: fetchColumns,
  });

  console.log(columns);

  return (
    <div className="min-h-full w-full overflow-x-auto ">
      <KanbanHeader />

      {/* <div className="flex gap-4 p-4">
        {filteredColumns?.map((column) => (
          <ColumnContainer key={column.id} column={column} />
        ))}
        <CreateColumn />
      </div> */}
    </div>
  );
};
