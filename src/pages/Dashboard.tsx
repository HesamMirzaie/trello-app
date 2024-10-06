import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Sidebar } from '../components/Sidebar';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  // Check if there is a user or not
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  return (
    <div className=" w-full h-screen flex overflow-y-hidden bg-gray-100">
      <Sidebar />
    </div>
  );
};
