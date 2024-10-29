import { useState } from 'react'
import InputField from './FieldComponents/InputField';
import ImgField from './FieldComponents/imgField'
import BtnCom from './FieldComponents/buttonCom'

import {validateEmail, validatePassword} from './Functions/ValidateFunction'


function LoginForm(props) {
   
    const addUserHandle = async () => {


          if(!user || !password || !email){

            alert("Favor de ingresar los datos")

            return
          }

          //Agregar validaciones para email y contraseña

          if(!validateEmail(email)){
            alert("Formato de correo incorrecto")

            return
          }
          if(!validatePassword(password)){
            alert("La contraseña debe tener más de 8 caracteres y debe contar con mayusculas, minusculas, numeros y un carácter especial")

            return
          }

        /* 

      const data = {
        nombre: user,
        email: email,
        contrasena: password
      }

      const res = await fetch('http://localhost:3000/user',{
        method: 'POST',
        headers:{
          'content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })*/

        const formData = new FormData();
        formData.append('nombre', user);
        formData.append('email', email);
        formData.append('contrasena', password);
        
        if (imagePreview) {
          formData.append('foto', imageFile);
        }
      
        const res = await fetch('http://localhost:3000/user', {
          method: 'POST',
          body: formData,
        });

      if(res.ok){
        alert("Nuevo usuario registrado")

        

      }else{
        alert("Error al agregar usuario")
      }

    }
   
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null); //Para que se obtenga un URL de la imagen
  // const [email, setEmail] = useState("") RUTA FOTOGRAFIA
   
   return ( 
   <div className="card2">

    <ImgField setImagePreview = {setImagePreview} setImageFile = {setImageFile} imagePreview = {imagePreview}></ImgField>
    <br/>

    <InputField setText={setEmail} label="Correo"></InputField>
    <br></br>
    <InputField setText={setUser} label="Usuario"></InputField>
    <br></br>

    <InputField setText={setPassword} type="Password" label="Contraseña"></InputField>
    <br/>
    
    <BtnCom setInt = {props.setLoginInt} numero = {0} texto = "Regresar"  className="btnSecundario"
          ></BtnCom >
    <button onClick={addUserHandle}>Crear cuenta</button>

  </div>
  )
    
}

export default LoginForm
