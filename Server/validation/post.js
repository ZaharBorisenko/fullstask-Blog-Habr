import {body} from "express-validator"

export const createPostValidation = [
    body('title','Введите заголовок статьи(Не менее 5 символов)').isLength({min: 5}).isString(),
    body('text','Введите текст статьи(Не менее 20 символов)').isLength({min: 20}).isString(),
    body('tags','Выберите теги для статьи').isString(), //isString??
    body('imagePost', 'неверная ссылка на изображение').optional().isString(),
    body('keywords', 'Выберите ключевые слова').isString(), //isString??
    body('difficultyLevel', 'Выберите уровень сложности').optional().isString(),
]
export const updatePostValidation = [
    body('title','Введите заголовок статьи(Не менее 5 символов)').optional().isLength({min: 5}).isString(),
    body('text','Введите текст статьи(Не менее 20 символов)').optional().isLength({min: 20}).isString(),
    body('tags','Выберите теги для статьи').optional().isString(), //isString??
    body('imagePost', 'неверная ссылка на изображение').optional().optional().isString(),
    body('keywords', 'Выберите ключевые слова ').optional().isString(), //isString??
    body('difficultyLevel', 'Выберите уровень сложности').optional().isString(),
]