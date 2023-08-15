import React, {FC, useEffect, useState} from 'react';
import st from './ProfileUpdate.module.scss'
import 'react-quill/dist/quill.snow.css';
import axios from "../../../axios";
import {IUser} from "../../../redux/Slices/postSlice";
import {useAppSelector} from "../../../redux/hook/hook";
import {useParams} from "react-router-dom";
import ProfileUpdateInput from "../ProfileUpdateInput/ProfileUpdateInput";
import ProfileOpen from "../ProfileOpen/ProfileOpen";
import ProfileExit from "../ProfileExit/ProfileExit";
import {toast} from "react-toastify";


const ProfileUpdate = () => {
    const currentUser = useAppSelector(state => state.auth.data);
    const currentUserId = currentUser._id;
    const {id} = useParams();
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [aboutMe, setAboutMe] = useState("");
    const [userInfo, setUserInfo] = useState<IUser | null>(null);
    const [update, setUpdate] = useState(false);
    const userProfile = async () => {
        const response = await axios.get(`/user/${id}`)
        const data = response.data;
        setUserInfo(data);
        setFirstName(data.firstName || '');
        setLastName(data.lastName || '');
        setAboutMe(data.aboutMe || '');
    }
    const updateProfile = async () => {
        try {
            const params = {
                firstName,
                lastName,
                aboutMe,
            }
            const {data} = await axios.patch(`/user/${currentUserId}`, params);
            toast.success('Информация успешно обновлена')
        } catch (e) {
            console.log(e);
        }
    }

    const UpdateProfileInfo = () => {
        setUpdate(true);
        updateProfile();
    }

    useEffect(() => {
        userProfile()
        // console.log(`RENDER`);
    }, [update])

    return (
        <div>
            { userInfo?.privateProfile === false && <div className={st.title}>Профиль</div>}
            {currentUserId === id &&
                <ProfileUpdateInput
                    firstName={firstName}
                    lastName={lastName}
                    aboutMe={aboutMe}
                    UpdateProfileInfo={UpdateProfileInfo}
                    setFirstName={setFirstName}
                    setLastName={setLastName}
                    setAboutMe={setAboutMe}
                />
            }

            {currentUserId !== id && userInfo?.privateProfile === true &&
                <ProfileExit/>
            }
            {currentUserId !== id && userInfo?.privateProfile === false &&
                <ProfileOpen
                    firstName={firstName}
                    lastName={lastName}
                    aboutMe={aboutMe}
                />

            }

        </div>
    );
};

export default ProfileUpdate;