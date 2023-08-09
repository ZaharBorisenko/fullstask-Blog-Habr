import React, {useEffect, useState} from 'react';
import st from './AddPost.module.scss';
import {Link, useNavigate} from "react-router-dom";
import {useAppSelector} from "../../redux/hook/hook";
import {selectIsAuthenticated} from "../../redux/Slices/authSlice";
import axios from "../../axios";
import 'react-quill/dist/quill.snow.css';
import AdvancedSettingsPost from "../../Components/AddPostComponents/advancedSettingsPost";
import PostMini from "../../Components/MiniPost/PostMini";
import SettingsPost from "../../Components/AddPostComponents/SettingsPost";


export const AddPost = () => {
    const navigate = useNavigate();
    let isAuth = useAppSelector(selectIsAuthenticated);
    const currentUser = useAppSelector(state => state.auth.data);

    const [title, setTitle] = useState('');
    const [text, setText] = useState(''); //text
    const [tags, setTags] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [keywords, setKeywords] = useState('');
    const [level, setLevel] = useState('Не указан');
    // const [readingTime, setReadingTime] = useState(0);
    const [validation, setValidation] = useState(true);
    const [stageAdvancedSettings, setStageAdvancedSettings] = useState(false)
    // console.log({title,text,tags,imageUrl,keywords,level});
    const [errorMessage, setErrorMessage] = useState<object[]>([]);

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

    const createSubmitPost = async () => {
        try {
            const params = {
                title:title,
                text:text,
                tags:tags,
                imagePost: `http://localhost:4000/${imageUrl}`,
                keywords: keywords,
                difficultyLevel: level,
                // readingTime:readingTime,
            };
            const { data } = await axios.post('/posts', params);
            const idPost = data._id;
            navigate(`/posts/${idPost}`);
        }catch (error) {
            if (error.response || error.response.data || error.response.data.message) {
                console.log();
                setErrorMessage(error.response.data)
            }
        }
    }

    useEffect(() => {
        if (!window.localStorage.getItem('token') && !isAuth) navigate('/login')
        document.title = "IT Odyssey | CreatePost"
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
                            />

                    }

                    {
                        !stageAdvancedSettings ?
                            <button className={st.button} onClick={() => {
                                isValidation()
                            }}>Далее к настройкам</button>
                            :
                            <div className={st.containerBtn}>
                                <button className={`${st.button} ${st.publicBtn}`} onClick={createSubmitPost}>Опубликовать пост</button>
                                <button className={st.button} onClick={() => setStageAdvancedSettings(false)}>Вернуться к тексту</button>
                                {/*<button className={`${st.button} ${st.exitBtn}`} onClick={() => navigate('/')}>На главную</button>*/}
                            </div>
                    }
                </div>
            </div>

            <PostMini/>

        </div>
    );
};

export default AddPost;