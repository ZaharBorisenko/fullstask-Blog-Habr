import {ChangeEvent, useState} from 'react';
import st from './createComment.module.scss'
import {useAppDispatch, useAppSelector} from "../../../redux/hook/hook";
import {useParams} from "react-router-dom";
import {createComment} from "../../../redux/Slices/commentsSlice";
const CreateComment = () => {
    const currentUserId:string = useAppSelector(state => state.auth.data._id);
    const {id} = useParams()
    const [comment, setComment] = useState<string>('');
    const dispatch = useAppDispatch();

    const createSubmitComment = async () => {
        try {
           await dispatch(createComment({id:id as string,comment:comment,userId:currentUserId}))
            setComment('');
        }catch (e) {
            console.log(e)
        }
    }
    return (
        <div className={st.container}>
            <p className={st.title}>Ваш комментарий</p>
            <input
                value={comment}
                onChange={(e:ChangeEvent<HTMLInputElement>) => setComment(e.target.value)}
                className={st.input}
                type="text"
                placeholder="Введите ваш комментарий..."

            />
            <button onClick={() => createSubmitComment()} className={st.button}>Отправить</button>
        </div>
    );
};

export default CreateComment;