const { Client } = require("pg");


const q1 = `
CREATE TABLE IF NOT EXISTS games (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR ( 50 ) NOT NULL,
    description TEXT NOT NULL,
    price INTEGER NOT NULL,
    rating REAL NOT NULL,
    publisher VARCHAR ( 50 ) NOT NULL,
    release_date DATE NOT NULL,
    units_available INTEGER NOT NULL,
    full_image TEXT NOT NULL, 
    title_image TEXT NOT NULL
);

INSERT INTO games (title, description, price, rating, publisher, release_date, units_available, full_image, title_image)
VALUES ('Grand Theft Auto III', 'Welcome to Liberty City. Where it all began. The critically acclaimed blockbuster Grand Theft Auto III brings to life the dark and seedy underworld of Liberty City. With a massive and diverse open world, a wild cast of characters from every walk of life, and the freedom to explore at will, Grand Theft Auto III puts the dark, intriguing, and ruthless world of crime at your fingertips.', 299, 4.3, 'Rockstar Games', '2001-10-22', 1000, 'gta3hero.jpg', 'gta3title.svg'),
('L.A. Noire', 'Amid the post-war boom of Hollywood"s Golden Age, Cole Phelps — an LAPD detective — is thrown headfirst into a city drowning in its own success. Corruption is rampant, the drug trade is exploding, and murder rates are at an all-time high. In his fight to climb the ranks and do what"s right, Phelps must unravel the truth behind a string of arson attacks, racketeering conspiracies, and brutal murders, battling the L.A. underworld and even members of his own department.', 1499, 3.9, 'Rockstar Games', '2011-05-17', 100026, 'noirehero.jpg', 'noiretitle.svg');

`

const q2 = `CREATE TABLE IF NOT EXISTS genres (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR ( 50 ) NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL
);

INSERT INTO genres (title, description, image)
VALUES ('Action','Get your adrenaline pumping with action games! These fast-paced titles put you right in the thick of the action, challenging your reflexes and combat skills. You"ll face off against waves of enemies, overcome dangerous obstacles, and master intricate combat mechanics. From intense gunfights in war-torn landscapes to thrilling sword duels in fantastical realms, action games offer a diverse range of experiences.', 'action.jpg'),
('Adventure', 'Embark on an unforgettable journey with adventure games! These titles weave captivating stories, placing you in the role of a protagonist who unravels mysteries, explores vibrant worlds, and interacts with memorable characters. Prepare to solve puzzles, overcome environmental challenges, and make choices that impact the narrative.', 'adventure.jpg'),
('Shooter', 'Sharpen your aim and prepare for intense combat with shooter games! These titles place you in the shoes of a soldier, mercenary, or other combatant, tasked with completing objectives by eliminating enemies. Master a variety of weapons, utilize different tactics, and navigate intense firefights. From futuristic battles to historical warfare, shooter games offer a range of experiences for every taste.', 'shooter.jpg'), 
('Simulation', 'Step into the shoes of someone else with simulation games! These titles aim to recreate real-world experiences in a detailed and immersive way. You might take control of a vehicle like a flight simulator or manage a complex system like a city builder. Simulation games can be both educational and entertaining, allowing you to learn new skills and experience life from a different perspective.', 'simulation.jpg'),
('Open World', 'Explore vast, sprawling environments with open world games! These titles offer a sense of freedom and limitless possibilities. Traverse sprawling landscapes, discover hidden locations, and tackle objectives at your own pace. You might forge your own path through the story, complete side quests, or simply get lost in the beauty and detail of the world.', 'openworld.jpg');
`

const q3 = `
CREATE TABLE IF NOT EXISTS game_genre (
    game_id INT REFERENCES games(id),
    genre_id INT REFERENCES genres(id),
    PRIMARY KEY (game_id, genre_id)
);

INSERT INTO game_genre (game_id, genre_id)
VALUES (1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 1),
(2, 2),
(2, 4),
(2, 5);
`


async function main(){
    console.log("seeding...");
    const client = new Client({
        connectionString: "postgresql://jyotirmay:msshonco@localhost:5432/inventory"
    })
    await client.connect();
    await client.query(q1);
    await client.query(q2);
    await client.query(q3);
    await client.end();
    console.log("done");
}

main();