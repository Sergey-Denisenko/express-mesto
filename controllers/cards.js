const Card = require('../models/card');

const getAllCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => {
      res.send({ data: cards });
    })
    // eslint-disable-next-line no-unused-vars
    .catch((err) => {
      if (err.name === 'Not Found') {
        return res.status(404).send({ message: 'Not Found / Карточки не найдены' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const createCard = (req, res) => {
  const {
    name, link, ownerId = req.user._id, likes,
  } = req.body;
  Card.create({
    name, link, owner: ownerId, likes,
  })
    .then((cardItem) => {
      res.send({ data: cardItem });
    })
    // eslint-disable-next-line no-unused-vars
    .catch((err) => {
      if (err.name === 'Bad Request') {
        return res.status(400).send({ message: 'Bad Request / Неверный запрос' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((cardItem) => {
      res.send({ data: cardItem });
    })
    .catch((err) => {
      if (err.name === 'Bad Request') {
        return res.status(400).send({ message: 'Bad Request / Неверный запрос' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const addLikeCardById = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((addlike) => {
      res.send({ data: addlike });
    })
    .catch((err) => {
      if (err.name === 'Bad Request') {
        return res.status(400).send({ message: 'Bad Request / Неверный запрос' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const deleteLikeCardById = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((deletelike) => {
      res.send({ data: deletelike });
    })
    .catch((err) => {
      if (err.name === 'Bad Request') {
        return res.status(400).send({ message: 'Bad Request / Неверный запрос' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports = {
  getAllCards, createCard, deleteCardById, addLikeCardById, deleteLikeCardById,
};
