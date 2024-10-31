import { useEffect, useState } from 'react'
import BtnCom from './FieldComponents/buttonCom'
import InputField from './FieldComponents/InputField';

{
  /* Vista de mi perfil */
}


function PerfilView(props) {
   
    const userId =  localStorage.getItem("userId"); //parseInt("userId", 10);

    
   
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


        useEffect(() => {
          perfilData(); // useEffect llama
        }, []);


        const handleError = () => {
          setFoto('./foto3.png'); // Subir una imagen por defecto (distinta)
        };


  
   return ( 
   <div className='card'>

    <h1>{user}</h1>
    <h1>{email}</h1>
    {/* <h1>{foto}</h1> */}

    <img src={`${foto}`}  alt="Foto de perfil" style={{ width: '200px', height: 'auto' } } onError={handleError}  />

  </div>
  )
    
}

export default PerfilView
