import React, { useEffect, useState } from 'react'
import { Container, Grid, Paper, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { calculateOverallAttendancePercentage } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import styled from 'styled-components';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import Subject from "../../assets/subjects.svg";
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';

const StudentHomePage = () => {
    const dispatch = useDispatch();

    const { userDetails, currentUser, loading, response } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);

    const [subjectAttendance, setSubjectAttendance] = useState([]);

    const classID = currentUser.sclassName._id

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
        dispatch(getSubjectList(classID, "ClassSubjects"));
    }, [dispatch, currentUser._id, classID]);

    const numberOfSubjects = subjectsList && subjectsList.length;

    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails])

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6} lg={4}>
                        <StyledPaper>
                            <img src={Subject} alt="Subjects" />
                            <Title>
                                Total Subjects
                            </Title>
                            <Data start={0} end={numberOfSubjects} duration={2.5} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <StyledPaper>
                            <ChartContainer>
                                {
                                    response ?
                                        <Typography variant="h6">No Attendance Found</Typography>
                                        :
                                        <>
                                            {loading
                                                ? (
                                                    <Typography variant="h6">Loading...</Typography>
                                                )
                                                :
                                                <>
                                                    {
                                                        subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
                                                            <>
                                                                <CustomPieChart data={chartData} />
                                                            </>
                                                        )
                                                            :
                                                            <Typography variant="h6">No Attendance Found</Typography>
                                                    }
                                                </>
                                            }
                                        </>
                                }
                            </ChartContainer>
                            <Title>
                                Attendance
                            </Title>
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12}>
                        <StyledPaper variant="outlined" elevation={0}>
                            <SeeNotice />
                        </StyledPaper>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    height: '300px',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: '50%',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    background: 'linear-gradient(135deg, #3a6073 0%, #16222a 100%)',
    color: '#f4f4f4',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',

    '&:hover': {
        transform: 'translateY(-10px)',
        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
    },
}));

const Title = styled.p`
  font-size: 1.75rem;
  font-weight: 700;
  margin: 20px 0;
  color: #e1e1e1;
  text-transform: uppercase;
`;

const Data = styled(CountUp)`
  font-size: 2.5rem;
  font-weight: 800;
  color: #ffcc00;
`;

export default StudentHomePage