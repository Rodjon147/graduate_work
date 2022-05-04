import React, {useState} from 'react';
import styles from "../components/Login.css"
import {Link} from "react-router-dom";
import axios from "axios";
import {useDispatch} from "react-redux";
import {setUser} from "../store/slices/userSlices";

const Login = () => {

    const dispatch = useDispatch()

    const [form, setForm] = useState({
        email: '',
        password: ""
    })

    const [error, setError] = useState('')

    const changeHandler = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const loginHandler = async () => {
        try{
            const response = await axios.post('/login', {...form})
            if(response.data.message){
                setError(response.data.message)
            }else{
                setError('')
                dispatch(setUser({
                    currentUser: {
                        id: response.data.user.id,
                        email: response.data.user.email,
                        username: response.data.user.username
                    }

                }))
                localStorage.setItem('token', response.data.token)
            }

        }catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={styles.cont}>
            <div className={styles.form_txt}>
                <h1>Авторизация</h1>
                <input type="text" name="email" placeholder={"Введите логин"} onChange={changeHandler}/>
                <input type="text" name="password" placeholder={"Введите пароль"} onChange={changeHandler}/>
                <button onClick={loginHandler} type="button" >Войти</button>
                <div className={styles.reg_action}>
                    <p>Нет аккаунта?</p>
                    <Link to="/register" className={styles.reg_link}>Создать аккаунт</Link>
                </div>
                <p>{error}</p>
            </div>
        </div>
    );
};

export default Login;