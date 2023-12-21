require('dotenv').config(); // ikels .env reiksmes i process.env
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// console.log('process.env.PASS ===', process.env.PASS);

// Middleware
app.use(morgan('dev'));
app.use(cors()); // to fix cors errror
// jei norim i req.body gauti json
app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

const usersRouter = require('./routes/usersRoutes');
const booksRouter = require('./routes/booksRoutes');
// users routes
app.use('/', usersRouter);
app.use('/', booksRouter);

// catch all route 404 case
app.all('*', (req, res) => {
  res.status(500).json({
    msg: 'Something went wrong',
    method: req.method,
    url: req.url,
  });
});

app.listen(port, () => {
  console.log(`server is running http://localhost:${port}`);
});
