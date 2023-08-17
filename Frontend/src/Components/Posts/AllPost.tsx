import React, {useEffect, useState} from 'react';
import Post from "../Post/Post";
import Skeleton from "../Skeleton/SkeletonPost";
import {createTheme, Pagination, ThemeProvider} from "@mui/material";
import {useAppSelector} from "../../redux/hook/hook";
import st from './AllPost.module.scss'
const AllPost = ({posts, status, limit, currentPagePost, setCurrentPagePost}) => {
    const totalCount = useAppSelector(state => state.posts.totalPosts);
    const [countPage, setCountPage] = useState(0)

    const theme = createTheme({
        components: {
            // Name of the component
            MuiPaginationItem: {
                styleOverrides: {
                    // Name of the slot
                    root: {
                        // Some CSS
                        fontSize: '26px',
                        padding: '25px 20px',
                    },
                },
            },
        },
    });
    const upClick = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    };


    useEffect(() => {
        setCountPage(Math.ceil(totalCount / limit))
    }, [posts])

    return (
        <div>
            {
                status === 'loading' ? <Skeleton/>
                    :
                    posts.map(post => (
                        <Post post={post} key={post._id}/>
                    ))
            }

            <div className={st.paginationContainer}>
                <ThemeProvider theme={theme}>
                    <Pagination
                        count={countPage}
                        page={currentPagePost}
                        onChange={(_,num) => {
                            setCurrentPagePost(num)
                            upClick();
                        }}
                        color="primary"
                    />
                </ThemeProvider>
            </div>

        </div>
    );
};

export default AllPost;