import React, {useEffect, useMemo, useState} from 'react';
import Post from "../../Components/Post/Post";
import st from './Home.module.scss'
import {useAppDispatch, useAppSelector} from "../../redux/hook/hook";
import {fetchPost, PostType} from "../../redux/Slices/postSlice";
import PostMini from "../../Components/MiniPost/PostMini";
import NavigationHome from "../../Components/NavigationHome/NavigationHome";
import YourPost from "../../Components/Posts/YourPost";
import AllPost from "../../Components/Posts/AllPost";
import AllUsers from "../../Components/AllUsers/AllUsers";

const Home = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(state => state.posts.posts);
    const currentUser = useAppSelector(state => state.auth.data);
    const currentUserId = currentUser._id;
    const status = useAppSelector(state => state.posts.status);
    const [pageSettings, setPageSettings] = useState(1);

    const handlePageSettings = (value) => {
        setPageSettings(value);
    }

    useEffect(() => {
        document.title = "IT Odyssey | Home"
        dispatch(fetchPost())
    },[])

    //вывод постов которые создал пользователь
    const userPosts: PostType[] = useMemo(() => {
        return posts.filter(post => post.user._id === currentUserId);
    }, [posts, currentUserId,pageSettings]);


    return (
        <div style={{marginTop: "20px"}}>
            <div className={st.container}>
                <div>
                    <NavigationHome pageSettings={pageSettings} handlePageSettings={handlePageSettings}/>
                    {pageSettings == 1 && <AllPost posts={posts} status={status}/>}
                    {pageSettings == 2 && <YourPost userPosts={userPosts} status={status}/>}
                    {pageSettings == 3 &&  <AllUsers/> }
                </div>
                <PostMini/>
            </div>
        </div>
    );
};

export default Home;