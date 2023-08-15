import React from 'react';
import Post from "../Post/Post";

const AllPost = ({posts,status}) => {
    return (
        <div>
            {
                status === 'loading' ? <h1>ЗАГРУЗКА</h1>
                    :
                    posts.map(post => (
                        <Post post={post} key={post._id}  />
                    ))
            }
        </div>
    );
};

export default AllPost;