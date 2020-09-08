const cardsRouter = require('express').Router(); // создание роутера для запроса всех карточек
const path = require('path');
const getJSONFromFile = require('../helpers/readFile.js');

// Роутер  для запроса всех карточек
cardsRouter.get('/', (req, res) => {
  const filepath = path.join(__dirname, '..', 'data', 'cards.json');
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

module.exports = cardsRouter;
