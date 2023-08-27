import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../../redux/hook/hook";
import {fetchLogin, IValues, selectIsAuthenticated} from "../../../redux/Slices/authSlice";
import {Link, useNavigate} from "react-router-dom";
import st from './Login.module.scss';
import {AiOutlineMail,AiOutlineEyeInvisible,AiOutlineEye} from "react-icons/ai";
import {RiLockPasswordLine} from "react-icons/ri";
import {toast} from "react-toastify";

const Login = () => {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(selectIsAuthenticated);
    const navigate = useNavigate();
    const errorValid = useAppSelector(state => state.auth.error);

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleShowPassword = ():void => {
        setShowPassword(!showPassword);
    }

    const {register, handleSubmit, setError, formState: {errors, isValid}} = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: "onSubmit"
    })

    const onSubmit = async (values): Promise<void> => {
        const data = await dispatch(fetchLogin(values));
        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token)
            toast.success("Вы успешно вошли!",{
                autoClose: 1500,
            })
        }
    }

    useEffect(() => {
        if (isAuth) navigate('/');
        document.title = "IT Odyssey | Login"
    }, [isAuth, navigate])

    return (
        <div className={st.container}>
            <div className={`${st.content}`}>
                <div className={st.title}>Вход</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className={st.containerLabel}>
                        <p className={st.labelText}>Email</p>
                        <input
                            placeholder="Введите email..."
                            className={`${st.input} ${(errors.email || errorValid) ? st.inputError : ''} `}
                            type="email"
                            {...register('email', {
                                required: 'Укажите почту',
                                maxLength: {value: 30, message: 'Меньше 30 символов'},
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Неправильный формат почты..."
                                }
                            })}
                        />
                        <AiOutlineMail className={st.icon} size="34px" color="#797979"/>
                        <p className={st.errorMessage}>{errors.email?.message}</p>
                    </label>
                    <label className={st.containerLabel}>
                        <p className={st.labelText}>Пароль</p>
                        <input
                            placeholder="Введите пароль..."
                            className={`${st.input} ${(errors.password || errorValid) ? st.inputError : ''} `}
                            type={showPassword ? 'text' : 'password'}
                            {...register('password', {
                                    required: "Поле не заполнено",
                                    minLength: {value: 5, message: "Минимум 5 символов"},
                                    maxLength: {value: 20, message: 'Максимум 20 символов'}
                                }
                            )}
                        />
                        {
                            showPassword ? <AiOutlineEyeInvisible onClick={() => handleShowPassword()} className={st.iconShow} size="33px" color="#797979"/>
                                :
                                <AiOutlineEye onClick={() => handleShowPassword()} className={st.iconShow} size="33px" color="#797979"/>
                        }
                        <RiLockPasswordLine className={st.icon} size="33px" color="#797979"/>

                        <p className={st.errorMessage}>{errors.password?.message}</p>
                        <p className={st.errorMessage}>{errorValid}</p>
                    </label>

                    <button className={st.btn} type="submit">Войти</button>

                    <p className={st.registerLink}>Ещё не <Link to="/register">зарегистрированы</Link>?</p>
                </form>
            </div>
        </div>
    );
};

export default Login;