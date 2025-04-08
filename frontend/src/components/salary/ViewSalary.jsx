import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewSalary = () => {
  const [salaries, setSalaries] = useState(null);
  const [filteredSalaries, setFilteredSalaries] = useState(null); // Fixed typo: setFilteredSalries -> setFilteredSalaries
  const { id } = useParams();
  let sno = 1;

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
    <>
      {filteredSalaries === null ? (
        <div>Loading ...</div>
      ) : (
        <div className="overflow-x-auto p-5">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Salary History</h2>
          </div>
          <div className="flex justify-end my-3">
            <input
              type="text"
              placeholder="Search By Employee Id"
              className="border px-2 rounded-md py-0.5 border-gray-500"
              onChange={filterSalaries}
            />
          </div>
          {filteredSalaries.length > 0 ? (
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
                <tr>
                  <th className="px-6 py-3">SNO</th>
                  <th className="px-6 py-3">Emp ID</th>
                  <th className="px-6 py-3">Salary</th>
                  <th className="px-6 py-3">Allowances</th>
                  <th className="px-6 py-3">Deduction</th>
                  <th className="px-6 py-3">Total</th>
                  <th className="px-6 py-3">Pay Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredSalaries.map((salary) => (
                  <tr
                    key={salary._id} // Use _id instead of id (assuming MongoDB)
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-3">{sno++}</td>
                    <td className="px-6 py-3">{salary.employeeId.employeeId}</td>
                    <td className="px-6 py-3">{salary.basicSalary}</td>
                    <td className="px-6 py-3">{salary.allowances}</td>
                    <td className="px-6 py-3">{salary.deductions}</td>
                    <td className="px-6 py-3">{salary.netSalary}</td>
                    <td className="px-6 py-3">{new Date(salary.payDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>No Records</div>
          )}
        </div>
      )}
    </>
  );
};

export default ViewSalary;