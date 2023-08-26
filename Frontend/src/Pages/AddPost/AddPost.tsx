import React, {ChangeEvent, useEffect} from 'react';
import st from './AddPost.module.scss';
import {useNavigate, useParams} from "react-router-dom";
import {useAppSelector} from "../../redux/hook/hook";
import {selectIsAuthenticated} from "../../redux/Slices/authSlice";
import axios from "../../axios";
import 'react-quill/dist/quill.snow.css';
import AdvancedSettingsPost from "../../Components/AddPostComponents/advancedSettingsPost";
import PostMini from "../../Components/MiniPost/PostMini";
import SettingsPost from "../../Components/AddPostComponents/SettingsPost";
import {useCreatePost} from "../../hook/useCreatePost";
import {createSubmitPost} from "../../utils/CreateFunction/createSubmitPost";


export const AddPost = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const createPost = useCreatePost();

    const isAuth = useAppSelector(selectIsAuthenticated);
    const currentUser = useAppSelector(state => state.auth.data);
    const isEditPost:boolean = Boolean(id);


    const isValidation = () => {
        if ( createPost.title.length < 1 ||  createPost.text.length < 1) {
            createPost.setValidation(false)
            createPost.setStageAdvancedSettings(false)
        }
        else {
            createPost.setValidation(true)
            createPost.setStageAdvancedSettings(true)
        }
    }
     const calculatingReadingTime = (value:string): void => {

        let textReg = createPost.text.replace(/<[^>]*>/g, '');
        const averageReadingSpeed:number = 600;
        let additionalTime = 0;

        if (value === 'Простой') {
            additionalTime = 1;
        } else if (value === 'Средний') {
            additionalTime = 3;
        } else if (value === 'Сложный') {
            additionalTime = 4;
        }else additionalTime = 0;
        createPost.setReadingTime(Math.ceil((textReg.length / averageReadingSpeed) + additionalTime));
    }

    const handleChangeFile = async (event:ChangeEvent<HTMLInputElement>) => {
        try {
            const formData = new FormData();
            formData.append('image', event.target?.files[0]);
            const {data} = await axios.post('/upload', formData);
            createPost.setImageUrl(data.url);
        }catch (e) {
            console.log(`Ошибка при загрузке ${e}`)
        }
    };

    const onClickRemoveImage = (): void => {
        createPost.setImageUrl('');
    };

    useEffect(() => {
       if (id){
            axios.get(`/posts/${id}`).then( ({data}) => {
                createPost.handleSetTitle(data.title);
                createPost.handleSetText(data.text);
                createPost.handleSetTags(data.tags);
                createPost.handleSetKeywords(data.keywords.join(','));
                createPost.handleSetLevel(data.difficultyLevel)
                createPost.setReadingTime(data.readingTime)
                createPost.setImageUrl(data.imagePost)
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
                        !createPost.stageAdvancedSettings ?
                            <SettingsPost
                                title={createPost.title}
                                handleSetTitle={createPost.handleSetTitle}
                                text={createPost.text}
                                handleSetText={createPost.handleSetText}
                                currentUser={currentUser}
                                validation={createPost.validation}
                                isEditPost={isEditPost}

                            /> :
                            <AdvancedSettingsPost
                                tags={createPost.tags}
                                handleSetTags={createPost.handleSetTags}
                                keywords={createPost.keywords}
                                handleSetKeywords={createPost.handleSetKeywords}
                                level={createPost.level}
                                handleSetLevel={createPost.handleSetLevel}
                                handleChangeFile={handleChangeFile}
                                imageUrl={createPost.imageUrl}
                                onClickRemoveImage={onClickRemoveImage}
                                errorMessage={createPost.errorMessage}
                                readingTime={createPost.readingTime}
                                calculatingReadingTime={calculatingReadingTime}
                                isEditPost={isEditPost}
                            />

                    }

                    {
                        !createPost.stageAdvancedSettings ?
                            <button className={st.button} onClick={() => {
                                isValidation()
                                calculatingReadingTime('Не указан');
                            }}>{isEditPost ? 'Далее к редактированию': 'Далее к настройкам'}</button>
                            :
                            <div className={st.containerBtn}>
                                <button className={`${st.button} ${st.buttonPublic}`} onClick={() => createSubmitPost(isEditPost,id)}>{isEditPost ? 'Отредактировать' : 'Опубликовать пост'}</button>
                                <button className={`${st.button} ${st.buttonBack}`} onClick={() => createPost.setStageAdvancedSettings(false)}>Назад</button>
                            </div>
                    }
                </div>
            </div>

            <PostMini/>

        </div>
    );
};

export default AddPost;