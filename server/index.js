import express from 'express';
import cors from 'cors';
import authRoutes from "./routes/auth.route.js"
import departmentRoutes from "./routes/department.js"
import { connectToDataBase } from './db/db.js';

const app=express();
app.use(cors({
    origin: 'http://localhost:5173', // Change to your frontend URL
    credentials: true
}));
app.use(express.json());
app.use("/api/auth",authRoutes)
app.use("/api/department",departmentRoutes)
app.listen(process.env.PORT,()=>{
    connectToDataBase();
    console.log(`server running on ${process.env.PORT}`);
    
})