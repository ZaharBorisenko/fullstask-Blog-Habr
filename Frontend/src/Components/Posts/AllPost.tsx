import React, {useEffect, useState} from 'react';
import Post from "../Post/Post";
import Skeleton from "../Skeleton/SkeletonPost";
import {useAppDispatch, useAppSelector} from "../../redux/hook/hook";
import {fetchPost} from "../../redux/Slices/postSlice";
import sortPost, {fetchSortPopularityPost, fetchSortReadingTimePost} from "../../redux/Slices/sortiPost";

const AllPost = ({sortBy}) => {
    const dispatch = useAppDispatch();
    const sortParams = useAppSelector(state => state.sortPost.sortParams)
    // ===Посты по умолчанию==========================================
    const posts = useAppSelector(state => state.posts.posts);
    const status = useAppSelector(state => state.posts.status);
    //=============Посты по популярности===================================================
    const postsPopularity = useAppSelector(state => state.sortPost.postsPopularity)
    const postsPopularityStatus = useAppSelector(state => state.sortPost.statusPostsPopularity)
    //=================================================================
    //=============Посты по времени чтения===================================================
    const postsReadingTime = useAppSelector(state => state.sortPost.postReadingTime)
    const postsReadingTimeStatus = useAppSelector(state => state.sortPost.statusPostsReadingTime)
    //=================================================================
    const [currentPagePost, setCurrentPagePost] = useState(1);
    const [limit, setLimit] = useState(5);

    useEffect(() => {
        sortParams == '' && dispatch(fetchPost({limit: limit, page: currentPagePost}))
        sortParams == 'popularity' && dispatch(fetchSortPopularityPost({limit: limit, page: currentPagePost}))
        sortParams == 'readingTime' && dispatch(fetchSortReadingTimePost({limit: limit, page: currentPagePost, sortBy:sortBy}))
    },[currentPagePost,sortParams,sortBy])

    return (
        <div>
            {
                sortParams == '' &&
                <div>
                    {
                        status === 'loading' ? <Skeleton/>
                            :
                            posts.map(post => (
                                <Post post={post} key={post._id}/>
                            ))
                    }
                </div>
            }

            {
                sortParams == 'popularity' &&
                <div>
                    {
                        postsPopularityStatus === 'loading' ? <Skeleton/>
                            :
                            postsPopularity.map(post => (
                                <Post post={post} key={post._id}/>
                            ))
                    }
                </div>
            }

            {
                sortParams == 'readingTime' &&
                <div>
                    {
                        postsReadingTimeStatus === 'loading' ? <Skeleton/>
                            :
                            postsReadingTime.map(post => (
                                <Post post={post} key={post._id}/>
                            ))
                    }
                </div>
            }

        </div>
    );
};

export default AllPost;