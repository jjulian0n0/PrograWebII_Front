


function InputField(props){

    return(
        <div>
            <label>{props.label}: </label>
            <input type={props.type} 
            onChange={(e) => {

                if (props.setText) {
                    props.setText(e.target.value);
                  }

            }}></input>
        </div>
    )
}


export default InputField