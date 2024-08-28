import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSubjectDetails } from '../../../redux/sclassRelated/sclassHandle';
import Popup from '../../../components/Popup';
import { registerUser } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { CircularProgress } from '@mui/material';
import styled from 'styled-components';

const AddTeacher = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const subjectID = params.id

  const { status, response, error } = useSelector(state => state.user);
  const { subjectDetails } = useSelector((state) => state.sclass);

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"));
  }, [dispatch, subjectID]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false)

  const role = "Teacher"
  const school = subjectDetails && subjectDetails.school
  const teachSubject = subjectDetails && subjectDetails._id
  const teachSclass = subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName._id

  const fields = { name, email, password, role, school, teachSubject, teachSclass }

  const submitHandler = (event) => {
    event.preventDefault()
    setLoader(true)
    dispatch(registerUser(fields, role))
  }

  useEffect(() => {
    if (status === 'added') {
      dispatch(underControl())
      navigate("/Admin/teachers")
    }
    else if (status === 'failed') {
      setMessage(response)
      setShowPopup(true)
      setLoader(false)
    }
    else if (status === 'error') {
      setMessage("Network Error")
      setShowPopup(true)
      setLoader(false)
    }
  }, [status, navigate, error, response, dispatch]);

  return (
    <Container>
      <FormWrapper onSubmit={submitHandler}>
        <Title>Add Teacher</Title>
        <InfoLabel>
          Subject : {subjectDetails && subjectDetails.subName}
        </InfoLabel>
        <InfoLabel>
          Class : {subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName.sclassName}
        </InfoLabel>
        <InputWrapper>
          <StyledInput
            type="text"
            placeholder="Enter teacher's name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            required
          />
          <InputLabel>Name</InputLabel>
        </InputWrapper>
        <InputWrapper>
          <StyledInput
            type="email"
            placeholder="Enter teacher's email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />
          <InputLabel>Email</InputLabel>
        </InputWrapper>
        <InputWrapper>
          <StyledInput
            type="password"
            placeholder="Enter teacher's password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password"
            required
          />
          <InputLabel>Password</InputLabel>
        </InputWrapper>
        <SubmitButton type="submit" disabled={loader}>
          {loader ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Register'
          )}
        </SubmitButton>
      </FormWrapper>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </Container>
  )
}

export default AddTeacher

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(109.6deg, rgb(0, 0, 0) 11.2%, rgb(11, 132, 145) 91.1%);
`;

const FormWrapper = styled.form`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 3rem;
  border-radius: 15px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  text-align: center;
  color: white;
  margin-bottom: 2rem;
  font-size: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const InfoLabel = styled.p`
  color: white;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 2rem;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid rgba(255, 255, 255, 0.5);
  color: white;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: white;
  }

  &::placeholder {
    color: transparent;
  }

  &:focus + label, &:not(:placeholder-shown) + label {
    transform: translateY(-20px);
    font-size: 0.8rem;
    color: white;
  }
`;

const InputLabel = styled.label`
  position: absolute;
  left: 0;
  top: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s;
  pointer-events: none;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }

  &:disabled {
    background-color: rgba(255, 255, 255, 0.1);
    cursor: not-allowed;
  }
`;