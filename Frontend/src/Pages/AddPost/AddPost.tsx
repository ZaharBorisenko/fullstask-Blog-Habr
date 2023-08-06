import React, {useCallback, useMemo, useState} from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import {Link} from "react-router-dom";

export const AddPost = () => {
    const imageUrl = '';
    const [value, setValue] = useState('');

    const handleChangeFile = () => {};

    const onClickRemoveImage = () => {};

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
        <div style={{ padding: 30 }}>
            <input type="file" onChange={handleChangeFile} />
            {imageUrl && (
                <button onClick={onClickRemoveImage}>
                    Удалить
                </button>
            )}
            {imageUrl && (
                <img src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
            )}
            <br />
            <br />
            <input placeholder="Заголовок статьи..."/>
            <input placeholder="Введите ключевые слова..." />
            <SimpleMDE className={styles.editor} value={value} onChange={onChange} options={options} />
            <div>
                <button> Опубликовать</button>
                <Link to="/"><button>Отмена</button></Link>
            </div>
        </div>
    );
};

export default AddPost;