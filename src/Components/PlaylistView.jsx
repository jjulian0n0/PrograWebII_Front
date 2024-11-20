import { useEffect, useState } from 'react'
import BtnCom from './FieldComponents/buttonCom'
import InputField from './FieldComponents/InputField';

{
  /* Vista de mi perfil */
}


function PlaylistView(props) {
   
    const userId =  localStorage.getItem("userId"); //parseInt("userId", 10);

    const [playlists, setPlaylists] = useState([]); // Estado para almacenar las playlists
    const [selectedPlaylist, setSelectedPlaylist] = useState("");
   
        const getPlaylist = async () => {
          try {
            const res = await fetch(`http://localhost:3000/playlist/user/${userId}`, { 
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
      
            if (res.ok) {

              const data = await res.json(); // Convertir la respuesta a JSON
              console.log("Respuesta completa:", data); // Verifica toda la respuesta

              setPlaylists(data.data); // Guardar playlists en el estado
              

            } else {
              console.error('Error al obtener playlist de user:', res.statusText);
            }

          } catch (error) {
            console.error('Error en la solicitud:', error);
          } finally {
            // setLoading(false); Indica que la carga ha terminado
          }
        };


         // Agregar comentario
  
 


        useEffect(() => {
            getPlaylist(); // useEffect llama
        }, []);


        
        const handleSelectChange = (event) => {
            setSelectedPlaylist(event.target.value); // Actualizar selección
            console.log("Playlist seleccionada:", event.target.value);
          };

  
   return ( 

      
      
    <div className='card'>{/* <h1>{foto}</h1> 
      <img src={`${foto}`}  alt="Foto de perfil" style={{ width: '200px', height: 'auto' } } onError={handleError}  />*/}

      <h2 htmlFor="playlistSelect">Selecciona una playlist:</h2>
      <select
        id="playlistSelect"
        value={selectedPlaylist} // Valor actual del select
        onChange={handleSelectChange} // Manejar cambios
        className='form-select'
      >
            <option value="" disabled>Selecciona una playlist</option> 
            {playlists.map((playlist) => (
            <option key={playlist.id} value={playlist.id}>
                {playlist.nombre}
            </option>
            ))} 
      </select>
    </div>
    
    
  )
    
}

export default PlaylistView