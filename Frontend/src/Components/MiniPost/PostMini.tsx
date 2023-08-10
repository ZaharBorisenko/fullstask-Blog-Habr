import React, {useEffect} from 'react';
import st from './PostMini.module.scss'
import view from '../../assets/img/view.png'
import comments from '../../assets/img/comments.png'
import {useAppDispatch, useAppSelector} from "../../redux/hook/hook";
import {fetchPopularity} from "../../redux/Slices/popularityPostSlice";
import {Link} from "react-router-dom";

;
const PostMini = () => {
    let dispatch = useAppDispatch()
    let postPopularity = useAppSelector(state => state.postsPopularity.popularityPosts)
    useEffect(() => {
        dispatch(fetchPopularity())
    },[])

    return (
        <div className={st.container}>
            <div className={st.title}>Читают сейчас</div>

            {
                postPopularity?.map(post => (
                    <div className={st.card} key={post._id}>
                        <Link to={`/posts/${post._id}`} className={st.titlePost}>{post.title}</Link>
                        <div className={st.infoContainer}>
                            <div className={st.info}>
                                <img src={view} alt=""/>
                                <div>{post.viewCount}</div>
                            </div>
                            <div className={st.info}>
                                <img src={comments} alt=""/>
                                <div>3</div>
                            </div>
                        </div>
                        <hr className={st.hr}/>
                    </div>
                ))
            }

        </div>
    );
};

export default PostMini;