import React, {useEffect, useState} from 'react';
import st from './Cookie.module.scss';
import cookie from '../../assets/img/cookie.svg'
const Cookie = () => {

    const [activeCookie, setActiveCookie] = useState(false);

    const handleActiveCookie = () => {
        setActiveCookie(false)
        localStorage.setItem('cookie', JSON.stringify(activeCookie));
    }
    useEffect(() => {
        if (localStorage.getItem('cookie') == null){
            setTimeout(() => {
                setActiveCookie(true);
            },3000)
        }
    },[])

    return (
        <div className={`${st.container} ${activeCookie ? st.containerActive : ''}`}>
            <div className={st.content}>
                <img src={cookie} alt="cookie"/>
                <div className={st.text}>
                    <p>Мы используем файлы cookie, чтобы улучшить работу и повысить эффективность сайта. Продолжая пользование данным сайтом, вы соглашаетесь с использованием файлов cookie.</p>
                    <button onClick={() => handleActiveCookie()} className={st.btn}>Хорошо</button>
                </div>
            </div>
        </div>
    );
};

export default Cookie;