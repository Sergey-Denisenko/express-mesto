const usersRouter = require('express').Router(); // создание роутера для работы с пользователями
const path = require('path');
const getJSONFromFile = require('../helpers/readFile.js');

// Роутер  для запроса пользователя по _id
usersRouter.get('/:_id', (req, res) => {
  const filepath = path.join(__dirname, '..', 'data', 'users.json');
  return getJSONFromFile(filepath)
    .then((data) => {
      const foundUser = data.find((item) => item._id === req.params._id);
      if (!foundUser) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
        return;
      }

      res.status(200).send(foundUser);
    })
    .catch((err) => {
      res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
      console.log(err);
    });
});

// Роутер  для запроса всех пользователей
usersRouter.get('/', (req, res) => {
  const filepath = path.join(__dirname, '..', 'data', 'users.json');
  return getJSONFromFile(filepath)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
        return;
      }

      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
      console.log(err);
    });
});

module.exports = usersRouter;
