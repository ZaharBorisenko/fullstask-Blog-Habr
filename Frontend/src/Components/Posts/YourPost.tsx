import React, {useEffect, useState} from 'react';
import Post from "../Post/Post";
import {useAppDispatch, useAppSelector} from "../../redux/hook/hook";
import {fetchPost, fetchPostAllUser} from "../../redux/Slices/postSlice";
import Skeleton from "../Skeleton/SkeletonPost";

const YourPost = ({status,setCurrentPagePost}) => {
    const currentUser = useAppSelector(state => state.auth.data);
    const posts = useAppSelector(state => state.posts.postsUser);
    const currentUserId = currentUser._id;
    const userPosts = posts.filter(post => post.user._id === currentUserId)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchPostAllUser())
        setCurrentPagePost(1);
    },[userPosts])

    return (
        <div>
            <div>
                {
                    status === 'loading' ? <Skeleton/>
                        :
                        userPosts.map(post => (
                            <Post post={post} key={post._id}  />
                        ))
                }
            </div>
        </div>
    );
};

export default YourPost;