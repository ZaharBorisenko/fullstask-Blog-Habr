import React, {FC} from 'react';
import st from './NavigationHome.module.scss'
import {Link} from "react-router-dom";
import {useAppSelector} from "../../redux/hook/hook";
type propsType = {
    handlePageSettings: (value:number) => void;
    pageSettings: number,
    currentPagePost: number,
}
const NavigationHome:FC<propsType> = ({handlePageSettings,pageSettings,currentPagePost}) => {
    return (
        <div className={st.container}>
            <div className={st.content}>
                <div className={st.titleContainer}>
                    <div className={st.title}>Все потоки</div>
                    {pageSettings == 1 && <div>|</div>}
                    {pageSettings == 1 && <div>Страница  №{currentPagePost}</div>}


                </div>
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