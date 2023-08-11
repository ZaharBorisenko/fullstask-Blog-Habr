import React, {FC, useState} from 'react';
import st from './ProfileUpdate.module.scss'
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

type propsType = {
    subPagesProfile: number;
    handleFirstName: (value:string) => void;
    handleLastName: (value:string) => void;
    firstName: string;
    lastName: string;
    aboutMe:string
    updateProfile: () => void;
    handleAboutMe: (value:string) => void;
}
const ProfileUpdate:FC<propsType> = ({aboutMe,handleAboutMe, updateProfile, subPagesProfile,handleFirstName,handleLastName,firstName,lastName}) => {
    const modules = {
        toolbar: [
            [{header: [1, 2, 3, 4, 5, 6, false]}],
            [{font: []}],
            ["bold", "italic", "underline", "blockquote"],
            [
                {list: "bullet"},
            ],
            [{ 'align': [] }],
            ["link"],
        ]
    }

    return (
        <div>
            {
                subPagesProfile === 1 &&
                <div>
                    <div className={st.containerInput}>
                        <div>
                            <label className={st.label}>Ваше имя:</label>
                            <input
                                value={firstName}
                                onChange={(event) => handleFirstName(event.target.value)}
                                className={st.input} type="text"
                                placeholder="Имя.."/>
                        </div>
                        <div>
                            <label className={st.label}>Ваша фамалия:</label>
                            <input
                                value={lastName}
                                onChange={(event) => handleLastName(event.target.value)}
                                className={st.input} type="text"
                                placeholder="Фамилия..."/>
                        </div>
                    </div>

                    <div className={st.about}>
                        <label className={st.label}>Тут вы можете рассказать о себе:</label>
                        <ReactQuill theme="snow" value={aboutMe} onChange={handleAboutMe} modules={modules}/>
                    </div>

                    <button onClick={updateProfile} className={st.button}>Обновить данные</button>
                </div>
            }
        </div>
    );
};

export default ProfileUpdate;