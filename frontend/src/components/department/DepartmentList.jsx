import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import DataTable from 'react-data-table-component';
import { DepartmentButtons, columns } from '../../utils/DepartmentHelper';
import axios from 'axios';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  const onDepartmentDelete = () => {
    // You can implement the delete logic here later
  };

  const fetchDepartments = async () => {
    setDepLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/department', {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.data.success) {
        let sno = 1;
        const data = response.data.departments.map((dep) => ({
          _id: dep._id,
          sno: sno++,
          dep_name: dep.dep_name,
          action: <DepartmentButtons id={dep._id} onDepartmentDelete={onDepartmentDelete} />,
        }));
        setDepartments(data);
        setFilteredDepartments(data);
      }
    } catch (error) {
      if (error.response && error.response.data && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setDepLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const filterDepartments = (e) => {
    const records = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredDepartments(records);
  };

  return (
    <>
      {depLoading ? (
        <div className="flex justify-center items-center h-screen w-full">Loading ...</div>
      ) : (
        <div className='min-h-screen w-full flex flex-col p-2 sm:p-4 pt-16 sm:pt-20 overflow-x-hidden sm:overflow-x-hidden'>
          <div className='text-center mb-3 sm:mb-4'>
            <h3 className='text-lg sm:text-xl md:text-2xl font-bold'>Manage Departments</h3>
          </div>
          <div className='flex flex-col sm:flex-row justify-between items-center mb-3 sm:mb-4 gap-2 sm:gap-3'>
            <input 
              type="text" 
              placeholder='Search By Dep Name' 
              className='w-full sm:w-56 md:w-64 px-2 sm:px-3 py-1 border rounded-md text-sm sm:text-base'
              onChange={filterDepartments}
            />
            <Link 
              to="/admin-dashboard/add-department" 
              className="w-full sm:w-auto px-2 sm:px-3 md:px-4 py-1 bg-teal-600 rounded text-white text-center text-sm sm:text-base hover:bg-teal-700 whitespace-nowrap"
            >
              Add New Department
            </Link>
          </div>
          <div className='flex-grow w-full'>
            <DataTable
              columns={columns}
              data={filteredDepartments}
              pagination
              responsive
              className='w-full'
              customStyles={{
                table: {
                  style: {
                    width: '100%',
                    overflowX: 'auto', // Allow horizontal scrolling within the table
                    maxWidth: '100%', // Ensure the table doesn’t exceed its container
                  },
                },
                tableWrapper: {
                  style: {
                    width: '100%',
                    overflowX: 'auto', // Scroll on mobile
                    maxWidth: '100%', // Prevent wrapper from overflowing the viewport
                    display: 'block', // Ensure the wrapper behaves as a block-level element
                  },
                },
                headCells: {
                  style: {
                    fontSize: '10px sm:12px md:14px',
                    fontWeight: 'bold',
                    padding: '4px sm:8px md:10px', // Reduced padding for mobile
                    whiteSpace: 'nowrap',
                  },
                },
                cells: {
                  style: {
                    fontSize: '11px sm:13px md:14px',
                    padding: '4px sm:8px md:10px', // Reduced padding for mobile
                    whiteSpace: 'nowrap', // Prevent cell content from wrapping
                  },
                },
                pagination: {
                  style: {
                    fontSize: '12px sm:14px',
                    padding: '4px sm:8px',
                    borderTop: '1px solid #e5e7eb',
                  },
                },
              }}
            />
          </div>
        </div>
      )}
    </>
  )
};

export default DepartmentList;
