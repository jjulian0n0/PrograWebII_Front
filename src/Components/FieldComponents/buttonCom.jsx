function BtnCom(props){

    return(
        <>

            <button 
            className={props.className || ''} 
            
            onClick = {
                () => props.setInt(props.numero)
            }
            >
                {props.texto}
            </button>
            
        </>
    )
}


export default BtnCom