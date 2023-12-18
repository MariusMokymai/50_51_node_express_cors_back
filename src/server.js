'use strict';
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const port = 3000;

const users = [
  { id: 1, name: 'James', town: 'London' },
  { id: 2, name: 'Mike', town: 'Kaunas' },
  { id: 3, name: 'Bob', town: 'Vilnius' },
  { id: 4, name: 'Jane', town: 'Klaipeda' },
];

// Middleware
app.use(morgan('dev'));
app.use(cors()); // to fix cors errror

// ROUTES

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// GET - /api/users - grazinti visus userius
app.get('/api/users', (request, response) => {
  response.json(users);
});
// GET - /api/users/1 - grazinti konretu  useri
// :userId dinamine dalis
app.get('/api/users/:userId', (request, response) => {
  console.log('request.params ===', request.params);
  const userId = +request.params.userId;
  // surasti objekta su id === userId ir ji grazinti
  const found = users.find((userObj) => userId === userObj.id);
  console.log('found ===', found);
  response.json(found);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
