import { Outlet } from 'react-router';
import Header from '../Components/Shared/Header';
import Sidebar from '../Components/Shared/Sidebar';
const Dashboard = () => {
  return (
    <div className="max-h-screen bg-[var(--color-white)] overflow-hidden">
      <Header />
      <div className="scroll-bar-hide flex gap-0 h-screen overflow-y-scroll">
        <div className="scroll-bar-hide pt-4 w-[300px] h-[calc(100vh-64px)] overflow-y-scroll pb-10 box-border ">
          <Sidebar />
        </div>
        <div className="w-[calc(100%-300px)] bg-[var(--color-gray-20)] h-screen">
          <div className="bg-[#E6ECF5] scroll-bar-hide w-full p-2 rounded-md h-[calc(100vh-110px)] overflow-y-scroll">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
