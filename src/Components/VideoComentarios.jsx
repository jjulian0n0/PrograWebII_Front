import { useState } from 'react'

import './CSS/Container.css'
import './CSS/VideoComentarios.css'


import InputField from './FieldComponents/InputField';
import VideoField from './FieldComponents/videoField'





function VideoOne(props) {
      
    
  



  
   return ( 
    <div className='videoVista'> 
      <div>
          <h1>Titulo del video</h1>
            <video src="video2.mp4" width="1280" height="640" controls></video> {/* Entramos desde public localhost/video*/}
            <h4>10/10/2024</h4>
            <h3>Acá insertamos la descripcion del video</h3>
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
