const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const prisma  = require('./prisma');
const session = require('express-session');

const sessionConfig = session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: new PrismaSessionStore(
        prisma,
        {
            checkPeriod: 2 * 60 * 1000,
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined
        }
    ),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 1
    }
})

module.exports = sessionConfig