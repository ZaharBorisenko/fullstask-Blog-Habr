import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../redux/hook/hook";
import {fetchProfile, selectIsAuthenticated} from "../../../redux/Slices/authSlice";
import {useNavigate, useParams} from "react-router-dom";
import axios from "../../../axios";
import st from './Profile.module.scss';
import {IUser} from "../../../redux/Slices/postSlice";
import ProfileNavbar from "../../../Components/ProfileComponents/ProfileNavbar/ProfileNavbar";
import GeneralsInformation from "../../../Components/ProfileComponents/GeneralsInformation/GeneralsInformation";
import ProfileInfo from "../../../Components/ProfileComponents/ProfileInfo/ProfileInfo";
import ProfileSettings from "../../../Components/ProfileComponents/ProfileSettings/ProfileSettings";
import ProfileUpdate from "../../../Components/ProfileComponents/ProfileUpdate/ProfileUpdate";

const Profile = () => {
    const [userInfo, setUserInfo] = useState<IUser | null>(null);
    const [subPagesProfile, setSubPagesProfile] = useState(1);
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const currentUser = useAppSelector(state => state.auth.data);
    const currentUserId = currentUser._id;
    const navigate = useNavigate();
    const {id} = useParams();
    let isAuth = useAppSelector(selectIsAuthenticated);

    const userProfile = async () => {
        const response = await axios.get(`/user/${id}`)
        const data = response.data;
        setFirstName(data.firstName || '')
        setLastName(data.lastName || '')
        setUserInfo(data);
    }

    const handleFirstName = (value) => {
        setFirstName(value)
    }
    const handleLastName = (value) => {
        setLastName(value)
    }

    const handleSubPagesProfile = (number) => {
        setSubPagesProfile(number);
    }

    const updateProfile = async () => {
        try {
            const params = {
                firstName,
                lastName,
            }

            const {data} = await axios.patch(`/user/${currentUserId}`, params)
        } catch (e) {
            console.log(e);
        }
    }


    useEffect(() => {
        if (!window.localStorage.getItem('token') && !isAuth) navigate('/login')
        userProfile();
        document.title = "IT Odyssey | Profile"
    }, [id, subPagesProfile])

    return (
        <div className={st.container}>

            <GeneralsInformation userInfo={userInfo} currentUserId={currentUserId}/>

            <div className={st.editUserInfo}>
                <div className={st.editContent}>

                    <ProfileNavbar
                        handleSubPagesProfile={handleSubPagesProfile}
                        subPagesProfile={subPagesProfile}
                    />

                    {subPagesProfile === 1 && <ProfileInfo subPagesProfile={subPagesProfile}/>}
                    {subPagesProfile === 2 &&
                        <ProfileUpdate
                            subPagesProfile={subPagesProfile}
                            handleFirstName={handleFirstName}
                            handleLastName={handleLastName}
                            firstName={firstName}
                            lastName={lastName}
                            updateProfile={updateProfile}
                        />}
                    {subPagesProfile === 3 && <ProfileSettings subPagesProfile={subPagesProfile}/>}

                </div>
            </div>

        </div>
    );
};

export default Profile;