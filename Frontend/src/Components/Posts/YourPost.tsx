import React, {useEffect, useState} from 'react';
import Post from "../Post/Post";
import {useAppDispatch, useAppSelector} from "../../redux/hook/hook";
import {fetchPost, fetchPostAllUser} from "../../redux/Slices/postSlice";
import Skeleton from "../Skeleton/SkeletonPost";
import {fetchSortPopularityPost} from "../../redux/Slices/sortiPost";

const YourPost = () => {
    const dispatch = useAppDispatch()

    const currentUser = useAppSelector(state => state.auth.data);
    const currentUserId = currentUser._id;


    const sortParams = useAppSelector(state => state.sortPost.sortParams)
    //посты по умолчанию
    const posts = useAppSelector(state => state.posts.postsUser);

    const status = useAppSelector(state => state.posts.status);
    const userPosts = posts.filter(post => post.user._id === currentUserId)
    console.log(userPosts)

    const userPopularityPosts = Array.from(userPosts).sort((a,b) => b.viewCount - a.viewCount);
    console.log(userPopularityPosts)



    useEffect(() => {
        sortParams == '' && dispatch(fetchPostAllUser())
    },[sortParams])

    return (
        <div>
            <div>
                {
                    sortParams == '' &&
                    <div>
                        {
                            status === 'loading' ? <Skeleton/>
                                :
                                userPosts.map(post => (
                                    <Post post={post} key={post._id}  />
                                ))
                        }
                    </div>
                }

                {
                    sortParams == 'popularity' &&
                    <div>
                        {
                            status === 'loading' ? <Skeleton/>
                                :
                                userPopularityPosts.map(post => (
                                    <Post post={post} key={post._id}  />
                                ))
                        }
                    </div>
                }
            </div>
        </div>
    );
};

export default YourPost;