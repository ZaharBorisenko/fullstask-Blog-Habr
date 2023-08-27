import React, {FC} from 'react';
import st from './NavigationHome.module.scss'
import {useAppDispatch, useAppSelector} from "../../redux/hook/hook";
import {setSortParams} from "../../redux/Slices/sortiPost";

type propsType = {
    handlePageSettings: (value: number) => void;
    pageSettings: number,
}
const NavigationHome: FC<propsType> = ({handlePageSettings, pageSettings}) => {
    const pageCount:number = useAppSelector(state => state.posts.currentPagePost);
    const dispatch = useAppDispatch();
    return (
        <div className={st.container}>
            <div className={st.content}>
                <div className={st.titleContainer}>
                    <div className={st.title}>Все потоки</div>
                    {pageSettings == 1 && <div>|</div>}
                    {pageSettings == 1 && <div>Страница №{pageCount}</div>}


                </div>
                <div className={st.navbarSettings}>

                    <p onClick={() => {
                        handlePageSettings(1)
                        dispatch(setSortParams(''))
                    }}
                       className={`${pageSettings === 1 && st.active}`}>
                        Статьи
                    </p>

                    <p onClick={() => {
                        handlePageSettings(2)
                        dispatch(setSortParams(''))
                    }}
                       className={`${pageSettings === 2 && st.active}`}>
                        Ваши посты
                    </p>

                    <p onClick={() => {
                        handlePageSettings(3)
                    }}
                       className={`${pageSettings === 3 && st.active}`}>
                        Авторы
                    </p>

                    <p onClick={() => {
                        handlePageSettings(4)
                    }}
                       className={`${pageSettings === 4 && st.active}`}>
                        Все теги
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NavigationHome;