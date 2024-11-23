import { useState } from 'react'
import InputField from './FieldComponents/InputField';
import VideoField from './FieldComponents/videoField'





function VideoForm(props) {

    const addVideoHandler = async () => {

      var aValue = localStorage.getItem('userId');
      var idUserLS = 0;

      if(!title || !desc || !videoFile ){

        alert("Favor de ingresar los datos")

        return}

        if(!aValue){
        alert("No a ingresado a su cuenta")
        return
          
        }else{
          idUserLS = parseInt(aValue)
        }

      //Agregar validaciones para email y contraseña

      

        /* 
        const data = {
          nombre : title,
          desc : desc,
          ruta : videoP,
          userId : idUserLS 

        }
        */

        const formData = new FormData();
        formData.append('nombre', title);
        formData.append('desc', desc);
        formData.append('userId', idUserLS);




        if(videoFile){
          formData.append('ruta', videoFile);

        }

        const res = await fetch('http://localhost:3000/video',{
          method: 'POST',
          body: formData
        })

      if(res.ok){
        alert("Nuevo video registrado")

        

      }else{
        alert("Error al crear video")
      }

    }
   
    
  const [videoP, setVideoPreview] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")



  
   return ( 
    <div className='no-sidebar'>
      <div className='card'>
      <h1>Subir video</h1>

    
      <div className = 'container'>
          <div className='row'>
            <div className='col'>

              <VideoField setVideoFile= {setVideoFile} setVideoPreview = {setVideoPreview} videoPreview = {videoP}/>
                
                <h2>{videoFile ? videoFile.name : 'No hay archivo seleccionado'}</h2>
            </div>
            <div className='col'>

              <InputField setText={setTitle} label="Titulo"/>
              <InputField setText={setDesc} label="Descripcion"/>

              <button onClick={addVideoHandler}>Subir video</button>
    
            </div>
          </div>
        </div>

      </div>
    </div>
  )
    
}

export default VideoForm
