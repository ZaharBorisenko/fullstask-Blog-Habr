import React, {FC} from 'react';
import st from './NavigationHome.module.scss'
import {Link} from "react-router-dom";
type propsType = {
    handlePageSettings: (value:number) => void;
    pageSettings: number,
}
const NavigationHome:FC<propsType> = ({handlePageSettings,pageSettings}) => {
    return (
        <div className={st.container}>
            <div className={st.content}>
                <div className={st.title}>Все потоки</div>
                <div className={st.navbarSettings}>
                    <p onClick={() => handlePageSettings(1)}  className={`${pageSettings === 1 && st.active}`}>Статьи</p>
                    <p onClick={() => handlePageSettings(2)}  className={`${pageSettings === 2 && st.active}`}>Ваши посты</p>
                    <p onClick={() => handlePageSettings(3)}  className={`${pageSettings === 3 && st.active}`}>Авторы</p>
                </div>
            </div>
        </div>
    );
};

export default NavigationHome;