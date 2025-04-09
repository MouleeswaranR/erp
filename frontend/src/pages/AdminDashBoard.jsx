import React from 'react'
import { useAuth } from '../context/authContext'
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/dashboard/AdminSidebar';
import Navbar from '../components/dashboard/Navbar';
import AdminSummary from '../components/dashboard/AdminSummary';

const AdminDashBoard = () => {
  
//    console.log(user);

   
return (
  <div className='flex'>
    {/* Hide sidebar on mobile (sm and below), show on md and up */}
    <div className='hidden md:block'>
      <AdminSidebar/>
    </div>
    {/* Adjust margin-left to 0 on mobile, 64 on md and up */}
    <div className='flex-1 ml-0 md:ml-64 bg-gray-100 h-screen'>
      <Navbar/>
      <Outlet/>
    </div>
  </div>
)
  
}

export default AdminDashBoard