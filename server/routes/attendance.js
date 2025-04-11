import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { defaultAttendance, getAttendance, getAttendanceReport, updateAttendance } from "../controller/attendanceController.js";

const router=express.Router();

router.get("/",authMiddleware,defaultAttendance, getAttendance);
router.put("/update/:employeeId",authMiddleware,defaultAttendance,updateAttendance);
router.get("/report",authMiddleware,defaultAttendance, getAttendanceReport);
export default router;