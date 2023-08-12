import React from 'react';
import st from "../Post/Post.module.scss";
import {formatDate} from "../../utils/formatDate";
import {Link} from "react-router-dom";

const UserInfoPost = ({post}) => {
    return (
        <div className={st.user}>
            <img className={st.avatar} src={post.user.avatar} alt=""/>
            <Link to={`/user/${post.user._id}`}>{post.user.nickName}</Link>
            <p className={st.timeAgo}>{formatDate(post.createdAt)}</p>
        </div>
    );
};

export default UserInfoPost;