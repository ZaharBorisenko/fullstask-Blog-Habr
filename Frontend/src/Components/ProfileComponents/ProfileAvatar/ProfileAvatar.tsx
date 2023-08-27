import React, {FC, useRef} from 'react';
import st from './ProfileAvatar.module.scss'
import {AiOutlineEdit} from "react-icons/ai";
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../../redux/hook/hook";
import axios from "../../../axios";
import {IUser} from "../../../redux/Slices/postSlice";

type propsType = {
    avatar: string,
    handleUpdateProfile: () => void,
    setAvatar: (avatar:string) => void
}

const ProfileAvatar:FC<propsType> = ({avatar,handleUpdateProfile,setAvatar}) => {
    const {id} = useParams();
    const currentUser:IUser = useAppSelector(state => state.auth.data);
    const currentUserId:string = currentUser._id;

    const handleChangeFile = async (event) => {
        try {
            const formData = new FormData();
            formData.append('image', event.target.files[0]);
            const {data} = await axios.post('/upload', formData);
            setAvatar(`http://localhost:4000/${data.url}`);
        } catch (e) {
            console.log(`Ошибка при загрузке ${e}`)
        }
    };

    const inputFileAvatar = useRef<any>();
    return (
        <div className={st.containerAvatar}>
            <img className={st.avatar} src={avatar} alt=""/>
            {currentUserId === id &&
                <AiOutlineEdit
                    onClick={() => inputFileAvatar.current.click()}
                    className={st.iconEditAvatar}
                    fontSize={"35px"}
                />
            }
            {currentUserId === id &&
                <div>
                    <input ref={inputFileAvatar} onChange={handleChangeFile} type="file" hidden={true}/>
                    {currentUser.avatar !== avatar &&
                        <button className={st.avatarUpload} onClick={() => handleUpdateProfile()}>Обновить
                            аватар</button>}
                </div>
            }
        </div>
    );
};

export default ProfileAvatar;