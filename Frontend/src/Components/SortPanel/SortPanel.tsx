import React, {useState} from 'react';
import st from './SortPanel.module.scss'
import {MdKeyboardArrowUp, MdKeyboardArrowDown} from "react-icons/md";
import {useAppDispatch, useAppSelector} from "../../redux/hook/hook";
import {sortParams} from "../../redux/Slices/sortiPost";

const SortPanel = ({sortBy, setSortBy}) => {
    const [sortShow, setSortShow] = useState(false)
    const sortParamsSelect = useAppSelector(state => state.sortPost.sortParams)
    console.log(sortParamsSelect);
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
                                onClick={() => dispatch(sortParams(''))}
                                className={`${st.sortParamsBtn} ${sortParamsSelect == '' && st.sortParamsBtnActive}`}>
                                Новые
                            </button>
                            <button
                                onClick={() => dispatch(sortParams('popularity'))}
                                className={`${st.sortParamsBtn} ${sortParamsSelect == 'popularity' && st.sortParamsBtnActive}`}>
                                Популярные
                            </button>
                        </div>
                    </div>

                    <div className={st.sortParams2}>
                        <p className={st.sortParamsTitle}>По времени чтения</p>
                        <div className={st.containerBtn}>
                            <button
                                onClick={() => {
                                    dispatch(sortParams('readingTime'))
                                    setSortBy('descReadingTime')
                                }}
                                className={`${st.sortParamsBtn} ${sortParamsSelect == 'readingTime' && sortBy == 'descReadingTime' && st.sortParamsBtnActive}`}>
                                Много времени
                            </button>
                            <button
                                onClick={() => {
                                    dispatch(sortParams('readingTime'))
                                    setSortBy('ascReadingTime')
                                }}
                                className={`${st.sortParamsBtn} ${sortParamsSelect == 'readingTime' && sortBy == 'ascReadingTime' && st.sortParamsBtnActive}`}>
                                Мало времени
                            </button>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SortPanel;