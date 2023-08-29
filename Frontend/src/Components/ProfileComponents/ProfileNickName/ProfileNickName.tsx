import {FC, useState} from 'react';
import st from './ProfileNickName.module.scss'
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../../redux/hook/hook";
import {AiOutlineEdit} from "react-icons/ai";
import { FiCheck } from "react-icons/fi";

type postType = {
    nickName:string,
    setNickName: (nickName:string) => void,
    handleUpdateProfile: () => void
}

const ProfileNickName:FC<postType> = ({nickName,setNickName,handleUpdateProfile}) => {

    const {id} = useParams();
    const currentUser = useAppSelector(state => state.auth.data);
    const currentUserId = currentUser._id;
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const handleUpdateNickName = (): void => {
        handleUpdateProfile()
        setIsEdit(false)
    }
    return (
        <div>
            <div className={st.containerNickName}>
                {currentUserId === id && <p className={st.labelNickName}>Ваш никнейм: </p>}
                {currentUserId !== id && <p className={st.labelNickName}>Никнейм пользователя: </p>}
                {
                    !isEdit ?
                        <div className={st.nickNameEdit}>
                            <p className={st.nickName}>{nickName}</p>
                            {currentUserId === id && <AiOutlineEdit onClick={() => setIsEdit(true)} className={st.edit} fontSize={"34px"}/>}
                        </div>
                        :
                        <div className={st.nickNameInput}>
                            <input
                                onChange={event => setNickName(event.target.value)}
                                placeholder="Новый никнейм..."
                                type="text"/>
                            <div>
                                <FiCheck onClick={() => handleUpdateNickName()} className={st.checked} color={"#A68900"} fontSize={"34px"}/>
                            </div>
                        </div>
                }
            </div>
        </div>
    );
};

export default ProfileNickName;