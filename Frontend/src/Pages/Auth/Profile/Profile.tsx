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
        if (!isAuth) navigate('/login')
        dispatch(fetchProfile())
        document.title = "IT Odyssey | Profile"
    },[])

    return (
        <div>
            Добро пожаловать в личный кабинет.
            <h1>{user.nickName}</h1>
        </div>
    );
};

export default Profile;