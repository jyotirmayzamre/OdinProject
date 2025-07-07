const { Client } = require('pg');
require('dotenv').config();

const q1 = `

CREATE TABLE IF NOT EXISTS Users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR ( 20 ) NOT NULL,
    last_name VARCHAR ( 20 ) NOT NULL,
    username VARCHAR ( 20 ) NOT NULL,
    hash TEXT NOT NULL,
    salt INTEGER NOT NULL,
    membership_status BOOLEAN NOT NULL,
);


CREATE TABLE IF NOT EXISTS Posts (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR ( 50 ) NOT NULL,
    timestamp TIME NOT NULL,
    content TEXT NOT NULL
    author INTEGER REFERENCES Users (id),
);

`


const cString = `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DATABASE}`

async function main(){
    console.log("Seeding...");
    const client = new Client({
        connectionString: cString
    });
    await client.connect();
    await client.query(q1);
    console.log("Done");
}

main();