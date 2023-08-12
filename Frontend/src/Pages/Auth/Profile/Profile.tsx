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
    const [avatar,setAvatar] = useState<any>("");
    console.log(avatar)
    const [aboutMe, setAboutMe] = useState("");
    const [nickName, setNickName] = useState("");
    const currentUser = useAppSelector(state => state.auth.data);
    const currentUserId = currentUser._id;
    const navigate = useNavigate();
    const {id} = useParams();
    let isAuth = useAppSelector(selectIsAuthenticated);
    const [privateProfile, setPrivateProfile] = useState<boolean>(true);
    const [profileUpdated, setProfileUpdated] = useState(false);

    const changeAvatarFiles = async (event) => {
        try {
            const formData = new FormData();
            formData.append('image', event.target.files[0]);
            const {data} = await axios.post('/upload', formData);
            setAvatar(`http://localhost:4000/${data.url}`);
        }catch (e) {
            console.log(`Ошибка при загрузке ${e}`)
        }
    }


    const userProfile = async () => {
        const response = await axios.get(`/user/${id}`)
        const data = response.data;
        setFirstName(data.firstName || '');
        setLastName(data.lastName || '');
        setAboutMe(data.aboutMe || '');
        setNickName(data.nickName || '');
        setPrivateProfile(data.privateProfile);
        setAvatar(data.avatar);
        setUserInfo(data);
    }

    const handleAboutMe = (value:string):void => {
        setAboutMe(value);
    };
    const handleNickName = (value:string):void => {
        setNickName(value)
    }

    const handleFirstName = (value:string):void => {
        setFirstName(value)
    }
    const handleLastName = (value:string):void => {
        setLastName(value)
    }
    const handleSubPagesProfile = (number) => {
        setSubPagesProfile(number);
    }

    const handlePrivateProfile = (value:boolean):void => {
        setPrivateProfile(value)
    }

    const updateProfile = async () => {
        try {
            const params = {
                firstName,
                lastName,
                aboutMe,
                privateProfile,
                nickName,
                avatar,
            }
            const {data} = await axios.patch(`/user/${currentUserId}`, params);
            setProfileUpdated(true)
        } catch (e) {
            console.log(e);
        }
    }


    useEffect(() => {
        if (!window.localStorage.getItem('token') && !isAuth) navigate('/login')
        userProfile();
        document.title = "IT Odyssey | Profile"
        console.log('RERENDER')
        setProfileUpdated(false);
    }, [id, profileUpdated])

    return (
        <div className={st.container}>

            <GeneralsInformation
                userInfo={userInfo}
                currentUserId={currentUserId}
                privateProfile={privateProfile}
                handlePrivateProfile={handlePrivateProfile}
                updateProfile={updateProfile}
                nickName={nickName}
                avatar={avatar}
                handleNickName={handleNickName}
                changeAvatarFiles={changeAvatarFiles}
            />

            <div className={st.editUserInfo}>
                <div className={st.editContent}>
                    <div>

                        {currentUserId === id ?
                            <ProfileNavbar
                                handleSubPagesProfile={handleSubPagesProfile}
                                subPagesProfile={subPagesProfile}
                            /> :
                            <div className={st.profileNoId}>Информация о пользователе</div>
                        }



                        {
                            currentUserId === id ?
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
                                </div>  : ''
                        }

                        {
                            userInfo?.privateProfile === true && currentUserId !== id && <h1>Профиль пользователя закрыт</h1>
                        }
                        {
                            userInfo?.privateProfile !== true && currentUserId !== id && (
                                <div>
                                    <p>Имя пользователя: <span>{userInfo?.firstName}</span></p>
                                    <p>Фамилия пользователя: <span>{userInfo?.lastName}</span></p>
                                </div>
                            )
                        }

                    </div>
                </div>
            </div>

        </div>
    );
};

export default Profile;