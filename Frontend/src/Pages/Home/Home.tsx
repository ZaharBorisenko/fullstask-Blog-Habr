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
    const [pageSettings, setPageSettings] = useState(1); //страница навигации
    const [sortBy, setSortBy] = useState('');
    const handlePageSettings = (value) => {
        setPageSettings(value);
    }
    useEffect(() => {
        document.title = "IT Odyssey | Home"
    }, [pageSettings])



    return (
        <div style={{marginTop: "20px"}}>
            <div className={st.container}>
                <div>
                    <NavigationHome pageSettings={pageSettings} handlePageSettings={handlePageSettings}/>

                    <SortPanel sortBy={sortBy} setSortBy={setSortBy}/>

                    {pageSettings == 1 && <AllPost sortBy={sortBy}/>}
                    {pageSettings == 2 && <YourPost/>}
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