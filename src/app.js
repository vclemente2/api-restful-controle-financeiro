const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json('Welcome to the personal finance control API. Developed by Vinicius Bastos'))


module.exports = app;