import {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "../../axios";
import {PostType} from "../../redux/Slices/postSlice";
import 'react-quill/dist/quill.snow.css';
import st from '../../Components/Post/Post.module.scss'
import PostMini from "../../Components/MiniPost/PostMini";
import {formatDate} from "../../utils/formatDate";
import time from "../../assets/img/time.png";
import view from "../../assets/img/view.png";
import SomethingPost from "../../Components/Post/SomethingPost";
import {useAppSelector} from "../../redux/hook/hook";
import Comments from "../../Components/Comments/Comments";

const PostDetails = () => {
    const {id} = useParams();
    const currentUserId = useAppSelector(state => state.auth.data._id);
    const [post, setPost] = useState<PostType>({} as PostType);

    const fetchPost = async () => {
        const response = await axios.get(`/posts/${id}`);
        const data = await response.data;
        setPost(data)
    }

    useEffect(() => {
        fetchPost();
        document.title = `IT Odyssey | ${post?.title}`
    }, [post.title])

    console.log()
    return (
        <div className={st.containerPostDetails}>
            <div>
                <div className={st.detailsPostDetails}>
                    <div className={st.contentPostDetails}>
                        {
                            'user' in post && (
                                <div>
                                    <div className={st.containerDelete}>
                                        <div className={st.user}>
                                            <img className={st.avatar} src={post.user.avatar} alt=""/>
                                            <p className={st.name}>{post.user.nickName}</p>
                                            <p className={st.timeAgo}>{formatDate(post.createdAt!)}</p>
                                        </div>

                                        {
                                            post?.user._id === currentUserId ? <SomethingPost post={post}/> : ''
                                        }

                                    </div>


                                    <h1>{post.title}</h1>

                                    <div className={st.info}>

                                        {post.difficultyLevel === 'Простой' && <p className={`${st.level} ${st.levelEasy}`}>{post.difficultyLevel}</p>}
                                        {post.difficultyLevel === 'Средний' && <p className={`${st.level} ${st.levelMiddle}`}>{post.difficultyLevel}</p>}
                                        {post.difficultyLevel === 'Сложный' && <p className={`${st.level} ${st.levelHard}`}>{post.difficultyLevel}</p>}

                                        <div className={st.readingTime}>
                                            <img src={time} alt=""/>
                                            <div>{`${post.readingTime} мин`}</div>
                                        </div>
                                        <div className={st.viewCount}>
                                            <img src={view} alt=""/>
                                            <div>{post.viewCount}</div>
                                        </div>
                                    </div>


                                    <div className={st.keywords}>
                                        {
                                            post.keywords?.map((p, index) => (
                                                <Link to={`/posts/keyword/${p}`} key={index}>{p}*</Link>
                                            ))
                                        }
                                    </div>
                                </div>

                            )
                        }
                        <img className={st.img} src={`http://localhost:4000/${post.imagePost}`} alt="error"/>
                        <div>
                            <div className={st.editRedactor} dangerouslySetInnerHTML={{__html: post.text}}></div>
                        </div>

                        <div className={st.tagsDetails}>
                            <p>Теги:</p>
                            {
                                post.tags?.map((tags,index) => (
                                    <Link to={`/posts/tag/${tags}`} key={index}>{tags}</Link>
                                ))
                            }
                        </div>

                        <div className={st.keywordsDetails}>
                            <p>Ключевые слова:</p>
                            {
                                post.keywords?.map((keyword,index) => (
                                    <Link to={`/posts/keywords/${keyword}`} key={index}>{keyword},</Link>
                                ))
                            }
                        </div>

                    </div>

                </div>


                <Comments/>


            </div>

            <PostMini/>
        </div>
    );
};

export default PostDetails;