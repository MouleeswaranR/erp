import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
const Detail = () => {
    const {id}=useParams();
    const [leave,setLeave]=useState(null)
    const navigate = useNavigate()

    useEffect(()=> {
        const fetchLeave = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/api/leave/detail/${id}`,{
              headers : {
                Authorization : `Bearer ${localStorage.getItem('token')}`
              },
            });
            console.log(response.data);
            
            if(response.data.success){
                
              setLeave(response.data.leave)
            }
          }catch(error){
            if(error.response && error.response.data.success){
                alert(error.response.data.error)
          }
          }
        };
    
        fetchLeave();
      }, []);

    const changeStatus = async (id, status) => {
      try {
        const response = await axios.put(`http://localhost:5000/api/leave/${id}`, {status},
          {
          headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`
          },
        });
        console.log(response.data);
        
        if(response.data.success){
          navigate('/admin-dashboard/leaves')
        }
      }catch(error){
        if(error.response && error.response.data.success){
            alert(error.response.data.error)
      }
      }
    }  

    return (
      <>
        {leave ? (
          <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-2xl bg-white p-6 sm:p-8 rounded-lg shadow-md">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 sm:mb-8 text-center text-gray-800">
                Leave Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Image */}
                <div className="flex justify-center sm:justify-start">
                  <img
                    src={`http://localhost:5000/${leave.employeeId.userId.profileImage}`}
                    alt={leave.employeeId.userId.name}
                    className="rounded-full border w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 object-cover"
                  />
                </div>
  
                {/* Details */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:space-x-3">
                    <p className="text-base sm:text-lg font-bold text-gray-700">
                      Name:
                    </p>
                    <p className="text-base sm:text-lg font-medium text-gray-900">
                      {leave.employeeId.userId.name}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:space-x-3">
                    <p className="text-base sm:text-lg font-bold text-gray-700">
                      Employee ID:
                    </p>
                    <p className="text-base sm:text-lg font-medium text-gray-900">
                      {leave.employeeId.employeeId}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:space-x-3">
                    <p className="text-base sm:text-lg font-bold text-gray-700">
                      Leave Type:
                    </p>
                    <p className="text-base sm:text-lg font-medium text-gray-900">
                      {leave.leaveType}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:space-x-3">
                    <p className="text-base sm:text-lg font-bold text-gray-700">
                      Reason:
                    </p>
                    <p className="text-base sm:text-lg font-medium text-gray-900 break-words">
                      {leave.reason}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:space-x-3">
                    <p className="text-base sm:text-lg font-bold text-gray-700">
                      Department:
                    </p>
                    <p className="text-base sm:text-lg font-medium text-gray-900">
                      {leave.employeeId.department.dep_name}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:space-x-3">
                    <p className="text-base sm:text-lg font-bold text-gray-700">
                      Start Date:
                    </p>
                    <p className="text-base sm:text-lg font-medium text-gray-900">
                      {new Date(leave.startDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:space-x-3">
                    <p className="text-base sm:text-lg font-bold text-gray-700">
                      End Date:
                    </p>
                    <p className="text-base sm:text-lg font-medium text-gray-900">
                      {new Date(leave.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:space-x-3">
                    <p className="text-base sm:text-lg font-bold text-gray-700">
                      {leave.status === "Pending" ? "Action:" : "Status:"}
                    </p>
                    {leave.status === "Pending" ? (
                      <div className="flex space-x-2 mt-2 sm:mt-0">
                        <button
                          className="px-3 py-1 bg-green-300 hover:bg-green-400 text-sm sm:text-base font-medium rounded-md transition-colors"
                          onClick={() => changeStatus(leave._id, "Approved")}
                        >
                          Approve
                        </button>
                        <button
                          className="px-3 py-1 bg-red-300 hover:bg-red-400 text-sm sm:text-base font-medium rounded-md transition-colors"
                          onClick={() => changeStatus(leave._id, "Rejected")}
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <p className="text-base sm:text-lg font-medium text-gray-900">
                        {leave.status}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="min-h-screen flex items-center justify-center text-gray-600">
            Loading...
          </div>
        )}
      </>
    );
  
  
}

export default Detail