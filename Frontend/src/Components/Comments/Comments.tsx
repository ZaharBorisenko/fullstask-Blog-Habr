import React, {useEffect, useState} from 'react';
import st from './Comments.module.scss'
import {useAppDispatch, useAppSelector} from "../../redux/hook/hook";
import {fetchComments, IComments} from "../../redux/Slices/commentsSlice";
import {useParams} from "react-router-dom";
import UserInfoPost from "../UserInfoPost/UserInfoPost";
import CreateComment from "./createComment/CreateComment";
const Comments = () => {
    const dispatch = useAppDispatch();
    const comments:IComments[] = useAppSelector(state => state.comments.comments)
    const commentsLength = useAppSelector(state => (state.comments.comments).length)
    const {id} = useParams();

    useEffect(() => {
        dispatch(fetchComments(id))
        console.log("render")
    }, [commentsLength])

    return (
        <div className={st.container}>
           <div className={st.content}>
               <p className={st.title}>Комментарии <span>{commentsLength}</span></p>

               <div>
                   <div className={st.content}>
                       {
                           comments.map(comment => (
                              <div className={st.containerComments} key={comment._id}>
                                  <UserInfoPost  post={comment}/>
                                  <p className={st.commentText}>{comment.comment}</p>
                              </div>
                           ))
                       }
                   </div>
               </div>
           </div>
            <CreateComment/>
        </div>
    );
};

export default Comments;