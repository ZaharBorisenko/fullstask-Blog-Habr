import React, {useEffect, useState} from 'react';
import st from './AddPost.module.scss';
import {useNavigate, useParams} from "react-router-dom";
import {useAppSelector} from "../../redux/hook/hook";
import {selectIsAuthenticated} from "../../redux/Slices/authSlice";
import axios from "../../axios";
import 'react-quill/dist/quill.snow.css';
import AdvancedSettingsPost from "../../Components/AddPostComponents/advancedSettingsPost";
import PostMini from "../../Components/MiniPost/PostMini";
import SettingsPost from "../../Components/AddPostComponents/SettingsPost";


export const AddPost = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    let isAuth = useAppSelector(selectIsAuthenticated);
    const currentUser = useAppSelector(state => state.auth.data);
    const [title, setTitle] = useState('');
    const [text, setText] = useState(''); //text
    const [tags, setTags] = useState('');
    const [imageUrl, setImageUrl] = useState('uploads/Image-Place-Holder.jpg');
    const [keywords, setKeywords] = useState('');
    const [level, setLevel] = useState('Не указан');
    const [readingTime, setReadingTime] = useState(0);
    const [validation, setValidation] = useState(true);
    const [stageAdvancedSettings, setStageAdvancedSettings] = useState(false)
    const [errorMessage, setErrorMessage] = useState<[]>([]);

    const isEditPost = Boolean(id);

    const handleSetTags = (value) => {
        setTags(value)
    }
    const handleSetKeywords = (value) => {
        setKeywords(value)
    }
    const handleSetLevel = (value) => {
        setLevel(value)
    }
    const handleSetTitle = (value) => {
        setTitle(value)
    }
    const handleSetText = (value) => {
        setText(value)
    }

    //ТАК КАК РЕДАКТОР ДОБАВЛЯЕТ НЕКОТОРЫЕ ТЕГИ В ТЕКСТ,НУЖНО ИХ УБРАТЬ C ПОМОЩЬЮ РЕГУЛЯРНОГО ВЫРАЖЕНИЯ,
    // ЧТОБЫ ВРЕМЯ ПРОЧТЕНИЯ СЧИТАЛОСЬ КОРРЕКТНО
    const calculatingReadingTime = (value) => {
        let textReg = text.replace(/<[^>]*>/g, '');
        const averageReadingSpeed = 300;
        let additionalTime = 0;

        if (value === 'Простой') {
            additionalTime = 1;
        } else if (value === 'Средний') {
            additionalTime = 3;
        } else if (value === 'Сложный') {
            additionalTime = 4;
        }else additionalTime = 0;
        setReadingTime(Math.ceil((textReg.length / 300) + additionalTime));
    }

    const isValidation = () => {
        if (title.length < 1 || text.length < 1) {
            setValidation(false)
            setStageAdvancedSettings(false)
        }
        else {
            setValidation(true)
            setStageAdvancedSettings(true)
        }
    }
    console.log(tags);

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

    useEffect(() => {
       if (id){
            axios.get(`/posts/${id}`).then( ({data}) => {
                setTitle(data.title);
                setText(data.text);
                setTags(data.tags);
                setKeywords(data.keywords.join(','));
                setLevel(data.difficultyLevel)
                setReadingTime(data.readingTime)
                setImageUrl(data.imagePost)
            })
       }
    },[])

    const keywordRefactor = (tags) => {
        if (tags) return tags.map(item => item.value)
    }
    console.log(keywords);

    const createSubmitPost = async () => {
        try {
            const params = {
                title:title,
                text:text,
                tags:keywordRefactor(tags),
                imagePost: `${imageUrl === '' ? 'uploads/Image-Place-Holder.jpg' : imageUrl}`,
                keywords: keywords,
                difficultyLevel: level,
                readingTime: readingTime,
            };

            const { data } = isEditPost ? await axios.patch(`/posts/${id}`, params) : await axios.post('/posts', params);


            const idPost = isEditPost ? id : data._id;

            navigate(`/posts/${idPost}`);
        }catch (error) {
            if (error.response || error.response.data || error.response.data.message) {
                setErrorMessage(error.response.data)
            }
        }
    }

    useEffect(() => {
        if (!window.localStorage.getItem('token') && !isAuth) navigate('/login')
        if (isEditPost) {
            document.title = "IT Odyssey | UpdatePost"
        }else {
            document.title = "IT Odyssey | CreatePost"
        }
    }, []);

    return (
        <div className={st.container}>

            <div className={st.containerPost}>
                <div className={st.post}>

                    {
                        !stageAdvancedSettings ?
                            <SettingsPost
                                title={title}
                                handleSetTitle={handleSetTitle}
                                text={text}
                                handleSetText={handleSetText}
                                currentUser={currentUser}
                                validation={validation}
                                isEditPost={isEditPost}

                            /> :
                            <AdvancedSettingsPost
                                tags={tags}
                                handleSetTags={handleSetTags}
                                keywords={keywords}
                                handleSetKeywords={handleSetKeywords}
                                level={level}
                                handleSetLevel={handleSetLevel}
                                handleChangeFile={handleChangeFile}
                                imageUrl={imageUrl}
                                onClickRemoveImage={onClickRemoveImage}
                                errorMessage={errorMessage}
                                readingTime={readingTime}
                                calculatingReadingTime={calculatingReadingTime}
                                isEditPost={isEditPost}
                            />

                    }

                    {
                        !stageAdvancedSettings ?
                            <button className={st.button} onClick={() => {
                                isValidation()
                                calculatingReadingTime('Не указано');
                            }}>{isEditPost ? 'Далее к редактированию': 'Далее к настройкам'}</button>
                            :
                            <div className={st.containerBtn}>
                                <button className={`${st.button} ${st.buttonPublic}`} onClick={createSubmitPost}>{isEditPost ? 'Отредактировать' : 'Опубликовать пост'}</button>
                                <button className={`${st.button} ${st.buttonBack}`} onClick={() => setStageAdvancedSettings(false)}>Назад</button>
                            </div>
                    }
                </div>
            </div>

            <PostMini/>

        </div>
    );
};

export default AddPost;