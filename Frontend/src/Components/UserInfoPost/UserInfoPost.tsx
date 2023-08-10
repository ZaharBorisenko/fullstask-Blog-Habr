import React from 'react';
import st from "../Post/Post.module.scss";
import {formatDate} from "../../utils/formatDate";

const UserInfoPost = ({post}) => {
    return (
        <div className={st.user}>
            <img className={st.avatar} src={post.user.avatar} alt=""/>
            <p className={st.name}>{post.user.nickName}</p>
            <p className={st.timeAgo}>{formatDate(post.createdAt)}</p>
        </div>
    );
};

export default UserInfoPost;