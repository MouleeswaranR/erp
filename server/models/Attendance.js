import mongoose from "mongoose";

const AttendanceSchema=new mongoose.Schema({
    employeeId:{type:mongoose.Schema.Types.ObjectId,ref:"Employee",required:true},
    date:{type:Date,required:true},
    status:{type:String,enum:["Present","Absent","Half Day"],required:true},
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now}
})

const Attendance=mongoose.model('Attendance',AttendanceSchema);
export default Attendance;