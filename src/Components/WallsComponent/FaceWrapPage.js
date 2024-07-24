import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { styled } from '@mui/system';
import './Loader.css';
import backDrop_img from "../../assets/BackDrop.jpg";
import favicon from "../../assets/favicon.png";
import loader from "../../assets/HorseRun-unscreen.gif";
import { useNavigate } from 'react-router-dom';
import Logout from '../AuthenticationComponent/logout';
import OpenCam from './openCam';

const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
});

function FaceWrapPage() {
    const navigate = useNavigate();
    const [loaderhandler, setLoaderHandler] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 900);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const logoutfunction = (value) => {
        navigate(value);
    };

    
    const setLoaderHandling = (value) => {
        setLoaderHandler(value);
    };



    return (
        <Container className={'image-contain'} style={{ backgroundImage: `url(${backDrop_img})` }}>
            <div style={{
                display: 'flex', height: 'auto',
                width: 'auto',
                position: window.innerWidth < 700 ? 'absolute' : 'fixed',
                top: window.innerWidth < 700 ? 0 : '-16px',
                left: window.innerWidth < 700 ? 0 : ''
                
            }}>
                <img src={favicon} alt='logo' style={{ width: window.innerWidth < 700 ? '65px' :'80px', height: window.innerWidth < 700 ? '65px' : '90px' }} />
            </div>
            <Logout logoutfunction={logoutfunction} />
            {isMobile ? (
                <Grid container m={4} p={5} display={'flex'} justifyContent={'center'} alignItems={'center'} position={'sticky'} mt={7}>
                    <OpenCam setLoaderHandling={setLoaderHandling}/>
                    {loaderhandler && (
                        <Grid container justifyContent={'center'} position={'absolute'} top={"215px"} left={3}>
                            <Grid item >
                                <div className='loader-text'>
                                    <img src={loader} alt='loading' height={'45vh'} />
                                    <h5 style={{ color: 'white' }}>Please Wait</h5>
                                </div>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            ) : (
                <Grid container m={4} p={5} display={'flex'} justifyContent={'center'} alignItems={'center'} position={'sticky'} mt={7}>
                    <OpenCam setLoaderHandling={setLoaderHandling}/>
                    {loaderhandler && (
                        <Grid container justifyContent={'center'} position={'absolute'} top={"215px"} left={3}>
                            <Grid item >
                                <div className='loader-text'>
                                    <img src={loader} alt='loading' height={'45vh'} />
                                    <h5 style={{ color: 'white' }}>Please Wait</h5>
                                </div>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            )}
        </Container>
    );
}

export default FaceWrapPage;
