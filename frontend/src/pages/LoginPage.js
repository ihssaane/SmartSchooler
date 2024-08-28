import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const LoginPage = ({ role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, currentUser, response, currentRole } = useSelector(state => state.user);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rollNumber: '',
    studentName: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const fields = role === 'Student' 
      ? { rollNum: formData.rollNumber, studentName: formData.studentName, password: formData.password }
      : { email: formData.email, password: formData.password };
    dispatch(loginUser(fields, role));
  };

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      navigate(`/${currentRole}/dashboard`);
    } else if (status === 'failed') {
      setMessage(response);
      setShowPopup(true);
      setLoading(false);
    }
  }, [status, currentRole, navigate, response, currentUser]);

  return (
    <Container>
      <LoginForm onSubmit={handleSubmit}>
        <Title>{role} Login</Title>
        {role === 'Student' ? (
          <>
            <Input
              type="number"
              name="rollNumber"
              placeholder="Roll Number"
              value={formData.rollNumber}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              name="studentName"
              placeholder="Full Name"
              value={formData.studentName}
              onChange={handleChange}
              required
            />
          </>
        ) : (
          <Input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        )}
        <PasswordWrapper>
          <Input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <TogglePassword onClick={() => setShowPassword(!showPassword)}>
           
          </TogglePassword>
        </PasswordWrapper>
        <SubmitButton type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </SubmitButton>
        {role === 'Admin' && (
          <SignUpLink>
            Don't have an account? <a href="/Adminregister">Sign up</a>
          </SignUpLink>
        )}
      </LoginForm>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
 background: linear-gradient(109.6deg, rgb(0, 0, 0) 11.2%, rgb(11, 132, 145) 91.1%);
`;

const LoginForm = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const PasswordWrapper = styled.div`
  position: relative;
`;

const TogglePassword = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background: linear-gradient(109.6deg, rgb(0, 0, 0) 11.2%, rgb(11, 132, 145) 91.1%);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #5c7cfa;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const SignUpLink = styled.p`
  text-align: center;
  margin-top: 1rem;

  a {
    color: #31665F;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;