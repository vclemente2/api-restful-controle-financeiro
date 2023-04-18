require('express-async-errors');
const express = require('express');
const cors = require('cors');
const errorMiddleware = require('./middlewares/errorMiddleware');
const routes = require('./routes/routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => res.json('Welcome to the personal finance control API. Developed by Vinicius Bastos'));
app.use(routes);

app.use(errorMiddleware);


module.exports = app;