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

export const getSalary = async(req, res) => {
    try {
        const {id} = req.params;
        const userRole = req.user?.role; // Assuming you have role in request object from auth middleware
        
        let salary;
        
        if (userRole === 'employee') {
            // Employee flow
            salary = await Salary.find({employeeId: id})
                .populate('employeeId', 'employeeId');
                
            if (!salary || salary.length < 1) {
                const employee = await Employee.findOne({userId: id});
                if (!employee) {
                    return res.status(404).json({success: false, error: "Employee not found"});
                }
                salary = await Salary.find({employeeId: employee._id})
                    .populate('employeeId', 'employeeId');
            }
        } else if (userRole === 'admin') {
            // Admin flow
            // Assuming admin wants to see salary by employee ID
            salary = await Salary.find({employeeId: id})
                .populate('employeeId', 'employeeId');
                
            if (!salary || salary.length < 1) {
                return res.status(404).json({success: false, error: "No salary records found for this employee"});
            }
        } else {
            return res.status(403).json({success: false, error: "Unauthorized access"});
        }

        return res.status(200).json({success: true, salary});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({success: false, error: "Internal server error"});
    }
}