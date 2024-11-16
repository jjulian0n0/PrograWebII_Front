import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import './CSS/Container.css'
import './CSS/VideoComentarios.css'
import './CSS/VerAllVideos.css';


import InputField from './FieldComponents/InputField';
import VideoField from './FieldComponents/videoField'



function VideoOne(props) {
  const { id } = useParams(); // Sacar el ID del video de la ruta
  const [tit, setTit] = useState("A");
  const [desc, setDesc] = useState("A");
  const [vid, setVid] = useState("A");
  const [date, setDate] = useState("A"); // Fecha del video
      
 
  const videoHandle = async () => {
    try {
      const res = await fetch(`http://localhost:3000/video/${id}`, {
        method: 'GET',
        headers: {
          'content-Type': 'application/json',
        },
      });

      if (res.ok) {
        const responseData = await res.json();
        console.log(responseData);

        setTit(responseData.nombre);
        setDesc(responseData.desc);
        setVid(`http://localhost:3000/${responseData.ruta.replace(/\\/g, '/')}`);
        setDate(responseData.fAlta);
      } else {
        console.log("No se encontró el video");
      }
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  };

  //FUNCION TEMPORAL DE SUBSCRIPCION
  const handleSubscribe = () => {
    alert("Ahorita no hace nada");
  };
  useEffect(() => {
    videoHandle();
  }, [id]);

  const handleError = () => {
    setVid('./video2.mp4'); // Subir una imagen por defecto (distinta)
  };
  
   return ( 
    <div className='videoVista'> 
      <div className="video-container">         
            <video src={`${vid}`} width="100%"  height="auto" controls onError={handleError}></video> {/* Entramos desde public localhost/video*/}
            <h1 className="video-title">{tit}</h1>
            <div className="video-header">
              <h2 className="channel-title">NOMBRE DEL CANAL</h2>
              <button className="subscribe-button" onClick={handleSubscribe}>
                Suscribirse
              </button>
            </div>
            <div className="video-desc ">
              <h4>Fecha: {date}</h4>
              <p>{desc}</p>
            </div>
      </div>
      
{/* DE AQUI PARA ABAJO SON COMENTARIOS*/}

          <div className='cardComent'>
            <h2>Comentarios</h2>

          <div className='row'>

              <div className='col-2 colFoto'>
                  <img src="foto3.png" className='img-fluid pfPx-Comentario' ></img>
              </div>
              <div className='col comentCol'>
                <input type='text' className='coment' placeholder="Agrega tu comentario"></input>
              </div>


            </div>

            <hr/>

            <div className='row'>

            <div className='col-2 colFoto'>
                <img src="foto3.png" className='img-fluid pfPx-Comentario' ></img>
            </div>
            <div className='col colComentData'>
              <h4>Alguien</h4>
              <p>Este es un comentario que alguien hizo lol</p>
            </div>


            </div>
            
            <hr/>

            <div className='row'>

            <div className='col-2 colFoto'>
                <img src="foto3.png" className='img-fluid pfPx-Comentario' ></img>
            </div>
            <div className='col colComentData'>
              <h4>Alguien</h4>
              <p>Este es un comentario que alguien hizo lol</p>
            </div>


            </div>

          </div>
    </div>
  )
    
}

export default VideoOne
