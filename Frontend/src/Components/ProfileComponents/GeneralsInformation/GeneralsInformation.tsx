import React, {FC, useRef} from 'react';
import st from './GeneralsInformation.module.scss';
import {IUser} from "../../../redux/Slices/postSlice";
import {formatDate} from "../../../utils/formatDateUser";
import {useAppSelector} from "../../../redux/hook/hook";
import {useParams} from "react-router-dom";

type propsType = {
    userInfo: IUser | null;
    currentUserId: number;
    privateProfile: boolean;
    handlePrivateProfile: (value:any) => void;
}

const GeneralsInformation: FC<propsType> = ({updateProfile,handlePrivateProfile,privateProfile,userInfo, currentUserId}) => {
    const checkboxProfile = useRef<any>();
    const {id} = useParams();
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


                        {
                            currentUserId === id ?
                                <div>
                                    <div>
                                        <div>
                                            <div onClick={() => checkboxProfile.current.click()} className={st.clickPrivateProfile}>
                                                {
                                                    userInfo.privateProfile
                                                        ?
                                                        <p className={`${userInfo.privateProfile ? st.exitProfile : ''}`}>Профиль закрыт</p>
                                                        :
                                                        <p className={`${!userInfo.privateProfile ? st.OpenProfile : ''}`}>Профиль открыт</p>
                                                }
                                            </div>
                                        </div>
                                        {userInfo.privateProfile &&
                                            <p className={st.current}>Нажмите, чтобы открыть.<span>Не забудьте нажать на кнопку "Обновить данные"</span></p>
                                        }
                                        {!userInfo.privateProfile &&
                                            <p className={st.current}>Нажмите, чтобы закрыть.<span>Не забудьте нажать на кнопку "Обновить данные"</span></p>
                                        }
                                    </div>

                                    <div>
                                        <input
                                            hidden={true}
                                            ref={checkboxProfile}
                                            checked={privateProfile}
                                            onChange={(event => {
                                                if (privateProfile){
                                                    if (window.confirm('Вы точно хотите открыть профиль?')) {
                                                        handlePrivateProfile(event.target.checked)
                                                    }
                                                }else if (!privateProfile){
                                                    if (window.confirm('Вы точно хотите закрыть профиль?')) {
                                                        handlePrivateProfile(event.target.checked)
                                                    }
                                                }
                                            })} type="checkbox"/>
                                    </div>
                                </div> : ''
                        }

                    </div>
            }
        </div>
    );
};

export default GeneralsInformation;