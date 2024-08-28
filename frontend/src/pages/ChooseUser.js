import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Container,
  CircularProgress,
  Backdrop,
  Typography,
} from '@mui/material';
import { AdminPanelSettings, PersonOutline, SchoolOutlined } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = "zxc";

  const { status, currentUser, currentRole } = useSelector((state) => state.user);

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    if (user === "Admin") {
      if (visitor === "guest") {
        const email = "yogendra@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Adminlogin');
      }
    } else if (user === "Student") {
      if (visitor === "guest") {
        const rollNum = "1";
        const studentName = "Dipesh Awasthi";
        const fields = { rollNum, studentName, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Studentlogin');
      }
    } else if (user === "Teacher") {
      if (visitor === "guest") {
        const email = "tony@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Teacherlogin');
      }
    }
  };

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') {
        navigate('/Admin/dashboard');
      } else if (currentRole === 'Student') {
        navigate('/Student/dashboard');
      } else if (currentRole === 'Teacher') {
        navigate('/Teacher/dashboard');
      }
    } else if (status === 'error') {
      setLoader(false);
      setMessage("Network Error");
      setShowPopup(true);
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <StyledBackground>
      <StyledContainer>
        <StyledPaper elevation={6}>
          <Typography variant="h4" gutterBottom>
            Choose Your Role
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={4}>
              <StyledCard onClick={() => navigateHandler("Admin")}>
                <AdminPanelSettings sx={{ fontSize: 60 }} />
                <Typography variant="h6">Admin</Typography>
              </StyledCard>
            </Grid>
            <Grid item xs={12} sm={4}>
              <StyledCard onClick={() => navigateHandler("Student")}>
                <PersonOutline sx={{ fontSize: 60 }} />
                <Typography variant="h6">Student</Typography>
              </StyledCard>
            </Grid>
            <Grid item xs={12} sm={4}>
              <StyledCard onClick={() => navigateHandler("Teacher")}>
                <SchoolOutlined sx={{ fontSize: 60 }} />
                <Typography variant="h6">Teacher</Typography>
              </StyledCard>
            </Grid>
          </Grid>
        </StyledPaper>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loader}
        >
          <CircularProgress color="inherit" />
          <Typography variant="body1" sx={{ ml: 2 }}>Please Wait</Typography>
        </Backdrop>
        <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
      </StyledContainer>
    </StyledBackground>
  );
};

export default ChooseUser;

const StyledBackground = styled('div')({
  width: '100vw',
  height: '100vh',
  background: 'linear-gradient(109.6deg, rgb(0, 0, 0) 11.2%, rgb(11, 132, 145) 91.1%)',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
});

const StyledContainer = styled(Container)({
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  borderRadius: theme.spacing(2),
  textAlign: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  color: 'white',
}));

const StyledCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  width: '300px',
  maxWidth: '300px',
  boxSizing: 'border-box',
  color: 'white',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: theme.shadows[10],
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
}));