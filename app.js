const express = require('express'); // подключаю express
const mongoose = require('mongoose'); // подключаю mongoose
const bodyParser = require('body-parser'); // подключаю body-parser

const app = express(); // создаю приложение на express

mongoose.connect('mongodb://localhost:27017/mestodb', { // подключаюсь к серверу mongo
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const { PORT = 3000 } = process.env; // слущаю порт

// const path = require('path');
const unknownPageRouter = require('express').Router(); // создаю роутер для запроса неизвестного адреса на сервере
const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');

// Роутер для запроса неизвестного адреса на сервере
unknownPageRouter.all('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

// eslint-disable-next-line max-len
app.use((req, res, next) => { // Временное решение авторизации, мидлвэр который добавляет в каждый запрос объект user
  req.user = {
    _id: '5f66030c4209ed3107201166', // _id тестового пользователя
  };

  next();
});

// Роутинг
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', usersRouter); // Запуск usersRouter
app.use('/cards', cardsRouter); // Запуск cardsRouter
app.use(unknownPageRouter); // Запуск unknownPageRouter

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`); // Вывод в консоль порта, кот. слушает приложение
});
