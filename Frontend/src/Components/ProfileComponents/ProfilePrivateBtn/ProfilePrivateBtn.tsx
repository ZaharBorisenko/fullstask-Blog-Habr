import {FC, MutableRefObject, useRef} from 'react';
import st from './ProfilePrivateBtn.module.scss';


type propsType = {
    privateProfile: boolean,
    setPrivateProfile: (privateProfile:boolean) => void,
    updateProfilePrivate: () => Promise<void>,
}

const ProfilePrivateBtn:FC<propsType> = ({privateProfile, setPrivateProfile, updateProfilePrivate}) => {
    const buttonPatchPrivate = useRef() as MutableRefObject<HTMLButtonElement>
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