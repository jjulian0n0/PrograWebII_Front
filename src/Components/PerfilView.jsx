import { useEffect, useState } from 'react'
import BtnCom from './FieldComponents/buttonCom'
import InputField from './FieldComponents/InputField';

{
  /* Vista de mi perfil */
}


function PerfilView(props) {
   
    const userId =  localStorage.getItem("userId"); //parseInt("userId", 10);

    const [playlist, setplaylist] = useState("")
    const [playDef, setPlayDef] = useState("")
    
   
    const [user, setUser] = useState("")
    const [email, setEmail] = useState("")
    const [foto, setFoto] = useState("")
   
        const perfilData = async () => {
          try {
            const res = await fetch(`http://localhost:3000/login/perfil/${userId}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
      
            if (res.ok) {

              const data = await res.json(); // Convertir la respuesta a JSON
              console.log("Respuesta completa:", data); // Verifica toda la respuesta

              const { userProfile } = data;
              setUser(userProfile.nombre);
              setEmail(userProfile.email);
              setFoto(`http://localhost:3000/${userProfile.foto.replace(/\\/g, '/')}`); // Pasar de \\ a / para mostrar en el perfil

              //alert(userProfile.id);
              

            } else {
              console.error('Error al obtener datos de user:', res.statusText);
            }

          } catch (error) {
            console.error('Error en la solicitud:', error);
          } finally {
            // setLoading(false); Indica que la carga ha terminado
          }
        };


         // Agregar playlist
  
    const addPlaylistHandle = async () => {
      if (!playlist && !playDef ) {
        alert("Por favor ingresar nombre ó descripcion de playlist");
        return;
      }
    

      if (!userId) {
        alert("No haz iniciado sesión");
        return;
      }
    
    
      const playlistData = {
        nombre: playlist,
        userId: parseInt(userId),
        descripcion: playDef,
      };


      {/* Validar que la playlist no se repita
        IF No se repite el nombre para el user ENTRAR AL TRY
        ELSE console.log("Ya tienes una pl con ese nombre");
        */}
    
      try {
        const res = await fetch("http://localhost:3000/playlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(playlistData),
        });
    
        if (res.ok) {
          console.log(`Playlist ${playlist} creada`);
          alert("Playlist creada");
    
          setplaylist(""); 
          setPlayDef(""); 
        } else {
          console.log("Error al agregar playlist");
        }
      } catch (error) {
        console.error("Error al agregar playlist:", error);
      }
    };


        useEffect(() => {
          perfilData(); // useEffect llama
        }, []);


        const handleError = () => {
        console.log("Error: Ruta incorrecta de foto, mostrando foto default")

          setFoto('./foto3.png'); // Subir una imagen por defecto (distinta)
        };


  
   return ( <>
   <div className='card'>

      <div className='row'>

      <div className='col'>
      <img src={`${foto}`}  alt="Foto de perfil" style={{ width: '200px', height: 'auto' } } onError={handleError}  />


      </div>
      <div className='col'>
        <h1>{user}</h1>
      <h1>{email}</h1>
      </div>

      </div>

      
      {/* <h1>{foto}</h1> */}


    </div>

    <div className='card'>

      <div className='row'>
        <div className = 'col'>

          <h2>Crear Playlist</h2><br></br>
          <InputField setText={setplaylist} label="Playlist"></InputField><br></br>
          <InputField setText={setPlayDef} label="Definicion de la playlist"></InputField>
        </div>

        <div className = 'col'>
          <button onClick={addPlaylistHandle}>Crear playlist</button>
        </div>
      </div>
    </div>
    
    
    </>
  )
    
}

export default PerfilView