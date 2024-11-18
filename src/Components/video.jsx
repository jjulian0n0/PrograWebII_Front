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
  const [canal, setCanal] = useState("A"); 

  const [comentarios, setComentarios] = useState([]);
  const [comentarioTexto, setComentarioTexto] = useState("");
 
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
        setCanal(responseData.user.nombre)
      } else {
        console.log("No se encontró el video");
      }
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  };

  const getComentarios = async () => {
    try {
      const res = await fetch(`http://localhost:3000/comentarios/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        const responseData = await res.json();
        setComentarios(responseData); // Actualizamos el estado con los comentarios
      } else {
        console.log('No se encontraron comentarios');
      }
    } catch (error) {
      console.error('Error fetching comentarios:', error);
    }
  };

  // Agregar comentario
  
  const addComent = async () => {
    if (!comentarioTexto) {
      alert("Por favor ingresa un comentario");
      return;
    }
  
    const userId = localStorage.getItem('userId'); 
    if (!userId) {
      alert("No has iniciado sesión");
      return;
    }
  
    const videoId = parseInt(id); 
  
    const comentarioData = {
      texto: comentarioTexto,
      userId: parseInt(userId),
      videoId: videoId,
    };
  
    try {
      const res = await fetch("http://localhost:3000/comentarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comentarioData),
      });
  
      if (res.ok) {
        const nuevoComentario = await res.json();
  
        // Actualizar el estado de los comentarios para reflejar el nuevo comentario
        setComentarios((prevComentarios) => [...prevComentarios, nuevoComentario]);
        setComentarioTexto(""); 
      } else {
        console.log("Error al agregar comentario");
      }
    } catch (error) {
      console.error("Error al agregar comentario:", error);
    }
  };
  



  //FUNCION TEMPORAL DE SUBSCRIPCION
  const handleSubscribe = () => {
    alert("Ahorita no hace nada");
  };

  useEffect(() => {
    videoHandle();
    getComentarios();
  }, [id]);

  const handleError = () => {
    setVid('./video2.mp4'); // Subir un video por defecto (distinto)
  };
  
   return ( 
    <div className='videoVista'> 
      <div className="video-container">         
            <video src={`${vid}`} width="100%"  height="auto" controls onError={handleError}></video> {/* Entramos desde public localhost/video*/}
            <h1 className="video-title">{tit}</h1>
            <div className="video-header">
              <h2 className="channel-title">Subido por: {canal}</h2>
              <button className="subscribe-button" onClick={handleSubscribe} > {/* key={comentario.id} Entramos desde public localhost/video*/}
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
                <input type='text' className='coment' placeholder="Agrega tu comentario" onChange={(e) => {

                  setComentarioTexto(e.target.value);
  
              }}></input>

                <button className='btnComentar' onClick={addComent}>Comentar</button>
              </div>


            </div>

            {comentarios.length > 0 ? (
            comentarios.map((comentario) => (
              <div key={comentario.id}>
              <hr/>

              <div  className="row" >
                <div className='col-2 colFoto'>
                <img src={`http://localhost:3000/${comentario.user.foto.replace(/\\/g, '/')}`} className='img-fluid pfPx-Comentario' ></img>
                </div>
                <div className='col colComentData'>
                  <h4>{comentario.user.nombre}</h4>
                  <p>{comentario.texto}</p>
                </div>

                
              </div>
              </div>

              
            ))
          ) : (
            <p>No hay comentarios para este video.</p>
          )} 



{/*
<p><strong>{comentario.user.nombre}</strong></p>
                {comentario.user.foto && (
                  <img
                    src={comentario.user.foto}
                    alt="Foto de perfil"
                    width="50"
                    height="50"
                  />
                )}
                <p>{comentario.texto}</p>
                <p><em>{new Date(comentario.fAlta).toLocaleDateString()}</em></p>
*/}





    

          </div>
    </div>
  )
    
}

export default VideoOne
