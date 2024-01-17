import React from "react";
import LandingPageContainer from "./Containers/LandingPageContainer.jsx";
import MainPageContainer from "./Containers/MainPageContainer.jsx";
import SignupPageContainer from "./Containers/SignupPageContainer.jsx";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPageContainer />} />
          <Route path="/login" element={<LoginPageContainer />} />
          <Route path="/signup" element={<SignupPageContainer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
