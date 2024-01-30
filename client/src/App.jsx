
import React from 'react';
import LoginPageContainer from './Containers/LoginPageContainer.jsx';
import UserDashboardContainer from './Containers/UserDashboardContainer.jsx';
import MainPageContainer from './Containers/MainPageContainer.jsx';
import SignupPageContainer from './Containers/SignupPageContainer.jsx';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const App = () => {
  return (
    <div className="app">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPageContainer />} />
          <Route path="/login" element={<LoginPageContainer />} />
          <Route path="/signup" element={<SignupPageContainer />} />
          <Route>
            <Route path="/dashboard" element={<UserDashboardContainer />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </LocalizationProvider>
    </div>
  );
};

export default App;
