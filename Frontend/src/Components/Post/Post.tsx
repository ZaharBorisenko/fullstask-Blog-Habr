import React from 'react';
import st from './Post.module.scss'
import time from '../../assets/img/time.png'
import view from '../../assets/img/view.png'
import comments from '../../assets/img/comments.png'
import {Link, useNavigate} from "react-router-dom";
import {formatDate} from "../../utils/formatDate";
import {useAppDispatch, useAppSelector} from "../../redux/hook/hook";
import {fetchDeletePost} from "../../redux/Slices/postSlice";
import UserInfoPost from "../UserInfoPost/UserInfoPost";

const Post = ({post}) => {
    const currentUserId = useAppSelector(state => state.auth.data._id);
    const dispatch = useAppDispatch();
    const removePost = (id) => {
        dispatch(fetchDeletePost(id))
    }
    return (
        <div className={st.post}>
            <div className={st.container}>


                {
                    post?.user._id === currentUserId
                        ?
                        <div className={st.interaction}>
                            <Link to={`/posts/${post._id}/edit`}>
                                <button>Редактирование</button>
                            </Link>
                            <button onClick={() => {
                                if (window.confirm('Вы точно хотите удалить пост?',)) removePost(post._id)
                            }}>Удалить пост</button>
                        </div>
                        :
                        ''
                }

                <UserInfoPost post={post}/>

                <Link className={st.title} to={`/posts/${post._id}`}>{post.title}</Link>


                <div className={st.info}>
                    {post.difficultyLevel === 'Простой' && <p className={`${st.level} ${st.levelEasy}`}>{post.difficultyLevel}</p>}
                    {post.difficultyLevel === 'Средний' && <p className={`${st.level} ${st.levelMiddle}`}>{post.difficultyLevel}</p>}
                    {post.difficultyLevel === 'Сложный' && <p className={`${st.level} ${st.levelHard}`}>{post.difficultyLevel}</p>}

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
                            <span key={index}>{p}* </span>
                        ))
                    }
                </div>

                <img src={`http://localhost:4000/${post.imagePost}`} className={st.img} alt=""/>

                <Link className={st.button} to={`/posts/${post._id}`}>Читать далее</Link>


                <div className={st.items}>
                    <div className={st.item}>
                        <img src={comments} alt=""/>
                        <div>3</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;