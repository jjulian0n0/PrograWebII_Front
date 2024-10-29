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
              //console.log("Respuesta completa:", data); // Verifica toda la respuesta

              const { userProfile } = data;


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





  
   return ( 
   <div className='card'>

    <h1>{user}</h1>
    <h2>{userId}</h2>

  </div>
  )
    
}

export default PerfilView
