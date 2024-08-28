import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import Popup from "../../../components/Popup";
import styled from "styled-components";

const AddClass = () => {
    const [sclassName, setSclassName] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, currentUser, response, tempDetails } = useSelector(state => state.user);
    const [loader, setLoader] = useState(false);
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        dispatch(addStuff({ sclassName, adminID: currentUser._id }, "Sclass"));
    };

    useEffect(() => {
        if (status === 'added' && tempDetails) {
            navigate("/Admin/classes/class/" + tempDetails._id);
            dispatch(underControl());
            setLoader(false);
        } else if (status === 'failed' || status === 'error') {
            setMessage(status === 'failed' ? response : "Network Error");
            setShowPopup(true);
            setLoader(false);
        }
    }, [status, navigate, response, dispatch, tempDetails]);

    return (
        <Container>
            <FormWrapper onSubmit={submitHandler}>
                <Title>Create a New Class</Title>
                <InputWrapper>
                    <StyledInput
                        type="text"
                        placeholder="Enter class name"
                        value={sclassName}
                        onChange={(e) => setSclassName(e.target.value)}
                        required
                    />
                    <InputBorder />
                </InputWrapper>
                <ButtonGroup>
                    <SubmitButton type="submit" disabled={loader}>
                        {loader ? "Creating..." : "Create Class"}
                    </SubmitButton>
                    <BackButton onClick={() => navigate(-1)}>Go Back</BackButton>
                </ButtonGroup>
            </FormWrapper>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Container>
    );
};

export default AddClass;

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
        color: rgba(255, 255, 255, 0.7);
    }
`;

const InputBorder = styled.span`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: white;
    transition: width 0.3s;

    ${StyledInput}:focus + & {
        width: 100%;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Button = styled.button`
    padding: 0.75rem;
    border: none;
    border-radius: 50px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 1px;
`;

const SubmitButton = styled(Button)`
    background-color: rgba(255, 255, 255, 0.2);
    color: white;

    &:hover {
        background-color: rgba(255, 255, 255, 0.3);
    }

    &:disabled {
        background-color: rgba(255, 255, 255, 0.1);
        cursor: not-allowed;
    }
`;

const BackButton = styled(Button)`
    background-color: transparent;
    color: white;
    border: 1px solid white;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`;