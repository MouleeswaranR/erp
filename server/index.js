import express from 'express';
import cors from 'cors';
import authRoutes from "./routes/auth.route.js"
import { connectToDataBase } from './db/db.js';

const app=express();
app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes)
app.listen(process.env.PORT,()=>{
    connectToDataBase();
    console.log(`server running on ${process.env.PORT}`);
    
})