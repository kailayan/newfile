import React, { useState, useRef, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import homeVideo from '../../assets/bg.mp4';
import logo from '../../assets/favicon.png'
import { register } from '../../Service';
import './Login.css'
import WallsPage from '../WallsComponent/WallsPage';
import Logout from './logout';

function LoginPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ name: '', phone: '', email: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [wallsPageDisplay, setWallsPageDisplay] = useState(false);
  const [logout, setlogout] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (successMessage && videoRef.current) {
      videoRef.current.play();
    }
  }, [successMessage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'name') {
      setName(value);
      if (value) {
        setErrors((prevErrors) => ({ ...prevErrors, name: '' }));
      }
    } else if (name === 'phone') {
      const sanitizedValue = value.replace(/\D/g, '').slice(0, 10);
      setPhone(sanitizedValue);
      if (sanitizedValue.length === 10 || sanitizedValue.length === 0) {
        setErrors((prevErrors) => ({ ...prevErrors, phone: '' }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, phone: 'Phone number must be 10 digits' }));
      }
    } else if (name === 'email') {
      setEmail(value);
      if (value.includes('@')) {
        setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
      }
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (!value) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required` }));
    } else if (name === 'email' && !value.includes('@')) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Email is required' }));
    }
  };

  useEffect(() => {
    console.log(logout);
  }, [logout])

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    if (!name) {
      setErrors((prevErrors) => ({ ...prevErrors, name: 'Name is required' }));
      isValid = false;
    }
    if (!phone || phone.length !== 10) {
      setErrors((prevErrors) => ({ ...prevErrors, phone: 'Phone number must be 10 digits' }));
      isValid = false;
    }
    if (!email.includes('@')) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Email address is required' }));
      isValid = false;
    }

    if (isValid) {
      const formDataObject = {
        name: name,
        phoneNumber: phone,
        email: email,
      };

      register(formDataObject)
        .then(response => {
          console.log("res", response);
          if (response.status === "OK") {
            setSuccessMessage(response.msg);
            setFormSubmitted(true);
            videoRef.current.play();
            sessionStorage.setItem('name', name);
            sessionStorage.setItem('phoneNumber', phone);
            setlogout(true)
          }
        })

        .catch(error => {
          console.error('Registration failed', error);
        });
    }
  };

  const handleVideoEnded = () => {
    setWallsPageDisplay(true);
  };

  const logoutfunction = (value) => {
    console.log(value);
    setlogout(value);
    setFormSubmitted(value);
    setWallsPageDisplay(value);
    setName('');
    setPhone('');
    setEmail('');
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <Grid container style={{ position: 'relative', height: '100vh', margin: '0', padding: '0', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <video
        ref={videoRef}
        src={homeVideo}
        type=""
        muted
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -1 }}
        controls={false}
        onEnded={handleVideoEnded}
      />

      {!formSubmitted && !wallsPageDisplay && !logout && (
        <Box class={'box glow-box-hover'} width={'100%'} alignItems={'center'} display={'flex'} justifyContent={'center'} sx={{ backgroundColor: 'rgba(255,255,255,0.4)' }}>
          <Grid container sx={{ width: { sm: 'auto', md: '350px', lg: '350px', xl: '350px' } }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#27374b',
                padding: 0,
                borderRadius: "10px",
                boxShadow: 3,
                width: '100%',
              }}
            >
              <img src={logo} alt='logo' style={{ width: '81px', height: '71px' }} />
              <h5 style={{ fontFamily: "hemihead", position: 'relative', top: '-19px' }}>AI VERSE</h5>
              <Box component="form" width={'100%'} noValidate onSubmit={handleSubmit}>
                <Grid container display={'block'} lg={12} md={12} sm={12} xs={12} p={4} pt={0}>
                  <Grid item>
                    <label htmlFor="name" className="form-label text-white">Name</label>
                    <input
                      type="text"
                      className={`login-input form-control ${errors.name && 'is-invalid'}`}
                      id="name"
                      value={name}
                      name="name"
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="Enter Full Name"
                      required
                    />
                    {errors.name && (
                      <div className="invalid-feedback">
                        {errors.name}
                      </div>
                    )}
                  </Grid>
                  <Grid className='mt-3' item>
                    <label htmlFor="phoneNumber" className="form-label text-white">Phone Number</label>
                    <input
                      type="tel"
                      className={`login-input form-control ${errors.phone && 'is-invalid'}`}
                      id="phoneNumber"
                      value={phone}
                      name="phone"
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="Enter Phone Number"
                      required
                    />
                    {errors.phone && (
                      <div className="invalid-feedback">
                        {errors.phone}
                      </div>
                    )}
                  </Grid>
                  <Grid className='mt-3' item>
                    <label htmlFor="email" className="form-label text-white">Email</label>
                    <input
                      type="email"
                      className={`login-input form-control ${errors.email && 'is-invalid'}`}
                      id="email"
                      value={email}
                      name="email"
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="Enter Email"
                    />
                    {errors.email && (
                      <div className="invalid-feedback">
                        {errors.email}
                      </div>
                    )}
                  </Grid>
                  <Grid item>
                    <button
                      type="submit"
                      className='btn login-btn glow-on-hover mt-4'
                    >
                      Submit
                    </button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Box>
      )}
      {wallsPageDisplay && (
        <WallsPage />
      )}
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

export default LoginPage;
