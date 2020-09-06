const cardsRouter = require('express').Router(); // создание роутера для запроса всех карточек
const path = require('path');
const getJSONFromFile = require('../helpers/readFile.js');

// Роутер  для запроса всех карточек
cardsRouter.get('/cards', (req, res) => {
  const cardsData = getJSONFromFile(path.join(__dirname, '..', 'data', 'cards.json'));

  if (!cardsData) {
    res.status(404).send({ "message": "Данные не получены" });
    return;
  }

  return res.status(200).send(cardsData);
})

module.exports = cardsRouter;