import {Link} from "react-router-dom";
import st from './Header.module.scss';
import {useEffect, useRef, useState} from "react";
import AuthorizationLink from "./authorizationLink/AuthorizationLink";
import profileIcon from '../../assets/img/profileIcon.png'
import {useAppSelector} from "../../redux/hook/hook";
import {selectIsAuthenticated} from "../../redux/Slices/authSlice";

const Header = () => {
    let isAuth = useAppSelector(selectIsAuthenticated);
    const user = useAppSelector(state => state.auth.data);
    const userId = user._id;
    const [openAuthorization, setOpenAuthorization] = useState<boolean>(false);

    const correction = useRef<HTMLDivElement>(null!);
    const profile = useRef<HTMLImageElement>(null!);
    window.addEventListener('click', e => {
        if (e.target !== correction.current && e.target !== profile.current) setOpenAuthorization(false)
    })

    useEffect(() => {

    },[])

    return (
        <header className={st.header}>
            <div className={st.container}>

                <div className={st.info}>
                    <Link className={st.logo} to="/">IT Odyssey</Link>
                    <Link className={st.author} to="/start">Как стать автором</Link>
                </div>

                <div className={st.authorization}>

                    {
                        isAuth ?
                            <div className={st.containerIsAuth}>
                                <Link className={st.favourites} to="/favourites">Избранное</Link>
                                <Link className={st.addPost} to="/createPost">Написать публикацию</Link>
                            </div>
                            :
                            <div
                                ref={correction}
                                className={st.correction}
                                onClick={() => setOpenAuthorization(!openAuthorization)}>Авторизуйтесь, для публикации
                                статьи
                            </div>
                    }


                    <div className={st.authorizationLinkContainer}>

                        <img
                            ref={profile}
                            onClick={() => setOpenAuthorization(!openAuthorization)}
                            className={st.profileIcon}
                            src={isAuth ? user.avatar : profileIcon} alt=""/>


                        {openAuthorization && <AuthorizationLink userId={userId} isAuth={isAuth} openAuthorization={openAuthorization}
                                                                 setOpenAuthorization={setOpenAuthorization}/>}
                    </div>
                </div>

            </div>
        </header>
    );
};

export default Header;