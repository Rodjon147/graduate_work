import React,{useState} from 'react';
import {useDispatch} from "react-redux";
import axios from "axios";
import {setUser} from "../../store/slices/userSlices";
import  "./AuthModal.css"
import config from "../../config";

const AuthModal = ({formType, modalType, activeModal}) => {
    const mailRegex = /^[a-zA-Z][a-zA-Z0-9\-\\_\\.]+@[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}$/
    const passRegex = /^[a-zA-Z0-9\\-]{0,}$/
    const dispatch = useDispatch()

    const [form, setForm] = useState({
        email: '',
        name: "",
        password: "",
        confirmPassword: ""
    })

    const [error, setError] = useState({
        email: '',
        name: '',
        pass: '',
        confirmPass: '',
        Server: ''
    })

    const loginHandler = async () => {
        try{
            const response = await axios.post(config.url +'/login', {...form})
            if(response.data.message){
                setError({...error, Server: response.data.message})
            }else{
                dispatch(setUser({
                    currentUser: {
                        id: response.data.user.id,
                        email: response.data.user.email,
                        name: response.data.user.name,
                        role: response.data.user.role
                    }

                }))
                localStorage.setItem('token', response.data.token)
                setForm({
                    email: "",
                    name: "",
                    password: "",
                    confirmPassword: ""
                })
                setError({
                    email: "",
                    name: "",
                    pass: "",
                    confirmPass: "",
                    Server: ""
                })
                activeModal(false)
            }

        }catch (e) {
            console.log(e)
        }
    }

    const registerHandler = async () => {
        try{
            const response = await axios.post(config.url + '/register', {...form})
            if(response.data.message){
                setError({...error, Server: response.data.message})
            }else{
                dispatch(setUser({
                    currentUser: {
                        id: response.data.user.id,
                        email: response.data.user.email,
                        name: response.data.user.name,
                        role: response.data.user.role
                    }

                }))
                localStorage.setItem('token', response.data.token)
                setForm({
                    email: "",
                    name: "",
                    password: "",
                    confirmPassword: ""
                })
                setError({
                    email: "",
                    name: "",
                    pass: "",
                    confirmPass: "",
                    Server: ""
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
                            <h1>??????????????????????</h1>
                            { error.Server ?
                                <p className="error_server_text">{error.Server}</p>
                                :
                                <></>
                            }

                            <input type="text" name="email" placeholder={"?????????????? email"} value={form.email}
                               onChange={
                                    event => {
                                        setForm({...form, [event.target.name]: event.target.value})
                                        event.target.value.length === 0?
                                            setError({...error, email: "?????????????? email", Server: ""})
                                            :
                                            !event.target.value.match(mailRegex) ?
                                                setError({...error, email: "???????????????????????? email", Server: ""})
                                                :
                                                setError({...error, email: "", Server: ""})
                                    }
                                }
                               className={error.email ? "error_form_input" : ""}
                            />
                            <p className="error_form_text">{error.email}</p>
                            <input type="password" name="password" placeholder={"?????????????? ????????????"} value={form.password}
                                   onChange={
                                       event => {
                                           setForm({...form, [event.target.name]: event.target.value})
                                           event.target.value.length === 0?
                                               setError({...error, pass: "?????????????? ????????????", Server: ""})
                                               :
                                               event.target.value.length < 3 ?
                                                   setError({...error, pass: "?????????????? ???? ?????????? 3 ????????????????", Server: ""})
                                                   :
                                                   event.target.value.length > 10 ?
                                                       setError({...error, pass: "?????????????? ???? ?????????? 10 ????????????????", Server: ""})
                                                       :
                                                       setError({...error, pass: "", Server: ""})
                                       }

                                   }
                                   className={error.pass ? "error_form_input" : ""}
                            />
                            <p className="error_form_text">{error.pass}</p>
                            <button disabled={error.email || error.pass || !form.email || !form.password} className="button_login_auth" onClick={loginHandler} type="button" >??????????</button>
                            <div className="reg_action">
                                <p>?????? ?????????????????</p>
                                <button type="button" onClick={
                                    e => {
                                        modalType("register")
                                        setForm({
                                            email: "",
                                            name: "",
                                            password: "",
                                            confirmPassword: ""
                                        })
                                        setError({
                                            email: "",
                                            name: "",
                                            pass: "",
                                            confirmPass: "",
                                            Server: ""
                                        })
                                    }
                                }>?????????????? ??????????????</button>
                            </div>
                        </>
                        :
                        <>
                            <h1>??????????????????????</h1>
                            { error.Server ?
                                <p className="error_server_text">{error.Server}</p>
                                :
                                <></>
                            }
                            <input type="text" name="email" placeholder={"?????????????? email"} value={form.email}
                                onChange={
                                    event => {
                                        setForm({...form, [event.target.name]: event.target.value})
                                        event.target.value.length === 0?
                                            setError({...error, email: "?????????????? email", Server: ""})
                                            :
                                            !event.target.value.match(mailRegex) ?
                                                setError({...error, email: "???????????????????????? email", Server: ""})
                                                :
                                                setError({...error, email: "", Server: ""})
                                    }
                                }
                                   className={error.email ? "error_form_input" : ""}
                            />
                            <p className="error_form_text">{error.email}</p>
                            <input type="text" name="name" placeholder={"?????????????? ??????"} value={form.name}
                                   onChange={
                                       event => {
                                           setForm({...form, [event.target.name]: event.target.value})

                                           event.target.value.length === 0?
                                               setError({...error, name: "?????????????? ??????", Server: ""})
                                               :
                                               event.target.value.length < 4 ?
                                                   setError({...error, name: "?????????????? ???? ?????????? 4 ????????????????", Server: ""})
                                                   :
                                                   event.target.value.length > 10 ?
                                                       setError({...error, name: "?????????????? ???? ?????????? 10 ????????????????", Server: ""})
                                                       :
                                                       setError({...error, name: "", Server: ""})
                                       }
                                   }
                                   className={error.name ? "error_form_input" : ""}
                            />
                            <p className="error_form_text">{error.name}</p>
                            <input type="password" name="password" placeholder={"?????????????? ????????????"} value={form.password}
                                   onChange={
                                       event => {
                                           setForm({...form, [event.target.name]: event.target.value})
                                           event.target.value.length === 0?
                                               setError({...error, pass: "?????????????? ????????????", Server: ""})
                                               :
                                               !event.target.value.match(passRegex) ?
                                                   setError({...error, pass: "???????????????????????? ????????????", Server: ""})
                                                   :
                                                   event.target.value.length < 4 ?
                                                       setError({...error, pass: "?????????????? ???? ?????????? 4 ????????????????", Server: ""})
                                                       :
                                                       event.target.value.length > 10 ?
                                                           setError({...error, pass: "?????????????? ???? ?????????? 10 ????????????????", Server: ""})
                                                           :
                                                           event.target.value !== form.password?
                                                               setError({...error, pass: "", Server: ""})
                                                               :
                                                               setError({...error, confirmPass: "", Server: ""})
                                       }
                                   }
                                   className={error.pass ? "error_form_input" : ""}
                            />
                            <p className="error_form_text">{error.pass}</p>
                            <input type="password" name="confirmPassword" placeholder={"?????????????????? ????????????"} value={form.confirmPassword}
                                   onChange={
                                       event => {
                                           setForm({...form, [event.target.name]: event.target.value})
                                           event.target.value.length === 0?
                                               setError({...error, confirmPass: "?????????????? ????????????", Server: ""})
                                               :
                                               !event.target.value.match(passRegex) ?
                                                   setError({...error, confirmPass: "???????????????????????? ????????????", Server: ""})
                                                   :
                                                   event.target.value !== form.password?
                                                       setError({...error, confirmPass: "???????????? ???? ??????????????????", Server: ""})
                                                       :
                                                       setError({...error, confirmPass: "", Server: ""})
                                       }
                                   }
                                   className={ error.confirmPass ? "error_form_input" : ""}
                            />
                            <p className="error_form_text">{error.confirmPass}</p>
                            <button disabled={error.email || error.name || error.pass || error.confirmPass || !form.email || !form.name || !form.password || !form.confirmPassword} onClick={registerHandler} type="button" className="button_login_auth">?????????????? ??????????????</button>
                            <div className="reg_action">
                                <p>?????? ???????? ???????????????</p>
                                <button type="button"
                                    onClick={
                                        e => {
                                            modalType("login")
                                            setForm({
                                                email: "",
                                                name: "",
                                                password: "",
                                                confirmPassword: ""
                                            })
                                            setError({
                                                email: "",
                                                name: "",
                                                pass: "",
                                                confirmPass: "",
                                                Server: ""
                                            })
                                        }
                                    }
                                >??????????</button>
                            </div>
                        </>
                }
            </div>
        </div>
    );
};

export default AuthModal;