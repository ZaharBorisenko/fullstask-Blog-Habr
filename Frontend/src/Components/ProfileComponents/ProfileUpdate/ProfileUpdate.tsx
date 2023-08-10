import React, {FC} from 'react';
import st from './ProfileUpdate.module.scss'
type propsType = {
    subPagesProfile: number;
    handleFirstName: (value:string) => void;
    handleLastName: (value:string) => void;
    firstName: string;
    lastName: string;
    updateProfile: () => void;
}
const ProfileUpdate:FC<propsType> = ({ updateProfile, subPagesProfile,handleFirstName,handleLastName,firstName,lastName}) => {
    return (
        <div>
            {
                subPagesProfile === 2 &&
                <div className={st.updateProfile}>
                    <div>
                        <div>
                            <input
                                value={firstName}
                                onChange={(event) => handleFirstName(event.target.value)}
                                className={st.input} type="text"
                                placeholder="Указывайте корректное имя"/>
                        </div>
                        <div>
                            <input
                                value={lastName}
                                onChange={(event) => handleLastName(event.target.value)}
                                className={st.input} type="text"
                                placeholder="Указывайте корректную фамилию"/>
                        </div>
                        <button onClick={updateProfile} className={st.button}>Обновить данные</button>
                    </div>
                </div>
            }
        </div>
    );
};

export default ProfileUpdate;