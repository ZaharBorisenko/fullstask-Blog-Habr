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
    const [userInfo, setUserInfo] = useState<IUser | null>(null);
    const [subPagesProfile, setSubPagesProfile] = useState(1);
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [aboutMe, setAboutMe] = useState("");
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
        setAboutMe(data.aboutMe || '')
        setUserInfo(data);
    }

    const handleAboutMe = (value) => {
        setAboutMe(value);
    };

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
                aboutMe,
            }
            const {data} = await axios.patch(`/user/${currentUserId}`, params);
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

            <GeneralsInformation
                userInfo={userInfo} currentUserId={currentUserId}
            />

            <div className={st.editUserInfo}>
                <div className={st.editContent}>
                    <div>

                        {currentUserId === id ?
                            <ProfileNavbar
                                handleSubPagesProfile={handleSubPagesProfile}
                                subPagesProfile={subPagesProfile}
                            /> :
                            <div className={st.profileNoId}>Профиль пользователя</div>
                        }


                        {currentUserId === id ?
                            <div>
                                {subPagesProfile === 1 &&
                                    <ProfileUpdate
                                        subPagesProfile={subPagesProfile}
                                        handleFirstName={handleFirstName}
                                        handleLastName={handleLastName}
                                        firstName={firstName}
                                        lastName={lastName}
                                        aboutMe={aboutMe}
                                        updateProfile={updateProfile}
                                        handleAboutMe={handleAboutMe}
                                    />}
                            </div> : "Пользователь скрыл информацию"
                        }

                    </div>
                </div>
            </div>

        </div>
    );
};

export default Profile;