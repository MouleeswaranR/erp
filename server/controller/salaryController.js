import Salary from "../models/Salary.js";

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
        const salary=await Salary.find({employeeId:id}).populate('employeeId','employeeId')
        return res.status(200).json({success:true,salary})
    } catch (error) {
        return res.status(500).json({success:false,error:"salary not added"})
    }
}