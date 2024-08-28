import React, { useEffect } from 'react'
import { Container, Grid, Paper, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import Students from "../../assets/img1.png";
import Lessons from "../../assets/subjects.svg";
import Tests from "../../assets/assignment.svg";
import Time from "../../assets/time.svg";
import { getClassStudents, getSubjectDetails } from '../../redux/sclassRelated/sclassHandle';

const TeacherHomePage = () => {
    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.user);
    const { subjectDetails, sclassStudents } = useSelector((state) => state.sclass);

    const classID = currentUser.teachSclass?._id
    const subjectID = currentUser.teachSubject?._id

    useEffect(() => {
        dispatch(getSubjectDetails(subjectID, "Subject"));
        dispatch(getClassStudents(classID));
    }, [dispatch, subjectID, classID]);

    const numberOfStudents = sclassStudents && sclassStudents.length;
    const numberOfSessions = subjectDetails && subjectDetails.sessions

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                        <StyledPaper>
                            <img src={Students} alt="Students" />
                            <Title>
                                Class Students
                            </Title>
                            <Data start={0} end={numberOfStudents} duration={2.5} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <StyledPaper>
                            <img src={Lessons} alt="Lessons" />
                            <Title>
                                Total Lessons
                            </Title>
                            <Data start={0} end={numberOfSessions} duration={2.5} />
                        </StyledPaper>
                    </Grid>
                   
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <SeeNotice />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    height: '300px',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: '16px',
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

export default TeacherHomePage