import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { CircularProgress } from '@mui/material';
import Popup from '../../../components/Popup';
import styled from 'styled-components';

const AddNotice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, response, error } = useSelector(state => state.user);
  const { currentUser } = useSelector(state => state.user);

  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState('');
  const adminID = currentUser._id

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const fields = { title, details, date, adminID };
  const address = "Notice"

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(addStuff(fields, address));
  };

  useEffect(() => {
    if (status === 'added') {
      navigate('/Admin/notices');
      dispatch(underControl())
    } else if (status === 'error') {
      setMessage("Network Error")
      setShowPopup(true)
      setLoader(false)
    }
  }, [status, navigate, error, response, dispatch]);

  return (
    <Container>
      <FormWrapper onSubmit={submitHandler}>
        <Title>Add Announcement</Title>
        <InputWrapper>
          <StyledInput
            type="text"
            placeholder="Enter announcement title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
          <InputLabel>Title</InputLabel>
        </InputWrapper>
        <InputWrapper>
          <StyledInput
            type="text"
            placeholder="Enter announcement details"
            value={details}
            onChange={(event) => setDetails(event.target.value)}
            required
          />
          <InputLabel>Details</InputLabel>
        </InputWrapper>
        <InputWrapper>
          <StyledInput
            type="date"
            placeholder="Enter announcement date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />
          <InputLabel>Date</InputLabel>
        </InputWrapper>
        <SubmitButton type="submit" disabled={loader}>
          {loader ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Add'
          )}
        </SubmitButton>
      </FormWrapper>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </Container>
  );
};

export default AddNotice;

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