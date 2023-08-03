import {Link} from "react-router-dom";
import {AiOutlineUser} from "react-icons/ai";
import st from './Header.module.scss';
import {useRef, useState} from "react";
import AuthorizationLink from "./authorizationLink/AuthorizationLink";
import profileIcon from '../../assets/img/profileIcon.png'

const Header = () => {
    let isAuth = false;
    const [openAuthorization, setOpenAuthorization] = useState<boolean>(false);
    const isOpenAuthorization = (isOpen: boolean): void => {
        setOpenAuthorization(isOpen)
    };

    const correction = useRef<HTMLDivElement>(null!);
    const profile = useRef<HTMLImageElement>(null!);
    window.addEventListener('click', e => {
        if (e.target !== correction.current && e.target !== profile.current) setOpenAuthorization(false)
    })

    return (
        <header className={st.header}>
            <div className={st.container}>

                <div className={st.info}>
                    <Link className={st.logo} to="/">IT Odyssey</Link>
                    <Link className={st.author} to="/start">Как стать автором</Link>
                </div>

                <div className={st.authorization}>

                    {
                        isAuth ? <Link className={st.addPost} to="/createPost">Написать публикацию</Link>
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
                            src={profileIcon} alt=""/>


                        {openAuthorization && <AuthorizationLink isAuth={isAuth} openAuthorization={openAuthorization}
                                                                 setOpenAuthorization={setOpenAuthorization}/>}
                    </div>
                </div>

            </div>
        </header>
    );
};

export default Header;