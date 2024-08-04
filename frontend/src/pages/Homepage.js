import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Button } from '@mui/material';
import styled from 'styled-components';
import Students from "../assets/Student.jpg";
import { BlueButtonn } from '../components/buttonStyles';

const Homepage = () => {
    return (
        <StyledContainer>
            <StyledContent>
                <StyledTitle>
                    Welcome to  SmartSchooler
                   
                </StyledTitle>
                <StyledImage src={Students} alt="student" />
                <StyledText>
                    Elevate your educational experience with SmartSchooler, the ultimate School Management System designed to bring efficiency and simplicity to your school's operations. Our platform connects admins, teachers, and students in a seamless and intuitive environment.
                </StyledText>
                <StyledBox>
                    <StyledLink to="/choose">
                        <BlueButtonn variant="contained" fullWidth>
                            Login
                        </BlueButtonn>
                    </StyledLink>
                   
                    <StyledText>
                        Don't have an account?{' '}
                        <Link to="/Adminregister" style={{ color: "#050C9C" }}>
                            Sign up
                        </Link>
                    </StyledText>
                </StyledBox>
            </StyledContent>
        </StyledContainer>
    );
};

export default Homepage;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const StyledTitle = styled.h1`
  font-size: 3rem;
  color: #252525;
  font-weight: bold;
  padding-top: 0;
  letter-spacing: normal;
  line-height: normal;
`;

const StyledImage = styled.img`
  width: 100%;
  max-width: 600px; /* Adjust as needed */
  margin-top: 20px;
`;

const StyledText = styled.p`
  margin-top: 30px;
  margin-bottom: 30px; 
  letter-spacing: normal;
  line-height: normal;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
