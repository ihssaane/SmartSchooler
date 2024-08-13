import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Typography } from '@mui/material';
import QRCode from 'qrcode.react';

const AttendanceQRCode = () => {
  const [qrCode, setQrCode] = useState(null);
  const sessionId = "session-" + Date.now(); // Generate a unique session ID

  const generateQRCode = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/qrCode/generateAttendanceQR/${sessionId}`);
      setQrCode(response.data.qrCode);
    } catch (error) {
      console.error('Error generating QR code', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Generate Attendance QR Code
      </Typography>
      <Button variant="contained" color="primary" onClick={generateQRCode}>
        Generate QR Code for Attendance
      </Button>
      {qrCode && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Students: Scan this QR Code to mark attendance:
          </Typography>
          <QRCode value={qrCode} size={256} />
        </Box>
      )}
    </Box>
  );
};

export default AttendanceQRCode;