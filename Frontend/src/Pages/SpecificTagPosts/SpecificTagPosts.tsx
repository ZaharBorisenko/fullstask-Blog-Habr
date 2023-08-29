import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "../../axios";
import {PostType} from "../../redux/Slices/postSlice";
import Post from "../../Components/Post/Post";
import PostMini from "../../Components/MiniPost/PostMini";
import st from './SpecificTagPosts.module.scss'
import SkeletonPost from "../../Components/Skeleton/SkeletonPost";
const SpecificTagPosts = () => {
    const {tag} = useParams();
    const [tagsPost, setTagsPost] = useState<Array<PostType>>([]);
    const [upload, setUpload] = useState(false);
    const fetchTagsId = async () => {
        const response = await axios.get(`/posts/tag/${tag}`)
        const data = response.data
        setTagsPost(data)
        setUpload(true)
    }

    useEffect(() => {
        fetchTagsId();
        document.title = `IT Odyssey | ${tag}`
    },[])
    return (
        <div style={{marginTop: "20px"}}>
            <div className={st.container}>
                <div>
                    <div className={st.title}>
                        <p>Посты с тегом <span>{tag}</span></p>
                    </div>
                    {
                        !upload ? <SkeletonPost/> :
                        tagsPost.map(post => (
                            <Post post={post} key={post._id}/>
                        ))
                    }
                </div>
                <PostMini/>
            </div>
        </div>
    );
};

export default SpecificTagPosts;