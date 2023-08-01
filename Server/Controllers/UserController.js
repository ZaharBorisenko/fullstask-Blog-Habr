import {validationResult} from "express-validator";
import bcrypt from "bcrypt";
import Users from "../Models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const data = req.body;
    try {

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
}

export const login = async (req,res) => {
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
}

export const profile = async (req,res) => {
    try {
        const user = await Users.findById(req.userId);
        if (!user){
            return res.status(404).json({
                message: 'Пользователь с таким id не найден'
            })
        }

        // const token = jwt.sign({
        //     _id: user._id
        // },'bond007',{expiresIn: '30d'});

        res.json(user._doc);


    }catch (e) {
        console.log(e);
    }
}