
import React from 'react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  autoPlay = false,
  muted = false,
  loop = false,
  controls = true,
  className = "",
}) => {
  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      <video
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        controls={controls}
        playsInline
        className="w-full h-auto block"
        preload="metadata"
      >
        Ваш браузер не поддерживает видео.
      </video>
    </div>
  );
};

export default VideoPlayer;