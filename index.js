const express = require('express')
const db = require('./config/connection')
const routes = require('./routes');
const { log } = require('console');

const cwd = process.cwd()

const PORT = process.env.PORT || 3002;
const app = express()

app.use(express.urlencoded({ extnded: true }))
app.use(express.json())
app.use(routes)

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`${cwd} is on port ${PORT}`);
    })
})