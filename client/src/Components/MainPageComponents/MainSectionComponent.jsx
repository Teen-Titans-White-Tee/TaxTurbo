import React from "react";
import styled from "styled-components";

const StyledMain = styled.div`
align-items: center;
height: 983px;
background-color: #b09ae2;
border-radius: 43px;
display: flex;
flex-direction: column;
gap: 10px;
justify-content: center;
position: relative;
width: 1300px; 
margin: 0 auto; /* Center the component within its parent */
margin-bottom: 16.96px;

& .MAIN-INNER {
  height: 862px;
  margin-left: -17.5px;
  margin-right: -17.5px;
  position: relative;
  width: 100%;
  max-width: 1288px; /* Adjust the max-width as needed */
}

  & .overlap {
    height: 425px;
    left: -80px;
    position: absolute;
    top: 414px;
    width: 1243px;
  }

  & .overlap-group {
    height: 425px;
    left: 130px;
    position: relative;
    top: 0;
    width: 1243px;
  }

  & .GRAPHS-IMAGE {
    height: 425px;
    left: 690px;
    object-fit: cover;
    position: absolute;
    width: 616px;
    top: 35px;
  }

  & .PROJECTIONS-FOR {
    color: transparent;
    font-family: "Roboto", Helvetica;
    font-size: 35px;
    font-weight: 500;
    left: 0;
    letter-spacing: 0.7px;
    line-height: 57px;
    position: absolute;
    top: 126px;
    white-space: nowrap;
    width: 703px;
  }

  & .text-wrapper {
    color: #000000a3;
  }

  & .div {
    color: #ffffff;
    font-family: "Roboto", Helvetica;
    font-size: 25px;
    font-weight: 500;
    left: 330px;
    letter-spacing: 0.5px;
    line-height: 57px;
    position: absolute;
    top: 297px;
    white-space: nowrap;
    margin-top: 25px;
  }

  & .p {
    color: #ffffff;
    font-family: "Roboto", Helvetica;
    font-size: 25px;
    font-weight: 500;
    left: 290px;
    letter-spacing: 0.5px;
    line-height: 57px;
    position: absolute;
    top: 240px;
    white-space: nowrap;
  }

  & .text-wrapper-2 {
    color: #ffffff;
    font-family: "Roboto", Helvetica;
    font-size: 25px;
    font-weight: 500;
    left: 248px;
    letter-spacing: 0.5px;
    line-height: 57px;
    position: absolute;
    top: 183px;
    white-space: nowrap;
  }

  & .INSTANTLY-SEE-TAX {
    color: transparent;
    font-family: "Roboto", Helvetica;
    font-size: 35px;
    font-weight: 500;
    left: 504px;
    letter-spacing: 0.7px;
    position: absolute;
    top: 65px;
    white-space: nowrap;
    width: 541px;
  }

  & .UPLOAD-IMAGES {
    color: #ffffff;
    font-family: "Roboto", Helvetica;
    font-size: 25px;
    font-weight: 500;
    left: 472px;
    letter-spacing: 0.5px;
    position: absolute;
    top: 247px;
    white-space: nowrap;
  }

  & .BUDGET-EFFECTIVELY {
    color: #ffffff;
    font-family: "Roboto", Helvetica;
    font-size: 25px;
    font-weight: 500;
    left: 516px;
    letter-spacing: 0.5px;
    position: absolute;
    top: 190px;
    white-space: nowrap;
  }

  & .text-wrapper-3 {
    color: #ffffff;
    font-family: "Roboto", Helvetica;
    font-size: 25px;
    font-weight: 500;
    left: 428px;
    letter-spacing: 0.5px;
    position: absolute;
    top: 133px;
    white-space: nowrap;
  }

  & .PAPERTAX-IMAGE{
    height: 425px;
    object-fit: cover;
    position: absolute;
    left: -100px; 
    width: 616px;
    z-index: 1; 
  }
`;

export const MainSectionComponent = () => {
  return (
    <StyledMain>
      <div className="MAIN-INNER">
      <img
              className="PAPERTAX-IMAGE"
              src="build/2183084705-removebg-preview.png"
            />
        <div className="overlap">
          <div className="overlap-group">
            <img
              className="GRAPHS-IMAGE"
              alt="Graphs IMAGE"
              src="https://c.animaapp.com/D8QAD2zE/img/graphs-image.png"
            />
            <p className="PROJECTIONS-FOR">
              <span className="text-wrapper">
                PROJECTIONS FOR INFORMED DECISIONS
                <br />
              </span>
              <span className="text-wrapper">
                <br />
              </span>
              <span className="text-wrapper">{""}</span>
            </p>
          </div>
          <div className="div">TEST DIFFERENT SCENARIOS</div>
          <p className="p">INSIGHT FOR LONG TERM PLANNING</p>
          <p className="text-wrapper-2">PLAN FOR FUTURE FINANCIAL MILESTONES</p>
        </div>
        <p className="INSTANTLY-SEE-TAX">
          <span className="text-wrapper">
            INSTANTLY SEE TAX LIABILITIES
            <br />
          </span>
          <span className="text-wrapper">
            <br />
          </span>
          <span className="text-wrapper">{""}</span>
        </p>
        <p className="UPLOAD-IMAGES">UPLOAD IMAGES &amp; INVOICES TO TRACK EXPENSES</p>
        <p className="BUDGET-EFFECTIVELY">BUDGET EFFECTIVELY &amp; IDENTIFY SAVINGS</p>
        <p className="text-wrapper-3">INSTANTLY SEE TAX LIABILITIES AND PLAN ACCORDINGLY</p>
      </div>
    </StyledMain>
  );
};
