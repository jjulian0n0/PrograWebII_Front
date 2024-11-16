import React, { useEffect, useRef } from 'react';

const VideoThumbnail = ({ videoSrc }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Crea un elemento de video
    const video = document.createElement('video');
    video.src = videoSrc;
    video.crossOrigin = 'anonymous';

    video.addEventListener('loadeddata', () => {
      video.currentTime = 0; // Frame de donde se va a sacar el Thumbnail
    });

    video.addEventListener('seeked', () => {
      const context = canvasRef.current.getContext('2d'); 
      if (context) {
        // Dibujar el primer fotograma del video en el canvas
        context.drawImage(video, 0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    });

    video.addEventListener('error', () => {
      console.error(`Error al cargar el thumbnail del video para ${videoSrc}`);
    });
  }, [videoSrc]); 

  return (
    <canvas ref={canvasRef} width="300" height="200" style={{ border: '1px solid #ccc' }}></canvas>
  );
};

export default VideoThumbnail;
