import React, {useCallback, useEffect, useMemo, useState} from 'react';
import st from './AddPost.module.scss';
import {Link, useNavigate} from "react-router-dom";
import {useAppSelector} from "../../redux/hook/hook";
import {selectIsAuthenticated} from "../../redux/Slices/authSlice";
import axios from "../../axios";

//редактор
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export const AddPost = () => {
    const navigate = useNavigate();
    let isAuth = useAppSelector(selectIsAuthenticated);

    const [title, setTitle] = useState('');
    const [text, setText] = useState(''); //text
    const [tags, setTags] = useState('');
    console.log(text)

    const [imageUrl, setImageUrl] = useState('');

    const [keywords, setKeywords] = useState('');
    const [level, setLevel] = useState('Не указан');
    // const [readingTime, setReadingTime] = useState(0);
    // console.log({title,text,tags,keywords,level,imageUrl});

    const handleChangeFile = async (event) => {
        try {
            const formData = new FormData();
            formData.append('image', event.target.files[0]);
            const {data} = await axios.post('/upload', formData);
            setImageUrl(data.url);
        }catch (e) {
            console.log(`Ошибка при загрузке ${e}`)
        }
    };

    const onClickRemoveImage = () => {
        setImageUrl('');
    };
    //readingTime
    //формула: легкий лвл * 1.5, средний: 2,5: тяжелый: 4
    const textLength = text.length;
    const readingTime = (textLength * 2.5) / 120;


    const createSubmitPost = async () => {
        try {
            const params = {
                title:title,
                text:text,
                tags:tags,
                imagePost: `http://localhost:4000/${imageUrl}`,
                keywords: keywords,
                difficultyLevel: level,
                readingTime:readingTime,
            };
            const { data } = await axios.post('/posts', params);

            const idPost = data._id;

            navigate(`/posts/${idPost}`);
        }catch (e) {
            console.log(`Ошибка создания поста ${e}`);
        }
    }

    useEffect(() => {
        if (!window.localStorage.getItem('token') && !isAuth) navigate('/login')
        document.title = "IT Odyssey | CreatePost"
    }, []);

    const modules = {
        toolbar: [
            [{header: [1,2,3,4,5,6,false]}],
            [{font: []}],
            [{size: []}],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
                {list: "ordered"},
                {list: "bullet"},
                {indent: "-1"},
                {indent: "+1"},
            ],
            ["image", "video", "link"],
        ]
    }


    return (
        <div>
            <input type="file" onChange={handleChangeFile}/>

            {imageUrl && (

                <div>
                    <img src={`http://localhost:4000/${imageUrl}`} alt="Uploaded"/>

                    <button onClick={onClickRemoveImage}>
                        Удалить
                    </button>
                </div>
            )}

            <div>
                <input value={title} onChange={event => setTitle(event.target.value)} placeholder="Заголовок статьи..."/>
            </div>

            <div>
                <input value={tags} onChange={event => setTags(event.target.value)} placeholder="Введите ключевые слова..."/>
            </div>

            <div>
                <input value={keywords} onChange={event => setKeywords(event.target.value)} placeholder="Введите теги статьи..."/>
            </div>


            <select value={level} onChange={event => setLevel(event.target.value)}>
                <option>Выберите уровень</option>
                <option value="Простой">Простой</option>
                <option value="Средний">Средний</option>
                <option value="Сложный">Сложный</option>
            </select>

            <div>Время на прочтение: (Автоматически)</div>

            <div className={st.editor}>
                <ReactQuill theme="snow" value={text} onChange={setText} modules={modules}/>
            </div>

            <div>
                <button onClick={createSubmitPost}>Опубликовать пост</button>
                <Link to="/">
                    <button>Отмена</button>
                </Link>
            </div>
        </div>
    );
};

export default AddPost;