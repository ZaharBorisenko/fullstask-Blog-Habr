import React from 'react';
import st from './ProfileInfo.module.scss'

const ProfileInfo = ({subPagesProfile}) => {
    return (
        <div>
            {
                subPagesProfile === 1 &&
                <div className={st.profile}>
                    <div>ПРОФИЛЬ</div>
                </div>
            }
        </div>
    );
};

export default ProfileInfo;