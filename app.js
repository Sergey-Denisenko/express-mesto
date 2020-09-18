const express = require('express'); // подключаю express
const mongoose = require('mongoose'); // подключаю mongoose

const app = express(); // создаю приложение на express
const { PORT = 3000 } = process.env; // слущаю порт

mongoose.connect('mongodb://localhost:27017/mestodb', { // подключаюсь к серверу mongo
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const path = require('path');
const unknownPageRouter = require('express').Router(); // создаю роутер для запроса неизвестного адреса на сервере
const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');

const userSchema = new mongoose.Schema({ // Создаю схему userSchema
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    require: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    require: true,
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => /\d{3}-\d{3}-\d{4}/.test(v),
      message: (props) => `${props.value} is not a valid URL!`,
    },
    require: true,
  },
});
const cardSchema = new mongoose.Schema({ // Создаю схему cardSchema
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    require: true,
  },
  link: {
    type: String,
    require: true,
  },
  owner: {
    type: mongoose.ObjectId,
    require: true,
  },
  likes: {
    type: [mongoose.ObjectId],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

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
