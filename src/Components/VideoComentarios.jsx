import { useState } from 'react'

import './CSS/VideoComentarios.css'

import InputField from './FieldComponents/InputField';
import VideoField from './FieldComponents/videoField'





function VideoForm(props) {
    {/* 
        const addVideoHandler = async () => {

          var aValue = localStorage.getItem('userId');
          var idUserLS = 0;

          if(!title || !desc || !videoP ){

            alert("Favor de ingresar los datos")

            return}

            if(!aValue){
            alert("No a ingresado a su cuenta")
            return
              
            }else{
              idUserLS = parseInt(aValue)
            }

          //Agregar validaciones para email y contraseña

          


            const data = {
              nombre : title,
              desc : desc,
              ruta : videoP,
              userId : idUserLS 

            }

            const res = await fetch('http://localhost:3000/video',{
              method: 'POST',
              headers:{
                'content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            })

          if(res.ok){
            alert("Nuevo video registrado")

            

          }else{
            alert("Error al crear video")
          }

        }
    */}   
    
  const [videoP, setVideoPreview] = useState(null);
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")



  
   return ( 
    <div className='cardComent'>
      Aaa

    </div>
  )
    
}

export default VideoForm
