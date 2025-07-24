import { Link, useLoaderData } from 'react-router-dom';
import '../styles/home.css';
import { useState, type JSX } from 'react';
import type { Map, Timing } from '../../../../shared/types';
import Navbar from './navbar';
import Footer from './footer';




function Games(): JSX.Element {
    const maps: Map[] = useLoaderData();
    const [leaderboard, setLeaderboard] = useState<Timing[]>([]);
    const [clicked, setClicked] = useState<string>('');


    const handleClick = async (e: React.MouseEvent<HTMLElement>): Promise<void> => {
        const target: HTMLElement = e.target as HTMLElement;
        

        const response = await fetch(`http://localhost:3000/maps/${target.dataset.mapid}/leaderboard`);

        if(!response.ok){
            const errorData = await response.json();
            console.error(errorData.error);
            return;
        }

        const data: Timing[] = await response.json();
        if(target.dataset.mapid) setClicked(target.dataset.mapid);
        setLeaderboard(data);
    }

    return (
        <main>
            <h2>Games</h2>
            <div className='games-container'>
                {maps.map((map, idx) => {
                    return (
                        <div className='game' key={idx}>
                            <div className={clicked === map.id ? 'clicked' : ''} id='image-container'>
                                <img  src={`http://localhost:3000${map.image}`} data-mapid={map.id} onClick={handleClick}></img>
                            </div>
                            <h4>{map.name}</h4>
                            <Link to={`/games/${map.id}`} state={{ map }} className='game-link'>Go to game</Link>
                        </div>
                    )
                })}
            </div>
            <div className='leaderboard-container'>
                <h1>Leaderboard</h1>
                {leaderboard.length > 0 ? (
                    <table className='leaderboard-table'>
                        <thead>
                            <tr>
                                <th>Place</th>
                                <th>Username</th>
                                <th>Time (ms)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.map((score, idx) => (
                                <tr key={score.uuid}>
                                    <td>{idx+1}</td>
                                    <td>{score.username}</td>
                                    <td>{score.time}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                ) : (
                    <p>There no scores present in the leaderboard for this map as of yet.</p>
                )}
            </div>
        </main>
    )
}

function Home(): JSX.Element {
    return (
        <>
            <Navbar page='home' />
            <Games />
            <Footer />
        </>
    )
}

export default Home;