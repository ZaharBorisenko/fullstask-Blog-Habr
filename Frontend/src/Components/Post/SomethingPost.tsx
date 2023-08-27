import React, {FC} from 'react';
import st from "./Post.module.scss";
import {Link, useNavigate} from "react-router-dom";
import {AiFillDelete, AiFillEdit} from "react-icons/ai";
import {fetchDeletePost, PostType} from "../../redux/Slices/postSlice";
import {useAppDispatch} from "../../redux/hook/hook";
import {toast} from "react-toastify";
type propsType = {
    post:PostType
}
const SomethingPost:FC<propsType> = ({post}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const removePost = (id:string): void => {
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