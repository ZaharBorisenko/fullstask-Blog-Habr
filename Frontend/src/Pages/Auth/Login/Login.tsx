import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../../redux/hook/hook";
import {fetchUser, selectIsAuthenticated} from "../../../redux/Slices/authSlice";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(selectIsAuthenticated);
    const navigate = useNavigate();

    const {register,handleSubmit,setError, formState:{errors,isValid}} = useForm({
        defaultValues: {
            email: 'test@gmail.com',
            password: '3660253',
        },
        mode: "onChange"
    })

    const onSubmit = async (values) => {
        const data = await dispatch(fetchUser(values));
        console.log(data)
        if ('token' in data.payload) window.localStorage.setItem('token', data.payload.token);
    }

    useEffect(() => {
        if (isAuth) navigate('/');
    },[isAuth,navigate])

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    <p>Email</p>
                    <input
                        type="email"
                        {...register('email', {required: 'Укажите почту'})}
                    />
                    <p>{errors.email?.message}</p>
                </label>
                <label>
                    <p>Пароль</p>
                    <input
                        type="password"
                        {...register('password', {required: 'Укажите пароль'})}
                    />
                    <p>{errors.password?.message}</p>
                </label>

                <button type="submit" >Войти</button>
            </form>
        </div>
    );
};

export default Login;