const express = require('express');
const router = express.Router();
const qrCodeController = require('../controllers/qrCodeController');

router.get('/generateAttendanceQR/:sessionId', qrCodeController.generateAttendanceQR);

module.exports = router;