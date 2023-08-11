import React, {FC} from 'react';
import st from './GeneralsInformation.module.scss';
import {IUser} from "../../../redux/Slices/postSlice";
import {formatDate} from "../../../utils/formatDateUser";

type propsType = {
    userInfo: IUser | null;
    currentUserId: number;
}

const GeneralsInformation: FC<propsType> = ({userInfo, currentUserId}) => {
    return (
        <div className={st.containerInfo}>
            {
                userInfo === null ? '' :
                    <div className={st.info}>
                        <img className={st.avatar} src={userInfo.avatar} alt=""/>
                        <div className={st.name}>
                            <p>{currentUserId === userInfo._id ? 'Ваш никнейм: ' : 'Никнейм пользователя: '}</p>
                            <span>{userInfo.nickName}</span>
                        </div>
                        <div className={st.dateRegister}><p>Дата регистрации:</p>
                            <span>{formatDate(userInfo.createdAt)}</span>
                        </div>
                    </div>
            }
        </div>
    );
};

export default GeneralsInformation;