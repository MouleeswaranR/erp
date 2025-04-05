import express from 'express';
import cors from 'cors';
import authRoutes from "./routes/auth.route.js"
import departmentRoutes from "./routes/department.js"
import { connectToDataBase } from './db/db.js';
import employeeRouter from "./routes/employee.js"
import leaveRouter from './routes/leave.js'
import settingRoute from './routes/setting.js'
import SalaryRouter from "./routes/salary.js"
const app=express();
app.use(express.static('public/uploads'))
app.use(cors({
    origin: 'http://localhost:5173', // Change to your frontend URL
    credentials: true
}));
app.use(express.json());
app.use("/api/auth",authRoutes)
app.use("/api/department",departmentRoutes)
app.use("/api/employee",employeeRouter)
app.use("/api/salary",SalaryRouter);
app.use("/api/leave",leaveRouter);
app.use("/api/setting",settingRoute);
app.listen(process.env.PORT,()=>{
    connectToDataBase();
    console.log(`server running on ${process.env.PORT}`);
    
})