import React, { useEffect, useState } from 'react';
import { Grid, Box } from '@mui/material';
import './home.css';
// import { useNavigate } from 'react-router-dom'; // Uncomment if using navigation
import AI_image1 from "../../assets/outline3x.png"
import AI_image2 from "../../assets/Asset 10@4x.png"
import AI_image3 from "../../assets/Asset 9@4x.png"
import AI_image4 from "../../assets/Asset 8@4x.png"
import favicon from "../../assets/favicon.png"
import AI_image5 from "../../assets/Asset 11@4x.png"
import backo_img from "../../assets/End_img.png"
import { useNavigate } from 'react-router-dom';
import Logout from '../AuthenticationComponent/logout';

const HomePage = () => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);
    const [moved, setMoved] = useState(false);
    // const navigate = useNavigate(); // Uncomment if using navigation

    const handleToggle = () => {
        setExpanded(true);
    };

    useEffect(() => {
        handleToggle();
    }, []);

    useEffect(() => {
        if (expanded) {
            const timer = setTimeout(() => setMoved(true), 2000);
            return () => clearTimeout(timer);
        }
    }, [expanded]);
    console.log("wfwsfwf");

    const logoutfunction = (value) => {
        navigate(value);
    }

    return (
        <div className='cardContainer' style={{
            display: 'flex', justifyContent: 'center',
            backgroundImage: `url(${backo_img})`,
            width: " 100%",
            height: "100vh",
        }}>
            <div style={{
                display: 'flex', height: 'auto',
                width: 'auto',
                position: 'absolute',
                top: '-17px',
                left: window.innerWidth < 700 ? 0:''
            }}>
                <img src={favicon} alt='logo' style={{ width: '80px', height: '90px' }} />
            </div>
            <Logout logoutfunction={logoutfunction} />
            <Grid
                container
                spacing={0}
                direction="row"
                justifyContent="center"
                alignItems="center"
                position={'relative'}
                style={{ minHeight: '100vh', borderColor: 'red' }}
                className={'wrapper'}
            >

                <Grid item className='child' display={'flex'} justifyContent={'center'}
                    onClick={() => navigate('/faceWrap', { state: { cardNumber: 1 } })}
                >
                    <Box
                        className={`${expanded ? 'Left expanded' : 'Left'} ${moved ? 'moved' : ''}`}
                        sx={{
                            position: 'absolute',
                            width: '10vw',
                            height: '0px',
                            overflow: "hidden",
                            // borderRadius: "10px",
                            // bgcolor: "red",
                            // background: "primary.main",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            // boxShadow: "0 0 8px #fff",
                            animation: 'moveLeft 1s forwards',
                            transition: 'height 1.5s ease',
                        }}
                    >
                        <div class="innercard">
                            <div class="innerwrapper">
                                <img src={AI_image1} alt={'AiImage'} class="cover-image" />
                            </div>
                        </div>
                    </Box>
                </Grid>

                <Grid item className='child' display={'flex'} justifyContent={'center'}
                    onClick={() => navigate('/faceWrap', { state: { cardNumber: 2 } })}
                >
                    <Box
                        className={`${expanded ? 'topLeft expanded' : 'topLeft'} ${moved ? 'moved' : ''}`}
                        sx={{
                            width: '10vw',
                            height: '0px',
                            overflow: "hidden",
                            // borderRadius: "10px",
                            // bgcolor: 'primary.main',
                            position: 'absolute',
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            animation: 'moveTopLeft 1s forwards',
                            transition: 'height 1.5s ease'
                        }}
                    >
                        <div class="innercard">
                            <div class="innerwrapper">
                                <img src={AI_image2} alt={'AiImage'} class="cover-image" />
                            </div>
                            {/* <h5 class="title">PodCast Generator</h5> */}
                        </div>
                    </Box>
                </Grid>
                <Grid item className='child' display={'flex'} justifyContent={'center'}
                    onClick={() => navigate('/audioGenerator', { state: { cardNumber: 1 } })}
                >
                    <Box
                        className={`${expanded ? 'top expanded' : 'top'} ${moved ? 'moved' : ''}`}
                        sx={{
                            width: '10vw',
                            height: '0px',
                            overflow: "hidden",
                            // borderRadius: "10px",
                            // bgcolor: 'primary.main',
                            position: 'absolute',
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            animation: 'moveTop 1s forwards',
                            transition: 'height 1.5s ease'
                        }}
                    >
                        <div class="innercard">
                            <div class="innerwrapper">
                                <img src={AI_image3} alt={'AiImage'} class="cover-image" />
                            </div>
                            {/* <h5 class="title">Carousel Generator</h5> */}
                        </div>

                    </Box>
                </Grid>
                <Grid item className='child' display={'flex'} justifyContent={'center'}
                    onClick={() => navigate('/faceWrap', { state: { cardNumber: 1 } })}
                >
                    <Box
                        className={`${expanded ? 'topRight expanded' : 'topRight'} ${moved ? 'moved' : ''}`}
                        sx={{
                            width: '10vw',
                            height: '0px',
                            overflow: "hidden",
                            // borderRadius: "10px",
                            // bgcolor: 'primary.main',
                            position: 'absolute',
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            animation: 'moveTopRight 1s forwards',
                            transition: 'height 1.5s ease'
                        }}
                    >
                        <div class="innercard">
                            <div class="innerwrapper">
                                <img src={AI_image4} alt={'AiImage'} class="cover-image" />
                            </div>
                            {/* <h5 class="title">Meams Generator</h5> */}
                        </div>
                    </Box>
                </Grid>
                <Grid item className='child' display={'flex'} justifyContent={'center'}
                    onClick={() => navigate('/audioGenerator', { state: { cardNumber: 1 } })}
                >
                    <Box
                        className={`${expanded ? 'right expanded' : 'right'} ${moved ? 'moved' : ''}`}
                        sx={{
                            width: '10vw',
                            height: '0px',
                            overflow: "hidden",
                            // borderRadius: "10px",
                            // bgcolor: 'primary.main',
                            position: 'absolute',
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            animation: 'moveRight 1s forwards',
                            transition: 'height 1.5s ease'
                        }}
                    >
                        <div class="innercard">
                            <div class="innerwrapper">
                                <img src={AI_image5} alt={'AiImage'} class="cover-image" />
                            </div>
                            {/* <h5 class="title">Music Generator</h5> */}
                        </div>
                    </Box>
                </Grid>
            </Grid>
        </div>

    );
}

export default HomePage;
