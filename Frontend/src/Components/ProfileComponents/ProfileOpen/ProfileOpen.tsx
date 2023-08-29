import {FC} from 'react';
import st from './ProfileOpen.module.scss'

type propsType = {
    firstName: string,
    lastName: string,
    aboutMe: string,
}

const ProfileOpen:FC<propsType> = ({firstName,lastName,aboutMe}) => {
    return (
        <div>
            <div className={st.containerInput}>
                <div className={st.info}>
                    <div className={st.label}>Имя пользователя: </div>
                    <p>{firstName}</p>
                </div>
                <div className={st.info}>
                    <div className={st.label}>Фамилия пользователя: </div>
                    <p>{lastName}</p>
                </div>
            </div>
            <div className={st.editContainer}>
                <div className={st.label}>Что пользователь написал о себе: </div>
                <div className={st.edit} dangerouslySetInnerHTML={{__html: aboutMe}}></div>
            </div>
        </div>
    );
};

export default ProfileOpen;