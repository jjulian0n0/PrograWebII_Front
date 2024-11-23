import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './CSS/VerAllVideos.css';
import VideoThumbnail from './FieldComponents/videoThumbnail';

import BtnCom from './FieldComponents/buttonCom'
import InputField from './FieldComponents/InputField';



{
  /* Vista de mi perfil */
}


function MisSuscritosView(props) {
   
    const userId =  localStorage.getItem("userId"); //parseInt("userId", 10);

    const [playlists, setPlaylists] = useState([]); // Estado para almacenar las playlists
    const [selectedPlaylist, setSelectedPlaylist] = useState("");
    const [playlistVideos, setPlaylistVideos] = useState([]); // Estado para almacenar contenido de las playlists
    const [loading, setLoading] = useState(false); // Estado de carga de videos
   
        const getPlaylist = async () => {
          try {
            const res = await fetch(`http://localhost:3000/playlist/user/${userId}`, { 
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
      
            if (res.ok) {

              const data = await res.json(); // Convertir la respuesta a JSON
              console.log("Respuesta completa:", data); // Verifica toda la respuesta

              setPlaylists(data.data); // Guardar playlists en el estado
              

            } else {
              console.error('Error al obtener playlist de user:', res.statusText);
            }

          } catch (error) {
            console.error('Error en la solicitud:', error);
          } finally {
            // setLoading(false); Indica que la carga ha terminado
          }
        };
        
        //CONTENIDO DE LAS PLAYLISTS 
        const getPlaylistContent = async (playlistId) => {
        setLoading(true); 
        try {
          const res = await fetch(`http://localhost:3000/playlist/${playlistId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (res.ok) {
            const data = await res.json(); // Convertir la respuesta a JSON
            const videoIds = data.data?.map((item) => item.videoId) || []; // Sacar el ID de los videos
    
            // Obtener información completa de los videos usando los videoIds
            const videoDetailsPromises = videoIds.map((id) =>
              fetch(`http://localhost:3000/video/${id}`).then((res) => res.json())
            );
    
            const videoDetails = await Promise.all(videoDetailsPromises);
    
            setPlaylistVideos(videoDetails); // Guardar videos con detalles en el estado
          } else {
            console.error('Error al obtener contenido de la playlist:', res.statusText);
            setPlaylistVideos([]);
          }
        } catch (error) {
          console.error('Error en la solicitud:', error);
          setPlaylistVideos([]);
        } finally {
          setLoading(false); // Termina la carga
        }
      };



      //Ver los videos solo de la gente a la que estoy suscrito
      const getUserSubscribedVideos = async () => {
        setLoading(true);

        try {
          const res = await fetch(`http://localhost:3000/user/videos-sus/${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (res.ok) {
            const data = await res.json(); // Convertir la respuesta a JSON
      
            // Actualizar el estado con los datos obtenidos
            setPlaylistVideos(data); 
          } else {
            console.error('Error al obtener los videos de las suscripciones:', res.statusText);
            setPlaylistVideos([]); // Si falla, asegurarse de limpiar el estado
          }
        } catch (error) {
          console.error('Error en la solicitud:', error);
          setPlaylistVideos([]);
        } finally {
          setLoading(false); // Termina la carga
        }
      };
 


        useEffect(() => {


            getUserSubscribedVideos();
            //getPlaylist();  useEffect llama
        }, []);


        


  
   return ( 
    

<div className='no-sidebar'>
  <div className='card'>{/* <h1>{foto}</h1> 
      <img src={`${foto}`}  alt="Foto de perfil" style={{ width: '200px', height: 'auto' } } onError={handleError}  />*/}
      <div className='card'>
      <h2 htmlFor="playlistSelect">Mis suscripciones</h2>


      </div>
      {/* LISTADO DE VIDEOS*/}
      <div className="ver-all-videos">
        {loading ? (
          <div>Cargando videos...</div>
        ) : playlistVideos.length > 0 ? (
          playlistVideos.map((video) => (
            <Link
              to={`/videoOne/${video.id}`}
              key={video.id}
              className="ver-all-videos-link"
            >
              <div className="ver-all-videos-card">
              <VideoThumbnail videoSrc={`http://localhost:3000/${video.ruta.replace(/\\/g, '/')}`} />
              <h1>{video.nombre}</h1>
                <h2>{video.desc}</h2>
                <p>Fecha de alta: {video.fAlta}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>No hay videos en esta playlist.</p>
        )}
      </div>
    </div>
</div>
  );
}

export default MisSuscritosView