import React from 'react';
import styled from 'styled-components';

const StayInformedStyled = styled.div`
background-color: #b09ae2;
border-radius: 43px;
height: 418px;
position: relative;
width: 100%; /* Set max-width to 100% for responsiveness */
max-width: 1300px; /* All the components have the same max-width*/
margin: 0 auto; /* Center the component */

  & .join {
    align-items: center;
    flex-direction: column;
    gap: 28px;
    height: 102px;
    justify-content: center;
    left: 343px;
    position: absolute;
    top: 82px;
    width: 604px;
  }

  & .text-wrapper {
    color: #ffffff;
    font-family: "Roboto", Helvetica;
    font-size: 41.3px;
    font-weight: 800;
    letter-spacing: 1.24px;
    line-height: 52.5px;
    margin-left: -122.5px;
    margin-right: -122.5px;
    margin-top: -11.5px;
    position: relative;
    text-align: center;
    width: 849px;
  }

  & .div {
    align-self: stretch;
    color: #fffcf8;
    font-family: "Roboto", Helvetica;
    font-size: 24px;
    font-weight: 400;
    height: 42px;
    letter-spacing: 0.72px;
    line-height: 5px;
    margin-bottom: -9.5px;
    position: relative;
    text-align: center;
  }

  & .form {
    align-items: center;
    background-color: #ffffff;
    border-radius: 7.5px;
    display: flex;
    gap: 20px;
    height: 65px;
    justify-content: center;
    left: 411px;
    position: absolute;
    top: 215px;
    width: 468px;
  }

  & .text-wrapper-2 {
    color: #767676;
    font-family: "Poppins", Helvetica;
    font-size: 18px;
    font-weight: 400;
    letter-spacing: 0.54px;
    line-height: 26.3px;
    position: relative;
    width: 198px;
  }

  & .login {
    align-items: center;
    background-color: #000000;
    border-radius: 14px;
    box-shadow: 0px 8px 4px #00000040;
    display: flex;
    gap: 10px;
    justify-content: center;
    left: 560px;
    padding: 10px 17px;
    position: absolute;
    top: 311px;
    width: 164px;
    margin-top: 15px;
  }

  & .text-wrapper-3 {
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

  & .SOCIALS {
    align-items: flex-start;
    display: inline-flex;
    gap: 10.5px;
    left: 45px;
    position: absolute;
    top: 348px;
  }

  & .div-2 {
    background-color: #ffffff;
    border-radius: 11.25px;
    height: 39px;
    position: relative;
    width: 39px;
  }

  & .vector {
    height: 19px;
    left: 14px;
    position: absolute;
    top: 10px;
    width: 10px;
  }

  & .img {
    height: 16px;
    left: 11px;
    position: absolute;
    top: 11px;
    width: 16px;
  }

  & .vector-2 {
    height: 15px;
    left: 12px;
    position: absolute;
    top: 12px;
    width: 19px;
  }

  & .group {
    height: 39px;
    margin-right: -2px;
    position: relative;
    width: 41px;
  }

  & .text-wrapper-4 {
    color: #000000;
    font-family: "Roboto", Helvetica;
    font-size: 18px;
    font-weight: 700;
    left: 12px;
    letter-spacing: 0.36px;
    line-height: 30px;
    position: absolute;
    top: 5px;
    white-space: nowrap;
    width: 17px;
  }
`;

export const StayInformedComponent = () => {
  return (
    <StayInformedStyled>
      <div className="join">
        <p className="text-wrapper">SIGN UP AND STAY INFORMED</p>
        <p className="div">Type your email down below to join our mailing list</p>
      </div>
      <div className='form'>

        <input className="text-wrapper-2" type="text" placeholder="Add your email here" style={{
          fontFamily: 'Poppins, Helvetica', // Match the font family of the text
          fontSize: '18px', // Match the font size of the text
          color: '#767676', // Match the color of the text
          width: '100%',
          textAlign: 'center', // Center the text inside the input
          border: 'none', // Remove the outline
          outline: 'none',
          '::placeholder': {
            fontFamily: 'Poppins, Helvetica', // Match the font family of the placeholder
            fontSize: '18px', // Match the font size of the placeholder
            color: '#767676', // Match the color of the placeholder
          }
        }}
        ></input>

      </div>
      <button className="login">
        <div className="text-wrapper-3">SUBMIT</div>
      </button>
      <div className="SOCIALS">
        <div className="div-2">
          <img className="vector" alt="Vector" src="https://c.animaapp.com/1a9gVhG3/img/vector.svg" />
        </div>
        <div className="div-2">
          <img className="img" alt="Vector" src="https://c.animaapp.com/1a9gVhG3/img/vector-2.svg" />
        </div>
        <div className="div-2">
          <img className="vector-2" alt="Vector" src="https://c.animaapp.com/1a9gVhG3/img/vector-1.svg" />
        </div>
        <div className="group">
          <div className="div-2">
            <div className="text-wrapper-4">in</div>
          </div>
        </div>
      </div>
    </StayInformedStyled>
  );
};
