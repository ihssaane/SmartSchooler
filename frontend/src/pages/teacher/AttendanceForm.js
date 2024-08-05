import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';

const AttendanceForm = () => {
  const { sessionId } = useParams();
  const [studentName, setStudentName] = useState('');
  const [rollNum, setRollNum] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/attendance/mark', {
        studentName,
        rollNum,
        sessionId,
      });
      alert('Attendance marked successfully');
    } catch (error) {
      console.error('Error marking attendance', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Attendance Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Roll Number"
          value={rollNum}
          onChange={(e) => setRollNum(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default AttendanceForm;
