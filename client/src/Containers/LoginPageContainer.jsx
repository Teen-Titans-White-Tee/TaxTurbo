import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


const StyledLogin = styled.div`
  align-items: center;
  border-radius: 43px;
  background-color: #b09ae2;
  display: flex;
  flex-direction: column;
  height: 1181px;
  position: relative;

  & .MAIN-INNER {
    height: 826px;
    left: 15px;
    position: relative;
    top: 111px;
    width: 1050px;
  }

  & .REGISTER {
    color: #ffffff;
    font-family: "Roboto-Black", Helvetica;
    font-size: 38px;
    font-weight: 900;
    left: 6px;
    letter-spacing: 1.24px;
    line-height: 52.5px;
    position: absolute;
    text-align: center;
    top: 94px;
    width: 1050px;
  }

  & .text-wrapper {
    color: #767676;
    flex: 1;
    font-family: "Roboto-Black", Helvetica;
    font-size: 18px;
    font-weight: 400;
    letter-spacing: 0.54px;
    line-height: 26.3px;
    position: relative;
  }

  & .password-wrapper {
    align-items: center;
    background-color: #ffffff;
    border-radius: 7.5px;
    box-shadow: 0px 8px 4px #00000040;
    display: flex;
    height: 45px;
    left: 337px;
    padding: 8px 10px;
    position: absolute;
    top: 334px;
    width: 375px;
  }

  & .email-wrapper {
    align-items: center;
    background-color: #ffffff;
    border-radius: 7.5px;
    box-shadow: 0px 8px 4px #00000040;
    display: flex;
    height: 45px;
    left: 337px;
    padding: 8px 10px;
    position: absolute;
    top: 234px;
    width: 375px;
  }

  & .button {
    all: unset;
    align-items: center;
    background-color: #000000;
    border-radius: 6px;
    box-shadow: 0px 8px 4px #00000040;
    box-sizing: border-box;
    display: flex;
    gap: 10px;
    justify-content: center;
    left: 326px;
    padding: 11px 26px;
    position: absolute;
    top: 445px;
    width: 423px;
  }

  & .LOGIN {
    color: #ffffff;
    font-family: "Roboto-Black", Helvetica;
    font-size: 22px;
    font-weight: 500;
    letter-spacing: 0.74px;
    line-height: 26.3px;
    margin-top: -0.75px;
    position: relative;
    white-space: nowrap;
    width: fit-content;
  }

  & .div {
    color: #ffffff;
    font-family: "Roboto-Black", Helvetica;
    font-size: 20px;
    font-weight: 400;
    left: 344px;
    letter-spacing: 0.72px;
    line-height: 26.3px;
    position: absolute;
    text-align: center;
    top: 161px;
    white-space: nowrap;
  }
`;

const LoginPageContainer = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
 
    const isLoginSuccessful = true;

    if (isLoginSuccessful) {
      navigate('/dashboard');
    } else {
      console.log('Login failed');
    }
  };


  return (
    <StyledLogin>
      <div className="MAIN">
        <div className="MAIN-INNER">
          <div className="REGISTER">Welcome Back</div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="password-wrapper">
              <TextField
                type="password"
                fullWidth
                label="Password"
                onChange={handlePasswordChange}
              />
            </div>
            <div className="email-wrapper">
              <TextField
                type="email"
                fullWidth
                value={email}
                label="Email"
                onChange={handleEmailChange}
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="button"
            >
              <div className="LOGIN">Login</div>
            </Button>
          </form>
          <p className="div">Please enter email and password below</p>
        </div>
      </div>
    </StyledLogin>
  );
};

export default LoginPageContainer;
