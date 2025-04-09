import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewSalary = () => {
  const [salaries, setSalaries] = useState(null);
  const [filteredSalaries, setFilteredSalaries] = useState(null); // Fixed typo: setFilteredSalries -> setFilteredSalaries
  const { id } = useParams();
  

  const fetchSalaries = async () => {
    try {
      console.log("here");
      const response = await axios.get(`http://localhost:5000/api/salary/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Handle the response based on success
      if (response.data.success) {
        setSalaries(response.data.salary);
        setFilteredSalaries(response.data.salary);
      } else {
        // If success is false (e.g., 404 from backend), treat it as no records
        setSalaries([]);
        setFilteredSalaries([]);
      }
      console.log(response.data.salary);

    } catch (error) {
      // Only handle unexpected errors here (e.g., network issues)
      console.error("Error fetching salaries:", error.message);
      setSalaries([]);
      setFilteredSalaries([]);
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  const filterSalaries = (e) => {
    const q = e.target.value; // Get the input value from the event
    if (!salaries) return; // Guard clause if salaries is null
    const filteredRecords = salaries.filter((salary) =>
      salary.employeeId.employeeId.toLowerCase().includes(q.toLowerCase())
    );
    setFilteredSalaries(filteredRecords);
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {filteredSalaries === null ? (
        <div className="text-center py-10 text-gray-600">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-4">
              Salary History
            </h2>
          </div>
  
          <div className="flex justify-end mb-6">
            <input
              type="text"
              placeholder="Search By Employee Id"
              className="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
              onChange={filterSalaries}
            />
          </div>
  
          {filteredSalaries.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 border-collapse">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr className="border-b">
                    <th className="px-4 py-3 sm:px-6">SNO</th>
                    <th className="px-4 py-3 sm:px-6">Emp ID</th>
                    <th className="px-4 py-3 sm:px-6">Salary</th>
                    <th className="px-4 py-3 sm:px-6">Allowances</th>
                    <th className="px-4 py-3 sm:px-6">Deduction</th>
                    <th className="px-4 py-3 sm:px-6">Total</th>
                    <th className="px-4 py-3 sm:px-6">Pay Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSalaries.map((salary, index) => (
                    <tr
                      key={salary._id}
                      className="bg-white border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 sm:px-6">{index + 1}</td>
                      <td className="px-4 py-3 sm:px-6">
                        {salary.employeeId.employeeId}
                      </td>
                      <td className="px-4 py-3 sm:px-6">{salary.basicSalary}</td>
                      <td className="px-4 py-3 sm:px-6">{salary.allowances}</td>
                      <td className="px-4 py-3 sm:px-6">{salary.deductions}</td>
                      <td className="px-4 py-3 sm:px-6">{salary.netSalary}</td>
                      <td className="px-4 py-3 sm:px-6">
                        {new Date(salary.payDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-10 text-gray-600">No Records Found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewSalary;