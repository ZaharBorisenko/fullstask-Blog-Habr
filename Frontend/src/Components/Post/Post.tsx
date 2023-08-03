import React from 'react';
import st from './Post.module.scss'
import user from '../../assets/img/profileIcon.png'
import time from '../../assets/img/time.png'
import view from '../../assets/img/view.png'
import comments from '../../assets/img/comments.png'
import {Link} from "react-router-dom";
const Post = ({post}) => {
        const createdAt = post.createdAt;
        const createdDate = new Date(createdAt);
        const currentTime = new Date();
        const timeDifferenceInMilliseconds = currentTime - createdDate;
        const timeDifferenceInMinutes = Math.floor(timeDifferenceInMilliseconds / (1000 * 60));
        const timeAgoString = `${timeDifferenceInMinutes} минут назад`;


    return (
        <div className={st.post}>
            <div className={st.container}>
                <div className={st.user}>
                    <img className={st.avatar} src={user} alt=""/>
                    <p className={st.name}>{post.user.nickName}</p>
                    <p className={st.timeAgo}>{timeAgoString}</p>
                </div>

                <Link className={st.title} to="/">{post.title}</Link>

                <div className={st.info}>
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
                        post.keywords.map(p => (
                            <span key={p}>{p}  </span>
                        ))
                    }
                </div>

                <img src={post.imagePost} className={st.img} alt=""/>

                <div className={st.text}>
                    {post.text}
                </div>

                <Link className={st.button} to="/">Читать далее</Link>


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