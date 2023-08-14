import {body} from "express-validator"

export const createPostValidation = [
    body('title','Введите заголовок статьи(Не менее 1 символа)').isLength({min: 1}).isString(),
    body('text','Введите текст статьи(Не менее 1 символа)').isLength({min: 1}).isString(),
    body('tags','Поле является обязательным!').isLength({min: 1}).isArray(), //isString??
    body('imagePost', 'неверная ссылка на изображение').optional().isString(),
    body('keywords', 'Поле является обязательным!').isLength({min: 1}).isString(), //isString??
    body('difficultyLevel', 'Выберите уровень сложности').optional().isString(),
]
export const updatePostValidation = [
    body('title','Введите заголовок статьи(Не менее 1 символа)').optional().isLength({min: 1}).isString(),
    body('text','Введите текст статьи(Не менее 1 символа)').optional().isLength({min: 1}).isString(),

    body('tags','Поле является обязательным!').optional().isArray().custom(value => {
        if (value.length < 1) {
            throw new Error('Выберите как минимум один тег');
        }
        return true;
    }),

    body('imagePost', 'неверная ссылка на изображение').optional().isString(),
    body('keywords', 'Поле является обязательным!').isLength({min: 1}).optional().isString(), //isString??
    body('difficultyLevel', 'Выберите уровень сложности').optional().isString(),
]