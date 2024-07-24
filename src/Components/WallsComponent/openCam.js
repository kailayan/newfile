import React, { useState, useRef } from "react";
import { Grid, Button, Typography } from "@mui/material";
import { Camera } from "react-camera-pro";
import LinkedCameraIcon from '@mui/icons-material/LinkedCamera';
import './Loader.css';
import { useNavigate } from "react-router-dom";
import { deleteImages, getBase64Image, getimages } from "../../Service";

const OpenCam = ({ setLoaderHandling }) => {
    const camera = useRef(null);
    const navigate = useNavigate();
    const [targetImage, setTargetImage] = useState(null);
    const [swapImage, setSwapImage] = useState(null);
    const phone = sessionStorage.getItem('phoneNumber')
    const [showCamera, setShowCamera] = useState(false);
    const [img, setImg] = useState('')

    const handleOpenCamera = () => {
        setShowCamera(true);
    };
    const handleChooseTargetImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const newUrl = URL.createObjectURL(file);
            setTargetImage(newUrl);
            const reader = new FileReader();
            reader.onload = async function (event) {
                const base64String = event.target.result;
                await getBase64Image({ targetUrl: base64String, phoneNumber: phone });

            };
            reader.readAsDataURL(file);
        }
    };
    const handleChooseSwapImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const newUrl = URL.createObjectURL(file);
            setSwapImage(newUrl);
            const reader = new FileReader();
            reader.onload = async function (event) {
                const base64String = event.target.result;
                await getBase64Image({ swapUrl: base64String, phoneNumber: phone });
            };
            reader.readAsDataURL(file);
        }
    };

    const takePhoto = async () => {
        const photo = await camera.current.takePhoto();
        setSwapImage(photo);
        getBase64Image({ swapUrl: photo, phoneNumber: phone });
        setShowCamera(false);
    };

    const cleartargetUrl = () => {
        deleteImages(phone, 'targetUrl.jpeg')
            .then(response => {
                console.log('Images deleted successfully:', response.data);
            })
            .catch(error => {
                console.error('Error deleting images:', error);
            });

        setShowCamera(false);
        setLoaderHandling(false);
        setTargetImage(null);
        // setSwapImage(null);
    };

    const clearSwapUrl = () => {
        deleteImages(phone, 'swapUrl.jpeg')
            .then(response => {
                console.log('Images deleted successfully:', response.data);
            })
            .catch(error => {
                console.error('Error deleting images:', error);
            });

        setLoaderHandling(false);
        setSwapImage(null);
    };

    const handleUpload = async () => {
        if (targetImage && swapImage) {
            setLoaderHandling(true);
            const payload = {
                phoneNumber: phone,
            };
            let res = await getimages(payload);
            if (res.status === 'OK') {
                setLoaderHandling(false);
                setImg(res.result_url);
                console.log(res.result_url);
            }
        } else {
            console.error('Please select both target and swap images');
        }
    };

    const handleDownloadClick = (url) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = 'image.png';
        link.click();
    };

    return (
        <div style={{ width: '100vw' }}>
            <Grid container justifyContent='space-between'>
                {/* Left container for uploading/selecting target image */}
                <Grid item xs={12} md={targetImage ? 6 : 12} sm={12} lg={targetImage ? 6 : 12} >
                    <Grid container justifyContent='center'>
                        <Grid item p={window.innerWidth < 700 ? '22px' : '40px'} mb={window.innerWidth < 700 ? '22px' : 0} style={{ minWidth: window.innerWidth < 700 ? '157px' : 'auto', display: 'flex', alignItems: 'center', flexDirection: 'column', borderRadius: '20px', boxShadow: img ? '' : '-2px 5px 25px 9px #92c3ff', filter: 'drop-shadow(2px 4px 6px black)' }}>
                            {targetImage && !img && (
                                <img src={targetImage} alt="TargetImg" style={{ borderRadius: '4px', marginTop: '10px', WebkitTransform: 'scaleX(-1)', transform: 'scaleX(-1)', width: window.innerWidth < 700 ? '119px' : '200px', height: window.innerWidth < 700 ? '15vh' : '30vh' }} />
                            )}
                            {!targetImage && !img && (
                                <Grid container justifyContent='flex-start'>
                                    <Grid item style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                        <input
                                            accept="image/jpeg"
                                            id="icon-button-file"
                                            type="file"
                                            style={{ display: "none" }}
                                            onChange={handleChooseTargetImage}
                                        />
                                        <label htmlFor="icon-button-file">
                                            <Button
                                                className='custom-btn btn-2 w-100'
                                                component="span"
                                                variant="outlined"
                                                style={{ color: 'white', border: '0.5px solid white' }}
                                            >
                                                Choose Target Image
                                            </Button>
                                        </label>
                                    </Grid>
                                </Grid>
                            )}
                            <hr style={{ color: 'white' }} />
                            {targetImage && !img && (<Grid container justifyContent={'center'}>
                                <Button className='custom-btn btn-2' variant="outlined" style={{ color: window.innerWidth < 700 ? 'white' : 'white', border: '0.5px solid white' }} onClick={cleartargetUrl}>
                                    Clear
                                </Button>
                            </Grid>)}
                            {!targetImage && !img && (<Typography variant="p" style={{ textShadow: '#7bade9 4px 1px 5px', color: 'white' }}>Upload your Target Image</Typography>)}

                        </Grid>
                    </Grid>
                </Grid>

                {/* Right container for swap image or camera */}
                <Grid item xs={12} md={6} sm={12} lg={6} display={'flex'} alignItems={'center'}>
                    {swapImage && !img && (
                        <Grid container justifyContent='center'>
                            <Grid item p={window.innerWidth < 700 ? '22px' : '40px'} style={{ minWidth: window.innerWidth < 700 ? '157px' : 'auto', display: 'flex', alignItems: 'center', flexDirection: 'column', borderRadius: '20px', boxShadow: '-2px 5px 25px 9px #92c3ff', filter: 'drop-shadow(2px 4px 6px black)' }}>
                                <img src={swapImage} alt="SwapImg" style={{ aspectRatio: 1, borderRadius: '4px', marginTop: '10px', WebkitTransform: 'scaleX(-1)', transform: 'scaleX(-1)', width: 'auto', height: window.innerWidth < 700 ? '15vh' : '30vh' }} />
                                <Grid container justifyContent={'center'} mt={2} gap={4}>
                                    <Button className='custom-btn btn-2' variant="outlined" style={{ color: 'white', border: '0.5px solid white' }} onClick={clearSwapUrl}>
                                        Clear
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                    {!swapImage && targetImage && (
                        <Grid container justifyContent='center'>
                            {!showCamera && !img && (
                                <Grid item p={window.innerWidth < 700 ? '22px' : '40px'} style={{ minWidth: window.innerWidth < 700 ? '157px' : 'auto', display: 'flex', alignItems: 'center', flexDirection: 'column', borderRadius: '20px', padding: { sm: '22px', lg: '40px' }, boxShadow: '-2px 5px 25px 9px #92c3ff', filter: 'drop-shadow(2px 4px 6px black)' }}>
                                    <Grid item display='flex' flexDirection='row'>
                                        <Button
                                            className='custom-btn btn-2 w-100'
                                            variant="outlined" style={{ color: 'white', border: '0.5px solid white' }}
                                            onClick={handleOpenCamera}
                                        >
                                            <LinkedCameraIcon
                                                style={{ cursor: 'pointer' }}
                                                fontSize="small"
                                            />
                                            <span style={{ marginLeft: '10px' }}>Open Camera</span>
                                        </Button>
                                        <input
                                            accept="image/jpeg"
                                            id="icon-button-file"
                                            type="file"
                                            style={{ display: "none" }}
                                            onChange={handleChooseSwapImage}
                                        />
                                    </Grid>
                                    <hr style={{ color: 'white' }} />
                                    <Grid item>
                                        <label htmlFor="icon-button-file">
                                            <Button
                                                className='custom-btn btn-2 w-100'
                                                component="span"
                                                variant="outlined"
                                                style={{ color: 'white', border: '0.5px solid white' }}
                                            >
                                                Choose Swap Image
                                            </Button>
                                        </label>
                                    </Grid>
                                </Grid>
                            )}
                            {showCamera && !img && (
                                <div>
                                    {window.innerWidth < 700 ? (
                                        <div style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 9999, background: window.innerWidth < 700 ? 'black' : '' }}>
                                            <Grid container justifyContent="center" style={{ width: '100%', bottom: '144px', position: 'absolute' }}>
                                                <Camera ref={camera} aspectRatio={1} />
                                            </Grid>
                                            <Grid container justifyContent={'center'} mt={1} style={{ position: 'absolute', bottom: 20, zIndex: 1 }}>
                                                <Button className='custom-btn btn-2' variant="outlined" style={{ color: window.innerWidth < 700 ? 'black' : 'white', border: '0.5px solid white', background: 'white' }} onClick={takePhoto}>
                                                    Take Photo
                                                </Button>
                                            </Grid>
                                        </div>
                                    ) : (
                                        <div>
                                            <Grid container justifyContent="center" style={{ width: '300px', border: '4px solid black' }} >
                                                <Camera ref={camera} aspectRatio={1} />
                                            </Grid>
                                            <Grid container justifyContent={'space-evenly'} mt={1}>
                                                <Button className='custom-btn btn-2' variant="outlined" style={{ color: 'white', border: '0.5px solid white' }} onClick={takePhoto}>
                                                    Take Photo
                                                </Button>
                                            </Grid>
                                        </div>
                                    )}
                                </div>
                            )}
                        </Grid>
                    )}
                </Grid>
            </Grid>
            {
                img && (
                    <Grid container justifyContent='space-between'>
                        <Grid item xs={12}>
                            <Grid container justifyContent='center'>
                                <Grid item p={window.innerWidth < 700 ? '22px' : '40px'} mb={window.innerWidth < 700 ? '22px' : 0} style={{ minWidth: window.innerWidth < 700 ? '157px' : 'auto', display: 'flex', alignItems: 'center', flexDirection: 'column', borderRadius: '20px', boxShadow: '-2px 5px 25px 9px #92c3ff', filter: 'drop-shadow(2px 4px 6px black)' }}>
                                    <img src={img} alt="output" style={{ borderRadius: '4px', WebkitTransform: 'scaleX(-1)', transform: 'scaleX(-1)', width: window.innerWidth < 700 ? '119px' : '200px', height: window.innerWidth < 700 ? '15vh' : '30vh' }} />
                                    <button
                                        type="submit"
                                        className='btn login-btn glow-on-hover mt-4'
                                        onClick={() => handleDownloadClick(img)}
                                    >
                                        Download
                                    </button>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>
                )
            }

            {/* Back to home button */}
            <Grid container justifyContent='center' gap={1}>
                <Grid item xs={12} lg={3} md={3} xl={3}>
                    <button
                        type="submit"
                        className='btn login-btn glow-on-hover mt-2'
                        onClick={() => navigate('/home')}
                    >
                        Back To Home
                    </button>
                </Grid>
                {!img && (
                    <Grid item xs={12} lg={3} md={3} xl={3}>
                        <button
                            type="submit"
                            className='btn login-btn glow-on-hover mt-2' onClick={handleUpload}>
                            Swap Your Image
                        </button>
                    </Grid>
                )}
            </Grid>
        </div >
    );
};

export default OpenCam;
