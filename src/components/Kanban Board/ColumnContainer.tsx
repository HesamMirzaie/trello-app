import { IColumn } from '../../types/Column';
import { EllipsisButton } from '../ui/EllipsisButton';
import { DeleteColumn } from './DeleteColumn';
import { EditColumn } from './EditColumn';
import { CreateTask } from './Tasks/CreateTask';
import { TaskContainer } from './Tasks/TaskContainer';

interface ColumnContainerProps {
  column: IColumn;
}

export const ColumnContainer = ({ column }: ColumnContainerProps) => {
  return (
    <div className="w-[350px] h-[700px] max-h-[700px] flex flex-col">
      {/* Column title */}
      <div className="font-bold p-3 flex items-center">
        <div className="flex flex-1 gap-x-2">
          <div className="w-1.5 h-1.5 bg-green-700 rounded-full my-auto" />
          <div className="text-lg">{column.column_title}</div>
        </div>
        <EllipsisButton>
          <EditColumn columnId={column.id} />
          <DeleteColumn columnId={column.id} />
        </EllipsisButton>
      </div>
      <CreateTask columnId={column.id} />
      <div className="flex-1">
        <TaskContainer columnId={column.id} />
      </div>
    </div>
  );
};
