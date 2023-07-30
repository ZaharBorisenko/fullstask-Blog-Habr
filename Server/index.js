import express from "express";
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import {validationResult} from "express-validator";

import {registerValid} from "./validation/auth.js";
import Users from "./Models/User.js";




const app = express();
app.use(express.json());
mongoose.connect('mongodb+srv://ZaharWeb:3660253zahar@cluster0.rnt64hw.mongodb.net/blog')
    .then(() => console.log('connect'))
    .catch((e) => console.log(`error ${e}`))

//запросы на сервер req - принимаем данные,res отправляем данные
app.post('/register', registerValid,async (req, res) => {
    try {

        const errors = validationResult(req);
        const data = req.body;

        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const password = data.password;
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password,salt)


        const doc = new Users({
            firstName: data.firstName,
            lastName: data.lastName,
            avatar: data.avatar,
            email: data.email,
            passwordHash,
        })
        const user = await doc.save();

        const token = jwt.sign({
            _id: user._id
        },'bond007',{expiresIn: '30d'});


        res.json({
            ...user._doc,
            token,
        });
    }catch (e) {
        console.log(e)
        res.status(500).json({
            message: `Ошибка регистрации`
        })
    }
})
app.post('/login', async (req,res) => {
    try {
        const user =  await Users.findOne({email: req.body.email});
        if (!user){
            return res.status(404).json({
                message: 'Пользователь не найден'
            });
        }
        const isValidPost = await bcrypt.compare(req.body.password, user.passwordHash);
        if (!isValidPost){
            return res.status(404).json({
                message: 'Неверный логин или пароль'
            });
        }

        const token = jwt.sign({
            _id: user._id
        },'bond007',{expiresIn: '30d'});

        res.json({
            ...user._doc,
            token,
        });

    }catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Не удалось войти"
        });
    }
});

const port = 4000
app.listen(port, (e) => {
    if (e) return console.log(`ERROR ${e}`)
    console.log(`Сервер запущен на порту localhost:${port}`)
})