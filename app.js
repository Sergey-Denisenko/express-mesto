const express = require('express');

const app = express();
const { PORT = 3000 } = process.env;

const path = require('path');
const unknownPageRouter = require('express').Router(); // создание роутера для запроса неизвестного адреса на сервере
const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');

// Роутер для запроса неизвестного адреса на сервере
unknownPageRouter.all('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

// Роутинг
app.use('/users', usersRouter); // Запуск usersRouter
app.use('/cards', cardsRouter); // Запуск usersRouter
app.use(express.static(path.join(__dirname, 'public'))); // теперь клиент имеет доступ только к публичным файлам//
app.use(unknownPageRouter); // Запуск unknownPageRouter

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`); // Вывод в консоль порта, который слушает приложение
});
