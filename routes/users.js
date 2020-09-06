const usersRouter = require('express').Router(); // создание роутера для работы с пользователями
const path = require('path');
const getJSONFromFile = require('../helpers/readFile.js');

// Роутер  для запроса пользователя по _id
usersRouter.get('/users/:_id', (req, res) => {
  const userData = getJSONFromFile(path.join(__dirname, '..', 'data', 'users.json'));
  const foundUser = userData.find(item => item._id === req.params._id)
  if (!foundUser) {
    res.status(404).send( {"message": "Нет пользователя с таким id"});
    return;
  }

  return res.status(200).send(foundUser);
});

// Роутер  для запроса всех пользователей
usersRouter.get('/users', (req, res) => {
  const usersData = getJSONFromFile(path.join(__dirname, '..', 'data', 'users.json'));
  if (!usersData) {
    res.status(404).send({ "message": "Данные не получены" });
    return;
  }

  return res.status(200).send(usersData);
});

module.exports = usersRouter;