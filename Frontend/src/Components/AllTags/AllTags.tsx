import React, {useEffect, useState} from 'react';
import st from './AllTags.module.scss'
import {fetchAllTags, ITags} from "../../redux/Slices/TagsSlice";
import {useAppDispatch, useAppSelector} from "../../redux/hook/hook";
import {Link} from "react-router-dom";

const AllTags = () => {
    const dispatch = useAppDispatch();
    const tags:ITags[] = useAppSelector(state => state.tags.tags);


    const [favouritesTags, setFavouritesTags] = useState<ITags[]>([]);
    const [DragItem, setDragItem] = useState<boolean>(false);

    function handleOnDrag(e:React.DragEvent<HTMLDivElement>, favouritesTags: string): void {
        console.log(typeof favouritesTags)
        e.dataTransfer.setData("tag",favouritesTags)
        setDragItem(true)
    }

    function handleOnDrop(e:React.DragEvent<HTMLDivElement>): void{
        console.log(e)
        const tagString = e.dataTransfer.getData("tag")
        const tag = JSON.parse(tagString)
        const updatedTags = [tag, ...favouritesTags];
        setFavouritesTags(updatedTags);
        localStorage.setItem('favouritesTags', JSON.stringify(updatedTags));
    }

    function handleDragOver(e:React.DragEvent<HTMLDivElement>): void{
        e.preventDefault();
    }

    function clearFavouritesTags(): void {
        localStorage.removeItem('favouritesTags');
        setFavouritesTags([]);
    }



    useEffect(() => {
        dispatch(fetchAllTags())
        const savedFavouritesTags = localStorage.getItem('favouritesTags');

        // Если есть сохраненные данные, распарсите их и установите в состояние
        if (savedFavouritesTags) {
            setFavouritesTags(JSON.parse(savedFavouritesTags));
        }
    }, [])

    return (
        <div className={st.container}>
            <div className={st.content}>

                <div>
                    <div className={st.title}>Избранные теги:</div>
                    <div className={st.subtitle}>Перетащите нужные вам теги, для быстрого доступа к ним</div>
                    <div className={`${st.tagsFavourites} ${DragItem ? st.tagsFavouritesActive : ''}`} onDrop={handleOnDrop} onDragOver={handleDragOver}>
                        {
                            favouritesTags?.map(tag => (
                                    <div key={tag._id}>
                                        <Link  to={`/posts/tag/${tag._id}`}>{tag._id} ({tag.count})</Link>
                                    </div>
                            ))
                        }
                    </div>
                    <button className={st.btnClear} onClick={clearFavouritesTags}>Очистить избранное</button>
                </div>

                <div>
                    <div className={st.title}>Все теги</div>
                    <div className={st.subtitle}>По мере добавления новых постов, будут появлятся новые теги</div>
                    <div className={st.containerTags}>
                        {
                            tags?.map(tag => (
                                <div
                                    onDragStart={(e) => handleOnDrag(e, JSON.stringify(tag))}
                                    onDragEnd={() => setDragItem(false)}
                                    draggable={true}
                                    className={st.tags}
                                    key={tag._id}
                                >
                                        <p><Link to={`/posts/tag/${tag._id}`}>{tag._id} ({tag.count})</Link></p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllTags;