require('express-async-errors');
const express = require('express');
const cors = require('cors');
const errorMiddleware = require('./middlewares/errorMiddleware');

const fs = require('fs/promises')

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {

    const content = await fs.readFile('./teste.txt');

    res.json(content)
    // throw new ApiError('deu erro', 400)
    // res.json('Welcome to the personal finance control API. Developed by Vinicius Bastos')
})

app.use(errorMiddleware)


module.exports = app;