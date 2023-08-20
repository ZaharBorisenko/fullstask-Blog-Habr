import React, {useEffect, useState} from 'react';
import Post from "../Post/Post";
import Skeleton from "../Skeleton/SkeletonPost";
import {useAppDispatch, useAppSelector} from "../../redux/hook/hook";
import {fetchPost} from "../../redux/Slices/postSlice";

const AllPost = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(state => state.posts.posts);
    const status = useAppSelector(state => state.posts.status);
    //пагинация
    const [currentPagePost, setCurrentPagePost] = useState(1);
    const [limit, setLimit] = useState(5);

    useEffect(() => {
        dispatch(fetchPost({limit: limit, page: currentPagePost}))
    },[currentPagePost])

    return (
        <div>
            {
                status === 'loading' ? <Skeleton/>
                    :
                    posts.map(post => (
                        <Post post={post} key={post._id}/>
                    ))
            }
        </div>
    );
};

export default AllPost;