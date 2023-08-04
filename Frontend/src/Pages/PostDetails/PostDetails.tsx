import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/hook/hook";
import {fetchOnePost} from "../../redux/Slices/OnePostSlice";

const PostDetails = () => {
    const params = useParams();
    console.log(params.id);
    const dispatch = useAppDispatch();
    const post = useAppSelector(state => state.onePost.onePost)
    console.log(post)
    useEffect(() => {
        dispatch(fetchOnePost(params.id))
    },[])
    return (
        <div>
            <div>{post._id}</div>
            <div>{post.title}</div>
        </div>
    );
};

export default PostDetails;