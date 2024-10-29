import { useState } from 'react'
import InputField from './FieldComponents/InputField';
import VideoField from './FieldComponents/videoField'





function VideoForm(props) {

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
   
    
  const [videoP, setVideoPreview] = useState(null);
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")



  
   return ( 
    <div className='card'>
      <h1>Subir video</h1>

    
      <div className = 'container'>
          <div className='row'>
            <div className='col'>

              <VideoField setVideoPreview = {setVideoPreview} videoPreview = {videoP}/>
                
            </div>
            <div className='col'>

              <InputField setText={setTitle} label="Titulo"/>
              <InputField setText={setDesc} label="Descripcion"/>

              <button onClick={addVideoHandler}>Subir video</button>
    
            </div>
          </div>
        </div>

      </div>
  )
    
}

export default VideoForm
