import React from 'react';

interface MediaPlayerProps {
    type: 'video' | 'audio';
    src: string;
    autoPlay?: boolean;
    controls?: boolean;
    loop?: boolean;
    title?: string;
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({ type, src, autoPlay = false, controls = true, title, loop=false }) => {
    return (
        <div style={{ margin: '1rem 0' }}>
            {title && <h4>{title}</h4>}
            {type === 'video' ? (
                <video width="480" controls={controls} autoPlay={autoPlay} muted={autoPlay} loop={loop}>
                    <source src={src} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
            ) : (
                <audio controls={controls} autoPlay={autoPlay} loop={loop}>
                    <source src={src} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            )}
        </div>
    );
};

export default MediaPlayer;
