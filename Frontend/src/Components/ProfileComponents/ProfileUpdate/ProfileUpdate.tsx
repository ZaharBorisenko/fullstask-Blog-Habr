import React, {FC, useEffect, useState} from 'react';
import st from './ProfileUpdate.module.scss'
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {modules} from "../../../utils/modulesProfileEdit";
import axios from "../../../axios";
import {IUser} from "../../../redux/Slices/postSlice";
import {useAppSelector} from "../../../redux/hook/hook";
import {useParams} from "react-router-dom";


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
    console.log(`Профиль обновление:${update}`);
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

    const UpdateProfileInfo = () => {
        setUpdate(true);
        updateProfile();
    }

    useEffect(() => {
        userProfile()
        console.log(`RENDER`);
    },[update])

    return (
        <div>
            <div>
                <div className={st.containerInput}>
                    <div>
                        <label className={st.label}>Ваше имя:</label>
                        <input
                            value={firstName}
                            onChange={(event) => setFirstName(event.target.value)}
                            className={st.input} type="text"
                            placeholder="Имя.."/>
                    </div>
                    <div>
                        <label className={st.label}>Ваша фамалия:</label>
                        <input
                            value={lastName}
                            onChange={(event) => setLastName(event.target.value)}
                            className={st.input} type="text"
                            placeholder="Фамилия..."/>
                    </div>
                </div>

                <div className={st.about}>
                    <label className={st.label}>Тут вы можете рассказать о себе:</label>
                    <ReactQuill theme="snow" value={aboutMe} onChange={setAboutMe} modules={modules}/>
                </div>

                <button onClick={UpdateProfileInfo} className={st.button}>Обновить данные</button>
            </div>
        </div>
    );
};

export default ProfileUpdate;