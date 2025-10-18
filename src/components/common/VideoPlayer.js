import React, { useState, useRef, useEffect } from 'react';
import './VideoPlayer.css';

const VideoPlayer = ({ 
  src, 
  title = 'Video',
  showControlsAlways = false 
}) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  // const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(showControlsAlways);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => setDuration(video.duration);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    if (videoRef.current) {
      videoRef.current.currentTime = pos * duration;
    }
  };

  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, currentTime - 10);
    }
  };

  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(duration, currentTime + 10);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    const container = videoRef.current?.parentElement;
    if (!document.fullscreenElement) {
      container?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '00:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div 
      className="video-player" 
      onMouseEnter={() => !showControlsAlways && setShowControls(true)}
      onMouseLeave={() => !showControlsAlways && setShowControls(false)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="video-player__video"
        src={src}
        onClick={togglePlay}
      />

      {/* Gradient Overlay */}
      <div className="video-player__overlay" />

      {/* Center Play Button */}
      {!isPlaying && (
        <button className="video-player__center-play" onClick={togglePlay}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="currentColor" d="m10 16.5l6-4.5l-6-4.5M22 12c0-5.54-4.46-10-10-10c-1.17 0-2.3.19-3.38.56l.7 1.94c.85-.34 1.74-.53 2.68-.53c4.41 0 8.03 3.62 8.03 8.03s-3.62 8.03-8.03 8.03S3.97 16.41 3.97 12c0-.94.19-1.88.53-2.72l-1.94-.66C2.19 9.7 2 10.83 2 12c0 5.54 4.46 10 10 10s10-4.46 10-10M5.47 3.97c.85 0 1.53.71 1.53 1.5C7 6.32 6.32 7 5.47 7c-.79 0-1.5-.68-1.5-1.53c0-.79.71-1.5 1.5-1.5" />
          </svg>
        </button>
      )}

      {/* Controls Footer */}
      <div className={`video-player__controls ${showControls || showControlsAlways ? 'video-player__controls--visible' : ''}`}>
        {/* Video Title */}
        <div className="video-player__title">{title}</div>

        {/* Progress Bar */}
        <div className="video-player__progress-container" onClick={handleProgressClick}>
          <div className="video-player__progress-bar">
            <div 
              className="video-player__progress-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Control Buttons */}
        <div className="video-player__buttons">
          <div className="video-player__buttons-left">
            {/* Play/Pause */}
            <button className="video-player__btn" onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
              {isPlaying ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" fill="currentColor"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M8 5v14l11-7z" fill="currentColor"/>
                </svg>
              )}
            </button>

            {/* Skip Backward */}
            <button className="video-player__btn" onClick={skipBackward} aria-label="Skip backward">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M3 3.75a.75.75 0 0 1 1.5 0v16.5a.75.75 0 0 1-1.5 0zm18 1.003c0-1.408-1.578-2.24-2.74-1.444L7.763 10.503a1.75 1.75 0 0 0-.01 2.88l10.499 7.302c1.16.807 2.749-.024 2.749-1.437z" />
              </svg>
            </button>

            {/* Skip Forward */}
            <button className="video-player__btn" onClick={skipForward} aria-label="Skip forward">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M3 4.753c0-1.408 1.578-2.24 2.74-1.444l10.498 7.194a1.75 1.75 0 0 1 .01 2.88L5.749 20.685C4.59 21.492 3 20.66 3 19.248zM21 3.75a.75.75 0 0 0-1.5 0v16.5a.75.75 0 0 0 1.5 0z" />
              </svg>
            </button>

            {/* Time Display */}
            <div className="video-player__time">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          <div className="video-player__buttons-right">
            {/* Volume */}
            <button className="video-player__btn" onClick={toggleMute} aria-label={isMuted ? 'Unmute' : 'Mute'}>
              {isMuted? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="currentColor" fillRule="evenodd" d="M10.427 5.054c1.15-.816 2.828-.217 3.083 1.25c.322 1.85.49 3.754.49 5.696s-.168 3.845-.49 5.697c-.255 1.466-1.932 2.065-3.083 1.25L7.94 17.183A1 1 0 0 0 7.363 17H5a3 3 0 0 1-3-3v-4a3 3 0 0 1 3-3h2.363a1 1 0 0 0 .578-.184zm7.28 4.239a1 1 0 0 0-1.414 1.414L17.586 12l-1.293 1.293a1 1 0 0 0 1.414 1.414L19 13.414l1.293 1.293a1 1 0 0 0 1.414-1.414L20.414 12l1.293-1.293a1 1 0 0 0-1.414-1.414L19 10.586z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="currentColor" fillRule="evenodd" d="M13.51 6.303c-.255-1.466-1.932-2.065-3.083-1.25L7.94 6.817A1 1 0 0 1 7.363 7H5a3 3 0 0 0-3 3v4a3 3 0 0 0 3 3h2.363a1 1 0 0 1 .578.184l2.486 1.762c1.15.816 2.828.217 3.083-1.25c.322-1.85.49-3.754.49-5.696s-.168-3.845-.49-5.697m8.288 1.598a1 1 0 0 0-1.99.198a39.5 39.5 0 0 1 0 7.802a1 1 0 1 0 1.99.198a41.5 41.5 0 0 0 0-8.198m-3.925 1.017a1 1 0 1 0-1.993.164a35.5 35.5 0 0 1 0 5.836a1 1 0 0 0 1.993.164a37.5 37.5 0 0 0 0-6.164" clipRule="evenodd" />
                </svg>
              )}
            </button>

            {/* Comment */}
            <button className="video-player__btn" aria-label="Comments">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 21a9 9 0 1 0-9-9c0 1.488.36 2.89 1 4.127L3 21l4.873-1c1.236.639 2.64 1 4.127 1" />
              </svg>
            </button>

            {/* Fullscreen */}
            <button className="video-player__btn" onClick={toggleFullscreen} aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}>
              {isFullscreen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" fill="currentColor"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" fill="currentColor"/>
                </svg>
              )}
            </button>

            {/* More Options */}
            <button className="video-player__btn" aria-label="More options">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 20q-.825 0-1.412-.587T10 18t.588-1.412T12 16t1.413.588T14 18t-.587 1.413T12 20m0-6q-.825 0-1.412-.587T10 12t.588-1.412T12 10t1.413.588T14 12t-.587 1.413T12 14m0-6q-.825 0-1.412-.587T10 6t.588-1.412T12 4t1.413.588T14 6t-.587 1.413T12 8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;