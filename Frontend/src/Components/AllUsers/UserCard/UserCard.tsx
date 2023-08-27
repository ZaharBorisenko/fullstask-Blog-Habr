import React, {FC} from 'react';
import st from './UserCard.module.scss';
import {Link} from "react-router-dom";
import {IUser} from "../../../redux/Slices/postSlice";

type propsType = {
    users: IUser[]
}
const UserCard:FC<propsType> = ({users}) => {
    console.log(users)
    return (
        <div style={{marginTop: "30px"}}>
            {
                users?.map(user => (
                    <div key={user._id}>
                        <div className={st.container} key={user._id}>
                            <Link to={`/user/${user._id}`}>
                                <img className={st.img} src={user.avatar} alt=""/>
                            </Link>
                            <div>
                                <Link to={`/user/${user._id}`} className={st.nickName}>{user.nickName}</Link>
                                <div className={st.current}>
                                    {user.privateProfile && <p>Профиль закрыт.</p>}
                                    {!user.privateProfile && <p>Профиль открыт.</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default UserCard;