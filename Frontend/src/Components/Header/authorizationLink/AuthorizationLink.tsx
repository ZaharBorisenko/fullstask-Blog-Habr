import {FC} from 'react';
import st from "./AuthorizationLink.module.scss";
import {Link} from "react-router-dom";
import {useAppDispatch} from "../../../redux/hook/hook";
import {logOut} from "../../../redux/Slices/authSlice";
import {toast} from "react-toastify";

type AuthorizationLinkType = {
    isAuth: boolean
    setOpenAuthorization: (isOpen:boolean) => void,
    openAuthorization: boolean
    userId: string
}

const AuthorizationLink:FC<AuthorizationLinkType> = ({userId,isAuth,setOpenAuthorization}) => {
    const dispatch = useAppDispatch();
    const handleLogOut = () => {
        if (window.confirm('Вы точно хотите выйти?')) {
            dispatch(logOut())
            toast.warn('Вы вышли из аккаунта!',{
                autoClose: 1500,
            });
        }
        window.localStorage.removeItem('token');
    }

    return (
            <div className={st.authorizationLink}>

                {
                    isAuth ?
                        <div className={st.link}>
                           <Link onClick={() => setOpenAuthorization(false)} to={`/user/${userId}`}>Профиль</Link>
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