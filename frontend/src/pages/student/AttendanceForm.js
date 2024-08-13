import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, TextField, Typography } from '@mui/material';

const AttendanceForm = () => {
  const [studentId, setStudentId] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { sessionId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/attendance`, { sessionId, studentId });
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting attendance', error);
    }
  };

  if (submitted) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
        <Typography variant="h5">Attendance submitted successfully!</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Mark Your Attendance
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Student ID"
          variant="outlined"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit Attendance
        </Button>
      </form>
    </Box>
  );
};

export default AttendanceForm;