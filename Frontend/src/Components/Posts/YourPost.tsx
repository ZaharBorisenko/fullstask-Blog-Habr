import React from 'react';
import Post from "../Post/Post";

const YourPost = ({userPosts,status}) => {
    return (
        <div>
            <div>
                {
                    status === 'loading' ? <h1>ЗАГРУЗКА</h1>
                        :
                        userPosts.map(post => (
                            <Post post={post} key={post._id}  />
                        ))
                }
            </div>
        </div>
    );
};

export default YourPost;