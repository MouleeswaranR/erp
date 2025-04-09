import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const AddDepartment = () => {
    const [department, setDepartment]=useState({
        dep_name:'',
        description:''
    })
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setDepartment({...department, [name] : value})
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            // console.log("here");
            // console.log(department);
            // console.log(localStorage.getItem('token'));
            
            const response = await axios.post('http://localhost:5000/api/department/add', department,{
                headers: { 
                    "Authorization" : `Bearer ${localStorage.getItem('token')}`
                }
            }) 
            console.log(response);
            
        if(response.data.success){
            navigate("/admin-dashboard/departments") 

        }
        }catch(error){
            if(error.response && error.response.data.success){
                alert(error.response.data.error)
            }
        }
    }
    return (
        <div className="max-w-3xl mx-auto mt-10 sm:mt-16 bg-white p-4 sm:p-6 md:p-8 rounded-md shadow-md w-full sm:w-96">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Add New Department</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="dep_name"
                className="text-xs sm:text-sm font-medium text-gray-700"
              >
                Department Name
              </label>
              <input
                type="text"
                name="dep_name"
                onChange={handleChange}
                placeholder='Department Name'
                className="mt-1 w-full p-1 sm:p-2 border border-gray-300 rounded-md text-sm sm:text-base"
                required
              />
            </div>
            <div className="mt-4 sm:mt-6">
              <label
                htmlFor="description"
                className="block text-xs sm:text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                name="description"
                placeholder='Description'
                onChange={handleChange}
                className="mt-1 p-1 sm:p-2 block w-full border border-gray-300 rounded-md text-sm sm:text-base"
                rows="4"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-4 sm:mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-1 sm:py-2 px-2 sm:px-4 rounded text-sm sm:text-base"
            >
              Add Department
            </button>
          </form>
        </div>
      );
};

export default AddDepartment;