import { useState } from 'react'
import './App.css'
import CardSet from './card'


function App() {
  const [pokemon, setPokemon] = useState(randomIds());
  const [clicked, setClicked] = useState(new Set());
  const [points, setPoints] = useState(0);
  const [best, setBest] = useState(0);

  function handleClick(id){
    if(clicked.has(id)){
      setBest(Math.max(points, best));
      setPoints(0);
      setClicked(new Set());
      setPokemon(randomIds())
    } else{
      setPoints(points + 1);
      setClicked(new Set(clicked).add(id));
      const arr = shuffle(pokemon);
      setPokemon(arr);

    }
  }
  
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  function randomIds() {
    const pokeIds = new Set();

    while (pokeIds.size < 12) {
      pokeIds.add(getRandomInt(1, 1000));
    }
    return Array.from(pokeIds);

  }

  return (
    <>
      <h1>Memory Card Game</h1>
      <div className='score'>
        <h2>Points: {points}</h2>
        <h2>Best: {best}</h2>
      </div>
      <CardSet ids={pokemon} handleClick={handleClick} />
    </>
  )
}

export default App
