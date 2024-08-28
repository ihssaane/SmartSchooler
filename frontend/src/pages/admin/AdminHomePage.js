import { Container, Grid, Paper } from '@mui/material';
import SeeNotice from '../../components/SeeNotice';
import Students from "../../assets/group.png";
import Classes from "../../assets/training1.png";
import Teachers from "../../assets/teacher11.png";
import styled from 'styled-components';
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';

const AdminHomePage = () => {
    const dispatch = useDispatch();
    const { studentsList } = useSelector((state) => state.student);
    const { sclassesList } = useSelector((state) => state.sclass);
    const { teachersList } = useSelector((state) => state.teacher);

    const { currentUser } = useSelector(state => state.user);

    const adminID = currentUser._id;

    useEffect(() => {
        dispatch(getAllStudents(adminID));
        dispatch(getAllSclasses(adminID, "Sclass"));
        dispatch(getAllTeachers(adminID));
    }, [adminID, dispatch]);

    const numberOfStudents = studentsList && studentsList.length;
    const numberOfClasses = sclassesList && sclassesList.length;
    const numberOfTeachers = teachersList && teachersList.length;

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6} lg={4}>
                        <StyledPaper>
                            <img src={Students} alt="Students" />
                            <Title>
                                Students
                            </Title>
                            <Data start={0} end={numberOfStudents} duration={2.5} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <StyledPaper>
                            <img src={Classes} alt="Classes" />
                            <Title>
                                Classes
                            </Title>
                            <Data start={0} end={numberOfClasses} duration={5} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <StyledPaper>
                            <img src={Teachers} alt="Teachers" />
                            <Title>
                                Teachers
                            </Title>
                            <Data start={0} end={numberOfTeachers} duration={2.5} />
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
    );
};
const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: '32px', /* Increased padding for more space */
    display: 'flex',
    flexDirection: 'column',
    height: '300px', /* Increased height for better layout */
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: '50%', /* Fully rounded corners */
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', /* Softer shadow */
    background: 'linear-gradient(135deg, #3a6073 0%, #16222a 100%)', /* Darker gradient */
    color: '#f4f4f4',
    

    '&:hover': {
        transform: 'translateY(-10px)', /* Lift effect on hover */
        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)', /* Enhanced shadow on hover */
    },
}));

const Title = styled.p`
  font-size: 1.75rem; /* Slightly increased font size */
  font-weight: 700; /* Bolder text */
  margin: 20px 0;
  color: #e1e1e1; /* Lighter text color */
  text-transform: uppercase; /* Text in uppercase */
`;

const Data = styled(CountUp)`
  font-size: 2.5rem; /* Increased font size */
  font-weight: 800; /* Extra bold font weight */
  color: #ffcc00; /* Changed text color for emphasis */
`;

export default AdminHomePage;
