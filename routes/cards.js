const cardsRouter = require('express').Router(); // создание роутера для запроса всех карточек
const {
  getAllCards, createCard, deleteCardById, addLikeCardById, deleteLikeCardById,
} = require('../controllers/cards');

cardsRouter.get('/', getAllCards);
cardsRouter.post('/', createCard);
cardsRouter.put('/:cardId/likes', addLikeCardById); // поставить лайк карточке
cardsRouter.delete('/:cardId/likes', deleteLikeCardById); // убрать лайк с карточки
cardsRouter.delete('/:cardId', deleteCardById);

module.exports = cardsRouter;
