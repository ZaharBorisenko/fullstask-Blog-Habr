import {useEffect} from 'react';
import Post from "../Post/Post";
import {useAppDispatch, useAppSelector} from "../../redux/hook/hook";
import {fetchPostAllUser, IUser, PostType} from "../../redux/Slices/postSlice";
import Skeleton from "../Skeleton/SkeletonPost";

const YourPost = () => {
    const dispatch = useAppDispatch()
    const currentUser:IUser = useAppSelector(state => state.auth.data);
    const currentUserId:string = currentUser._id;
    const sortParams:string = useAppSelector(state => state.sortPost.sortParams)

    //посты по умолчанию
    const posts:PostType[] = useAppSelector(state => state.posts.postsUser);
    const userPosts = posts.filter(post => post.user._id === currentUserId)
    const status:string = useAppSelector(state => state.posts.status);
    //посты пользователя отсортированы по популярности
    const userPopularityPosts = Array.from(userPosts).sort((a,b) => b.viewCount - a.viewCount);



    useEffect(() => {
        sortParams == '' && dispatch(fetchPostAllUser())
        console.log('render')
    },[sortParams])

    return (
        <div>
            <div>
                {
                    sortParams == '' &&
                    <div>
                        {
                            status === 'loading' ? <Skeleton/>
                                :
                                userPosts?.map(post => (
                                    <Post post={post} key={post._id}  />
                                ))
                        }
                    </div>
                }

                {
                    sortParams == 'popularity' &&
                    <div>
                        {
                            status === 'loading' ? <Skeleton/>
                                :
                                userPopularityPosts?.map(post => (
                                    <Post post={post} key={post._id}  />
                                ))
                        }
                    </div>
                }
            </div>
        </div>
    );
};

export default YourPost;