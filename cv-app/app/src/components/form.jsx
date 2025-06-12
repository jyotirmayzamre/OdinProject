import Input from "./input"
import '../styles/form.css'

function Form(props){

    return(
        <form onSubmit={props.handleSubmit}>
            {Object.keys(props.info).map((key)=> (
                <Input key={key} id={key} label={key} text={props.info[key]} />
            ))}
            <div className='button-container'>
                <button className='btn' type='submit'>Submit</button>
            </div>
        </form>
    )

}

export default Form;