import Salary from "../models/Salary.js";
import Employee from '../models/Employee.js'

export const addSalary=async(req,res)=>{
    try {
        const{employeeId,basicSalary,allowances,deductions,payDate}=req.body;
        const totalSalary=parseInt(basicSalary)+parseInt(allowances)-parseInt(deductions);
        const salary=new Salary({
            employeeId,
            basicSalary,
            allowances,
            deductions,
            netSalary:totalSalary,
            payDate
        })
        await salary.save();
        return res.status(200).json({success:true})
    } catch (error) {
        return res.status(500).json({success:false,error:"salary not added"})
    }
}

export const getSalary=async(req,res)=>{
    try {
        const {id}=req.params;
        console.log(id)
        let salary;
        
        
        salary=await Salary.find({employeeId:id}).populate('employeeId','employeeId')
        if(!salary || salary.length < 1) {
            const employee = await Employee.findOne({userId: id})
            salary = await Salary.find({employeeId: employee._id}).populate('employeeId', 'employeeId')
            console.log(salary)
        }
        return res.status(200).json({success:true,salary})
    } catch (error) {
        console.log(error.message);
        
        return res.status(500).json({success:false,error:"salary not added"})
    }
}