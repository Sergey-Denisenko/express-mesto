const usersRouter = require('express').Router(); // создание роутера для работы с пользователями
const {
  getAllUsers, getUserById, createUser, updateProfileUser, updateAvatarUser,
} = require('../controllers/users');

usersRouter.get('/', getAllUsers);
usersRouter.get('/:userId', getUserById);
usersRouter.post('/', createUser);
usersRouter.patch('/me', updateProfileUser); // обновляю профиль
usersRouter.patch('/me/avatar', updateAvatarUser); // обновляю аватар

module.exports = usersRouter;
