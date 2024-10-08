import { useSelectedBoardContext } from '../../context/SelectedBoardContext';
import { AddUserToBoardButton } from './AddUserToBoard';

export const KanbanHeader = () => {
  const { selectedBoard } = useSelectedBoardContext();

  return (
    <div className="flex justify-between items-center px-4 py-4 border-b ">
      <h2 className="text-2xl font-semibold">
        {selectedBoard
          ? selectedBoard?.board_title
          : 'Please Select from one of the boards'}
      </h2>
      <div className="flex items-center space-x-4">
        <AddUserToBoardButton />
      </div>
    </div>
  );
};
