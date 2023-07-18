const express = require('express');
const env = require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const port = process.env.APP_PORT;
const Routers = require('./Routers/Routers');
const cors = require('cors');

app.use(cors('*'));

// app.use(cors({
//     origin: 'http://localhost:4000'
// }));

app.use(bodyParser.json());
app.use(Routers);

app.get('/', (req, res) => {
    res.status(201).json({ say: 'hello world' });
});

app.listen(port, () => {
    console.log(`aplikasi ini berjalan di host http://localhost:${port}`);
});


