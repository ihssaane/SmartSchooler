import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import CustomBarChart from '../../components/CustomBarChart'
import styled from 'styled-components';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

const StudentSubjects = () => {
    const dispatch = useDispatch();
    const { subjectsList, sclassDetails } = useSelector((state) => state.sclass);
    const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
    }, [dispatch, currentUser._id])

    const [subjectMarks, setSubjectMarks] = useState([]);
    const [selectedSection, setSelectedSection] = useState('table');

    useEffect(() => {
        if (userDetails) {
            setSubjectMarks(userDetails.examResult || []);
        }
    }, [userDetails])

    useEffect(() => {
        if (subjectMarks === []) {
            dispatch(getSubjectList(currentUser.sclassName._id, "ClassSubjects"));
        }
    }, [subjectMarks, dispatch, currentUser.sclassName._id]);

    const handleSectionChange = (newSection) => {
        setSelectedSection(newSection);
    };

    const renderTableSection = () => {
        return (
            <SubjectGrid>
                {subjectMarks.map((result, index) => {
                    if (!result.subName || !result.marksObtained) {
                        return null;
                    }
                    return (
                        <SubjectCard key={index}>
                            <SubjectName>{result.subName.subName}</SubjectName>
                            <SubjectInfo>Marks: {result.marksObtained}</SubjectInfo>
                        </SubjectCard>
                    );
                })}
            </SubjectGrid>
        );
    };

    const renderChartSection = () => {
        return <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />;
    };

    const renderClassDetailsSection = () => {
        return (
            <ClassDetailsContainer>
                <SectionTitle>Class Details</SectionTitle>
                <SubjectInfo>You are currently in Class {sclassDetails && sclassDetails.sclassName}</SubjectInfo>
                <SubjectInfo>And these are the subjects:</SubjectInfo>
                {subjectsList &&
                    subjectsList.map((subject, index) => (
                        <SubjectInfo key={index}>
                            {subject.subName} ({subject.subCode})
                        </SubjectInfo>
                    ))}
            </ClassDetailsContainer>
        );
    };

    return (
        <StyledContainer>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0
                        ?
                        (<>
                            <SectionTitle>Subject Marks</SectionTitle>
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
                        </>)
                        :
                        (<>
                            {renderClassDetailsSection()}
                        </>)
                    }
                </div>
            )}
        </StyledContainer>
    );
};

export default StudentSubjects;

const StyledContainer = styled.div`
  background: linear-gradient(109.6deg, rgb(0, 0, 0) 11.2%, rgb(11, 132, 145) 91.1%);
  min-height: 100vh;
  padding: 20px;
  color: white;
`;

const SubjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px 0;
`;

const SubjectCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

const SubjectName = styled.h3`
  color: white;
  margin-bottom: 10px;
`;

const SubjectInfo = styled.p`
  color: #ddd;
  margin: 5px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 20px;
`;

const StyledButton = styled.button`
  background: ${props => props.active ? 'linear-gradient(109.6deg, rgb(0, 0, 0) 11.2%, rgb(11, 132, 145) 91.1%)' : 'linear-gradient(109.6deg, rgb(11, 132, 145) 11.2%, rgb(0, 0, 0) 91.1%)'};
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background: linear-gradient(109.6deg, rgb(0, 0, 0) 11.2%, rgb(11, 132, 145) 91.1%);
  }
`;

const SectionTitle = styled.h2`
  color: white;
  text-align: center;
  margin-bottom: 20px;
`;

const ClassDetailsContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
`;