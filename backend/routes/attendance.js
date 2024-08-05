const express = require('express');
const router = express.Router();

// Mock database for demonstration purposes
const attendanceRecords = [];

router.post('/mark', (req, res) => {
    const { studentName, rollNum, sessionId } = req.body;

    // Save the attendance record (in a real application, save it to a database)
    attendanceRecords.push({ studentName, rollNum, sessionId });
    
    res.status(200).json({ message: 'Attendance marked successfully' });
});

module.exports = router;
