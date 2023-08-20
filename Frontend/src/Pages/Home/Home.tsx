import React, {useEffect, useState} from 'react';
import st from './Home.module.scss'
import {useAppDispatch, useAppSelector} from "../../redux/hook/hook";
import {fetchPost, PostType} from "../../redux/Slices/postSlice";
import PostMini from "../../Components/MiniPost/PostMini";
import NavigationHome from "../../Components/NavigationHome/NavigationHome";
import YourPost from "../../Components/Posts/YourPost";
import AllPost from "../../Components/Posts/AllPost";
import AllUsers from "../../Components/AllUsers/AllUsers";
import AllTags from "../../Components/AllTags/AllTags";
import Cookie from "../../Components/Cookie/Cookie";
import SortPanel from "../../Components/SortPanel/SortPanel";
import {fetchSortPopularityPost} from "../../redux/Slices/sortiPost";


const Home = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(state => state.posts.posts);
    const popularityPost = useAppSelector(state => state.sortPopularity.postsPopularity);

    const currentUser = useAppSelector(state => state.auth.data);
    const currentUserId = currentUser._id;
    const status = useAppSelector(state => state.posts.status);
    const [pageSettings, setPageSettings] = useState(1);

    const [currentPagePost, setCurrentPagePost] = useState(1);
    const [limit, setLimit] = useState(5);

    const [sortCount, setSortCount] = useState(1);


    const handlePageSettings = (value) => {
        setPageSettings(value);
    }
    useEffect(() => {
        document.title = "IT Odyssey | Home"
        if (sortCount == 1) {
            dispatch(fetchPost({limit: limit, page: currentPagePost})).then((result) => {
                const {post, totalPage} = result.payload;
            })
        }
        if (sortCount == 2) {
            dispatch(fetchSortPopularityPost({limit:limit, page:currentPagePost})).then((result) => {
                const {postsPopularity, totalPopularPosts} = result.payload
            })
        }
    }, [currentPagePost,pageSettings,sortCount])



    return (
        <div style={{marginTop: "20px"}}>
            <div className={st.container}>
                <div>
                    <NavigationHome currentPagePost={currentPagePost} pageSettings={pageSettings} handlePageSettings={handlePageSettings}/>

                    <SortPanel/>

                    {pageSettings == 1 &&
                        <AllPost
                            posts={posts}
                            status={status}
                            limit={limit}
                            currentPagePost={currentPagePost}
                            setCurrentPagePost={setCurrentPagePost}
                        />
                    }
                    {pageSettings == 2 && <YourPost setCurrentPagePost={setCurrentPagePost} status={status}/>}
                    {pageSettings == 3 && <AllUsers/>}
                    {pageSettings == 4 && <AllTags/>}
                </div>
                <PostMini/>
            </div>

            <Cookie/>
        </div>
    );
};

export default Home;