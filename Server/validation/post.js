import {body} from "express-validator"

export const createPostValidation = [
    body('title','Введите заголовок статьи').isLength({min: 5}).isString(),
    body('text','Введите текст статьи').isLength({min: 50}).isString(),
    body('tags','Выберите теги для статьи').isString(),
    body('imagePost', 'неверная ссылка на изображение').optional().isString(),
    body('keywords', 'Выберите ключевые слова ').optional().isString(),
    body('difficultyLevel', 'Выберите уровень сложности').isString(),
]