import React, {FC, useState} from 'react';
import ReactQuill from "react-quill";
import {IUser} from "../../redux/Slices/postSlice";
import 'react-quill/dist/quill.snow.css';
import st from './settingPost.module.scss'
import '../../assets/styles/global.css'

type propsTypes = {
    title: string,
    handleSetTitle: (value: string) => void
    text: string,
    handleSetText: (value: string) => void,
    currentUser: IUser
    validation :boolean
}
const SettingsPost: FC<propsTypes> = ({title, text, handleSetText, handleSetTitle, currentUser,validation}) => {
    const modules = {
        toolbar: [
            [{ 'header': 1 }, { 'header': 2 }],
            [{header: [1, 2, 3, 4, 5, 6, false]}],
            [{font: []}],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'color': [] }, { 'background': [] }],
            [
                {list: "ordered"},
                {list: "bullet"},
                {indent: "-1"},
                {indent: "+1"},
            ],
            [{ 'align': [] }],
            ["image", "video", "link"],
        ]
    }
    console.log(validation)
    return (
        <div>

            <div className={st.user}>
                <img className={st.avatar} src={currentUser.avatar} alt=""/>
                <p className={st.name}>{currentUser.nickName}</p>
            </div>

            <div className={st.inputs}>
                <div>
                    <input
                        className={st.titleInput}
                        value={title}
                        onChange={event => handleSetTitle(event.target.value)}
                        placeholder="Заголовок..."
                    />
                    {
                        !validation && title.length < 1 ? <p className={st.error}>Длинна заголовка не менее 1 символа</p> : ''
                    }
                </div>

                <div className={st.editor}>
                    <ReactQuill theme="snow" value={text} onChange={handleSetText} modules={modules}/>
                    {
                        !validation && text.length < 1 ? <p className={st.error}>Длинна текста не менее 1 символа</p> : ''
                    }
                </div>
            </div>
        </div>
    );
};

export default SettingsPost;