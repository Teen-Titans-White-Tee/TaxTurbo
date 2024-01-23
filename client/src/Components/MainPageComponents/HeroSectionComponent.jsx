import React from "react";
import styled from "styled-components";

const StyledHeroSection = styled.div`
  background-color: #b09ae2;
  border-radius: 43px;
  height: 617px;
  position: relative;
  max-width: 100%; /* Ensure the component doesn't exceed the parent's width */
  margin: 0 auto; /* Center the component within its parent */
  margin-bottom: 16.96px;

  & .overlap {
    height: 575px;
    left: 24px;
    position: relative;
    top: 39px;
    width: 1300px;

    & .overlap-group {
      height: 575px;
      left: 21px;
      position: absolute;
      top: 0;
      width: 1246px;
    }

    & .MAIN-LOGO {
      height: 412px;
      left: 777px;
      position: absolute;
      top: 137px;
      width: 468px;
    }

    & .VECTORS {
      height: 434px;
      left: 581px;
      position: absolute;
      top: 141px;
      width: 665px;
    }

    & .text-wrapper {
      color: #000000;
      font-family: "Roboto", Helvetica;
      font-size: 40px;
      font-weight: 500;
      left: 0;
      letter-spacing: 1px;
      line-height: 57px;
      position: absolute;
      top: -40px;
      width: 655px;
    }

    & .TRACK-EARNINGS {
      color: transparent;
      font-family: "Roboto", Helvetica;
      font-size: 35px;
      font-weight: 500;
      left: 55px;
      letter-spacing: 0.7px;
      line-height: 0px;
      position: absolute;
      top: 310px;
      white-space: nowrap;
      width: 600px;

      & .span {
        color: #000000a3;
      }
    }

    & .CALCULATE-CURRENT {
      color: transparent;
      font-family: "Roboto", Helvetica;
      font-size: 35px;
      font-weight: 500;
      left: 55px;
      letter-spacing: 0.7px;
      line-height: 0px;
      position: absolute;
      top: 241px;
      white-space: nowrap;
      width: 807px;

      & .span {
        color: #000000a3;
      }
    }

    & .div {
      color: #ffffff;
      font-family: "Roboto", Helvetica;
      font-size: 25px;
      font-weight: 500;
      left: 55px;
      letter-spacing: 0.5px;
      line-height: 57px;
      position: absolute;
      top: 452px;
      white-space: nowrap;
    }

    & .FUTURE-PROJECTIONS {
      color: transparent;
      font-family: "Roboto", Helvetica;
      font-size: 35px;
      font-weight: 500;
      left: 76px;
      letter-spacing: 0.7px;
      line-height: 0px;
      position: absolute;
      top: 383px;
      white-space: nowrap;
      width: 440px;

      & .span {
        color: #000000a3;
      }
    }

    & .CHECK {
      height: 56px;
      left: 0;
      object-fit: cover;
      position: absolute;
      top: 242px;
      width: 57px;
    }

    & .img {
      height: 56px;
      left: 0;
      object-fit: cover;
      position: absolute;
      top: 311px;
      width: 57px;
    }

    & .CHECK-2 {
      height: 56px;
      left: 2px;
      object-fit: cover;
      position: absolute;
      top: 384px;
      width: 57px;
    }
  }
`;

export const HeroSection = () => {
  return (
    <StyledHeroSection>
      <div className="overlap">
        <div className="overlap-group">
          <img className="MAIN-LOGO" alt="Main LOGO" src="https://c.animaapp.com/OfhiUw98/img/main-logo@2x.png" />
          <img className="VECTORS" alt="Vectors" src="https://c.animaapp.com/OfhiUw98/img/vectors.png" />
          <p className="text-wrapper">GAIN COMPLETE CONTROL OVER YOUR FINANCES</p>
          <p className="TRACK-EARNINGS">
            <span className="span">
              TRACK EARNINGS &amp; OUTGOINGS
              <br />
            </span>
            <span className="span">
              <br />
            </span>
            <span className="span">{""}</span>
          </p>
          <p className="CALCULATE-CURRENT">
            <span className="span">
              CALCULATE CURRENT YTD TAX LIABILITY
              <br />
            </span>
            <span className="span">
              <br />
            </span>
            <span className="span">{""}</span>
          </p>
          <p className="div">INFORMED DECISION MAKING MADE SIMPLE</p>
        </div>
        <p className="FUTURE-PROJECTIONS">
          <span className="span">
            FUTURE PROJECTIONS
            <br />
          </span>
          <span className="span">
            <br />
          </span>
          <span className="span">{""}</span>
        </p>
        <img className="CHECK" alt="Check" src="https://c.animaapp.com/OfhiUw98/img/check-3@2x.png" />
        <img className="img" alt="Check" src="https://c.animaapp.com/OfhiUw98/img/check-3@2x.png" />
        <img className="CHECK-2" alt="Check" src="https://c.animaapp.com/OfhiUw98/img/check-3@2x.png" />
      </div>
    </StyledHeroSection>
  );
};
