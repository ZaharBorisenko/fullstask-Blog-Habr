import {body} from "express-validator"

export const registerValid = [
    body('firstName', 'Укажите имя').isLength({min: 2}),
    body('lastName','Укажите имя').isLength({min: 2}),
    body('avatar','Неверная ССЫЛКА на аватарку').optional().isURL(),
    body('email', 'Некорректная почта').isEmail(),
    body('password','Пароль должен состоять минимум из 5 символов').isLength({min:5}),
]