import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { useAuthUser } from '../context/UserContext';
import { KanbanBoard } from '../components/Kanban Board/KanbanBoard';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthUser();

  // Check if there is a user or not
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  return (
    <div className=" w-full h-screen flex overflow-y-hidden">
      <Sidebar />
      <KanbanBoard />
    </div>
  );
};
