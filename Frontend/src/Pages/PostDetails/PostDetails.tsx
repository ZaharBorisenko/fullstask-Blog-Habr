import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "../../axios";
import {PostType} from "../../redux/Slices/postSlice";
import ReactMarkdown from 'react-markdown'

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
            <h1>Заголовок {post.title}</h1>
            <p>Теги {post.tags?.map((tag,index) => <span key={index}>{tag}</span>)}</p>
            <p>Ключевые слова {post.keywords?.map((keyword,index) => <span key={index}>{keyword}</span>)}</p>
            <img src={post.imagePost} alt="error"/>
            <ReactMarkdown children={post.text}/>,
        </div>
    );
};

export default PostDetails;