import { Link } from "react-router-dom";
import type { JSX, RefObject } from "react";
import type { Character } from "../../../../shared/types";

import '../styles/navbar.css';

type propType = {
    page: string,
    characters?: Character[],
    characterRefs?: RefObject<Record<string, HTMLDivElement | null>>
}

function Navbar(props: propType): JSX.Element {

    function toggleMode(e: React.MouseEvent<HTMLImageElement>) : void {
        const body: HTMLElement = document.body;
        const img = e.target as HTMLImageElement;

        if(body.classList.contains('light-mode')){
            body.classList.remove('light-mode')
            img.src = '/brightness.png';
        } else{
            body.classList.add('light-mode');
            img.src = '/moon.png';
        }
    }        


    return (
        <header>
            <nav className="navbar">
                <div className="container left">
                    <Link to='/' className="title"><p><span>Pixel</span><span className="suffix">Match</span></p></Link>
                </div>
                <div className="container right">
                    {props.page === 'game' &&
                        <div className="character-list">
                            {props.characters?.map((char) => (
                                <div
                                    ref={(el) => {
                                        if(props.characterRefs?.current){
                                            props.characterRefs.current[char.id] = el
                                        }
                                        }}
                                    className="character-container" key={char.id}>
                                    <img src={`http://localhost:3000${char.image}`} alt={char.name}></img>
                                    <p>{char.name}</p>
                                </div>
                            ))}
                        </div>
                    }
                    
                    <div className="mode-container">
                        <img src='/brightness.png' alt="Dark Mode" onClick={toggleMode}></img>
                    </div>
                </div>
            </nav>
        </header>
        
    )
}

export default Navbar;