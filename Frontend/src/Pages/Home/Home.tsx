import React, {useEffect} from 'react';
import Post from "../../Components/Post/Post";
import st from './Home.module.scss'
import {useAppDispatch, useAppSelector} from "../../redux/hook/hook";
import {fetchPost} from "../../redux/Slices/postSlice";
import PostMini from "../../Components/MiniPost/PostMini";


const Home = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(state => state.posts.posts)
    const status = useAppSelector(state => state.posts.status)

    useEffect(() => {
        dispatch(fetchPost())
    },[])

    return (
        <div className={st.container}>
            <div>
                {
                    status === 'loading' ? <h1>ЗАГРУЗКА</h1>
                        :
                        posts.map(post => (
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