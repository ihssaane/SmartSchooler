const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    sessionId: { type: String, required: true },
    studentId: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Attendance', attendanceSchema);