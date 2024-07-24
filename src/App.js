import './'
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/AuthenticationComponent/LoginPage';
// import AIgeneratorPage from './Components/WallsComponent/AIgeneratorPage';
import { AnalyticsPage } from './Components/AdminComponent/AnalyticsPage';
import HomePage from './Components/WallsComponent/home';
import AdminLoginPage from './Components/AuthenticationComponent/adminLogin';
import Logout from './Components/AuthenticationComponent/logout';
import FaceWrapPage from './Components/WallsComponent/FaceWrapPage';
import AudioGenerator from './Components/WallsComponent/AudioPage';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          {/* <Route path="/aigeneratorPage" element={<AIgeneratorPage />} /> */}
          <Route path="/faceWrap" element={<FaceWrapPage />} />
          <Route path="/audioGenerator" element={<AudioGenerator />} />
          <Route path="/home" element={<HomePage />} />
          <Route path='/admin/analytics' element={<AnalyticsPage />} />
        </Routes>
      </Router>
    </>
  )
}
export default App;