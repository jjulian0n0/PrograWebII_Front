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

  const [canalId, setCanalId] = useState(0);
  const [estaSuscrito, setEstaSuscrito] = useState(); //Booleano para saber el estado de la suscripcion a este canal
  const [botonSuscribirse, setBotonSuscribirse] = useState(""); //Solo cambia el texto del boton de 'Suscribirse' a 'Suscrito'
  const [totalsus, setTotalsus] = useState(0); //Total de suscriptores del canal

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
        setCanal(responseData.user.nombre);
        setCanalId(responseData.userId);
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

  const getSuscripcion = async () => {
    try {
      const user = parseInt(localStorage.getItem('userId')); 
      if (!user) {
        alert("No has iniciado sesión");
        return;
      }

      const res = await fetch(`http://localhost:3000/user/subscription?usuarioId=${user}&canalId=${canalId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }); 

      if (res.ok) {
        const data = await res.json();
        if(data.res == 'Esta suscrito') {
          setEstaSuscrito(true);
          setBotonSuscribirse("Suscrito");
        } else {
          setEstaSuscrito(false);
          setBotonSuscribirse("Suscribirse");
        }
        console.log(data.res);
      } else {
        console.log('No se encontraron sus suscripciones');
      }
    } catch (error) {
      console.error('Error obteniendo suscripcion:', error);
    }
  }

  const getTotalSuscriptores = async () => {
    try {
      const res = await fetch(`http://localhost:3000/user/subscribers/${canalId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }); 

      if (res.ok) {
        const data = await res.json();
        setTotalsus(data._count.suscriptores);
      } else {
        console.log('No se encontro el total de suscriptores');
      }
    } catch (error) {
      console.error('Error obteniendo suscriptores:', error);
    }
  }

  //Mostrar playlist en select

  const [playlists, setPlaylists] = useState([]); // Estado para almacenar las playlists
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
 

  // Obtener playlist
      const getPlaylist = async () => {

        const userIdP =  localStorage.getItem("userId");

        try {
          const res = await fetch(`http://localhost:3000/playlist/user/${userIdP}`, { 
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

  // Select cambia
      const handleSelectChange = (event) => {
        setSelectedPlaylist(event.target.value); // Actualizar selección
        console.log("Playlist seleccionada:", event.target.value);
      };

  // Agregar video a playlist
  const AddtoPlaylist = async () => {
    if (!selectedPlaylist) {
      alert("Por favor seleccione una playlist");
      return;
    }

    const contentData = {
      playlistId: parseInt(selectedPlaylist),
      videoId: parseInt(id),
    };

    try {
      const res = await fetch("http://localhost:3000/playlist/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contentData),
      });
  
      if (res.ok) {
        const response = await res.json();
  
        if (response.res == 'Este video ya fue agregado') {
          alert("Este video ya fue agregado anteriormente");
        } else {
          alert("Video agregado a la playlist seleccionada con exito");
        }
      } else {
        console.log("Error al agregar video a playlist");
      }
    } catch (error) {
      console.error("Error al agregar video a playlist:", error);
    }
  }

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
  
  //Suscribirse o Cancelar suscripcion

  const handleSubscribe = async () => {

    const userId = localStorage.getItem('userId'); 
    if (!userId) {
      alert("No has iniciado sesión");
      return;
    }

    const suscripcionData = {
      usuarioId: parseInt(userId),
      canalId: canalId
    };

    if(userId != canalId) {
      if(!estaSuscrito) {
        try {
          const res = await fetch("http://localhost:3000/user/subscribe", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(suscripcionData),
          });
      
          if (res.ok) {
            alert("Se ha suscrito a este canal");
          } else {
            console.log("Error al suscribirse");
          }
        } catch (error) {
          console.error("Error al suscribirse:", error);
        }
      } else {
        let confirmation = confirm("¿Desea cancelar su suscripcion?");
        if(confirmation) {
          try {
            const res = await fetch("http://localhost:3000/user/unsubscribe", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(suscripcionData),
            });
        
            if (res.ok) {
              alert("Se ha cancelado su suscripcion");
            } else {
              console.log("Error al cancelar suscripcion");
            }
          } catch (error) {
            console.error("Error al cancelar suscripcion:", error);
          }
        }
      }
    } else {
      alert("No puede suscribirse a su propio canal :(");
    }
    //Actualizar el estado de la suscripcion
    getSuscripcion();
    getTotalSuscriptores();

  };

  useEffect(() => {
    videoHandle();
    getComentarios();
    getSuscripcion();
    getTotalSuscriptores();
    getPlaylist();
  }, [id, canalId]);

  const handleError = () => {
    setVid('./video2.mp4'); // Subir un video por defecto (distinto)
  };
  
   return ( 
    <div className='videoVista'> 
      <div className="video-container">         
            <video src={`${vid}`} width="100%"  height="auto" controls onError={handleError}></video> {/* Entramos desde public localhost/video*/}



            <h1 className="video-title">{tit}</h1>

            <div className='row'>
              <div className='col'>
                <div className="video-header">
                <h2 className="channel-title">Subido por: {canal} <span>- {totalsus} Suscriptores</span></h2>
                <button className="subscribe-button" onClick={handleSubscribe} > {/* key={comentario.id} Entramos desde public localhost/video*/}
                  {botonSuscribirse}
                </button>
              </div>
              <div className="video-desc ">
                <h4>Fecha: {date}</h4>
                <p>{desc}</p>
              </div>
              </div>

              <div className='col'>

        <h2 htmlFor="playlistSelect">Agregar a una playlist:</h2>
        <select
          id="playlistSelect"
          value={selectedPlaylist} // Valor actual del select
          onChange={handleSelectChange} // Manejar cambios
          className='form-select'
        >
              <option value="" disabled>Selecciona una playlist</option> 
              {playlists.map((playlist) => (
              <option key={playlist.id} value={playlist.id}>
                  {playlist.nombre}
              </option>
              ))} 
        </select>
        <button className='btnAgregarPl' onClick={AddtoPlaylist}>Agregar</button>


              </div>

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
