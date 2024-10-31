
import '../CSS/input.css' 



function InputField(props){

    return(
        <div>
            <label>{props.label}: </label>
            <input className='inputA' type={props.type} 
            onChange={(e) => {

                if (props.setText) {
                    props.setText(e.target.value);
                  }

            }}></input>
        </div>
    )
}


export default InputField