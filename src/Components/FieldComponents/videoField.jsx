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

function ImageUploader2 (props){
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      props.setVideoPreview(URL.createObjectURL(file)); //Crea una Url 
    }
  };

  return (
    <div>
      {props.videoPreview && ( //Si imagePreview no es null muestra
      <div>
        <video src={props.videoPreview} alt="Preview" style={{ width: '200px', height: 'auto' }  } controls />
      </div>
    )}
      <input type="file" accept="video/*" onChange={handleImageChange} />
      
    </div>
  );
}

export default ImageUploader2;

