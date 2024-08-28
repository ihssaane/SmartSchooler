import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Students from "../assets/Student.jpg";

const Homepage = () => {
    return (
        <PageWrapper>
            <ContentContainer>
                <LeftSection>
                    <Logo>SmartSchooler</Logo>
                    <Title>Manage Your School Intelligently</Title>
                    <Description>
                        Optimize your school operations with SmartSchooler. Our platform connects administrators, teachers, and students in an intuitive and efficient environment.
                    </Description>
                    <CTASection>
                        <LoginButton to="/choose">Log In</LoginButton>
                        <SignupText>
                            Don't have an account yet? <SignupLink to="/Adminregister">Sign Up</SignupLink>
                        </SignupText>
                    </CTASection>
                </LeftSection>
                <RightSection>
                    <ImageContainer>
                        <StyledImage src={Students} alt="Students" />
                    </ImageContainer>
                </RightSection>
            </ContentContainer>
        </PageWrapper>
    );
};

export default Homepage;

const PageWrapper = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f0f2f5;
`;

const ContentContainer = styled.div`
    display: flex;
    width: 100%;
    max-width: 1200px;
    background-color: white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const LeftSection = styled.div`
    flex: 1;
    padding: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const RightSection = styled.div`
    flex: 1;
    background-color: #e0e7ff;
`;

const Logo = styled.h2`
    font-size: 24px;
    color: #31665F;
    margin-bottom: 30px;
`;

const Title = styled.h1`
    font-size: 48px;
    color: #1f2937;
    margin-bottom: 20px;
    line-height: 1.2;
`;

const Description = styled.p`
    font-size: 18px;
    color: #6b7280;
    margin-bottom: 40px;
    line-height: 1.6;
`;

const CTASection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const LoginButton = styled(Link)`
    background: linear-gradient(109.6deg, rgb(0, 0, 0) 11.2%, rgb(11, 132, 145) 91.1%);
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 18px;
    text-decoration: none;
    transition: background-color 0.3s;

    &:hover {
        background-color: #3730a3;
    }
`;

const SignupText = styled.p`
    margin-top: 20px;
    font-size: 16px;
    color: #6b7280;
`;

const SignupLink = styled(Link)`
    color: #31665F;
    text-decoration: none;
    font-weight: bold;

    &:hover {
        text-decoration: underline;
    }
`;

const ImageContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

const StyledImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;
