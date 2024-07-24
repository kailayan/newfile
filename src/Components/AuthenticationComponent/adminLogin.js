import React, { useState, useRef, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import homeVideo from '../../assets/bg.mp4';
import logo from '../../assets/favicon.png';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import WallsPage from '../WallsComponent/WallsPage';
import Logout from './logout';

function AdminLoginPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ userName: '', password: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [wallsPageDisplay, setWallsPageDisplay] = useState(false);
  const videoRef = useRef(null);
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    if (successMessage && videoRef.current) {
      videoRef.current.play();
    }
  }, [successMessage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'userName') {
      setUserName(value);
      if (value) {
        setErrors((prevErrors) => ({ ...prevErrors, userName: '' }));
      }
    } else if (name === 'password') {
      setPassword(value);
      if (value) {
        setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
      }
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (!value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required`,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    if (!userName) {
      setErrors((prevErrors) => ({ ...prevErrors, userName: 'User Name is required' }));
      isValid = false;
    }
    if (!password) {
      setErrors((prevErrors) => ({ ...prevErrors, password: 'Password is required' }));
      isValid = false;
    }

    if (isValid) {
      // Simulate login logic - replace with actual authentication process
      if (userName === 'admin' && password === 'password') {
        setSuccessMessage('Logged in successfully');
        setFormSubmitted(true);
        setLogout(true);
        sessionStorage.setItem('admin', userName);
        // Navigate to analytics page after video ends
        videoRef.current.addEventListener('ended', handleVideoEnded);
      } else {
        setErrors({ userName: 'Invalid credentials', password: 'Invalid credentials' });
      }
    }
  };

  const handleVideoEnded = () => {
    setWallsPageDisplay(true);
    navigate('/admin/analytics');
  };

  const logoutfunction = () => {
    setLogout(false);
    setFormSubmitted(false);
    setWallsPageDisplay(false);
    setUserName('');
    setPassword('');
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <Grid
      container
      style={{
        position: 'relative',
        height: '100vh',
        margin: '0',
        padding: '0',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <video
        ref={videoRef}
        src={homeVideo}
        type=""
        muted
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}
        controls={false}
        onEnded={handleVideoEnded}
      />

      {!formSubmitted && !wallsPageDisplay && !logout && (
        <Box className={'box glow-box-hover'} alignItems={'center'} display={'flex'} justifyContent={'center'} sx={{ backgroundColor: 'rgba(255,255,255,0.4)' }}>
          <Grid container sx={{ width: { sm: 'auto', md: '350px', lg: '350px', xl: '350px' } }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#27374b',
                padding: 0,
                borderRadius: '10px',
                boxShadow: 3,
                width: '100%',
              }}
            >
              <img src={logo} alt='logo' style={{ width: '81px', height: '71px' }} />
              <h5 style={{ fontFamily: 'hemihead', position: 'relative', top: '-19px' }}>AI VERSE</h5>
              <Box component="form" width={'100%'} noValidate onSubmit={handleSubmit}>
                <Grid container display={'block'} lg={12} md={12} sm={12} xs={12} p={4} pt={0}>
                  <Grid item>
                    <label htmlFor="userName" className="form-label text-white">
                      User Name
                    </label>
                    <input
                      type="text"
                      className={`login-input form-control ${errors.userName && 'is-invalid'}`}
                      id="userName"
                      value={userName}
                      name="userName"
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="Enter User Name"
                      required
                    />
                    {errors.userName && <div className="invalid-feedback">{errors.userName}</div>}
                  </Grid>
                  <Grid className='mt-3' item>
                    <label htmlFor="password" className="form-label text-white">
                      Password
                    </label>
                    <input
                      type="password"
                      className={`login-input form-control ${errors.password && 'is-invalid'}`}
                      id="password"
                      value={password}
                      name="password"
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="Enter Password"
                      required
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                  </Grid>
                  <Grid item>
                    <button type="submit" className='btn login-btn glow-on-hover mt-4'>
                      Login
                    </button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Box>
      )}
      {wallsPageDisplay && <WallsPage />}
      {logout && (
        <Logout logoutfunction={logoutfunction} />
      )}
      {logout && (
        <div style={{
          display: 'flex', height: '100vh',
          width: 'auto',
          position: 'relative',
          top: '-17px'
        }}>
          <img src={logo} alt='logo' style={{ width: '80px', height: '90px' }} />
        </div>
      )}
    </Grid>
  );
}

export default AdminLoginPage;
