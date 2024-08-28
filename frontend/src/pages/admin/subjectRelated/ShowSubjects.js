import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { IconButton } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';
import styled from 'styled-components';

const ShowSubjects = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { subjectsList, loading, error, response } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getSubjectList(currentUser._id, "AllSubjects"));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error);
    }

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const deleteHandler = (deleteID, address) => {
         dispatch(deleteUser(deleteID, address))
             .then(() => {
                dispatch(getSubjectList(currentUser._id, "AllSubjects"));
             })
    }


    const actions = [
        {
            icon: <PostAddIcon color="primary" />, name: 'Add New Subject',
            action: () => navigate("/Admin/subjects/chooseclass")
        },
        {
            icon: <DeleteIcon color="error" />, name: 'Delete All Subjects',
            action: () => deleteHandler(currentUser._id, "Subjects")
        }
    ];

    return (
        <StyledContainer>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    {response ? (
                        <AddButtonContainer>
                            <StyledButton onClick={() => navigate("/Admin/subjects/chooseclass")}>
                                Add Subjects
                            </StyledButton>
                        </AddButtonContainer>
                    ) : (
                        <>
                            <SubjectGrid>
                                {Array.isArray(subjectsList) && subjectsList.length > 0 && subjectsList.map((subject) => (
                                    <SubjectCard key={subject._id}>
                                        <SubjectName>{subject.subName}</SubjectName>
                                        <SubjectInfo>Sessions: {subject.sessions}</SubjectInfo>
                                        <SubjectInfo>Class: {subject.sclassName.sclassName}</SubjectInfo>
                                        <ButtonContainer>
                                            <IconButton onClick={() => deleteHandler(subject._id, "Subject")}>
                                                <DeleteIcon color="error" />
                                            </IconButton>
                                            <StyledButton onClick={() => navigate(`/Admin/subjects/subject/${subject.sclassName._id}/${subject._id}`)}>
                                                View
                                            </StyledButton>
                                        </ButtonContainer>
                                    </SubjectCard>
                                ))}
                            </SubjectGrid>
                            <SpeedDialTemplate actions={actions} />
                        </>
                    )}
                </>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </StyledContainer>
    );
};

export default ShowSubjects;

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
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 15px;
`;

const StyledButton = styled.button`
  background: linear-gradient(109.6deg, rgb(11, 132, 145) 11.2%, rgb(0, 0, 0) 91.1%);
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background: linear-gradient(109.6deg, rgb(0, 0, 0) 11.2%, rgb(11, 132, 145) 91.1%);
  }
`;

const AddButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`;