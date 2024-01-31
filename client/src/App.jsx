
import React from 'react';
import LoginPageContainer from './Containers/LoginPageContainer.jsx';
import UserDashboardContainer from './Containers/UserDashboardContainer.jsx';
import MainPageContainer from './Containers/MainPageContainer.jsx';
import SignupPageContainer from './Containers/SignupPageContainer.jsx';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import AuthWrapper from './Components/MainPageComponents/AuthWrapper';

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPageContainer />} />
          <Route path="/login" element={<LoginPageContainer />} />
          <Route path="/signup" element={<SignupPageContainer />} />
          <Route path="/dashboard" element={
            <AuthWrapper>
              <UserDashboardContainer />
            </AuthWrapper>
          }
        />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
