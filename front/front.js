'use strict';

console.log('front.js file was loaded');

const usersUrl = 'http://localhost:3000/api/users';

// parsisiusti vartotojus ir iskonsolinti

async function getUsers(url) {
  try {
    const resp = await fetch(url);
    // console.log('resp ===', resp);
    const usersData = await resp.json();
    console.log('usersData ===', usersData);
  } catch (error) {
    console.warn(error);
  }
}
getUsers(`${usersUrl}/1`);
getUsers(`${usersUrl}/2`);
getUsers(`${usersUrl}`);
