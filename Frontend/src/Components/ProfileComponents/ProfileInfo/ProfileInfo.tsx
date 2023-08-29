import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "../../../axios";
import st from './ProfileInfo.module.scss';
import {useAppSelector} from "../../../redux/hook/hook";
import ProfileAvatar from "../ProfileAvatar/ProfileAvatar";
import ProfileNickName from "../ProfileNickName/ProfileNickName";
import {IUser} from "../../../redux/Slices/postSlice";
import {formatDate} from "../../../utils/formatDate";
import ProfilePrivateBtn from "../ProfilePrivateBtn/ProfilePrivateBtn";
import {toast} from "react-toastify";
import SkeletonLeftInfo from "../../Skeleton/SkeletonLeftInfo";

const ProfileInfo = () => {
    const {id} = useParams();
    const currentUser:IUser = useAppSelector(state => state.auth.data);
    const currentUserId:string= currentUser._id;
    const [avatar, setAvatar] = useState<string>('')
    const [nickName, setNickName] = useState<string>('')
    const [dateRegister, setDateRegister] = useState<string>('');
    const [privateProfile, setPrivateProfile] = useState<boolean>(true);
    const [updated, setUpdated] = useState(false)
    const fetchUser = async () => {
        const response = await axios.get(`/user/${id}`);
        const data:IUser = response.data;
        setAvatar(data.avatar);
        setNickName(data.nickName)
        setDateRegister(data.createdAt || '');
        setPrivateProfile(data.privateProfile!);
        setUpdated(true)
    }

    const updateProfile = async (): Promise<void> => {
        try {
            const params = {
                avatar,
                nickName,
            }
            const {data} = await axios.patch(`/user/${currentUserId}`, params);
            toast.success('Информация успешно обновлена',{
                autoClose: 1500,
            })
            return data
        } catch (e) {
            console.log(e)
        }
    }

    const updateProfilePrivate = async (): Promise<void> => {
        try {
            const params = {
                privateProfile,
            }
            const {data} = await axios.patch(`/user/${currentUserId}`, params);
            toast.success(`${privateProfile? 'Профиль успешно закрыт' : 'Профиль успешно открыт'}`,{
                autoClose: 1500,
            })
            return data
        } catch (e) {
            console.log(e)
        }
    }

    const handleUpdateProfile = (): void => {
        updateProfile();
    }

    useEffect(() => {
        console.log(`render...`)
        fetchUser()
    }, [id])

    return (
        <div className={st.container}>
            <div className={st.content}>
                {
                    !updated ? <SkeletonLeftInfo/>
                        :
                        <div>
                            <ProfileAvatar
                                avatar={avatar}
                                handleUpdateProfile={handleUpdateProfile}
                                setAvatar={setAvatar}
                            />
                            <ProfileNickName
                                nickName={nickName}
                                setNickName={setNickName}
                                handleUpdateProfile={handleUpdateProfile}
                            />

                            <div className={st.containerRegister}>
                                <p>Дата регистрации: </p>
                                <p className={st.register}>{formatDate(dateRegister)}</p>
                            </div>

                            {currentUserId === id &&
                                <ProfilePrivateBtn
                                    privateProfile={privateProfile}
                                    setPrivateProfile={setPrivateProfile}
                                    updateProfilePrivate={updateProfilePrivate}
                                />
                            }
                        </div>
                }
            </div>
        </div>
    );
};

export default ProfileInfo;