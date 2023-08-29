import express from "express";
import mongoose from 'mongoose';
import {loginValid, registerValid} from "./validation/auth.js";
import checkAuth from "./middleware/CheckAuth.js";
import {getAllUsers, login, profile, profileUser, register, updateProfiles} from "./Controllers/UserController.js";
import dotenv from 'dotenv';
import {fileURLToPath} from 'url';
dotenv.config()
import {
    create,
    getAll,
    getAllPostUser,
    getOnePost,
    getPopularity,
    remove,
    sortPopularity, sortPostsByReadingTime,
    update
} from "./Controllers/PostController.js";
import {createPostValidation, updatePostValidation} from "./validation/post.js";
import multer from 'multer'
import validationErrors from "./middleware/validationErrors.js";
import cors from 'cors'
import {AllTags, IdKeywords, IdTags} from "./Controllers/TagsController.js";
import {createComment, getCommentsByPost} from "./Controllers/CommentPostController.js";
import path from "path";
const app = express();
app.use(cors())
app.use(express.json());
mongoose.connect(process.env.MONGODB)
    .then(() => console.log('connect'))
    .catch((e) => console.log(`error ${e}`))


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
//
//
// const frontendBuildPath = path.join(__dirname, '../Frontend/dist'); // Путь к сборке фронтенда
// app.use(express.static(frontendBuildPath));
//
// // Обработка всех запросов, кроме API, направлять на index.html
// app.get('*', (req, res) => {
//     res.sendFile(path.join(frontendBuildPath, 'index.html'));
// });
//

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

//сортировка
app.get('/posts/popularitySort', sortPopularity);
app.get('/posts/readingTime', sortPostsByReadingTime);

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
app.get('/allTags',AllTags);
app.get('/posts/keywords/:keywords',IdKeywords);
//комментарии
app.get('/comments/:postId', getCommentsByPost)
app.post('/createComments/:postId',checkAuth, createComment);
// app.delete('/comments/:postId', )

app.listen(process.env.PORT, (e) => {
    if (e) return console.log(`ERROR ${e}`)
    console.log(`Сервер запущен на порту localhost:${process.env.PORT}`)
})