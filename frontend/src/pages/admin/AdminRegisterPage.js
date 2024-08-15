import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { registerUser } from '../../redux/userRelated/userHandle';
import Popup from '../../components/Popup';
import logoImage from '../../assets/logo.png';

const AdminRegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, currentUser, response, currentRole } = useSelector(state => state.user);

  const [formData, setFormData] = useState({
    adminName: '',
    schoolName: '',
    email: '',
    password: '',
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
    const fields = { 
      name: formData.adminName, 
      email: formData.email, 
      password: formData.password, 
      role: "Admin", 
      schoolName: formData.schoolName 
    };
    dispatch(registerUser(fields, "Admin"));
  };

  useEffect(() => {
    if (status === 'success' || (currentUser !== null && currentRole === 'Admin')) {
      navigate('/Admin/dashboard');
    } else if (status === 'failed') {
      setMessage(response);
      setShowPopup(true);
      setLoading(false);
    }
  }, [status, currentUser, currentRole, navigate, response]);

  return (
    <PageContainer>
      <ContentWrapper>
        <LeftPanel>
          <LogoImage src={logoImage} alt="SmartScooler Logo" />
          <WelcomeText>Welcome to SmartScooler</WelcomeText>
          <FeatureList>
            <FeatureItem>✓ Management of teachers</FeatureItem>
            <FeatureItem>✓ Management of Students</FeatureItem>
            <FeatureItem>✓ Management of attendance</FeatureItem>
          </FeatureList>
        </LeftPanel>
        <RightPanel>
          <FormContainer>
            <Title>Create Admin Account</Title>
            <Form onSubmit={handleSubmit}>
              <InputGroup>
                <Label htmlFor="adminName">Your Name</Label>
                <Input
                  id="adminName"
                  type="text"
                  name="adminName"
                  value={formData.adminName}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="schoolName">School Name</Label>
                <Input
                  id="schoolName"
                  type="text"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="password">Password</Label>
                <PasswordWrapper>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <TogglePassword onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? '🙈' : '👁️'}
                  </TogglePassword>
                </PasswordWrapper>
              </InputGroup>
              <SubmitButton type="submit" disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </SubmitButton>
            </Form>
            <LoginLink>
              Already have an account? <a href="/Adminlogin">Log in</a>
            </LoginLink>
          </FormContainer>
        </RightPanel>
      </ContentWrapper>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </PageContainer>
  );
};

export default AdminRegisterPage;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 1000px;
  height: 600px;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
`;

const LeftPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
`;

const LogoImage = styled.img`
  width: 200px; // Adjust as needed
  height: auto;
  margin-bottom: 20px;
`;

const WelcomeText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;
`;

const FeatureList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const FeatureItem = styled.li`
  margin-bottom: 15px;
  font-size: 1rem;
`;

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 30px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #666;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
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
  padding: 12px;
  background-color: #667eea;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #5a6eea;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const LoginLink = styled.p`
  margin-top: 20px;
  text-align: center;
  color: #666;

  a {
    color: #667eea;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;