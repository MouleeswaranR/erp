
import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom";
import './App.css'
import Login from './pages/Login';
import AdminDashBoard from './pages/AdminDashBoard';
import EmployeeDashBoard from './pages/EmployeeDashBoard';
import PrivateRoutes from './utils/PrivateRoutes';
import RoleBasedRoutes from './utils/RoleBasedRoutes';
import AdminSummary from './components/dashboard/AdminSummary';
import DepartmentList from './components/department/DepartmentList';
import AddDepartment from './components/department/AddDepartment';
import EditDepartment from './components/department/EditDepartment';
import EmployeeList from './components/employee/EmployeeList';
import AddEmployee from './components/employee/AddEmployee';
import View from "./components/employee/View";
import Edit from "./components/employee/Edit";

function App() {
  

   return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard"></Navigate>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/admin-dashboard" element={
          <PrivateRoutes>
            <RoleBasedRoutes requiredRole={["admin"]}>
            <AdminDashBoard/>
            </RoleBasedRoutes>             
          </PrivateRoutes>
         
      
      }>
        <Route index element={<AdminSummary/>}></Route>
        <Route path="/admin-dashboard/departments" element={<DepartmentList/>}></Route>
        <Route path="/admin-dashboard/add-department" element={<AddDepartment/>}></Route>
        <Route path="/admin-dashboard/department/:id" element={<EditDepartment/>}></Route>
        <Route path="/admin-dashboard/employees" element={<EmployeeList/>}></Route>
        <Route path="/admin-dashboard/add-employee" element={<AddEmployee/>}></Route>
        <Route path="/admin-dashboard/employees/:id" element={<View/>}></Route>
        <Route path="/admin-dashboard/employees/edit/:id" element={<Edit/>}></Route>

      </Route>
        <Route path="/employee-dashboard" element={<EmployeeDashBoard/>}></Route>

      </Routes>
    </BrowserRouter>  )
}

export default App