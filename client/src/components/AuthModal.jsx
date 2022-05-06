import React,{useState} from 'react';
import {useDispatch} from "react-redux";
import axios from "axios";
import {setUser} from "../store/slices/userSlices";

const AuthModal = ({formType, modalType, activeModal}) => {

    const dispatch = useDispatch()

    const [form, setForm] = useState({
        email: '',
        username: "",
        password: "",
        confirmPassword: ""
    })

    const [error, setError] = useState('')

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
                setForm({
                    email: '',
                    username: '',
                    password: '',
                    confirmPassword: ''
                })
                activeModal(false)
            }

        }catch (e) {
            console.log(e)
        }
    }

    const registerHandler = async () => {
        try{
            const response = await axios.post('/register', {...form})
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
                setForm({
                    email: '',
                    username: '',
                    password: '',
                    confirmPassword: ''
                })
                activeModal(false)
            }
        }catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <div className="form_txt">
                {
                    formType === 'login' ?
                        <>
                            <h1>Авторизация</h1>
                            <input type="text" name="email" placeholder={"Введите email"} value={form.email} onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}/>
                            <input type="text" name="password" placeholder={"Введите пароль"} value={form.password} onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}/>
                            <button onClick={loginHandler} type="button" >Войти</button>
                            <div className="reg_action">
                                <p>Нет аккаунта?</p>
                                <button type="button" onClick={() => modalType("register") }>Создать аккаунт</button>
                            </div>
                            <p>{error}</p>
                        </>
                        :
                        <>
                            <h1>Регистрация</h1>
                            <input type="text" name="email" placeholder={"Введите email"} value={form.email} onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}/>
                            <input type="text" name="username" placeholder={"Введите логин"} value={form.username} onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}/>
                            <input type="text" name="password" placeholder={"Введите пароль"} value={form.password} onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}/>
                            <input type="text" name="confirmPassword" placeholder={"Повторите пароль"} value={form.confirmPassword} onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}/>
                            <button onClick={registerHandler} type="button">Создать аккаунт</button>
                            <div className="reg_action">
                                <p>Уже есть аккаунт?</p>
                                <button type="button" onClick={() => modalType("login") }>Войти</button>
                            </div>
                            <p>{error}</p>
                        </>
                }
            </div>
        </div>
    );
};

export default AuthModal;