import React, { useEffect, useState } from 'react'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Button, Collapse, Table, TableBody, TableHead, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../components/attendanceCalculator';
import CustomBarChart from '../../components/CustomBarChart'
import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import styled from 'styled-components';

const ViewStdAttendance = () => {
    const dispatch = useDispatch();
    const [openStates, setOpenStates] = useState({});
    const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);
    const [subjectAttendance, setSubjectAttendance] = useState([]);
    const [selectedSection, setSelectedSection] = useState('table');

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
    }, [dispatch, currentUser._id]);

    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails])

    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };

    const attendanceBySubject = groupAttendanceBySubject(subjectAttendance)
    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);

    const subjectData = Object.entries(attendanceBySubject).map(([subName, { subCode, present, sessions }]) => {
        const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
        return {
            subject: subName,
            attendancePercentage: subjectAttendancePercentage,
            totalClasses: sessions,
            attendedClasses: present
        };
    });

    const handleSectionChange = (newSection) => {
        setSelectedSection(newSection);
    };

    const renderTableSection = () => {
        return (
            <StyledPaper>
                <Typography variant="h4" align="center" gutterBottom>
                    Attendance
                </Typography>
                <Table>
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>Subject</StyledTableCell>
                            <StyledTableCell>Present</StyledTableCell>
                            <StyledTableCell>Total Sessions</StyledTableCell>
                            <StyledTableCell>Attendance Percentage</StyledTableCell>
                            <StyledTableCell align="center">Actions</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {Object.entries(attendanceBySubject).map(([subName, { present, allData, subId, sessions }], index) => {
                            const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
                            return (
                                <React.Fragment key={index}>
                                    <StyledTableRow>
                                        <StyledTableCell>{subName}</StyledTableCell>
                                        <StyledTableCell>{present}</StyledTableCell>
                                        <StyledTableCell>{sessions}</StyledTableCell>
                                        <StyledTableCell>{subjectAttendancePercentage}%</StyledTableCell>
                                        <StyledTableCell align="center">
                                            <StyledButton onClick={() => handleOpen(subId)}>
                                                {openStates[subId] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}Details
                                            </StyledButton>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                            <Collapse in={openStates[subId]} timeout="auto" unmountOnExit>
                                                <StyledBox>
                                                    <Typography variant="h6" gutterBottom component="div">
                                                        Attendance Details
                                                    </Typography>
                                                    <Table size="small" aria-label="purchases">
                                                        <TableHead>
                                                            <StyledTableRow>
                                                                <StyledTableCell>Date</StyledTableCell>
                                                                <StyledTableCell align="right">Status</StyledTableCell>
                                                            </StyledTableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {allData.map((data, index) => {
                                                                const date = new Date(data.date);
                                                                const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
                                                                return (
                                                                    <StyledTableRow key={index}>
                                                                        <StyledTableCell component="th" scope="row">
                                                                            {dateString}
                                                                        </StyledTableCell>
                                                                        <StyledTableCell align="right">{data.status}</StyledTableCell>
                                                                    </StyledTableRow>
                                                                )
                                                            })}
                                                        </TableBody>
                                                    </Table>
                                                </StyledBox>
                                            </Collapse>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                </React.Fragment>
                            )
                        })}
                    </TableBody>
                </Table>
                <StyledOverallAttendance>
                     Attendance Percentage: {overallAttendancePercentage.toFixed(2)}%
                </StyledOverallAttendance>
            </StyledPaper>
        )
    }

    const renderChartSection = () => {
        return <CustomBarChart chartData={subjectData} dataKey="attendancePercentage" />;
    };

    return (
        <StyledContainer>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
                        <>
                            <SectionTitle>Attendance</SectionTitle>
                            {selectedSection === 'table' && renderTableSection()}
                            {selectedSection === 'chart' && renderChartSection()}

                            <ButtonContainer>
                                <StyledButton onClick={() => handleSectionChange('table')} active={selectedSection === 'table'}>
                                    {selectedSection === 'table' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
                                    Table
                                </StyledButton>
                                <StyledButton onClick={() => handleSectionChange('chart')} active={selectedSection === 'chart'}>
                                    {selectedSection === 'chart' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
                                    Chart
                                </StyledButton>
                            </ButtonContainer>
                        </>
                    ) : (
                        <Typography variant="h6" gutterBottom component="div">
                             You Have No Attendance Details
                        </Typography>
                    )}
                </div>
            )}
        </StyledContainer>
    )
}

export default ViewStdAttendance

const StyledContainer = styled.div`
  background: linear-gradient(109.6deg, rgb(0, 0, 0) 11.2%, rgb(11, 132, 145) 91.1%);
  min-height: 100vh;
  padding: 20px;
  color: white;
`;

const StyledPaper = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
  color: white;
`;

const StyledTableRow = styled.tr`
  &:nth-of-type(odd) {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const StyledTableCell = styled.td`
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const StyledButton = styled(Button)`
  background: ${props => props.active ? 'linear-gradient(109.6deg, rgb(0, 0, 0) 11.2%, rgb(11, 132, 145) 91.1%)' : 'linear-gradient(109.6deg, rgb(11, 132, 145) 11.2%, rgb(0, 0, 0) 91.1%)'};
  color: white;
  &:hover {
    background: linear-gradient(109.6deg, rgb(0, 0, 0) 11.2%, rgb(11, 132, 145) 91.1%);
  }
`;

const StyledBox = styled.div`
  margin: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 5px;
  padding: 1rem;
`;

const StyledOverallAttendance = styled.div`
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 20px;
`;

const SectionTitle = styled.h2`
  color: white;
  text-align: center;
  margin-bottom: 20px;
`;