const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const qrCodeRoute = require('./routes/qrCode');
const attendanceRoute = require('./routes/attendance');

app.use('/api/qrCode', qrCodeRoute);
app.use('/api/attendance', attendanceRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
