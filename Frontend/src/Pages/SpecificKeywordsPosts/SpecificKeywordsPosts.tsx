import React, {useEffect, useState} from 'react';
import {IUser} from "../../redux/Slices/postSlice";
import {useParams} from "react-router-dom";
import axios from "../../axios";
import st from "../SpecificTagPosts/SpecificTagPosts.module.scss";
import Post from "../../Components/Post/Post";
import PostMini from "../../Components/MiniPost/PostMini";

const SpecificKeywordsPosts = () => {
    const {keywords} = useParams();
    const [keywordPost, setKeywordPost] = useState<Array<IUser>>([]);

    const fetchKeywordsPost = async () => {
        const response = await axios.get(`/posts/keywords/${keywords}`);
        const data = response.data;
        setKeywordPost(data);
    }

    useEffect(() => {
        fetchKeywordsPost()
        document.title = `IT Odyssey | ${keywords}`
    },[keywords])

    return (
        <div style={{marginTop: "20px"}}>
            <div className={st.container}>
                <div>
                    <div className={st.title}>
                        <p>Ключевое слово: <span>{keywords}</span></p>
                    </div>
                    {
                        keywordPost?.map(keyword => (
                            <Post post={keyword} key={keyword._id}/>
                        ))
                    }
                </div>
                <PostMini/>
            </div>
        </div>
    );
};

export default SpecificKeywordsPosts;