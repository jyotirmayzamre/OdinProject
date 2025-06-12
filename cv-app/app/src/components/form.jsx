import Input from "./input";
import Textarea from "./textarea";
import '../styles/form.css'

function Form(props){

    return(
        <form onSubmit={props.handleSubmit}>
            {Object.keys(props.info).map((key)=> (
                key == 'Description' ? (
                    <Textarea key={key} id={key} label={key} placeholder="Main Tasks..." text={props.info[key]} />
                ) : (
                    <Input key={key} id={key} label={key} type={key.includes('Date') ? 'date' : 'text'} placeholder={key.includes('Date') ? "mm / dd / yy" : `Enter ${key}...`} text={props.info[key]} />
                )

                
            ))}
            <div className='button-container'>
                <button className='btn' type='submit'>Submit</button>
            </div>
        </form>
    )

}

export default Form;