import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios';
const View = () => {
    const {id}=useParams();
    const [employee,setEmployee]=useState(null)
    const navigate = useNavigate();
    useEffect(()=> {
        const fetchEmployee = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/api/employee/${id}`,{
              headers : {
                Authorization : `Bearer ${localStorage.getItem('token')}`
              },
            });
            
            if(response.data.success){
                
              setEmployee(response.data.employee)
            }
          }catch(error){
            if(error.response && error.response.data.success){
                alert(error.response.data.error)
          }
          }
        };
    
        fetchEmployee();
      }, []);
      return (
        <div className='min-h-screen w-full flex flex-col p-2 sm:p-4 bg-gray-100 mt-7'>
          {employee ? (
            <div className='flex-grow w-full mt-6 sm:mt-10 bg-white p-3 sm:p-4 md:p-8 rounded-md shadow-md'>
              <h2 className='text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 md:mb-8 text-center'>
                Employee Details
              </h2>
              {/* Search Input */}
              <div className='mb-3 sm:mb-4 md:mb-6 px-2 sm:px-4'>
                <input
                  type="text"
                  placeholder="Search employee details (e.g., name)"
                  className='w-full max-w-md px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-teal-600'
                  disabled // Placeholder; no search functionality implemented yet
                />
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 px-2 sm:px-4 '>
                <div className='flex justify-center mb-3 sm:mb-4 md:mb-0'>
                  <img 
                    src={`http://localhost:5000/${employee.userId.profileImage}`} 
                    alt="Employee" 
                    className='rounded-full border w-32 sm:w-48 md:w-60 lg:w-72 h-32 sm:h-48 md:h-60 lg:h-72 object-cover'
                  />
                </div>
                <div className='space-y-2 sm:space-y-3 md:space-y-5'>
                  <div className='flex flex-col sm:flex-row sm:space-x-2 md:space-x-3'>
                    <p className='text-sm sm:text-base md:text-lg font-bold shrink-0'>Name:</p>
                    <p className='text-sm sm:text-base font-medium break-words'>{employee.userId.name}</p>   
                  </div>
                  <div className='flex flex-col sm:flex-row sm:space-x-2 md:space-x-3'>
                    <p className='text-sm sm:text-base md:text-lg font-bold shrink-0'>Employee ID:</p>
                    <p className='text-sm sm:text-base font-medium break-words'>{employee.employeeId}</p>   
                  </div>
                  <div className='flex flex-col sm:flex-row sm:space-x-2 md:space-x-3'>
                    <p className='text-sm sm:text-base md:text-lg font-bold shrink-0'>Date of Birth:</p>
                    <p className='text-sm sm:text-base font-medium break-words'>{new Date(employee.dob).toLocaleDateString()}</p>   
                  </div>
                  <div className='flex flex-col sm:flex-row sm:space-x-2 md:space-x-3'>
                    <p className='text-sm sm:text-base md:text-lg font-bold shrink-0'>Gender:</p>
                    <p className='text-sm sm:text-base font-medium break-words'>{employee.gender}</p>   
                  </div>
                  <div className='flex flex-col sm:flex-row sm:space-x-2 md:space-x-3'>
                    <p className='text-sm sm:text-base md:text-lg font-bold shrink-0'>Department:</p>
                    <p className='text-sm sm:text-base font-medium break-words'>{employee.department.dep_name}</p>   
                  </div>
                  <div className='flex flex-col sm:flex-row sm:space-x-2 md:space-x-3'>
                    <p className='text-sm sm:text-base md:text-lg font-bold shrink-0'>Marital Status:</p>
                    <p className='text-sm sm:text-base font-medium break-words'>{employee.maritalStatus}</p>   
                  </div>
                </div>
              </div>
              {/* Buttons */}
              <div className='flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 mt-4 sm:mt-6 px-2 sm:px-4'>
                <button
                  className='w-full sm:w-auto px-2 sm:px-3 md:px-4 py-1 sm:py-2 bg-teal-600 text-white text-sm sm:text-base rounded hover:bg-teal-700 whitespace-nowrap'
                  onClick={() => navigate(`/admin-dashboard/employee/edit/${id}`)}
                >
                  Edit Employee
                </button>
                <button
                  className='w-full sm:w-auto px-2 sm:px-3 md:px-4 py-1 sm:py-2 bg-gray-600 text-white text-sm sm:text-base rounded hover:bg-gray-700 whitespace-nowrap '
                  onClick={() => navigate('/admin-dashboard/employees')}
                >
                  Back to List
                </button>
              </div>
            </div>
          ) : (
            <div className='flex-grow flex items-center justify-center text-center text-base sm:text-lg'>
              Loading...
            </div>
          )}
        </div>
      );
}

export default View