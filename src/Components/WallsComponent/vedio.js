import React, { useState } from 'react';
import axios from 'axios';

function VideoProcessor() {
    const [processing, setProcessing] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');

    const handleProcessVideo = async () => {
        try {
            setProcessing(true);

            // Replace with actual URLs or state values for imageURL and audioURL
            const imageURL = 'https://example.com/image.jpg';
            const audioURL = 'https://example.com/audio.mp3';

            // Send POST request to backend endpoint for video processing
            const response = await axios.post('http://localhost:3005/process-video', { imageURL, audioURL });
            const { videoURL } = response.data;

            setVideoUrl(videoURL);
            setProcessing(false);
        } catch (error) {
            console.error('Error processing video:', error);
            setProcessing(false);
        }
    };

    return (
        <div>
            <button onClick={handleProcessVideo} disabled={processing}>
                {processing ? 'Processing...' : 'Process Video'}
            </button>
            {videoUrl && (
                <div>
                    <video controls>
                        <source src={videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}
        </div>
    );
}

export default VideoProcessor;
