import React,{useState} from 'react';
import styles from "./Header.module.css"
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {removeUser} from "../../store/slices/userSlices";
import Modal from "../Modal/Modal"
import "../Login.css"
import "../Register.css"
import AuthModal from "../AuthModal";

const Header = () => {
    const {isAuth} = useSelector(state => state.user)
    const {username} = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()
    const [modalActive, setModalActive] = useState(false)
    const [formType, setFormType] = useState('login')

    const logoutHandler = () => {
        dispatch(removeUser())
        localStorage.removeItem('token')
    }

    const modalTypeHandler = (e) => {
        setFormType(e)
    }

    const activeModalHandler = (e) => {
        setModalActive(e)
    }

    return (
        <>
            <Modal active={modalActive} setActive={setModalActive}>
                <AuthModal formType={formType} modalType={modalTypeHandler} activeModal={activeModalHandler}/>
            </Modal>

            <div className={styles.header_container}>
                <div className={styles.header_middle}>
                    <Link to="/main" className={styles.header_title}>Nepenf <p>created</p></Link>
                    <form className={styles.search_form}>
                        <input type="text" placeholder="Поиск" className={styles.searchInput}/>
                        <div className={styles.livesearch}>

                        </div>
                    </form>
                </div>
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
        </>
    );
};

export default Header;