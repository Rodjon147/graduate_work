import React,{useState} from 'react';
import styles from "./Header.module.css"
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {removeUser, setUser} from "../store/slices/userSlices";
import Modal from "./Modal"
import axios from "axios";
import "./Login.css"
import "./Register.css"

const Header = () => {
    const {isAuth} = useSelector(state => state.user)
    const {username} = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()
    const [modalActive, setModalActive] = useState(false)
    const [formType, setFormType] = useState('login')

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
                setModalActive(false)
                setForm({
                    email: '',
                    username: '',
                    password: '',
                    confirmPassword: ''
                })
            }

        }catch (e) {
            console.log(e)
        }
    }

    const registerhandler = async () => {
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
                setModalActive(false)
                setForm({
                    email: '',
                    username: '',
                    password: '',
                    confirmPassword: ''
                })
            }
        }catch (e) {
            console.log(e)
        }
    }

    const logoutHandler = () => {
        dispatch(removeUser())
        localStorage.removeItem('token')
    }



    return (
        <>
            <Modal active={modalActive} setActive={setModalActive}>
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
                                    <button type="button" onClick={() => setFormType('register')}>Создать аккаунт</button>
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
                                <button onClick={registerhandler} type="button">Создать аккаунт</button>
                                <div className="reg_action">
                                    <p>Уже есть аккаунт?</p>
                                    <button type="button" onClick={() => setFormType('login')}>Войти</button>
                                </div>
                                <p>{error}</p>
                            </>
                    }

                </div>
            </Modal>


            <div className={styles.header_container}>
                <div className={styles.header_middle}>
                    <Link to="/main" className={styles.header_title}>Nepenf <p>created</p></Link>
                    <form className={styles.search_form}>
                        <input type="text" placeholder="Поиск" className={styles.searchInput}/>
                        <div className={styles.livesearch}>

                        </div>
                    </form>
                    {
                        isAuth ?
                            <div className={styles.header_action}>
                                <h4>{username}</h4>
                                <button type="button" onClick={logoutHandler}>Выйти</button>
                            </div>
                            :
                            <div className={styles.header_action}>
                                <button type="button" onClick={() => {
                                    setModalActive(true)
                                    setFormType('login')
                                }} >Войти</button>
                                <button type="button" onClick={() => {
                                    setModalActive(true)
                                    setFormType('register')
                                }}>Создать аккаунт</button>
                            </div>
                    }
                </div>
            </div>
        </>

    );
};

export default Header;