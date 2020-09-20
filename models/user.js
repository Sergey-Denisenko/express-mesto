const mongoose = require('mongoose');
// eslint-disable-next-line no-useless-escape
const regex = /^(https?:\/\/)([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?#?$/gm;
const userSchema = new mongoose.Schema({ // Создаю схему userSchema
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => regex.test(v),
      message: (props) => console.log(`${props.value} is not a valid URL!`), // console.log или alert
    },
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
