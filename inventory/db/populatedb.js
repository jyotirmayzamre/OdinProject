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
VALUES ('Grand Theft Auto III', 'Welcome to Liberty City. Where it all began. The critically acclaimed blockbuster Grand Theft Auto III brings to life the dark and seedy underworld of Liberty City. With a massive and diverse open world, a wild cast of characters from every walk of life, and the freedom to explore at will, Grand Theft Auto III puts the dark, intriguing, and ruthless world of crime at your fingertips.', 299, 4.3, 'Rockstar Games', '2001-10-22', 1000, 'gta3hero.jpg', 'gta3title.svg');
`

const q2 = `CREATE TABLE IF NOT EXISTS genres (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR ( 50 ) NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL
);

INSERT INTO genres (title, description, image)
VALUES ('Action','Get your adrenaline pumping with action games! These fast-paced titles put you right in the thick of the action, challenging your reflexes and combat skills. You"ll face off against waves of enemies, overcome dangerous obstacles, and master intricate combat mechanics. From intense gunfights in war-torn landscapes to thrilling sword duels in fantastical realms, action games offer a diverse range of experiences.', 'action.jpg');
`

const q3 = `
CREATE TABLE IF NOT EXISTS game_genre (
    game_id INT REFERENCES games(id),
    genre_id INT REFERENCES genres(id),
    PRIMARY KEY (game_id, genre_id)
);

INSERT INTO game_genre (game_id, genre_id)
VALUES (1, 1);

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