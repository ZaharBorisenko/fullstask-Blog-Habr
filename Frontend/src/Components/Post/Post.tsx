import React from 'react';
import st from './Post.module.scss'
import time from '../../assets/img/time.png'
import view from '../../assets/img/view.png'
import comments from '../../assets/img/comments.png'
import {Link, useNavigate} from "react-router-dom";
import {formatDate} from "../../utils/formatDate";
import {useAppSelector} from "../../redux/hook/hook";
import ReactMarkdown from "react-markdown";

const Post = ({post}) => {
    const currentUserId = useAppSelector(state => state.auth.data._id);

    return (
        <div className={st.post}>
            <div className={st.container}>


                {
                    post?.user._id === currentUserId
                        ?
                        <div className={st.interaction}>
                            <button>Редактирование</button>
                            <button>Удаление</button>
                        </div>
                        :
                        ''
                }

                <div className={st.user}>
                    <img className={st.avatar} src={post.user.avatar} alt=""/>
                    <p className={st.name}>{post.user.nickName}</p>
                    <p className={st.timeAgo}>{formatDate(post.createdAt)}</p>
                </div>

                <Link className={st.title} to={`/posts/${post._id}`}>{post.title}</Link>

                <div className={st.info}>
                    <div className={st.readingTime}>
                        <img src={time} alt=""/>
                        <div>{`${post.readingTime} мин`}</div>
                    </div>
                    <div className={st.viewCount}>
                        <img src={view} alt=""/>
                        <div>{post.viewCount}</div>
                    </div>
                    <p>сложность {post.difficultyLevel}</p>
                </div>

                <div className={st.keywords}>
                    {
                        post.keywords.map(p => (
                            <span key={p}>{p}  </span>
                        ))
                    }
                </div>

                <img src={post.imagePost} className={st.img} alt=""/>

                <div className={st.text}>
                    <div dangerouslySetInnerHTML={{__html: post.text}}></div>
                </div>

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