import { useState, useEffect } from 'react'

import './CSS/Container.css'
import './CSS/VideoComentarios.css'


import InputField from './FieldComponents/InputField';
import VideoField from './FieldComponents/videoField'





function VideoOne(props) {

  const [tit, setTit] = useState("A")
  const [desc, setDesc] = useState("A")
  const [vid, setVid] = useState("A")

      
    
  const videoHandle = async () => {
    

    const id = 22 //conseguir desde el local

    const res = await fetch(`http://localhost:3000/video/${id}`,{
      method: 'GET',
      headers:{
        'content-Type': 'application/json'
      }
    })

    if(res.ok){

      const responseData = await res.json(); 
      console.log(responseData);

      setTit(responseData.nombre)
      setDesc(responseData.desc)
      setVid(`http://localhost:3000/${responseData.ruta.replace(/\\/g, '/')}`)
      

      

    }else{

      console.log("No se encontró el video")

    }

  }


  useEffect(() => {
    console.log("Error: Ruta incorrecta, mostrando video default")

    videoHandle(); // useEffect llama
  }, []);

  const handleError = () => {
    setVid('./video2.mp4'); // Subir una imagen por defecto (distinta)
  };
  
   return ( 
    <div className='videoVista'> 
      <div>
          <h1>{tit}</h1>
            <video src={`${vid}`} width="1280" height="640" controls onError={handleError}></video> {/* Entramos desde public localhost/video*/}
            <h4>Fecha</h4>
            <h3>{desc}</h3>
      </div>

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
