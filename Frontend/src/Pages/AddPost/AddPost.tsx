import {ChangeEvent, useEffect, useState} from 'react';
import st from './AddPost.module.scss';
import {useNavigate, useParams} from "react-router-dom";
import {useAppSelector} from "../../redux/hook/hook";
import {selectIsAuthenticated} from "../../redux/Slices/authSlice";
import axios from "../../axios";
import 'react-quill/dist/quill.snow.css';
import AdvancedSettingsPost from "../../Components/AddPostComponents/advancedSettingsPost";
import PostMini from "../../Components/MiniPost/PostMini";
import SettingsPost from "../../Components/AddPostComponents/SettingsPost";
import {errorMessageType, tagsType} from "../../utils/Types";
import {toast} from "react-toastify";
import {AxiosError} from "axios";


export const AddPost = () => {
    const navigate = useNavigate();
    const {id} = useParams();

    const isAuth = useAppSelector(selectIsAuthenticated);
    const currentUser = useAppSelector(state => state.auth.data);
    const isEditPost:boolean = Boolean(id);


    const [title, setTitle] = useState<string>('');
    const [text, setText] = useState<string>('');
    const [tags, setTags] = useState<Array<tagsType>>([]);
    const [imageUrl, setImageUrl] = useState<string>('uploads/Image-Place-Holder.jpg');
    const [keywords, setKeywords] = useState<string>('');
    const [level, setLevel] = useState<string>('Не указан');
    const [readingTime, setReadingTime] = useState<number>(0);
    const [validation, setValidation] = useState<boolean>(true);
    const [stageAdvancedSettings, setStageAdvancedSettings] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<Array<errorMessageType>>([]);

    const handleSetTags = (value:Array<tagsType>): void => {
        console.log(value)
        setTags(value)
    }
    const handleSetKeywords = (value:string): void => {
        setKeywords(value)
    }
    const handleSetLevel = (value:string): void => {
        setLevel(value)
    }
    const handleSetTitle = (value:string): void => {
        setTitle(value)
    }
    const handleSetText = (value:string): void => {
        setText(value)
    }

    const tagsRefactor = (tags:Array<tagsType>) => {
    if (tags) return tags.map(item => item.value)
}

    const createSubmitPost = async () => {
        try {
            const params = {
                title:title,
                text:text,
                tags:tagsRefactor(tags),
                imagePost: `${imageUrl === '' ? 'uploads/Image-Place-Holder.jpg' : imageUrl}`,
                keywords: keywords,
                difficultyLevel: level,
                readingTime: readingTime,
            };

            const { data } = isEditPost ? await axios.patch(`/posts/${id}`, params) : await axios.post('/posts', params);
            toast.success(`${isEditPost? 'Пост успешно отредактирован' : 'Пост успешно создан'}`,{
                autoClose: 1500,
            });
            const idPost = isEditPost ? id : data._id;

            navigate(`/posts/${idPost}`);
        }catch (error: unknown) {
            if (error instanceof AxiosError) {
                if (error.response && error.response.data && error.response.data.message) {
                    setErrorMessage(error.response.data.message);
                }
            }
        }
    }


    const isValidation = () => {
        if ( title.length < 1 ||  text.length < 1) {
            setValidation(false)
            setStageAdvancedSettings(false)
        }
        else {
            setValidation(true)
            setStageAdvancedSettings(true)
        }
    }
     const calculatingReadingTime = (value:string): void => {

        let textReg = text.replace(/<[^>]*>/g, '');
        const averageReadingSpeed:number = 600;
        let additionalTime = 0;

        if (value === 'Простой') {
            additionalTime = 1;
        } else if (value === 'Средний') {
            additionalTime = 3;
        } else if (value === 'Сложный') {
            additionalTime = 4;
        }else additionalTime = 0;
        setReadingTime(Math.ceil((textReg.length / averageReadingSpeed) + additionalTime));
    }

    const handleChangeFile = async (event:ChangeEvent<HTMLInputElement>) => {
        try {
            const formData = new FormData();
            formData.append('image', event.target?.files![0]);
            const {data} = await axios.post('/upload', formData);
            setImageUrl(data.url);
        }catch (e) {
            console.log(`Ошибка при загрузке ${e}`)
        }
    };

    const onClickRemoveImage = (): void => {
        setImageUrl('');
    };

    useEffect(() => {
       if (id){
            axios.get(`/posts/${id}`).then( ({data}) => {
                handleSetTitle(data.title);
                handleSetText(data.text);
                handleSetTags(data.tags);
                handleSetKeywords(data.keywords.join(','));
                handleSetLevel(data.difficultyLevel)
                setReadingTime(data.readingTime)
                setImageUrl(data.imagePost)
            })
       }
    },[])


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
                                calculatingReadingTime('Не указан');
                            }}>{isEditPost ? 'Далее к редактированию': 'Далее к настройкам'}</button>
                            :
                            <div className={st.containerBtn}>
                                <button className={`${st.button} ${st.buttonPublic}`} onClick={() => createSubmitPost()}>{isEditPost ? 'Отредактировать' : 'Опубликовать пост'}</button>
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