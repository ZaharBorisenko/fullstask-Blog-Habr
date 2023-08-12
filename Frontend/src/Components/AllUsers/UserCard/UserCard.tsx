import React from 'react';
import st from './UserCard.module.scss';
import {Link} from "react-router-dom";
const UserCard = ({users}) => {
    console.log(users)
    return (
        <div style={{marginTop: "30px"}}>
            {
                users?.map(user => (
                    <div>
                        <div className={st.container} key={user._id}>
                            <Link to={`/user/${user._id}`}>
                                <img className={st.img} src={user.avatar} alt=""/>
                            </Link>
                            <div>
                                <Link to={`/user/${user._id}`} className={st.nickName}>{user.nickName}</Link>
                                <p className={st.current}>
                                    {user.privateProfile && <p>Профиль закрыт.</p>}
                                    {!user.privateProfile && <p>Профиль открыт.</p>}
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default UserCard;