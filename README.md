# PrograWebII_Front
Proyecto de Progra Web 2, parte de Front

    Creado por:
    - Jesús Julián Cerda Sandoval
    - Ricardo Ponce de León Herrera
    -
    -

# Team: cosas por hacer 
Tenemos:
    Login
    Registro de usuario
    Ver información de usuario
    Subir video con Multer // Julian


Nos falta:

    *Ya muestra los datos de los videos en la principal, ahora tienen que mostrar los videos y arreglar el formato de la fecha
    *
    
    Buscar videos // Ricardo?
    Hacer comentarios
    Mostrar comentarios
    Playlist // Andrea

?Suscripciones si nos da el tiempo


# Bitacora equipo:

30/10/24 Julian: Muestra de la informacione en PerfilView
9:44 Subida de video

06/11/20 - 11:55pm - Ricardo: Logro acceso y actualizacion del Git
06/16/20 - 8:30am  - Ricardo: 
    - Creacion del CSS de VerAllVideos (tambien afecta video21)
    - creacion de el JSX de videoThumbnail para hacer los thumbnails de los videos
    - Modificaciones a AllVideosView para que se vieran todos los videos en la base de datos (no tiene funcion de busqueda todavia)
    - Modificacion de Sidebar.jsx para que UnVideo(ocultar) te envie directo al primer video de tu base de datos
    - Modificacion de App.jsx solamente a la ruta de Video para que te mande a un video con un ID especifico
    - Modificacon de Video21 para que te muestre de manera apropiada un video especifico al que le hagas click en Todos los Videos
    - El nuevo CSS de VerAllVideos tambien lo use para modificar el formato del Titulo, Fecha y Descripcion
    - Agreque un boton de Subscripcion que todavia no hace nada



# -- Descripcion del proyecto: -- 

# Back 
Diseño de una base de datos PostgresDB conectada y editada por medio de PrismaDB creando endpoints y JSON

Utilizando y enviando paquetes con express (Thunder client)

# Front 
Creacion de las ventanas de un sitio web y su conexion con el Back end y nuestra base de datos.

Usando react y react router.

Muestra y manejo de imagenes y videos con multer

# Conexion entre ambos
En el back para no generar errores utilizamos CORS que puede bloquear y aceptar entradas de pedidos de distintos servidores y aplicaciones,
ahora solamente lo abrimos para que no haya problema entre las conexiones pero más adelante deberíamos poder bloquear la entrada de otras aplicaciones que no sean la de nuestro Front.

Ambas partes de nuestro codigo utilizan NPM.

