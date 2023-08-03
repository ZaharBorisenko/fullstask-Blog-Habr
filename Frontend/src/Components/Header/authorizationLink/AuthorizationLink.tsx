import React, {FC} from 'react';
import st from "./AuthorizationLink.module.scss";
import {Link} from "react-router-dom";

type AuthorizationLinkType = {
    isAuth: boolean
    setOpenAuthorization: (isOpen:boolean) => void,
    openAuthorization: boolean
}

const AuthorizationLink:FC<AuthorizationLinkType> = ({isAuth,setOpenAuthorization,openAuthorization}) => {
    return (
            <div className={st.authorizationLink}>

                {
                    isAuth ?
                        <div className={st.link}>
                           <Link onClick={() => setOpenAuthorization(false)} to="/profile">Профиль</Link>
                            <Link onClick={() => setOpenAuthorization(false)} to="/">Выйти</Link>
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