require('dotenv').config(); // ikels .env reiksmes i process.env
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// console.log('process.env.PASS ===', process.env.PASS);

let users = [
  {
    id: 1,
    name: 'James',
    town: 'London',
    isDriver: false,
    isDeleted: false,
  },
  {
    id: 2,
    name: 'Mike',
    town: 'Kaunas',
    isDriver: true,
  },
  {
    id: 3,
    name: 'Bob',
    town: 'Vilnius',
    isDriver: false,
  },
  {
    id: 4,
    name: 'Jane',
    town: 'Klaipeda',
    isDriver: true,
  },
];

let books = [
  {
    title: 'Book 1',
    author: 'Author 1',
    isPublished: true,
    year: 2021,
  },
  {
    title: 'Book 2',
    author: 'Author 2',
    isPublished: false,
    year: 2022,
  },
  {
    title: 'Book 3',
    author: 'Author 3',
    isPublished: true,
    year: 2023,
  },
  {
    title: 'Book 4',
    author: 'Author 4',
    isPublished: false,
    year: 2024,
  },
  {
    title: 'Book 5',
    author: 'Author 5',
    isPublished: true,
    year: 2025,
  },
];

// crud

// gauti visasa knygas
// gauti knyga
// istrinti
// sukurti
// atnaujinti

// Middleware
app.use(morgan('dev'));
app.use(cors()); // to fix cors errror
// jei norim i req.body gauti json
app.use(express.json());

// ROUTES

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// GET - /api/users - grazinti visus userius
app.get('/api/users', (request, response) => {
  response.status(200).json(users);
});

// GET - /api/users/drivers - grazins visus vairuotojus

// GET - /api/users/town - grazinsi visus miestus masyvo pavidalu
app.get('/api/users/town', (request, response) => {
  const townsArr = users.map((uObj) => uObj.town);
  console.log('townsArr ===', townsArr);
  response.json(townsArr);
});

// GET - /api/users/1 - grazinti konretu  useri
// :userId dinamine dalis
app.get('/api/users/:userId', (request, response) => {
  console.log('request.params ===', request.params);
  const userId = +request.params.userId;
  // surasti objekta su id === userId ir ji grazinti
  const found = users.find((userObj) => userId === userObj.id);
  console.log('found ===', found);
  // TODO: not found case
  // jei neradom
  if (found === undefined) {
    response.status(404).json({ msg: `user with id ${userId} was not found` });
    return;
  }
  response.json(found);
});

//  DELETE - /api/users/2 - delete user with id
app.delete('/api/users/:userId', (request, response) => {
  const userId = +request.params.userId;
  // grazlinti viska iskryrus ta el kurio id yra = userId
  users = users.filter((uObj) => uObj.id !== userId);
  console.log('users ===', users);
  response.json(users);
});

app.post('/api/users', (req, res) => {
  // console.log('req.body ===', req.body);
  // sukuriam nauja useri
  // const newUser = {
  //   id: +Math.random().toString().slice(3),
  //   name: req.body.name,
  //   town: req.body.town,
  //   isDriver: req.body.isDriver,
  // };

  const { name, town, isDriver } = req.body;

  // mini validation
  if (name.trim().length === 0) {
    res.status(400).json({
      field: 'name',
      error: 'name required field',
    });
    return;
  }
  const newUser = {
    id: +Math.random().toString().slice(3),
    name,
    town,
    isDriver,
  };
  // const newUser = {
  //   id: +Math.random().toString().slice(3),
  //   ...req.body,
  // };
  console.log('newUser ===', newUser);
  users.push(newUser);
  res.sendStatus(201);
});

// PUT  /api/users/2 - updates users with id 2 object
app.put('/api/users/:userId', (req, res) => {
  const userId = +req.params.userId;
  // surasti ir pakeisti esama objekta
  const foundIdx = users.findIndex((uObj) => uObj.id === userId);
  // found.name = req.body.name;
  // found.town = req.body.town;
  // found.isDriver = req.body.isDriver;
  users[foundIdx] = {
    id: userId,
    ...req.body,
  };
  // console.log('found ===', found);
  // grazinsim pakeista masyva i fronta

  res.json(users);
});

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
