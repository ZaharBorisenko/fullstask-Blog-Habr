import React, {useEffect, useMemo} from 'react';
import Post from "../../Components/Post/Post";
import st from './Home.module.scss'
import {useAppDispatch, useAppSelector} from "../../redux/hook/hook";
import {fetchPost, PostType} from "../../redux/Slices/postSlice";
import PostMini from "../../Components/MiniPost/PostMini";

const Home = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(state => state.posts.posts);
    const status = useAppSelector(state => state.posts.status);

    useEffect(() => {
        document.title = "IT Odyssey | Home"
        dispatch(fetchPost())
    },[])

    const momoizedCashPost: PostType[] = useMemo(() => posts,[posts])

    return (
        <div className={st.container}>
            <div>
                {
                    status === 'loading' ? <h1>ЗАГРУЗКА</h1>
                        :
                        momoizedCashPost.map(post => (
                            <Post post={post} key={post._id}  />
                        ))
                }
            </div>
            <div>
                <PostMini/>
            </div>
        </div>
    );
};

export default Home;