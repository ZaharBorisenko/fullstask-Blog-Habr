import React from 'react';
import st from "./ProfileUpdateInput.module.scss";
import ReactQuill from "react-quill";
import {modules} from "../../../utils/modulesProfileEdit";

const ProfileUpdateInput = ({firstName,lastName,aboutMe,UpdateProfileInfo,setFirstName,setLastName,setAboutMe}) => {
    return (
        <div>
            <div>
                <div className={st.containerInput}>
                    <div>
                        <label className={st.label}>Ваше имя:</label>
                        <input
                            value={firstName}
                            onChange={(event) => setFirstName(event.target.value)}
                            className={st.input} type="text"
                            placeholder="Имя.."/>
                    </div>
                    <div>
                        <label className={st.label}>Ваша фамалия:</label>
                        <input
                            value={lastName}
                            onChange={(event) => setLastName(event.target.value)}
                            className={st.input} type="text"
                            placeholder="Фамилия..."/>
                    </div>
                </div>

                <div className={st.about}>
                    <label className={st.label}>Тут вы можете рассказать о себе:</label>
                    <ReactQuill theme="snow" value={aboutMe} onChange={setAboutMe} modules={modules}/>
                </div>

                <button onClick={UpdateProfileInfo} className={st.button}>Обновить данные</button>
            </div>
        </div>
    );
};

export default ProfileUpdateInput;