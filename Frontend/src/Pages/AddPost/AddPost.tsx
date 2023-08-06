import React, {useCallback, useEffect, useMemo, useState} from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import {Link, useNavigate} from "react-router-dom";
import {useAppSelector} from "../../redux/hook/hook";
import {selectIsAuthenticated} from "../../redux/Slices/authSlice";

export const AddPost = () => {
    const navigate = useNavigate();
    let isAuth = useAppSelector(selectIsAuthenticated);
    const imageUrl = '';
    const [value, setValue] = useState(''); //text

    const handleChangeFile = () => {};

    const onClickRemoveImage = () => {};

    useEffect(() => {
        if (!window.localStorage.getItem('token') && !isAuth) navigate('/login')
        document.title = "IT Odyssey | CreatePost"
    },[]);

    const onChange = useCallback((value) => {
        setValue(value);
    }, []);

    const options = useMemo(
        () => ({
            spellChecker: false,
            maxHeight: '400px',
            autofocus: true,
            placeholder: 'Введите текст...',
            status: false,
            autosave: {
                enabled: true,
                delay: 10000,
                uniqueId: 'bond007',
            },
        }),
        [],
    );

    return (
        <div>
            <input type="file" onChange={handleChangeFile} />
            {imageUrl && (
                <button onClick={onClickRemoveImage}>
                    Удалить
                </button>
            )}
            {imageUrl && (
                <img src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
            )}

            <input placeholder="Заголовок статьи..."/>
            <input placeholder="Введите теги статьи..." />
            <input placeholder="Введите ключевые слова..." />

            <select>
                <option value="default">Не указан</option>
                <option value="easy">Простой</option>
                <option value="middle">Средний</option>
                <option value="hard">Сложный</option>
            </select>

            <div>Время на прочтение: (Автоматически)</div>

            <SimpleMDE className={styles.editor} value={value} onChange={onChange} options={options} />
            <div>
                <button> Опубликовать пост</button>
                <Link to="/"><button>Отмена</button></Link>
            </div>
        </div>
    );
};

export default AddPost;