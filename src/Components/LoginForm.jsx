import { useState } from 'react'
import BtnCom from './FieldComponents/buttonCom'
import InputField from './FieldComponents/InputField';


function LoginForm(props) {
   
    const loginHandle = async () => {
      if(!user || !password){

        alert("Favor de ingresar usuario y contraseña")

        return
      }

      const data = {
        email: user,
        contrasena: password
      }

      const res = await fetch('http://localhost:3000/login',{
        method: 'POST',
        headers:{
          'content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if(res.ok){

        const responseData = await res.json(); //Guardar el ID en el localStorage
        localStorage.setItem('userId', responseData.userId);
        
        props.setLoginInt(2)
        props.setNavBool(1)

        alert("Te has logiado correctamente!!!")

        

      }else{
        alert("Favor de revisar, usuario y contraseña")
      }

    }
   
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
   






  
   return ( 
   <div className='card2'>

    <InputField setText={setUser} label="Correo"></InputField>
    <br></br>

    <InputField setText={setPassword} type="Password" label="Contraseña"></InputField>
    <br/>

    

    <BtnCom setInt = {props.setLoginInt} numero = {1} texto = "Nuevo User"  className="btnSecundario"
          ></BtnCom >
    
    <button onClick={loginHandle}>Acceder</button>

  </div>
  )
    
}

export default LoginForm
