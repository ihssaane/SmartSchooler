const Attendance = require('../models/attendance');

exports.recordAttendance = async (req, res) => {
    const { sessionId, studentId } = req.body;
    
    try {
        const attendance = new Attendance({ sessionId, studentId });
        await attendance.save();
        res.status(201).json({ message: 'Attendance recorded successfully' });
    } catch (error) {
        console.error('Error recording attendance:', error);
        res.status(500).json({ error: 'Failed to record attendance' });
    }
};