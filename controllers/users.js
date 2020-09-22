const User = require('../models/user'); // импортирую модель user
// eslint-disable-next-line no-unused-vars
const getAllUsers = (req, res) => { // роутер чтения документа
  User.find({}) // нахожу все пользователей
    .orFail(new Error('GetUsersError'))
    .then((users) => {
      res.send({ data: users });
    })
    // eslint-disable-next-line no-unused-vars
    .catch((err) => {
      if (err.message === 'GetUsersError') {
        res.status(404).send({ message: 'Not Found / Пользователи не найдены' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const getUserById = (req, res) => { // роутер чтения документа
  User.findById(req.params.userId) // нахожу пользователя по запросу параметра id
    .orFail(new Error('NoUserId'))
    .then((user) => res.status(200).send({ data: user }))
    // eslint-disable-next-line no-unused-vars
    .catch((err) => {
      if (err.message === 'NoUserId') {
        res.status(404).send({ message: 'User Id Not Found / Нет пользователя с таким Id' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Bad Request / Неверный запрос' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// eslint-disable-next-line no-unused-vars
const createUser = (req, res) => { // роутер создания документа
  const { name, about, avatar } = req.body; // получаю из объекта запроса данные:имя,описание,avatar
  User.create({ name, about, avatar }) // создаю документ на основе полученных(пришедших) данных
    .then((user) => {
      res.send({ data: user });
    })
    // eslint-disable-next-line no-unused-vars
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Bad Request / Неверный запрос' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const updateProfileUser = (req, res) => { // роутер редактирования профиля пользователя
  const { name, about } = req.body; // получаю из объекта запроса данные:имя,описание,avatar
  // создаю обновленный документ на основе пришедших данных
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      res.send({ data: user });
    })
    // eslint-disable-next-line no-unused-vars
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Bad Request / Неверный запрос' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const updateAvatarUser = (req, res) => { // роутер редактирования профиля пользователя
  const { avatar } = req.body; // получаю из объекта запроса данные:имя,описание,avatar
  // создаю обновленный документ на основе пришедших данных
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((userAvatar) => {
      res.send({ data: userAvatar });
    })
    // eslint-disable-next-line no-unused-vars
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Bad Request / Неверный запрос' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports = {
  getAllUsers, getUserById, createUser, updateProfileUser, updateAvatarUser,
};
