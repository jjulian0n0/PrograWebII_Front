import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CSS/VerAllVideos.css';
import './CSS/VideoComentarios.css';

// Importamos el componente VideoThumbnail desde FieldComponents
import VideoThumbnail from './FieldComponents/videoThumbnail'; 
import FechaComponent from './Functions/FormatoFechaP';
import InputField from './FieldComponents/InputField';


function BuscarVideos() {
  const [videos, setVideos] = useState([]); // Estado para almacenar videos
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  const [searchWord, setWord] = useState(''); // Palabra a buscar

  const videosHandle = async () => {

    if(searchWord !== ''){

    try {
      const res = await fetch(`http://localhost:3000/video/busqueda?name=${searchWord}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        const responseData = await res.json(); // Convertir la respuesta a JSON
        
        
        const videosData = responseData.map(video => ({
          id: video.id,
          nombre: video.nombre,
          desc: video.desc,
          fAlta: video.fAlta,
          ruta: `http://localhost:3000/${video.ruta.replace(/\\/g, '/')}`, // URL completa del video 
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
  }

  };

 // useEffect(() => {
  //  videosHandle(); // Llama a la función para obtener los videos al montar el componente
  //}, []);

  return (<>
  <div className='card'>{/* 
    <InputField setText={setWord} label="Buscar"></InputField>
    <button onClick={videosHandle}>Buscar</button>*/}
    <h1 className='h1-perfil'>Buscar un video</h1>

    <div className='col comentCol'>
                <input type='text' className='coment' placeholder="Video a buscar..." onChange={(e) => {

              setWord(e.target.value);
  
              }}></input>

                <button className='btnComentar' onClick={videosHandle}>Buscar video</button>
              </div>
    </div>

    <div className='ver-all-videos'>

    

      {videos.length > 0 ? (
        videos.map((video) => (
          <Link to={`/videoOne/${video.id}`} key={video.id} className="ver-all-videos-link">
            <div className="ver-all-videos-card">             
              <VideoThumbnail videoSrc={video.ruta} /> {/* Mostrar el thumbnail del video */}
              <h1>{video.nombre} (ID: {video.id})</h1> {/* Título del video con el ID */}
              <h2>{video.desc}</h2> {/* Descripción del video */}
              <FechaComponent isoDate={video.fAlta} />
            </div>
          </Link>
        ))
      ) : (
        <p>No se encontraron videos.</p> // Mensaje si no hay videos
      )}
    </div></>
  );
}

export default BuscarVideos;

