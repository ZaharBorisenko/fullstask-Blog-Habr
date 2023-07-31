import express from "express";
import mongoose from 'mongoose';
import {loginValid, registerValid} from "./validation/auth.js";
import checkAuth from "./middleware/CheckAuth.js";
import {login, profile, register} from "./Controllers/UserController.js";
import {create, getAll, getOnePost} from "./Controllers/PostController.js";
import {createPostValidation} from "./validation/post.js";

const app = express();
app.use(express.json());
mongoose.connect('mongodb+srv://ZaharWeb:3660253zahar@cluster0.rnt64hw.mongodb.net/blog')
    .then(() => console.log('connect'))
    .catch((e) => console.log(`error ${e}`))

//запросы на сервер req - принимаем данные,res отправляем данные
//РЕГИСТРАЦИЯ
app.post('/register', registerValid, register)
app.post('/login', loginValid, login);
app.get('/profile', checkAuth, profile)

//ПОСТЫ
app.get('/posts', getAll)
app.get('/posts/:id', getOnePost)
app.post('/posts',checkAuth,createPostValidation, create)
// app.delete('/posts', delete)
//app.patch('/posts', update)






















const port = 4000
app.listen(port, (e) => {
    if (e) return console.log(`ERROR ${e}`)
    console.log(`Сервер запущен на порту localhost:${port}`)
})