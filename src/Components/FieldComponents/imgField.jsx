import React, { useState } from 'react';


function ImageUploader2 (props){
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      props.setImagePreview(URL.createObjectURL(file)); //Crea una Url 
      props.setImageFile(file);
    }
  };

  return (
    <div>
      {props.imagePreview && ( //Si imagePreview no es null muestra
      <div>
        <img src={props.imagePreview} alt="Preview" style={{ width: '200px', height: 'auto' }} />
      </div>
    )}
      <input type="file" accept="image/jpeg, image/png, image/jpg" onChange={handleImageChange} />
      
    </div>
  );
}

export default ImageUploader2;

