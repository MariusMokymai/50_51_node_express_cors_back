require('dotenv').config(); // ikels .env reiksmes i process.env
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// console.log('process.env.PASS ===', process.env.PASS);

// books need  to have id
let books = [
  {
    id: 1,
    title: 'Book 1',
    author: 'Author 1',
    isPublished: true,
    year: 2021,
  },
  {
    id: 2,
    title: 'Book 2',
    author: 'Author 2',
    isPublished: false,
    year: 2022,
  },
  {
    id: 3,
    title: 'Book 3',
    author: 'Author 3',
    isPublished: true,
    year: 2023,
  },
  {
    id: 4,
    title: 'Book 4',
    author: 'Author 4',
    isPublished: false,
    year: 2024,
  },
  {
    id: 5,
    title: 'Book 5',
    author: 'Author 5',
    isPublished: true,
    year: 2025,
  },
];

// Middleware
app.use(morgan('dev'));
app.use(cors()); // to fix cors errror
// jei norim i req.body gauti json
app.use(express.json());

// crud

// gauti visasa knygas
app.get('/api/books', (req, res) => {
  res.json(books);
});
// gauti viena knyga
app.get('/api/books/:bookId', (req, res) => {
  const bookId = +req.params.bookId;
  const found = books.find((bookObj) => bookObj.id === bookId);
  if (found === undefined) {
    res.status(404).json({
      msg: `book with id ${bookId} was not found`,
    });
    return;
  }
  res.json(found);
});
// istrinti
app.delete('/api/books/:bookId', (req, res) => {
  const bookId = +req.params.bookId;
  books = books.filter((bookObj) => bookObj.id !== bookId);
  res.json(books);
});
// sukurti
app.post('/api/books', (req, res) => {
  const { title, author, isPublished, year } = req.body;
  const newBook = {
    id: +Math.random().toString().slice(3),
    title,
    author,
    isPublished,
    year,
  };
  books.push(newBook);
  // res.status(201).json({ newPostID: newBook.id });
  // res.status(201).json(newBook);
  res.status(201).json(books);
});
// atnaujinti

// ROUTES

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const usersRouter = require('./routes/usersRoutes');
// users routes
app.use('/', usersRouter);

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
