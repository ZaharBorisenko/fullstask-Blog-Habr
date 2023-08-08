import React, {ChangeEventHandler, FC} from 'react';
import {Link} from "react-router-dom";
import st from './advancedSettingsPost.module.scss'

type PropsType = {
    tags:string,
    handleSetTags: (value:string) => void,
    keywords:string,
    handleSetKeywords: (value:string) => void,
    level: string,
    handleSetLevel:(value:string) => void,
    handleChangeFile:(event:any) => void;
    imageUrl:string
    onClickRemoveImage: () => void
};

const AdvancedSettingsPost:FC<PropsType> = ({tags,handleSetTags,keywords,handleSetKeywords,level,handleSetLevel,handleChangeFile,imageUrl,onClickRemoveImage}) => {
    return (
        <div>

            <div className={st.title}>Настройки публикации</div>

            <div className={st.container}>
                <div>
                    <label className={st.label}>*Ключевые слова</label>
                    <input className={st.input} value={keywords} onChange={event => handleSetKeywords(event.target.value)} placeholder="Введите теги"/>
                    <p className={`${st.correction} ${st.correctionBottom}`}>Выберите от 1 до 5 тегов по теме публикации</p>
                </div>

                <div>
                    <label className={st.label}>*Теги</label>
                    <input className={st.input} value={tags} onChange={event => handleSetTags(event.target.value)} placeholder="Ключевые слова..."/>
                    <p className={st.correction}>Введите сюда от 1 до 10 ключевых слов, отделяя их запятыми</p>
                </div>

                <div>
                    <p className={st.label}>Выберите уровень сложности статьи</p>
                    <select className={st.select} value={level} onChange={event => handleSetLevel(event.target.value)}>
                        <option>Выберите уровень</option>
                        <option value="Простой">Простой</option>
                        <option value="Средний">Средний</option>
                        <option value="Сложный">Сложный</option>
                    </select>
                </div>

                <div>
                    <label className={st.label}>Добавить превью</label>
                    <input type="file" onChange={handleChangeFile}/>

                    {imageUrl && (

                        <div>
                            <img className={st.img} src={`http://localhost:4000/${imageUrl}`} alt="Uploaded"/>

                            <button className={st.removeBtn} onClick={onClickRemoveImage}>
                                Удалить превью
                            </button>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default AdvancedSettingsPost;