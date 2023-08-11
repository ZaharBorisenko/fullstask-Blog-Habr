import React, {FC} from 'react';
import st from './ProfileNavbar.module.scss';

type propsType = {
    handleSubPagesProfile: (number:number) => void;
    subPagesProfile: number;
}
const ProfileNavbar:FC<propsType> = ({handleSubPagesProfile,subPagesProfile}) => {
    return (
        <div className={st.navbar}>
            <div
                className={`${st.link} ${subPagesProfile === 1 ? st.linkActive : ''}`}
                onClick={() => handleSubPagesProfile(1)}>
                Профиль
            </div>
        </div>
    );
};

export default ProfileNavbar;