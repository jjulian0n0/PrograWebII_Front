import React, { useState } from 'react';
/* 
const ImageUploader = () => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file)); //Crea una Url
    }
  };

  return (
    <div>
      {imagePreview && (
      <div>
        <img src={imagePreview} alt="Preview" style={{ width: '200px', height: 'auto' }} />
      </div>
    )}
      <input type="file" accept="image/*" onChange={handleImageChange} />
      
    </div>
  );
};*/

function VideoField (props){
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validación para asegurarse de que sea un video
      const validTypes = ['video/mp4']; // Tipos de video permitidos
      if (!validTypes.includes(file.type)) {
        alert('Solo se permiten archivos MP4.'); // Mensaje de alerta
        return; // Salir de la función si el tipo no es válido
      }

      props.setVideoPreview(URL.createObjectURL(file)); // Crea una URL para la vista previa
      props.setVideoFile(file); // Guarda el archivo en el estado
    }
  };

  

  return (
    <>
      <div>
        {props.videoPreview && ( //Si imagePreview no es null muestra
        <div>
          <video src={props.videoPreview} alt="Preview" style={{ width: '200px', height: 'auto' }  } controls />
        </div>
      )}
        <input type="file" accept="video/*" onChange={handleImageChange} />
        
      </div>
    </>
  );
}

export default VideoField;

