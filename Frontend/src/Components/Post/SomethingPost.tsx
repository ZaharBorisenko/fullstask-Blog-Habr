import React from 'react';
import st from "./Post.module.scss";
import {Link, useNavigate} from "react-router-dom";
import {AiFillDelete, AiFillEdit} from "react-icons/ai";
import {fetchDeletePost} from "../../redux/Slices/postSlice";
import {useAppDispatch} from "../../redux/hook/hook";
import {toast} from "react-toastify";

const SomethingPost = ({post}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    console.log(post._id)
    const removePost = (id) => {
        dispatch(fetchDeletePost(id))
        navigate('/');
    }
    return (
        <div className={st.interaction}>
            <Link to={`/posts/${post._id}/edit`}>
                <AiFillEdit color={"#333"} fontSize={"32px"}/>
            </Link>

            <AiFillDelete className={st.deleteIcon} color={"#333"} fontSize={"32px"} onClick={() => {
                if (window.confirm('Вы точно хотите удалить пост?',)) {
                    removePost(post._id)
                    toast.success('Пост успешно удалён',{autoClose: 1500,});
                }
            }}>
            </AiFillDelete>
        </div>
    );
};

export default SomethingPost;