import React, { useEffect, useState } from 'react';

function VerAllVideos() {
  const [videos, setVideos] = useState([]); // Estado para almacenar videos
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  const videosHandle = async () => {
    try {
      const res = await fetch('http://localhost:3000/video/busqueda', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        const responseData = await res.json(); // Convertir la respuesta a JSON
        
        // Suponiendo que responseData es un arreglo de videos
        const videosData = responseData.map(video => ({
          nombre: video.nombre,
          desc: video.desc,
          fAlta: video.fAlta, // Asumiendo que 'fAlta' es el campo correspondiente
        }));

        setVideos(videosData); // Actualizar el estado con los videos obtenidos
      } else {
        console.error('Error al obtener videos:', res.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    } finally {
      setLoading(false); // Indica que la carga ha terminado
    }
  };

  useEffect(() => {
    videosHandle(); // Llama a la función para obtener los videos al montar el componente
  }, []);

  if (loading) {
    return <div>Cargando videos...</div>; // Mensaje de carga
  }

  return (
    <div className='card2'>
      {videos.length > 0 ? (
        videos.map((video, index) => (
          <div key={index}>
            <h1>{video.nombre}</h1> {/* Título del video */}
            <h2>{video.desc}</h2> {/* Descripción del video */}
            <p>Fecha de alta: {video.fAlta}</p> {/* Fecha de alta si lo deseas */}
          </div>
        ))
      ) : (
        <p>No se encontraron videos.</p> // Mensaje si no hay videos
      )}
    </div>
  );
}

export default VerAllVideos;

