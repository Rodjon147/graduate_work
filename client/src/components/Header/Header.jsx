import React, {useEffect, useRef, useState} from 'react';
import "./Header.css"
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {removeUser} from "../../store/slices/userSlices";
import Modal from "../Modal/Modal"
import AuthModal from "../AuthModal/AuthModal";
import { BsFillCaretDownFill, BsFillPersonFill, BsGearFill, BsDoorOpenFill, BsFillBookmarkFill } from "react-icons/bs";

const Header = () => {
    const {isAuth} = useSelector(state => state.user)
    const {name, role} = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [modalActive, setModalActive] = useState(false)
    const [formType, setFormType] = useState('login')
    const [menu, setMenu] = useState(false)
    const btnRef = useRef()

    useEffect((e) => {
        const closeDropdown = e => {
            if(e.path[1] !== btnRef.current && e.path[1].tagName !== "svg"){
                setMenu(false)
            }
        }

        document.addEventListener('click', closeDropdown)
        return () => document.removeEventListener('click', closeDropdown)
    }, [])

    const modalTypeHandler = (e) => {
        setFormType(e)
    }

    const activeModalHandler = (e) => {
        setModalActive(e)
    }

    const logoutHandler = () => {
        dispatch(removeUser())
        localStorage.removeItem('token')
    }

    return (
        <>
            <Modal active={modalActive} setActive={setModalActive}>
                <AuthModal formType={formType} modalType={modalTypeHandler} activeModal={activeModalHandler}/>
            </Modal>

            <div className="header_container">
                <div className="header_middle">
                    <Link to="/main" className="header_title">Nepenf <p>created</p></Link>
                    <form className="search_form">
                        <input type="text" placeholder="Поиск" className="searchInput"/>
                        <div className="livesearch">

                        </div>
                    </form>
                </div>
                {
                    isAuth ?
                        <div className="header_user_action">
                            <div className="header_user_button" ref={btnRef} onClick={() => setMenu(!menu)}>
                                <h4>{name}</h4>
                                <BsFillCaretDownFill/>
                            </div>

                            <div className={menu? "header_menu show" : "header_menu"}>
                                <div className="header_menu_collection">
                                    <BsFillPersonFill className="header_icon"/>
                                    <p>Личный кабинет</p>
                                </div>
                                <div className="header_menu_collection">
                                    <BsFillBookmarkFill className="header_icon"/>
                                    <p>Вкладки</p>
                                </div>
                                {
                                    role === "admin"?
                                        <div className="header_menu_collection" onClick={() => navigate("/manager")}>
                                            <BsGearFill className="header_icon"/>
                                            <p>Настройки сайта</p>
                                        </div>
                                        :
                                        <></>
                                }

                                <div className="header_menu_collection" onClick={logoutHandler}>
                                    <BsDoorOpenFill className="header_icon"/>
                                    <p>Выход</p>
                                </div>

                            </div>
                        </div>
                        :
                        <div className="header_action">
                            <p type="button" onClick={() => {
                                setModalActive(true)
                                setFormType('login')
                            }} >Войти</p>
                            <p type="button" onClick={() => {
                                setModalActive(true)
                                setFormType('register')
                            }}>Создать аккаунт</p>
                        </div>
                }
            </div>
        </>
    );
};

export default Header;