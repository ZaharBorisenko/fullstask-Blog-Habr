import React, {FC} from 'react';
import st from "./AuthorizationLink.module.scss";
import {Link} from "react-router-dom";
import {useAppDispatch} from "../../../redux/hook/hook";
import {logOut} from "../../../redux/Slices/authSlice";

type AuthorizationLinkType = {
    isAuth: boolean
    setOpenAuthorization: (isOpen:boolean) => void,
    openAuthorization: boolean
}

const AuthorizationLink:FC<AuthorizationLinkType> = ({isAuth,setOpenAuthorization,openAuthorization}) => {
    const dispatch = useAppDispatch();

    const handleLogOut = () => {
        if (window.confirm('Вы точно хотите выйти?')) dispatch(logOut())
        window.localStorage.removeItem('token');
    }

    return (
            <div className={st.authorizationLink}>

                {
                    isAuth ?
                        <div className={st.link}>
                           <Link onClick={() => setOpenAuthorization(false)} to="/profile">Профиль</Link>
                            <Link onClick={() => {
                                setOpenAuthorization(false);
                                handleLogOut();
                            }} to="/">Выйти</Link>
                        </div>
                        :
                        <div className={st.link}>
                            <Link onClick={() => setOpenAuthorization(false)} to="/register">Регистрация</Link>
                            <Link onClick={() => setOpenAuthorization(false)} to="/login">Войти</Link>
                        </div>
                }


            </div>
    );
};

export default AuthorizationLink;