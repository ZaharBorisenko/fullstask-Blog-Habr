import React, {useEffect, useState} from 'react';
import axios from "../../axios";
import st from './AllUsers.module.scss'
import UserCard from "./UserCard/UserCard";
const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const getAllUsers = async () => {
        const response = await axios.get(`/users`);
        const data = response.data
        setUsers(data)
    }
    console.log(users);

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
                        <UserCard users={users}/>
            </div>
        </div>
    );
};

export default AllUsers;