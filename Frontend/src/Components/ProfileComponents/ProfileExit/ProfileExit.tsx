import React from 'react';
import st from './ProfileExit.module.scss'
import { AiOutlineUnlock } from "react-icons/ai";
const ProfileExit = () => {
    return (
        <div className={st.container}>
            <AiOutlineUnlock fontSize={"120px"}/>
            <div>
                <div className={st.title}>Профиль закрыт</div>
                <p className={st.text}>Пользователь пожелал оставить профиль закрытым</p>
            </div>
        </div>
    );
};

export default ProfileExit;