const defaultAttendance=async(req,res,next)=>{
    try{
        const date = new Date().toISOString().split('T')[0];
        const existingAttendance = await Attendance.findOne({date});

        if(!existingAttendance){
            const attendance = new Attendance({
                employeeId: req.user._id,
                date,
                status: 'Present',
                createdAt: new Date(),
                updatedAt: new Date()
            });
            await attendance.save();
        }
        next();
    }catch(error){
        res.status(500).json({success:false,message:error.message})
    }
}

export default defaultAttendance;
