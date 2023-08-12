import React, {FC, useRef, useState} from 'react';
import st from './GeneralsInformation.module.scss';
import {IUser} from "../../../redux/Slices/postSlice";
import {formatDate} from "../../../utils/formatDateUser";
import {useParams} from "react-router-dom";
import edit from '../../../assets/img/editName.png';
import editAvatar from '../../../assets/img/editAvatar.png';
type propsType = {
    userInfo: IUser | null;
    currentUserId: number;
    privateProfile: boolean;
    handlePrivateProfile: (value:any) => void;
    nickName:string
    handleNickName: (value:string) => void;
}

const GeneralsInformation: FC<propsType> = ({changeAvatarFiles, nickName, handleNickName, handlePrivateProfile,privateProfile,userInfo, currentUserId}) => {
    const checkboxProfile = useRef<any>();
    const {id} = useParams();

    const [clickUpdateNickName, setClickUpdateNickName] = useState<boolean>(false);
    const [clickUpdateAvatar, setClickUpdateAvatar] = useState<boolean>(false);
    const refFilesAvatar = useRef<any>();

    return (
        <div className={st.containerInfo}>
            {
                userInfo === null ? '' :
                    <div className={st.info}>


                        <div className={st.containerAvatar}>
                            <img className={st.avatar} src={userInfo.avatar} alt=""/>
                            <img onClick={() => refFilesAvatar.current.click()} className={st.editAvatar} src={editAvatar} alt=""/>
                            <input type="file" onClick={() => setClickUpdateAvatar(true)} ref={refFilesAvatar} onChange={changeAvatarFiles} hidden={true}/>
                            {
                                clickUpdateAvatar && <p className={st.current}>Не забудьте нажать на кнопку "Обновить данные"</p>
                            }
                        </div>


                        <div className={st.name}>
                            <div>{currentUserId === userInfo._id ? 'Ваш никнейм: ' : 'Никнейм пользователя: '}</div>


                            <div>
                                <div>
                                    {
                                        clickUpdateNickName ?
                                            <div>
                                                <input
                                                    className={st.inputEdit}
                                                    value={nickName}
                                                    onChange={event => handleNickName(event.target.value)}
                                                    type="text"
                                                />
                                            </div>
                                            :
                                            <div className={st.containerNickName}>
                                                <span>{userInfo.nickName}</span>
                                                <img
                                                    onClick={() => setClickUpdateNickName(true)}
                                                    className={st.editImg}
                                                    src={edit}
                                                    alt=""
                                                />
                                            </div>

                                    }
                                </div>
                                {
                                    clickUpdateNickName ? <p className={st.current}>Не забудьте нажать на кнопку "Обновить данные</p> : ''
                                }
                            </div>


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