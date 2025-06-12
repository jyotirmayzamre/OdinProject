import '../styles/summary.css';

function Summary(props){
    return (
        <div className="info">
            {Object.keys(props.info).map((key)=> (
                <p key={key}>{key}: {props.info[key]}</p>
            ))}
            
            <button className='btn' onClick={props.handleEdit}>Edit</button>
        </div>
    )
}

export default Summary;