function AComponent(props) {
    return (
        <>
            <a href="#" onClick={(e) => {
                e.preventDefault(); // Evita que el enlace navegue
                props.setInt(props.numero);
            }}>
                {  }{props.texto}
            </a>
        </>
    );
}

export default AComponent;