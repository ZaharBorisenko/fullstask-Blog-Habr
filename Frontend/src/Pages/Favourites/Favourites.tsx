import {useAppDispatch, useAppSelector} from "../../redux/hook/hook";
import Post from "../../Components/Post/Post";
import st from './Favourites.module.scss'
import PostMini from "../../Components/MiniPost/PostMini";
import {removeAllPostFavourites} from "../../redux/Slices/postFavourites";
import {toast} from "react-toastify";
import {PostType} from "../../redux/Slices/postSlice";
const Favourites = () => {
    const postFavourites:PostType[] = useAppSelector(state => state.postFavourites.postFavourites);
    const dispatch = useAppDispatch()
    return (
        <div className={st.container}>
            <div>
                <div className={st.containerTitle}>
                   <div className={st.title}>
                       <p>Сюда вы можете добавлять посты, которые не хотите потерять 😉</p>
                       <button onClick={() => {
                           if (confirm('Вы точно хотите очистить избранное?')){
                               dispatch(removeAllPostFavourites())
                               toast.info('Избранное очищено', {
                                   autoClose: 1500,
                               })
                           }
                       }} className={st.button}>Очистить избранное</button>
                   </div>
                </div>
                {
                    postFavourites.map((post:PostType) => (
                        <Post key={post._id} post={post}/>
                    ))
                }
            </div>
            <PostMini/>
        </div>
    );
};

export default Favourites;