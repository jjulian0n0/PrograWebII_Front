import { useState } from 'react'
import BtnCom from './FieldComponents/buttonCom'
import InputField from './FieldComponents/InputField';

{
  /* Vista de mi perfil */
}


function PerfilView(props) {
   
    
   
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
   






  
   return ( 
   <div className='card'>

    <h1>Perfil view</h1>
    <h2>Nombre de perfil</h2>

  </div>
  )
    
}

export default PerfilView
