import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { useAuthUser } from '../context/UserContext';
import { KanbanBoard } from '../components/Kanban Board/KanbanBoard';
import { X } from 'lucide-react';

export const Dashboard = () => {
  const [alert, setAlert] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuthUser();

  useEffect(() => {
    setAlert(true);
  }, []);

  // Check if there is a user or not
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  return (
    <div className=" w-full h-screen flex overflow-y-hidden ">
      <Sidebar />
      <KanbanBoard />
      {alert && (
        <p className=" absolute right-5 bottom-5 bg-green-300 rounded-md p-4">
          This site is still under the work
          <X
            onClick={() => setAlert(false)}
            className=" absolute top-1 right-1 cursor-pointer"
          />
          <span className=" block">
            We Will add Drag and Drop Between Columns ASAP!!
          </span>
        </p>
      )}
    </div>
  );
};
