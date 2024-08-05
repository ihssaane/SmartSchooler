const express = require('express');
const QRCode = require('qrcode');
const router = express.Router();

router.get('/generateQRCode/:sessionId', async (req, res) => {
    const { sessionId } = req.params;
    const url = `http://localhost:3000/attendance/${sessionId}`; // URL to the attendance form
    try {
        const qrCode = await QRCode.toDataURL(url);
        res.status(200).json({ qrCode });
    } catch (error) {
        console.error('Error generating QR code', error);
        res.status(500).json({ message: 'Server Error', error });
    }
});

module.exports = router;
