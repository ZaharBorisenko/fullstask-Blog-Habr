import React, {useEffect} from 'react';
import st from './PostMini.module.scss'
import view from '../../assets/img/view.png'
import comments from '../../assets/img/comments.png'
import {useAppDispatch, useAppSelector} from "../../redux/hook/hook";
import {fetchPopularity} from "../../redux/Slices/popularityPostSlice";
import {Link} from "react-router-dom";
import {BiSolidComment} from "react-icons/bi";
import {PostType} from "../../redux/Slices/postSlice";

;
const PostMini = () => {
    let dispatch = useAppDispatch()
    let postPopularity:PostType[] = useAppSelector(state => state.postsPopularity.popularityPosts)
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
                                <BiSolidComment color={"#929ca5"} fontSize={"30px"}/>
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