import React, { useEffect, useState } from 'react';
import { Grid, Box } from '@mui/material';
import './Walls.css';
// import { useNavigate } from 'react-router-dom'; // Uncomment if using navigation
import AI_image1 from "../../assets/outline3x.png"
import AI_image2 from "../../assets/Asset 10@4x.png"
import AI_image3 from "../../assets/Asset 9@4x.png"
import AI_image4 from "../../assets/Asset 8@4x.png"
import favicon from "../../assets/favicon.png"
import AI_image5 from "../../assets/Asset 11@4x.png"

import { useNavigate } from 'react-router-dom';
const WallsPage = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [moved, setMoved] = useState(false);

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

  return (
    <div className='cardContainer' style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{
        display: 'flex', height: '100vh',
        width: 'auto',
        position: 'absolute',
        top: '-17px',
        left: window.innerWidth < 700 ? 0 : ''
      }}>
        <img src={favicon} alt='logo' style={{ width: '80px', height: '90px' }} />
      </div>
      <Grid
        container
        spacing={0}
        direction="row"
        justifyContent="center"
        alignItems="center"
        position={'relative'}
        style={{ minHeight: '100vh' }}
        className='wrapper'
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
              borderRadius: "10px",
              // bgcolor: "red",
              // background: "primary.main",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // boxShadow: "0 0 8px #fff",
              animation: 'moveLeft 1s forwards',
              transition: 'height 1.5s ease',
              padding: '2px',
              // border:'4px solid #122030',
            }}
          >
            <div class="innercard" >
              <div class="innerwrapper">
                <img src={AI_image1} alt={'AiImage'} className={`${expanded ? 'cover-image expanded' : 'cover-image'}`} />
              </div>
              {/* <h6 class="title" style={{marginBottom:"2em",fontWeight:'900',color:'white'}}>Image Generator</h6> */}
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
              borderRadius: "10px",
              // bgcolor: 'primary.main',
              position: 'absolute',
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              animation: 'moveTopLeft 1s forwards',
              transition: 'height 1.5s ease',
              // border:'4px solid #122030',
            }}
          >
            <div class="innercard">
              <div class="innerwrapper">
                {/* <img src={AI_image}
                className={`${expanded ? 'topRight expanded' : 'topRight'}`} /> */}
                <img src={AI_image2} alt={'AiImage'}
                  className={`${expanded ? 'cover-image expanded' : 'cover-image'}`} />

              </div>
              {/* <h6 class="title" style={{marginBottom:"2em",fontWeight:'900',color:'white'}}>PodCast Generator</h6> */}
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
              borderRadius: "10px",
              // bgcolor: 'primary.main',
              position: 'absolute',
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              animation: 'moveTop 1s forwards',
              transition: 'height 1.5s ease',
              // border:'4px solid #122030',
            }}
          >
            <div class="innercard">
              <div class="innerwrapper">
                <img src={AI_image3} alt={'AiImage'}
                  className={`${expanded ? 'cover-image expanded' : 'cover-image'}`} />

              </div>
              {/* <h6 class="title" style={{marginBottom:"2em",fontWeight:'900',color:'white'}}>Carousel Generator</h6> */}
            </div>

          </Box>
        </Grid>
        <Grid item className='child' display={'flex'} justifyContent={'center'} sx={{ transform: 'rotateY(0deg)' }} borderColor={'#fff'}
          onClick={() => navigate('/aigeneratorPage', { state: { cardNumber: 1 } })}
        >
          <Box
            className={`${expanded ? 'topRight expanded' : 'topRight'} ${moved ? 'moved' : ''}`}
            sx={{
              width: '10vw',
              height: '0px',
              overflow: "hidden",
              borderRadius: "10px",
              // bgcolor: 'primary.main',
              position: 'absolute',
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              animation: 'moveTopRight 1s forwards',
              transition: 'height 1.5s ease',
              // border:'4px solid #122030',
            }}
          >
            <div class="innercard" >
              <div class="innerwrapper">
                <img src={AI_image4} alt={'AiImage'}
                  className={`${expanded ? 'cover-image expanded' : 'cover-image'}`} />

              </div>
              {/* <h6 class="title" style={{marginBottom:"2em",fontWeight:'900',color:'white'}}>Memes Generator</h6> */}
            </div>
          </Box>
        </Grid>
        <Grid item className='child' display={'flex'} justifyContent={'center'}
          onClick={() => navigate('/aigeneratorPage', { state: { cardNumber: 1 } })}
        >
          <Box
            className={`${expanded ? 'right expanded' : 'right'} ${moved ? 'moved' : ''}`}
            sx={{
              width: '10vw',
              height: '0px',
              overflow: "hidden",
              borderRadius: "10px",
              // bgcolor: 'primary.main',
              position: 'absolute',
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              animation: 'moveRight 1s forwards',
              transition: 'height 1.5s ease',
              // border:'4px solid #122030',
            }}
          >
            <div class="innercard">
              <div class="innerwrapper">
                <img src={AI_image5} alt={'AiImage'}
                  className={`${expanded ? 'cover-image expanded' : 'cover-image'}`} />
              </div>
              {/* <h6 class="title" style={{marginBottom:"2em",fontWeight:'900',color:'white'}}>Music Generator</h6> */}
            </div>
          </Box>
        </Grid>

      </Grid>
    </div>

  );
}

export default WallsPage;