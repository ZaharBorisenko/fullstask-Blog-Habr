import express from "express";
import mongoose from 'mongoose';
import {loginValid, registerValid} from "./validation/auth.js";
import checkAuth from "./middleware/CheckAuth.js";
import {getAllUsers, login, profile, profileUser, register, updateProfiles} from "./Controllers/UserController.js";
import {
    create,
    getAll,
    getAllPostUser,
    getOnePost,
    getPopularity,
    remove,
    update
} from "./Controllers/PostController.js";
import {createPostValidation, updatePostValidation} from "./validation/post.js";
import multer from 'multer'
import validationErrors from "./middleware/validationErrors.js";
import cors from 'cors'
import {IdKeywords, IdTags} from "./Controllers/TagsController.js";
const app = express();
app.use(cors())
app.use(express.json());
mongoose.connect('mongodb+srv://ZaharWeb:3660253zahar@cluster0.rnt64hw.mongodb.net/blog')
    .then(() => console.log('connect'))
    .catch((e) => console.log(`error ${e}`))

//=== загрузка картинок на сервер.
app.use('/uploads',express.static('uploads'))

const storage = multer.diskStorage({
    destination: (_, __, cb) => cb(null, 'uploads'),
    filename: (_, file, cb) => cb(null, file.originalname)
});
const upload = multer({ storage })
app.post('/upload', checkAuth, upload.single('image'),(req,res) => {
    res.json({
        url: `uploads/${req.file.originalname}`
    })
});

//РЕГИСТРАЦИЯ
app.post('/register', registerValid, validationErrors  , register);
app.post('/login', loginValid,validationErrors , login);
app.get('/profile', checkAuth, profile);
app.get('/user/:id', checkAuth, profileUser);
app.patch('/user/:id',checkAuth, updateProfiles);

//ПОСТЫ
app.get('/posts', getAll)
app.get('/postsUser', getAllPostUser)
app.get('/posts/popularity', getPopularity)
app.get('/posts/:id', getOnePost)
app.post('/posts',checkAuth,createPostValidation,validationErrors , create)
app.delete('/posts/:id', checkAuth, remove)
app.patch('/posts/:id', checkAuth, updatePostValidation,validationErrors, update)
app.get('/users', getAllUsers);
app.get('/posts/tag/:tag',IdTags);
app.get('/posts/keywords/:keywords',IdKeywords);




















const port = 4000
app.listen(port, (e) => {
    if (e) return console.log(`ERROR ${e}`)
    console.log(`Сервер запущен на порту localhost:${port}`)
})