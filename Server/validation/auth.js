import {body} from "express-validator"

export const registerValid = [
    body('firstName', 'Укажите имя').optional().isLength({min: 2}),
    body('lastName','Укажите имя').optional().isLength({min: 2}),
    body('avatar','Неверная ССЫЛКА на аватарку').optional(),

    body('nickName','Укажите ваш никнейм').isLength({min: 2}),
    body('email', 'Некорректная почта').isEmail(),
    body('password','Пароль должен состоять минимум из 5 символов').isLength({min:5}),
]




export const loginValid = [
    body('email', 'Некорректная почта').isEmail(),
    body('password','Пароль должен состоять минимум из 5 символов').isLength({min:5}),
]