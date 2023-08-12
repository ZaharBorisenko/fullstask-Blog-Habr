import {validationResult} from "express-validator";
import bcrypt from "bcrypt";
import Users from "../Models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const data = req.body;
    try {

        const userEmail =  await Users.findOne({email: req.body.email});
        if (userEmail){
            return res.status(404).json({
                message: 'Такой пользователь уже существует'
            });
        }

        const password = data.password;
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password,salt)


        const doc = new Users({
            firstName: data.firstName,
            lastName: data.lastName,
            aboutMe: data.aboutMe,
            avatar: data.avatar,
            nickName: data.nickName,
            email: data.email,
            privateProfile: data.privateProfile,
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
                message: 'Неверный логин или пароль'
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



export const updateProfiles = async (req,res) => {
    try {
        const user = await Users.findById(req.userId);


        const newFirstName = req.body.firstName;
        const newLastName = req.body.lastName;
        const newAboutMe = req.body.aboutMe;
        const newPrivateProfile = req.body.privateProfile

        if (newFirstName) {
            user.firstName = newFirstName;
        }

        if (newLastName) {
            user.lastName = newLastName;
        }
        if (newAboutMe) {
            user.aboutMe = newAboutMe;
        }
        if (newPrivateProfile !== undefined){
            user.privateProfile = newPrivateProfile;
        }

        await user.save();

        res.json(user._doc);

    }catch (e){
        console.log(e)
        res.status(403).json({
            message: 'Не удалось обновить профиль'
        })
    }
}

export const profileUser = async (req, res) => {
    try {
        const requestedUserId = req.params.id; // Получаем ID пользователя из параметра URL
        const user = await Users.findById(requestedUserId);
        if (!user) {
            return res.status(404).json({
                message: 'Пользователь с таким id не найден'
            });
        }

        // Вернуть информацию о пользователе в response
        res.json(user);
    } catch (e) {
        console.log(e);
    }
};