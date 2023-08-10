import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../redux/hook/hook";
import {fetchProfile, selectIsAuthenticated} from "../../../redux/Slices/authSlice";
import {useNavigate, useParams} from "react-router-dom";
import axios from "../../../axios";
import st from './Profile.module.scss';
import {IUser} from "../../../redux/Slices/postSlice";

const Profile = () => {
    const [userInfo, setUserInfo] = useState<IUser | null>(null);
    const currentUser = useAppSelector(state => state.auth.data)
    const currentUserId = currentUser._id;
    const navigate = useNavigate();
    const {id} = useParams();
    let isAuth = useAppSelector(selectIsAuthenticated);

    const userProfile = async () => {
        const response = await axios.get(`/user/${id}`)
        const data = response.data;
        setUserInfo(data);
    }
    //функция для преобразования времени:
    function formatDate(dateString) {
        const months = [
            "января", "февраля", "марта", "апреля", "мая", "июня",
            "июля", "августа", "сентября", "октября", "ноября", "декабря"
        ];

        const date = new Date(dateString);
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    }

    // const dispatch = useAppDispatch();
    useEffect(() => {
        if (!window.localStorage.getItem('token') && !isAuth) navigate('/login')
        userProfile();
        document.title = "IT Odyssey | Profile"
    },[id])

    return (
        <div className={st.container}>
            {
                userInfo === null ? '' :
                    <div className={st.info}>
                        <img className={st.avatar} src={userInfo.avatar} alt=""/>
                        <div className={st.name}>
                            {currentUserId === userInfo._id ? 'Ваш никнейм: ' : 'Никнейм пользователя: '}
                            <span>{userInfo.nickName}</span>
                        </div>
                        <p className={st.dateRegister}>Дата регистрации: <span>{formatDate(userInfo.createdAt)}</span></p>
                    </div>
            }
        </div>
    );
};

export default Profile;