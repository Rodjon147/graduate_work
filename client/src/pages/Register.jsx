import React, {useState} from 'react';
import styles from "../components/Register.css"
import {Link} from "react-router-dom";
import axios from "axios";

const Register = () => {
   const [form, setForm] = useState({
       email: '',
       username: "",
       password: "",
       confirmPassword: ""
   })

    const [error, setError] = useState('')

    const changeHandler = (e) => {
       setForm({...form, [e.target.name]: e.target.value})
    }

    const registerhandler = async () => {
        try{
            const response = await axios.post('/register', {...form})

            if(response.data.message){
                setError(response.data.message)
            }else{
                setError('')
            }
        }catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={styles.cont}>
            <div className={styles.form_txt}>
                <h1>Регистрация</h1>
                <input type="text" name="email" placeholder={"Введите email"} onChange={changeHandler}/>
                <input type="text" name="username" placeholder={"Введите логин"} onChange={changeHandler}/>
                <input type="text" name="password" placeholder={"Введите пароль"} onChange={changeHandler}/>
                <input type="text" name="confirmPassword" placeholder={"Повторите пароль"} onChange={changeHandler}/>
                <button onClick={registerhandler} type="button">Создать аккаунт</button>
                <div className={styles.reg_action}>
                    <p>Уже есть аккаунт?</p>
                    <Link to="/login" className={styles.reg_link}>Войти</Link>
                </div>
                <p>{error}</p>

            </div>
        </div>
    );
};

export default Register;