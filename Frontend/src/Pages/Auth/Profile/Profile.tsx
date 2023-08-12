import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../redux/hook/hook";
import {fetchProfile, selectIsAuthenticated} from "../../../redux/Slices/authSlice";
import {useNavigate, useParams} from "react-router-dom";
import axios from "../../../axios";
import st from './Profile.module.scss';
import {IUser} from "../../../redux/Slices/postSlice";
import ProfileNavbar from "../../../Components/ProfileComponents/ProfileNavbar/ProfileNavbar";
import GeneralsInformation from "../../../Components/ProfileComponents/GeneralsInformation/GeneralsInformation";
import ProfileSettings from "../../../Components/ProfileComponents/ProfileSettings/ProfileSettings";
import ProfileUpdate from "../../../Components/ProfileComponents/ProfileUpdate/ProfileUpdate";

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