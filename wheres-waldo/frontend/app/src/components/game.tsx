import { useEffect, useRef, useState, type JSX } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Map, Coord, Character } from "../../../../shared/types";
import '../styles/game.css';
import Navbar from "./navbar";
import Footer from "./footer";

function Game(): JSX.Element {
    const location = useLocation();
    const navigate = useNavigate();

    const map: Map = location.state?.map;
    const circleRef = useRef<HTMLDivElement>(null);
    const ulRef = useRef<HTMLUListElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);

    const characterRefs = useRef<Record<string, HTMLDivElement | null>>({});

    map.characters?.forEach((char) => {
        if(!characterRefs.current[char.id]){
            characterRefs.current[char.id] = null
        }
    });

    const normalizedCoords = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

    const [isSelecting, setIsSelecting] = useState<boolean>(false);
    const [charactersLeft, setCharactersLeft] = useState<Character[]>(map.characters ?? []);
    const [clickPosition, setClickPosition] = useState<Coord | null>(null);


    useEffect(() => {
        const circle = circleRef.current;
        const ul = ulRef.current;

        if(circle && ul && clickPosition){
            const radius = circle.offsetHeight / 2;
            circle.style.top = (clickPosition.y - radius) + 'px';
            circle.style.left = (clickPosition.x - radius) + 'px';
            ul.style.left = normalizedCoords.current.x < 0.5 ? (clickPosition.x + 10)  + 'px' : (clickPosition.x - radius - ul.offsetWidth) + 'px';
            ul.style.top = normalizedCoords.current.y < 0.5 ? (clickPosition.y + 10) + 'px' : (clickPosition.y - radius - ul.offsetHeight) + 'px';
        }

        if(charactersLeft.length === 0){
            endGame(map.id);
        }

    }, [clickPosition, map.id, charactersLeft]);
    
    const startGame = async (uuid: string, id: string) : Promise<void> => {
        const response = await fetch(`http://localhost:3000/maps/${id}/start`, {
            method: 'POST',
            body: JSON.stringify(uuid)
        });

        if(!response.ok){
            const errorData = await response.json();
            console.error(errorData.error);
        }

        const messageData = await response.json();
        console.log(messageData.message);
    };

    const endGame = async (id: string) : Promise<void> => {
        const response = await fetch(`http://localhost:3000/maps/${id}/end`, {
            method: 'POST',
            body: JSON.stringify(localStorage.getItem('uuid'))
        })

        if(!response.ok){
            const errorData = await response.json();
            console.error(errorData.error);
            return;
        }

        const messageData = await response.json();
        console.log(messageData.message);

        const dialog = dialogRef.current;
        if(dialog){
            dialog.childNodes[0].textContent = messageData.timeTaken + ' ms';
            dialog.showModal();
        }

    }

    useEffect(() => {
        let currUUID = localStorage.getItem('uuid') as string;
        if(!currUUID){
            currUUID = crypto.randomUUID();
            localStorage.setItem('uuid', currUUID);
        }
        startGame(currUUID, map.id);
    }, [map.id]);


    const handleClick = (e: React.MouseEvent<HTMLImageElement>): void => {
        const target: HTMLElement = e.target as HTMLElement;
        const rect = target.getBoundingClientRect();

        //set normalized coordinates
        const normalizedX = (e.clientX - rect.left) / rect.width;
        const normalizedY = (e.clientY - rect.top) / rect.height;
        normalizedCoords.current = { x: normalizedX, y: normalizedY };


        setClickPosition( {x: e.pageX, y: e.pageY });
        setIsSelecting(true);
    }

    const handleCharacterSelect = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        const target: HTMLElement = e.currentTarget as HTMLElement;

        const id = target.dataset.id;

        if(!id) return;

        const response = await fetch(`http://localhost:3000/maps/checkChar/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(normalizedCoords.current)
        })

        if(!response.ok){
            const errorData = await response.json();
            console.error(errorData.error);
            return;
        }
        
        const result = await response.json();
        const charElement = characterRefs.current[id];

        const popup = popupRef.current;

        if(popup && charElement){

            if(result.message === 'character found'){
            charElement.style.textDecoration = 'line-through';
            setCharactersLeft(prev => prev?.filter((char) => char.id != id));
            popup.classList.remove('wrong')
            popup.classList.add('correct');
            popup.textContent = `You found ${target.dataset.name}!`;

        } else {
            popup.classList.remove('correct');
            popup.classList.add('wrong');
            popup.textContent = 'Try again'
        }
        
        popup.style.display = 'block';
        setTimeout(() => {
            popup.style.display = 'none';
        }, 1500);

        }

        setIsSelecting(false);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const input = usernameRef.current;

        const response = await fetch(`http://localhost:3000/maps/${map.id}/store`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ uuid: localStorage.getItem('uuid'), username: input?.value })
        })

        if(!response.ok){
            const errorData = await response.json();
            console.error(errorData.error);
            return;
        }

        const messageData = await response.json();
        console.log(messageData.message);

        navigate('/');
    }

    return (
        <>
            <Navbar page='game' characters={map.characters} characterRefs={characterRefs}/>
            <main>
                <div className='image-canvas'>
                    <img src={`http://localhost:3000${map.image}`} alt={map.name} onClick={handleClick}></img>

                    <div className={`select-container ${!isSelecting ? 'hidden' : ''}`} id="select-character-container">
                        <div ref={circleRef} className='circle' id='circle'></div>
                        <ul ref={ulRef} className="list" id="select-character-list">
                            {charactersLeft?.map((char, idx) => (
                                <li key={idx}>
                                    <button className="btn" data-id={char.id} data-name={char.name} onClick={handleCharacterSelect}>
                                        <img src={`http://localhost:3000${char.image}`}></img>
                                        <span>{char.name}</span>
                                    </button>

                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </main>

            <Footer />
            

            <div id="pop-up" ref={popupRef}></div>

            <dialog id="end-game" ref={dialogRef}>
                <p><strong>You finished in</strong></p>
                <div>
                    <p>Submit your score to the leaderboard</p>
                    <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label htmlFor="username">Username:</label>
                        <input ref={usernameRef} type="text" name="username" id="username"></input>
                    </div>
                    <button type="submit">Submit</button>
                    </form>
                </div>
            </dialog>
        </>
        
    )
}

export default Game;