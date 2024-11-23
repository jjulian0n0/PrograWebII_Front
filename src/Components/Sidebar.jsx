
import React from 'react';
import './CSS/Sidebar.css'; // Estilos CSS para la barra lateral
import AComponent from './FieldComponents/AComponent'
import { Link } from 'react-router-dom';





function Sidebar (props){


  return (
    <div className="sidebar">
      <h2>Menú</h2>
      <ul>
        <li>
        <Link to="/perfil">Mi perfil</Link>
        </li>
        <li>
        <Link to="/videoForm">Subir Video</Link>
        </li>
        <li>
        <Link to="/principal">Todos los videos</Link>
        </li>
        <li>
        <Link to="/Playlist">Mis playlist</Link>
        </li>
        <li>
        <Link to="/Suscritos">Mis suscripciones</Link>
        </li>
        <li>
        <AComponent setInt = {props.setLoginInt} numero = {0} texto = "Cerrar Sesion"/>

        </li>

      </ul>
    </div>
  );
};

export default Sidebar;

{/* Anterior SideBar (que la fuerza te acompañe)

  return (
    <div className="sidebar">
      <h2>Menú</h2>
      <ul>

        <li>
        <AComponent setInt = {props.setNavInt} numero = {1} texto = "Mi perfil">

          </AComponent>
        </li>

        <li>
        <AComponent setInt = {props.setNavInt} numero = {2} texto = "Subir Video">

          </AComponent>
        </li>

        <li>
        <AComponent setInt = {props.setNavInt} numero = {3} texto = "Suscripciones">

          </AComponent>
        </li>

      </ul>
    </div>
  );
  
  
  
  */}