import React, {useEffect, useRef, useState} from 'react';
import st from './ProfilePrivateBtn.module.scss';
import axios from "../../../axios";

const ProfilePrivateBtn = ({privateProfile, setPrivateProfile, updateProfilePrivate}) => {
    const buttonPatchPrivate = useRef<any>();
    return (
        <div className={st.container}>
            <div>
                {
                    privateProfile ?
                        <div>
                            <button
                                onClick={() => {
                                    setPrivateProfile(false)
                                    setTimeout(() => {
                                        buttonPatchPrivate.current.click()
                                    }, 100)
                                }}
                                className={`${st.privateBtn} ${st.privateBtnExit}`}>

                                Профиль закрыт
                            </button>
                            <p className={st.correction}>Нажмите на кнопку, чтобы открыть профиль</p>
                        </div>
                        :
                        <div>
                            <button
                                onClick={() => {
                                    setPrivateProfile(true)
                                    setTimeout(() => {
                                        buttonPatchPrivate.current.click()
                                    }, 100)
                                }}
                                className={`${st.privateBtn} ${st.privateBtnOpen}`}>
                                Профиль открыт
                            </button>
                            <p className={st.correction}>Нажмите на кнопку, чтобы закрыть профиль</p>
                        </div>

                }
                <button ref={buttonPatchPrivate} onClick={updateProfilePrivate} hidden={true}>Обновить</button>
            </div>
            <div>
            </div>
        </div>
    );
};

export default ProfilePrivateBtn;