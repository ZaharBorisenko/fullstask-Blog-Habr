import React from 'react';
import Post from "../Post/Post";
import Skeleton from "../Skeleton/SkeletonPost";

const AllPost = ({posts,status}) => {
    return (
        <div>
            {
                status === 'loading' ? <Skeleton/>
                    :
                    posts.map(post => (
                        <Post post={post} key={post._id}  />
                    ))
            }
        </div>
    );
};

export default AllPost;