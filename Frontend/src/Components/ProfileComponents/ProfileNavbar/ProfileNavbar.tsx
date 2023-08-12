import React, from 'react';
import st from './ProfileNavbar.module.scss';

const ProfileNavbar = () => {
    return (
        <div className={st.navbar}>
            <div className={`${st.link} ${st.linkActive}`}>Профиль</div>
        </div>
    );
};

export default ProfileNavbar;