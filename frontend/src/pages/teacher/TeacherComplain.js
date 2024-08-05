import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Typography } from '@mui/material';

const TeacherComplain = () => {
  const [qrCode, setQrCode] = useState(null);
  const sessionId = "unique-session-id"; // Replace this with the actual session ID

  const generateQRCode = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/qrCode/generateQRCode/${sessionId}`);
      setQrCode(response.data.qrCode);
    } catch (error) {
      console.error('Error generating QR code', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Mark your attendance
      </Typography>
      <Button variant="contained" color="primary" onClick={generateQRCode}>
        Generate QR Code for Attendance
      </Button>
      {qrCode && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Scan this QR Code to Mark Attendance:
          </Typography>
          <img src={qrCode} alt="QR Code" />
        </Box>
      )}
    </Box>
  );
};

export default TeacherComplain;
