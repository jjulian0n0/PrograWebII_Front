import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginForm from './Components/LoginForm'
import RegisterForm from './Components/RegisterForm'
import Sidebar from './Components/Sidebar'

import Perfil from './Components/PerfilView'
import VideoForm from './Components/SubirVideoForm'
import VideoAll from './Components/AllVideosView'
import VideoOne from './Components/VideoComentarios'


import './Components/CSS/Container.css' 

import './Components/CSS/App.css'

function App() {

  const [loginInt, setLoginInt] = useState(0)
  const [navInt, setNavInt] = useState(0)
  const [navBool, setNavBool] = useState(0)

   
   
  return ( 
    <>
    
    <Router>
    {(() => {
          if (loginInt === 0) {

            localStorage.removeItem('userId');

            return (
              <>
              <div className='card'>
                <h1>Iniciar Sesión</h1>
                <LoginForm setLoginInt={setLoginInt} setNavBool={setNavBool} />


              </div>
¿
              <VideoOne/>

              </>
            );
          } else if (loginInt === 1) {
            return (
              <div className='card'>
                <h1>Agregar Usuario</h1>
                <RegisterForm setLoginInt={setLoginInt} />
              </div>
            );
          } else {

            return (
              <>
                <Sidebar setNavInt={setNavInt} setLoginInt={setLoginInt} />

                <Routes>
                 <Route path="/" element={<Perfil />} />
                 <Route path="/perfil" element={<Perfil />} />
                 <Route path="/videoForm" element={<VideoForm />} />
                 <Route path="/principal" element={<VideoAll />} />
                 <Route path="/videoOne" element={<VideoOne />} />
                </Routes>
              </>
            );
          }


    })()}

      
    </Router>


        
    {
    /* {/* Regresar un numero y hacer un Switch 
    
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
