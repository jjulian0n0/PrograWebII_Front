import { useState } from 'react'
import LoginForm from './routes0/LoginForm'
import RegisterForm from './routes0/RegisterForm'
import Sidebar from './routes0/Sidebar'
import BtnCom from './routes0/buttonCom'
import AComponent from './routes0/AComponent'
import './Container.css' 

import './App.css'

function App() {

  const [loginInt, setLoginInt] = useState(0)
  const [navInt, setNavInt] = useState(0)

   
   
  return ( 
    <>
    <div className='card'>
          <h1>Iniciar Sesion</h1>
          <LoginForm setLoginInt = {setLoginInt}></LoginForm>
          <hr></hr>
          <h1>Agregar user</h1>
          <RegisterForm setLoginInt = {setLoginInt}></RegisterForm>
          <hr></hr>

          <h1>{navInt}</h1>

          <Sidebar setNavInt={setNavInt} /> {/* Regresar un numero y hacer un Switch */}
    

    
    </div>
    {/*
    
          <BtnCom setInt = {setLoginInt} numero = {3} texto = {3}
          ></BtnCom>
          <AComponent setInt = {setLoginInt} numero = {6} texto = {6}
          ></AComponent>
    */
    }

    {
      /* <div className = 'container'>
        <div className='row'>
          <div className='col'>
              
          </div>
          <div className='col'>
  
          </div>
        </div>
      </div>
      */
      
    }

    </>
  )
}

export default App
