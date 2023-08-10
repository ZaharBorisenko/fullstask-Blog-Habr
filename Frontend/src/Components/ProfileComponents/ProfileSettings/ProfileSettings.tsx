import React from 'react';
import st from './ProfileSettings.module.scss';
const ProfileSettings = ({subPagesProfile}) => {
    return (
        <div>
            {
                subPagesProfile === 3 &&
                <div className={st.settingsProfile}>
                    <div>НАСТРОЙКИ</div>
                </div>
            }
        </div>
    );
};

export default ProfileSettings;