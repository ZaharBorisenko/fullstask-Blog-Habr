import {FC} from 'react';
import ReactQuill from "react-quill";
import {IUser} from "../../redux/Slices/postSlice";
import 'react-quill/dist/quill.snow.css';
import st from './settingPost.module.scss'
import '../../assets/styles/global.css'
import {Link} from "react-router-dom";

type propsTypes = {
    title: string,
    handleSetTitle: (value: string) => void
    text: string,
    handleSetText: (value: string) => void,
    currentUser: IUser
    validation :boolean
    isEditPost:boolean
}
const SettingsPost: FC<propsTypes> = ({isEditPost,title, text, handleSetText, handleSetTitle, currentUser,validation}) => {
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
    return (
        <div>
            {isEditPost ? <div className={st.editTitle}>Редактирование публикации</div> : ''}

            {!isEditPost ? <div className={st.user}>
                <img className={st.avatar} src={currentUser.avatar} alt=""/>
                <Link to={`/user/${currentUser._id}`} className={st.name}>{currentUser.nickName}</Link>
            </div> : ''}

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