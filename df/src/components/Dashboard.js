import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container mt-5">
      <h1>Welcome, {user?.username}!</h1>
      <p>This is your protected dashboard.</p>
    </div>
  );
};

export default Dashboard;
