import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/userRelated/userHandle';
import Popup from '../../../components/Popup';
import { underControl } from '../../../redux/userRelated/userSlice';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { CircularProgress } from '@mui/material';
import styled from 'styled-components';

const AddStudent = ({ situation }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error } = userState;
    const { sclassesList } = useSelector((state) => state.sclass);

    const [name, setName] = useState('');
    const [rollNum, setRollNum] = useState('');
    const [password, setPassword] = useState('')
    const [className, setClassName] = useState('')
    const [sclassName, setSclassName] = useState('')

    const adminID = currentUser._id
    const role = "Student"
    const attendance = []

    useEffect(() => {
        if (situation === "Class") {
            setSclassName(params.id);
        }
    }, [params.id, situation]);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        dispatch(getAllSclasses(adminID, "Sclass"));
    }, [adminID, dispatch]);

    const changeHandler = (event) => {
        if (event.target.value === 'Select Class') {
            setClassName('Select Class');
            setSclassName('');
        } else {
            const selectedClass = sclassesList.find(
                (classItem) => classItem.sclassName === event.target.value
            );
            setClassName(selectedClass.sclassName);
            setSclassName(selectedClass._id);
        }
    }

    const fields = { name, rollNum, password, sclassName, adminID, role, attendance }

    const submitHandler = (event) => {
        event.preventDefault()
        if (sclassName === "") {
            setMessage("Please select a classname")
            setShowPopup(true)
        }
        else {
            setLoader(true)
            dispatch(registerUser(fields, role))
        }
    }

    useEffect(() => {
        if (status === 'added') {
            dispatch(underControl())
            navigate(-1)
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
                <Title>Add Student</Title>
                <InputWrapper>
                    <StyledInput
                        type="text"
                        placeholder="Enter student's name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        autoComplete="name"
                        required
                    />
                    <InputLabel>Name</InputLabel>
                </InputWrapper>
                {situation === "Student" && (
                    <InputWrapper>
                        <StyledSelect
                            value={className}
                            onChange={changeHandler}
                            required
                        >
                            <option value='Select Class'>Select Class</option>
                            {sclassesList.map((classItem, index) => (
                                <option key={index} value={classItem.sclassName}>
                                    {classItem.sclassName}
                                </option>
                            ))}
                        </StyledSelect>
                        <InputLabel>Class</InputLabel>
                    </InputWrapper>
                )}
                <InputWrapper>
                    <StyledInput
                        type="text"
                        placeholder="Enter student's  CNE"
                        value={rollNum}
                        onChange={(event) => setRollNum(event.target.value)}
                        required
                    />
                    <InputLabel> CNE</InputLabel>
                </InputWrapper>
                <InputWrapper>
                    <StyledInput
                        type="password"
                        placeholder="Enter student's password"
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
                        'Add Student'
                    )}
                </SubmitButton>
            </FormWrapper>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Container>
    )
}

export default AddStudent;

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

const StyledSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid rgba(255, 255, 255, 0.5);
  color: white;
  font-size: 1rem;
  transition: border-color 0.3s;
  appearance: none;

  &:focus {
    outline: none;
    border-color: white;
  }

  &:focus + label, &:not([value='Select Class']) + label {
    transform: translateY(-20px);
    font-size: 0.8rem;
    color: white;
  }

  option {
    background-color: rgb(11, 132, 145);
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