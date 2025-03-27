import React from 'react';

interface VideoCardProps {
  video: {
    videoId: string;
    thumbnail: string;
    title: string;
    date: string;
  };
  onPlay: (videoId: string, title: string) => void;
  index?: number; // Adicionar index como opcional
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onPlay, index }) => {
  return (
    <div className="video-card">
      {video.videoId ? (
        <div
          className="cursor-pointer"
          onClick={() => onPlay(video.videoId, video.title)}
        >
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-48 object-cover"
            onError={(e) => {
              // Fallback para imagem quebrada
              e.currentTarget.src = "/placeholder.svg?height=400&width=600";
            }}
          />
          <div className="p-4">
            <h3 className="text-lg font-bold text-white">{video.title}</h3>
            <p className="text-sm text-zinc-400">{video.date}</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-48 w-full bg-zinc-700 text-zinc-400">
          <p>Este vídeo está indisponível.</p>
        </div>
      )}
    </div>
  );
};

export default VideoCard;
