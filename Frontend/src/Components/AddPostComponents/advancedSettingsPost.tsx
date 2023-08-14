import React, {FC, LegacyRef, useRef} from 'react';
import st from './advancedSettingsPost.module.scss'
import InputTags from "../InputTags/InputTags";

type PropsType = {
    tags:string,
    handleSetTags: (value:string) => void,
    keywords:string,
    handleSetKeywords: (value:string) => void,
    level: string,
    handleSetLevel:(value:string) => void,
    handleChangeFile:(event:any) => void,
    imageUrl:string,
    onClickRemoveImage: () => void,
    errorMessage: [],
    readingTime: number,
    calculatingReadingTime: (value:string) => void,
    isEditPost:boolean
};

const AdvancedSettingsPost:FC<PropsType> = ({isEditPost, calculatingReadingTime, readingTime,errorMessage,tags,handleSetTags,keywords,handleSetKeywords,level,handleSetLevel,handleChangeFile,imageUrl,onClickRemoveImage}) => {

    console.log(tags.length)
    console.log(keywords.length)
    //правильное склонение
    function declOfNum(number, words) {
        return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];
    }

    const refFiles = useRef<any>();

    return (
        <div>

            <div className={st.title}>{isEditPost ? 'Редактирование статьи' : 'Настройки публикации'}</div>

            <div className={st.container}>

                <div>
                    <label style={{marginTop: "20px"}} className={st.label}>*Теги</label>
                    <InputTags value={tags} handleSetKeywords={handleSetTags} placeholder="Ключевые слова"/>
                    <p className={st.correction}>Выберите от 1 до 5 тегов по теме публикации</p>
                    {
                        tags.length < 1 && <p className={st.ErrorInputSettings}>{errorMessage[0]?.msg || errorMessage[1]?.msg}</p>
                    }
                </div>

                <div>
                    <label className={st.label}>*Ключевые слова</label>
                    <input className={st.input} value={keywords} onChange={event => handleSetKeywords(event.target.value)} placeholder="Ключевые слова"/>
                    <p className={st.correction}>Введите сюда от 1 до 10 ключевых слов, отделяя их запятыми</p>
                    {
                        keywords.length < 1 && <p className={st.ErrorInputSettings}>{errorMessage[1]?.msg || errorMessage[0]?.msg}</p>
                    }
                </div>

                <div>
                    <p className={st.label}>Уровень сложности статьи</p>
                    <select className={st.select} value={level} onChange={event => {
                        handleSetLevel(event.target.value)
                        calculatingReadingTime(event.target.value);
                    }}>
                        <option>Выберите уровень</option>
                        <option value="Простой">Простой</option>
                        <option value="Средний">Средний</option>
                        <option value="Сложный">Сложный</option>
                    </select>
                    <p className={`${st.correction} ${st.correctionBottom}`}>Необязательный параметр</p>
                </div>

                <div className={st.readingTime}>
                    Время прочтения статьи: {
                    readingTime ?
                        <p className={st.readingTimeText}>
                            <span style={{marginRight: "3px"}}>{readingTime}</span>
                            <span>{declOfNum(readingTime, ['минута', 'минуты', 'минут'])}</span>
                        </p>
                    : ''
                }
                </div>
                <p className={st.correction}>Определяется автоматически</p>

                <div>
                    <p className={`${st.label} ${st.labelImg}`}>Превью - картинка которая будет отображаться на странице постов</p>
                    <input type="file" onChange={handleChangeFile} ref={refFiles} hidden={true}/>
                    <button className={st.download} onClick={() => refFiles.current.click()}>Загрузить превью</button>
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