import { useSelectedBoardContext } from '../../context/SelectedBoardContext';
import { AddUserToBoardButton } from './AddUserToBoard';

export const KanbanHeader = () => {
  const { selectedBoard } = useSelectedBoardContext();

  return (
    <div className="flex justify-between items-center px-4 py-4 border-b ">
      {selectedBoard ? (
        <>
          <h2 className="text-2xl font-semibold">
            {selectedBoard.board_title}
          </h2>
          <div className="flex items-center space-x-4">
            <AddUserToBoardButton />
          </div>
        </>
      ) : (
        <h2>Please Select from one of the boards</h2>
      )}
    </div>
  );
};
