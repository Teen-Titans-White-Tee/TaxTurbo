import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const StyledNavigationInnerBar = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 100%; /* Set max-width to 100% for responsiveness */
  max-width: 1300px; /* Adjust the max-width as needed */
  padding: 3%;

  & .logo {
    align-items: center;
    display: inline-flex;
    flex: 0 0 auto;
    gap: 13px;
    position: relative;
  }

  & .group {
    height: 47px;
    position: relative;
    width: 49px;
  }

  & .overlap-group {
    height: 47px;
    position: relative;
    width: 47px;
  }

  & .text-wrapper {
    color: #000000;
    font-family: "Zen Dots", Helvetica;
    font-size: 30px;
    font-weight: 400;
    left: 10px;
    letter-spacing: 0.9px;
    line-height: normal;
    position: absolute;
    top: 7px;
    white-space: nowrap;
  }

  & .rectangle {
    border: 2px solid;
    border-color: #000000;
    height: 47px;
    left: 0;
    position: absolute;
    top: 0;
    width: 47px;
  }

  & .fashion-logo {
    align-items: center;
    display: inline-flex;
    flex: 0 0 auto;
    gap: 9.75px;
    position: relative;
  }

  & .div {
    color: #000000;
    font-family: "Roboto", Helvetica;
    font-size: 30px;
    font-weight: 800;
    letter-spacing: 0.9px;
    line-height: normal;
    margin-top: -0.75px;
    position: relative;
    white-space: nowrap;
    width: fit-content;
  }

  & .menu-right {
    align-items: center;
    display: flex;
    gap: 40.5px;
    position: relative;
    width: 369px;
  }

  & .div-wrapper {
    align-items: center;
    background-color: #000000;
    border-radius: 14px;
    box-shadow: 0px 8px 4px #00000040;
    display: flex;
    gap: 10px;
    justify-content: center;
    padding: 10px 17px;
    position: relative;
    width: 164px;
  }

  & .text-wrapper-2 {
    color: #fefefe;
    font-family: "Poppins", Helvetica;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: -0.54px;
    line-height: normal;
    margin-top: -0.75px;
    position: relative;
    width: fit-content;
  }
  & a {
    text-decoration: none;
  }
`;

export const NavigationInnerBar = () => {
  return (
    <StyledNavigationInnerBar>
      <div className="logo">
        <div className="group">
          <div className="overlap-group">
            <div className="text-wrapper">S</div>
            <div className="rectangle" />
          </div>
        </div>
        <div className="fashion-logo">
          <div className="div">SCRATCH PROJECT</div>
        </div>
      </div>
      <div className="menu-right">
        <Link to='/login'>
          <button className="div-wrapper">
            <div className="text-wrapper-2">LOGIN</div>
          </button>
        </Link>
        <Link to='/signup'>
          <button className="div-wrapper">
            <div className="text-wrapper-2">SIGN UP</div>
          </button>
        </Link>
      </div>
    </StyledNavigationInnerBar>
  );
};
