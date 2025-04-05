
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
import Add from "./components/salary/AddSalary";
import ViewSalary from "./components/salary/ViewSalary";
import SummaryCard from './components/EmployeeDashBoard/Summary'
import List from "./components/leave/List";
import AddLeave from "./components/leave/AddLeave";
import Setting from "./components/EmployeeDashBoard/Setting";
import Table from "./components/leave/Table";
import Detail from "./components/leave/Detail";

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
        <Route path="/admin-dashboard/employees/salary/:id" element={<ViewSalary/>}></Route>

        <Route path="/admin-dashboard/salary/add" element={<Add />}></Route>
        <Route path="/admin-dashboard/leaves" element= {<Table />}></Route>
        <Route path="/admin-dashboard/leaves/:id" element= {<Detail />}></Route>
        <Route path="/admin-dashboard/employees/leaves/:id" element= {<List />}></Route>

        <Route path="/admin-dashboard/setting" element = {<Setting />}></Route>

      </Route>
        <Route path="/employee-dashboard" 
        element={
        <PrivateRoutes>
          <RoleBasedRoutes requiredRole={["admin", "employee"]}>
            <EmployeeDashBoard />
          </RoleBasedRoutes>
        </PrivateRoutes>
        }
        >
          <Route index element={<SummaryCard/>}></Route>
 
          <Route path="/employee-dashboard/profile/:id" element = {<View />}></Route>
          <Route path="/employee-dashboard/leaves/:id" element = {<List />}></Route>
          <Route path="/employee-dashboard/add-leave" element = {<AddLeave />}></Route>
          <Route path="/employee-dashboard/salary/:id" element = {<ViewSalary />}></Route>
          <Route path="/employee-dashboard/setting/:id" element = {<Setting />}></Route>

        </Route>
      </Routes>
    </BrowserRouter>
    );
}

export default App