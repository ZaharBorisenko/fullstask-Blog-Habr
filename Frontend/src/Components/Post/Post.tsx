import React, {useState} from 'react';
import st from './Post.module.scss'
import time from '../../assets/img/time.png'
import view from '../../assets/img/view.png'
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/hook/hook";
import UserInfoPost from "../UserInfoPost/UserInfoPost";
import SomethingPost from "./SomethingPost";
import {BsFillBookmarkFill, BsFillBookmarkCheckFill} from "react-icons/bs";
import {BiSolidComment} from "react-icons/bi";
import {removePostFavourites, setPostFavourites} from "../../redux/Slices/postFavourites";
import {toast} from "react-toastify";
import {PostType} from "../../redux/Slices/postSlice";

const Post = ({post}) => {
    const dispatch = useAppDispatch();
    const currentUserId:string = useAppSelector(state => state.auth.data._id);
    const postFavourites:PostType[] = useAppSelector(state => state.postFavourites.postFavourites);

    return (
        <div>

            <div className={st.post}>
                <div className={st.container}>

                    <div className={st.containerDelete}>
                        <UserInfoPost post={post}/>
                        {
                            post?.user._id === currentUserId
                                ?
                                <SomethingPost post={post}/>
                                :
                                ''
                        }
                    </div>

                    <Link className={st.title} to={`/posts/${post._id}`}>{post.title}</Link>


                    <div className={st.info}>
                        {post.difficultyLevel === 'Простой' &&
                            <p className={`${st.level} ${st.levelEasy}`}>{post.difficultyLevel}</p>}
                        {post.difficultyLevel === 'Средний' &&
                            <p className={`${st.level} ${st.levelMiddle}`}>{post.difficultyLevel}</p>}
                        {post.difficultyLevel === 'Сложный' &&
                            <p className={`${st.level} ${st.levelHard}`}>{post.difficultyLevel}</p>}

                        <div className={st.readingTime}>
                            <img src={time} alt=""/>
                            <div>{`${post.readingTime} мин`}</div>
                        </div>
                        <div className={st.viewCount}>
                            <img src={view} alt=""/>
                            <div>{post.viewCount}</div>
                        </div>


                    </div>

                    <div className={st.keywords}>
                        {
                            post.keywords.map((p, index) => (
                                <Link to={`/posts/keywords/${p}`} key={index}>{p}* </Link>
                            ))
                        }
                    </div>

                    <img src={`http://localhost:4000/${post.imagePost}`} className={st.img} alt=""/>

                    <Link className={st.button} to={`/posts/${post._id}`}>Читать далее</Link>


                    <div className={st.items}>
                        <div className={st.item}>
                            <BiSolidComment color={"#929ca5"} fontSize={"30px"}/>
                        </div>
                        <div className={st.item}>
                            {
                                postFavourites.some(favouritesPost => favouritesPost._id === post._id) ?
                                    (
                                        <BsFillBookmarkCheckFill
                                            fontSize={"30px"}
                                            color={"#929ca5"}
                                            onClick={() => {
                                                dispatch(removePostFavourites(post))
                                                toast.error("Публикация удалена из избранного", {
                                                    autoClose: 1500,
                                                })
                                            }}
                                        />

                                    ) : (
                                        <BsFillBookmarkFill
                                            fontSize={"30px"}
                                            color={"#929ca5"}
                                            onClick={() => {
                                                dispatch(setPostFavourites(post))
                                                toast.success("Публикация добавлена в избранное", {
                                                    autoClose: 1500,
                                                })
                                            }}
                                        />
                                    )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;