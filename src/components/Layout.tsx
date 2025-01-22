import { Outlet } from 'react-router-dom';
import { ToastContainer } from "react-toastify"
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto py-8">
        <Outlet />
      </main>
      <ToastContainer autoClose={1500} />
    </div>
  );
}