const { Client } = require('pg');
require('dotenv').config();

const q1 = `

CREATE TABLE IF NOT EXISTS Users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR ( 20 ) NOT NULL,
    last_name VARCHAR ( 20 ) NOT NULL,
    email VARCHAR ( 30 ) NOT NULL,
    hash TEXT NOT NULL,
    membership_status BOOLEAN NOT NULL DEFAULT FALSE
);


CREATE TABLE IF NOT EXISTS Posts (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR ( 50 ) NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    content TEXT NOT NULL,
    author INTEGER REFERENCES Users (id)
);

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");

`


const cString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`
console.log(cString);

async function main(){
    console.log("Seeding...");
    const client = new Client({
        connectionString: cString
    });
    await client.connect();
    await client.query(q1);
    await client.end();
    console.log("Done");
}

main();