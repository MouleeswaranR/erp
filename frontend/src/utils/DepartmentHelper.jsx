import axios from "axios";
import { useNavigate } from "react-router-dom";
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
        <div className="flex space-x-3">
            <button className="px-3 py-3 bg-teal-600 text-white"
                onClick={() => navigate(`/admin-dashboard/department/${id}`)}
            >Edit</button>
            <button className="px-3 py-1 bg-red-600 text-white"
            onClick={handleDelete}
            >Delete</button>
        </div>
    )
}
