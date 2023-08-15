import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../redux/hook/hook";
import {fetchLogin, fetchRegister, IValues, selectIsAuthenticated} from "../../../redux/Slices/authSlice";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import st from '../Login/Login.module.scss'
import {AiOutlineEye, AiOutlineEyeInvisible, AiOutlineMail, AiOutlineUser} from "react-icons/ai";
import {RiLockPasswordLine} from "react-icons/ri";
import {toast} from "react-toastify";

const Register = () => {

    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(selectIsAuthenticated);
    const navigate = useNavigate();
    const errorValid = useAppSelector(state => state.auth.error);
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const {register, handleSubmit, setError, formState: {errors, isValid}} = useForm({
        defaultValues: {
            nickName: '',
            email: '',
            password: '',
            avatar: 'https://sun9-69.userapi.com/impg/ip7mMSxy27DreknYXVnpQun4JDxjXGVOuQRkqQ/48pmuGRu8Vc.jpg?size=512x512&quality=95&sign=67976be673a914f929889c897ba4ba84&c_uniq_tag=sMV5-9aNiYzKqQsHxDf93qbLtiRoaeD89YowIV-bgLA&type=album'
        },
        mode: "onSubmit"
    })

    const onSubmit = async (values: IValues) => {
        const data = await dispatch(fetchRegister(values));
        console.log(data)
        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token)
            toast.success("Вы успешно зарегистрировались!",{
                autoClose: 2000,
            })
        };
    }

    useEffect(() => {
        if (isAuth) navigate('/');
        document.title = "IT Odyssey | Register"
    }, [isAuth, navigate])

    return (
        <div className={st.container}>
            <div className={st.content}>
                <div className={st.title}>Регистрация</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className={st.containerLabel}>
                        <p className={st.labelText}>Никнейм</p>

                        <input
                            className={`${st.input} ${errors.nickName && st.inputError} `}
                            type="text"
                            placeholder="Введите никнейм..."
                            {...register('nickName', {
                                required: 'Укажите никнейм',
                                minLength: {value: 2, message: 'Минимум 2 символа'},
                                maxLength: {value: 20, message: 'Максимум 20 символов'},
                                pattern: {
                                    value: /^[^\u0400-\u04FF]*$/,
                                    message: "Кириллица недоступна"
                                }
                            })}
                        />
                        <AiOutlineUser className={st.icon} size="33px" color="#797979"/>
                        <p className={st.errorMessage}>{errors.nickName?.message}</p>
                    </label>
                    <label className={st.containerLabel}>
                        <p className={st.labelText}>Email</p>
                        <input
                            className={`${st.input} ${(errors.email || errorValid) ? st.inputError : ''} `}
                            type="email"
                            placeholder="Введите email..."
                            {...register('email', {
                                required: 'Укажите почту',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Неправильный формат почты..."
                                }
                            })}
                        />
                        <AiOutlineMail className={st.icon} size="34px" color="#797979"/>
                        <p className={st.errorMessage}>{errors.email?.message}</p>
                        <p className={st.errorMessage}>{errorValid}</p>
                    </label>
                    <label className={st.containerLabel}>
                        <p className={st.labelText}>Пароль</p>
                        <input
                            className={`${st.input} ${errors.password && st.inputError} `}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Введите пароль..."
                            {...register('password', {
                                    required: "Укажите пароль",
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
                    </label>

                    <button className={st.btn} type="submit">Зарегистрироваться</button>

                    <p className={st.registerLink}>Уже зарегистрированы? <Link to="/login">войдите</Link>.</p>
                </form>
            </div>
        </div>
    );
};

export default Register;