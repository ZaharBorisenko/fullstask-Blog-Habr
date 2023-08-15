import React, {useEffect, } from 'react';
import {useAppSelector} from "../../../redux/hook/hook";
import {selectIsAuthenticated} from "../../../redux/Slices/authSlice";
import {useNavigate, useParams} from "react-router-dom";
import st from './Profile.module.scss';
import ProfileUpdate from "../../../Components/ProfileComponents/ProfileUpdate/ProfileUpdate";
import ProfileInfo from "../../../Components/ProfileComponents/ProfileInfo/ProfileInfo";

const Profile = () => {
    let isAuth = useAppSelector(selectIsAuthenticated);
    const {id} = useParams();
    const navigate = useNavigate();
    const currentUser = useAppSelector(state => state.auth.data);
    const currentUserId = currentUser._id;

    useEffect(() => {
        if (!window.localStorage.getItem('token') && !isAuth) navigate('/login')
        document.title = "IT Odyssey | Profile"
    }, [id])

    return (
        <div className={st.container}>
            <ProfileInfo/>
            <div className={st.editUserInfo}>
                <div className={st.editContent}>
                    <div>
                        <ProfileUpdate/>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Profile;