
import { useState } from 'react'
import React from 'react';
import '../Sidebar.css'; // Estilos CSS para la barra lateral
import AComponent from './AComponent'


function Sidebar (props){


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
};

export default Sidebar;
