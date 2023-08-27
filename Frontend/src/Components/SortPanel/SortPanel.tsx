import React, {FC, useState} from 'react';
import st from './SortPanel.module.scss'
import {MdKeyboardArrowUp, MdKeyboardArrowDown} from "react-icons/md";
import {useAppDispatch, useAppSelector} from "../../redux/hook/hook";
import {setSortParams} from "../../redux/Slices/sortiPost";
import {setPage} from "../../redux/Slices/postSlice";

type propsType = {
    sortBy: string,
    setSortBy: (sortBy:string) => void
    pageSettings: number
}

const SortPanel:FC<propsType> = ({sortBy, setSortBy,pageSettings}) => {
    const [sortShow, setSortShow] = useState<boolean>(false)
    const sortParamsSelect:string = useAppSelector(state => state.sortPost.sortParams)
    const pageCount:number = useAppSelector(state => state.posts.currentPagePost);
    const dispatch = useAppDispatch();
    return (
        <div className={st.container}>
            <div onClick={() => setSortShow(!sortShow)} className={st.sortBy}>
                <p>Сортировка</p>
                {!sortShow && <MdKeyboardArrowDown fontSize={"30px"}/>}
                {sortShow && <MdKeyboardArrowUp fontSize={"30px"}/>}
            </div>

            <div className={`${st.containerSort} ${sortShow ? st.containerSortActive : ''}`}>
                <div className={st.contentSort}>
                    <div className={st.sortParams}>
                        <p className={st.sortParamsTitle}>Сначала показывать</p>
                        <div className={st.containerBtn}>
                            <button
                                onClick={() => {dispatch(setSortParams('')); dispatch(setPage(1))}}
                                className={`${st.sortParamsBtn} ${sortParamsSelect == '' && st.sortParamsBtnActive}`}>
                                Новые
                            </button>
                            <button
                                onClick={() => {dispatch(setSortParams('popularity')); dispatch(setPage(1))}}
                                className={`${st.sortParamsBtn} ${sortParamsSelect == 'popularity' && st.sortParamsBtnActive}`}>
                                Популярные
                            </button>
                        </div>
                    </div>

                    {
                        pageSettings === 1 &&
                        <div className={st.sortParams2}>
                            <p className={st.sortParamsTitle}>По времени чтения</p>
                            <div className={st.containerBtn}>
                                <button
                                    onClick={() => {
                                        {dispatch(setSortParams('readingTime')); dispatch(setPage(1))}
                                        setSortBy('descReadingTime')
                                    }}
                                    className={`${st.sortParamsBtn} ${sortParamsSelect == 'readingTime' && sortBy == 'descReadingTime' && st.sortParamsBtnActive}`}>
                                    Много времени
                                </button>
                                <button
                                    onClick={() => {
                                        {dispatch(setSortParams('readingTime')); dispatch(setPage(1))}
                                        setSortBy('ascReadingTime')
                                    }}
                                    className={`${st.sortParamsBtn} ${sortParamsSelect == 'readingTime' && sortBy == 'ascReadingTime' && st.sortParamsBtnActive}`}>
                                    Мало времени
                                </button>

                            </div>
                        </div>
                    }

                </div>
            </div>
        </div>
    );
};

export default SortPanel;