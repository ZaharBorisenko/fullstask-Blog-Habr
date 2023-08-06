import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../redux/hook/hook";
import {fetchProfile, selectIsAuthenticated} from "../../../redux/Slices/authSlice";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    let isAuth = useAppSelector(selectIsAuthenticated);
    const user = useAppSelector(state => state.auth.data);
    console.log(user)
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchProfile())
    },[])

    return (
        <div>
            {!isAuth && <h1>У вас нет доступа к этой странице, авторизуйтесь...</h1>}
            Добро пожаловать в личный кабинет.
            <h1>{user.nickName}</h1>
        </div>
    );
};

export default Profile;