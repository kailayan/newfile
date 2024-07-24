import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { styled } from '@mui/system';
import './Loader.css'
import backDrop_img from "../../assets/BackDrop.jpg"
import loader from "../../assets/HorseRun-unscreen.gif"
import favicon from "../../assets/favicon.png"
import music from "../../assets/image.png"

import { useNavigate } from 'react-router-dom';
import Logout from '../AuthenticationComponent/logout';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
});

// const InputField = styled(TextField)({
//     marginBottom: '20px',
//     width: '300px',
//     borderRadius: '9px',
//     backgroundColor: 'white'
// });


const LargeImageContainer = styled(Box)({
    marginTop: '20px',
    width: '400px',
    height: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: '#f0f0f0',
});

const SmallConatiner = styled(Box)({
    marginTop: '20px',
    width: '234px',
    height: '234px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: '#f0f0f0',
});


function AudioGenerator() {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const [response, setResponse] = useState();
    const [imageGenerated, setImageGenerated] = useState(false);
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

    const handleClearClick = () => {
        setInputValue('');
        setImageGenerated(false);
    };

    const handleResetClick = () => {
        setInputValue('');
        setImageGenerated(false);
    };

    const handleDownloadClick = (url) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = 'image.mp4';
        link.click();
    };


    const mergeVideo = async (imageURL, audioURL) => {
        const ffmpeg = createFFmpeg({ log: true });

        try {
            console.log('0---09-09-9-0');
            await ffmpeg.load();
            console.log('0---09-09-9-0');
            const imgBlob = await fetch(imageURL).then(res => res.blob());
            const audioBlob = await fetch(audioURL).then(res => res.blob());

            // Write the files to the FFmpeg file system
            ffmpeg.FS('writeFile', 'image.jpg', await fetchFile(imgBlob));
            ffmpeg.FS('writeFile', 'audio.mp3', await fetchFile(audioBlob));

            // Run FFmpeg command to create a video from image and audio
            const inputOptions = `-loop 1 -i image.jpg -i audio.mp3`;
            const outputOptions = `-c:v libx264 -c:a aac -b:a 192k -shortest output.mp4`;
            await ffmpeg.run(...inputOptions.split(" "), ...outputOptions.split(" "));

            // Read the result
            const data = ffmpeg.FS('readFile', 'output.mp4');
            const videoBlob = new Blob([data.buffer], { type: 'video/mp4' });
            const videoUrl = URL.createObjectURL(videoBlob);

            return videoUrl;
        } catch (error) {
            console.error('Error merging video:', error);
            throw error;
        }
    };



    const handleInput = async () => {
        try {
            setLoaderHandler(true);
            setTimeout(async () => {
                const response = { status: 'COMPLETED', result: { imageURL: 'https://processed-model-result.s3.us-east-2.amazonaws.com/ca881dbc-89a4-46b6-889f-92fa1498ea4b_0.png', audioURL: 'https://processed-model-result.s3.us-east-2.amazonaws.com/4d268316-6f8c-4311-9e8c-71d88a874f64_0.wav' } };

                if (response.status === 'COMPLETED') {
                    const videoUrl = await mergeVideo(response.result.imageURL, response.result.audioURL);
                    setResponse(videoUrl);
                    setImageGenerated(true);
                }

                setLoaderHandler(false);
            }, 2000); // Simulate 2 seconds delay
        } catch (error) {
            console.error('Error while generating image:', error);
            setLoaderHandler(false);
        }
    };

    const logoutfunction = (value) => {
        navigate(value);
    }

    return (
        <Container className={'image-contain'} style={{ backgroundImage: `url(${backDrop_img})` }} >
            <div style={{
                display: 'flex', height: 'auto',
                width: 'auto',
                position: 'absolute',
                top: '-17px',
                left: window.innerWidth < 700 ? 0 : ''
            }}>
                <img src={favicon} alt='logo' style={{ width: '80px', height: '90px' }} />
            </div>
            <Logout logoutfunction={logoutfunction} />
            {!imageGenerated && !loaderhandler && (
                <>
                    <Grid container display={'flex'} justifyContent={'center'} alignItems={'center'} position={'sticky'} mt={7}>
                        <Grid item width={{ lg: '28vw' }} lg={4} sm={6} xs={8} md={6}>
                            <div className='p-1 glow-box-hover'>
                                <textarea type="text" class=" login-input form-control" id="email"
                                    value={inputValue || ''}
                                    name="inputValue"
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Enter Text Here"></textarea>

                            </div>
                            <Grid item display={'flex'} justifyContent={'center'} gap={5} alignItems={'center'}>
                                <button
                                    type="submit"
                                    className='btn login-btn glow-on-hover mt-4'
                                    onClick={handleInput}
                                >
                                    Generate
                                </button>
                                <button
                                    type="submit"
                                    className='btn login-btn glow-on-hover mt-4'
                                    onClick={handleClearClick}
                                >
                                    Reset
                                </button>
                            </Grid>
                            <div>
                                <button
                                    type="submit"
                                    className='custom-btn btn-2 mt-3 w-100'
                                    onClick={() => navigate('/home')}
                                    style={{ background: 'black' }}
                                >
                                    Back to Home
                                </button>
                            </div>
                        </Grid>
                    </Grid>
                </>
            )}
            {imageGenerated && (
                <Grid Container >
                    {
                        isMobile ? (
                            <SmallConatiner className={'image-contain'} style={{ boxShadow: 'rgb(106, 137, 169) 0px 7px 20px 20px', backgroundImage: `url(${music})` }}>
                                <div style={{ display: 'flex ', flexDirection: 'column', height: '67vh', justifyContent: 'flex-end' }}>
                                    <video controlsList="nodownload" width="320" height="240" controls autoplay style={{ paddingBottom: '11px', width: '222px' }} >
                                        <source src={response} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            </SmallConatiner>
                        ) : (
                            <LargeImageContainer className={'image-contain'} style={{ boxShadow: 'rgb(106, 137, 169) 0px 7px 20px 20px', backgroundImage: `url(${music})` }}>
                                <div style={{ display: 'flex ', flexDirection: 'column', height: '67vh', justifyContent: 'flex-end' }}>
                                    <video width="320" height="240" controlsList="nodownload" controls autoplay style={{ paddingBottom: '11px' }}>
                                        <source src={response} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            </LargeImageContainer>
                        )
                    }
                    <Grid item display={'flex'} justifyContent={'space-evenly'} gap={4}>
                        <button
                            type="submit"
                            className='btn login-btn glow-on-hover mt-4 '
                            onClick={handleResetClick}
                        >
                            Clear
                        </button>
                        <button
                            type="submit"
                            className='btn login-btn glow-on-hover mt-4'
                            onClick={() => handleDownloadClick(response)}
                        >
                            Download
                        </button>

                    </Grid>
                    <div>
                        <button
                            type="submit"
                            className='custom-btn btn-2 mt-3 w-100'
                            onClick={() => navigate('/home')}
                            style={{ background: 'black' }}
                        >
                            Back to Home
                        </button>
                    </div>
                </Grid>
            )}
            {loaderhandler && (
                <Grid container justifyContent={'center'} position={'absolute'}>
                    <Grid item >
                        <div class='loader-text'>
                            <img src={loader} alt='loading' height={'45vh'} />
                            <h5 style={{ color: 'white' }}>Please Wait ...</h5>
                        </div>
                    </Grid>
                </Grid>
            )}
        </Container>

    );
}

export default AudioGenerator;
