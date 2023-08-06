import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "../../axios";
import {PostType} from "../../redux/Slices/postSlice";

const PostDetails = () => {
    const {id} = useParams();
    const [post, setPost] = useState<PostType>({});

    const fetchPost = async () => {
        const response = await axios.get(`/posts/${id}`);
        const data = await response.data;
        setPost(data)
    }

    useEffect(() => {
        fetchPost();
        document.title = `IT Odyssey | ${post?.title}`
    },[post.title])
    return (
        <div>
            <h1>{post.title}</h1>
            <h3>{post._id}</h3>
            <p>{post.text}</p>
        </div>
    );
};

export default PostDetails;