import {useEffect, useState} from 'react';
import axios from "../../axios";
import st from './AllUsers.module.scss'
import UserCard from "./UserCard/UserCard";
import SkeletonUsersAll from "../Skeleton/SkeletonUsersAll";
import {IUser} from "../../redux/Slices/postSlice";
const AllUsers = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [upload, setUpload] = useState<boolean>(false);
    const getAllUsers = async ():Promise<void> => {
        const response = await axios.get(`/users`);
        const data = response.data
        setUsers(data)
        setUpload(true)
    }

    useEffect(() => {
       getAllUsers();
    },[])
    return (
        <div className={st.container}>
            <div className={st.content}>
                    <div className={st.contentTop}>
                        <div className={st.title}>Топ 100 пользователей:</div>
                        <div className={st.rating}>Рейтинг</div>
                    </div>
                {upload ? <UserCard users={users}/> : <SkeletonUsersAll/>  }
            </div>
        </div>
    );
};

export default AllUsers;