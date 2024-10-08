import { IColumn } from '../../types/Column';
import { EllipsisButton } from '../ui/EllipsisButton';
import { DeleteColumn } from './DeleteColumn';
import { EditColumn } from './EditColumn';

interface ColumnContainerProps {
  column: IColumn;
}

export const ColumnContainer = ({ column }: ColumnContainerProps) => {
  return (
    <div className=" w-[350px] h-[500px] max-h-[500px] flex flex-col border">
      {/* Column title */}
      <div className=" font-bold p-3 flex items-center">
        <div className=" flex flex-1 gap-x-2">
          <div className=" w-1.5 h-1.5 bg-green-700 rounded-full my-auto" />
          <div className=" text-lg">{column.column_title}</div>
          <div className=" flex justify-center items-center px-2  rounded-lg">
            <div>4</div>
          </div>
        </div>
        <EllipsisButton>
          <EditColumn columnId={column.id} />
          <DeleteColumn columnId={column.id} />
        </EllipsisButton>
      </div>
      {/* <CreateTask /> */}
      <div className="flex-1">{/* Task placeholder */}</div>
    </div>
  );
};
