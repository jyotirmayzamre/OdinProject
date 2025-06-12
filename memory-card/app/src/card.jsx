import { useState, useEffect } from "react";
import "./card.css";

function Card({ id, handleClick }){

    const [ pokemon, setPokemon ] = useState({name: '', image: ''})

    async function fetchData(id){
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if(!response.ok){
            throw new Error('Error fetching pokemon');
        }
        const json = await response.json();
        const data = { name: json.name, image: json.sprites.front_default };
        setPokemon(data);
        console.log(data);
    };

    useEffect(() => {
        fetchData(id);
    }, [id]);

    return (
        <div className="card" onClick={() => handleClick(id)}>
            <div className="image-container">
                <img src={pokemon.image}></img>
            </div>
            <div className="name-container">
                <p>{pokemon.name}</p>
            </div>
        </div>

    )

}


function CardSet({ ids, handleClick }){
    return (
        <div className="cards-container">
            {ids.map((id) => {
                return <Card id={id} key={id} handleClick={handleClick} />
            })}
        </div>
    )
}

export default CardSet;

