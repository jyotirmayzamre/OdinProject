const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const session = require('express-session');
const prisma = require('./prisma')

const sessionConfig = session({
    cookie: {
        maxAge: 1 * 24 * 60 * 60 * 1000
    },
    secret: 'xyz',
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(
        prisma,
        {
            checkPeriod: 2 * 60 * 1000,  //ms
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }
    )
})

module.exports = sessionConfig;