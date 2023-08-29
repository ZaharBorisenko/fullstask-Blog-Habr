import {useEffect, useState} from 'react';
import {PostType} from "../../redux/Slices/postSlice";
import {useParams} from "react-router-dom";
import axios from "../../axios";
import st from "../SpecificTagPosts/SpecificTagPosts.module.scss";
import Post from "../../Components/Post/Post";
import PostMini from "../../Components/MiniPost/PostMini";
import SkeletonPost from "../../Components/Skeleton/SkeletonPost";

const SpecificKeywordsPosts = () => {
    const {keywords} = useParams();
    const [keywordPost, setKeywordPost] = useState<Array<PostType>>([]);
    console.log(keywordPost)
    const [upload, setUpload] = useState(false);

    const fetchKeywordsPost = async () => {
        const response = await axios.get(`/posts/keywords/${keywords}`);
        const data = response.data;
        setKeywordPost(data);
        setUpload(true);
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
                        !upload ? <SkeletonPost/> :
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