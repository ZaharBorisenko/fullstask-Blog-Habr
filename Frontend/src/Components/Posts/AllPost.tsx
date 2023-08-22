import React, {useEffect, useState} from 'react';
import Post from "../Post/Post";
import Skeleton from "../Skeleton/SkeletonPost";
import {useAppDispatch, useAppSelector} from "../../redux/hook/hook";
import {fetchPost, setPage} from "../../redux/Slices/postSlice";
import sortPost, {fetchSortPopularityPost, fetchSortReadingTimePost} from "../../redux/Slices/sortiPost";
import {Pagination} from "@mui/material";

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
    //=======================Для пагинации==========================================
    const currentPagePost = useAppSelector(state => state.posts.currentPagePost);
    const [limit, setLimit] = useState(5);
    const totalCountPosts = useAppSelector(state => state.posts.totalPosts);
    const totalCountPagePagination = Math.ceil(totalCountPosts / limit);

    useEffect(() => {
        sortParams == '' && dispatch(fetchPost({ limit, page: currentPagePost }));
        sortParams == 'popularity' && dispatch(fetchSortPopularityPost({limit, page: currentPagePost}));
        sortParams == 'readingTime' && dispatch(fetchSortReadingTimePost({
            limit: limit,
            page: currentPagePost,
            sortBy: sortBy
        }))

    }, [currentPagePost, sortParams, sortBy])

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }, [currentPagePost])

    return (
        <div>
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

            <Pagination
                count={totalCountPagePagination}
                page={currentPagePost}
                onChange={(_, num) => {
                    dispatch(setPage(num))
                }}/>
        </div>
    );
};

export default AllPost;