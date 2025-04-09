import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from 'react-icons/fa';

export const columns = [
    {
        name : "S No",
        selector : (row) => row.sno,
    },
    {
        name : "Department Name",
        selector : (row) => row.dep_name,
        sortable: true
    },
    {
        name : "Action",
        selector : (row) => row.action
    },
] 

export const DepartmentButtons = ({id, onDepartmentDelete }) => {
    const navigate = useNavigate()

    const handleDelete = async () => {
       
        
        const confirm = window.confirm("Are you sure you want to delete this department?")
        if(confirm){
        try {
            console.log("here");
            console.log(id);
            
            const response = await axios.delete(`http://localhost:5000/api/department/${id}`,{
              headers : {
                Authorization : `Bearer ${localStorage.getItem('token')}`,
              },
            }
        );
            
            if(response.data.success){
                onDepartmentDelete()
            }
          }catch(error){
            if(error.response && error.response.data.success){
                alert(error.response.data.error)
          }
          }

    }
}
return (
    <div className="flex space-x-2 sm:space-x-3">
      <button
        className="px-2 py-1 sm:px-3 sm:py-2 bg-teal-600 text-white text-sm sm:text-base rounded hover:bg-teal-700 flex items-center justify-center whitespace-nowrap"
        onClick={() => navigate(`/admin-dashboard/department/${id}`)}
      >
        {/* Text for desktop, hidden on mobile */}
        <span className="hidden sm:inline">Edit</span>
        {/* Icon for mobile, hidden on desktop */}
        <FaEdit className="sm:hidden w-4 h-4" />
      </button>
      <button
        className="px-2 py-1 sm:px-3 sm:py-2 bg-red-600 text-white text-sm sm:text-base rounded hover:bg-red-700 flex items-center justify-center whitespace-nowrap"
        onClick={handleDelete}
      >
        {/* Text for desktop, hidden on mobile */}
        <span className="hidden sm:inline">Delete</span>
        {/* Icon for mobile, hidden on desktop */}
        <FaTrash className="sm:hidden w-4 h-4" />
      </button>
    </div>
  );
}
