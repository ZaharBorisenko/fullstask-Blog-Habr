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
    console.log(post)

    useEffect(() => {
        fetchPost()
    },[])
    return (
        <div>
            <h1>{post.title}</h1>
            <h3>{post._id}</h3>
        </div>
    );
};

export default PostDetails;