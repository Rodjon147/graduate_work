import React, {useEffect, useState} from 'react';
import Modal from "../Modal/Modal";
import "./EditUserData.css"
import {useSelector, useDispatch} from "react-redux";
import axios from "axios";
import config from "../../config";
import {setUser} from "../../store/slices/userSlices";

const EditUserData = ({activeModal, setActiveModal}) => {
    const {id, name, email, role} = useSelector(state => state.user.currentUser)
    const [userData, setUserData] = useState({
        name: name,
        email: email
    })
    const mailRegex = /^[a-zA-Z][a-zA-Z0-9\-\\_\\.]+@[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}$/
    const [error, setError] = useState({
        name: "",
        email: ""
    })

    const dispatch = useDispatch()
    useEffect(() => {
        setUserData({
            name: name,
            email: email
        })
    }, [activeModal, name, email])

    const changeHandler = async () => {
        try {
            await axios.post(config.url + "/profile/change", {...userData, id_user: id}).then(response => {
                dispatch(setUser({
                    currentUser: {
                        id: id,
                        email: userData.email,
                        name: userData.name,
                        role: role
                    }

                }))
                setActiveModal(false)
            })
        }catch (e) {

        }
    }

    return (
        <Modal active={activeModal} setActive={setActiveModal}>
            <div className="editUserData_container">
                <h1>Изменить данные</h1>
                <input type="text" placeholder="Введите имя" value={userData.name} onChange={event => {
                    setUserData({...userData, name: event.target.value})
                    event.target.value.length === 0?
                        setError({...error, name: "Введите имя", Server: ""})
                        :
                        event.target.value.length < 3 ?
                            setError({...error, name: "Введите не менее 3 символов", Server: ""})
                            :
                            event.target.value.length > 10 ?
                                setError({...error, name: "Введите не более 10 символов", Server: ""})
                                :
                                setError({...error, name: "", Server: ""})
                }}/>
                <p className="error_form_text">{error.name}</p>
                <input type="text" placeholder="Введите email" value={userData.email} onChange={event => {
                    setUserData({...userData, email: event.target.value})
                    event.target.value.length === 0?
                        setError({...error, email: "Введите email", Server: ""})
                        :
                        !event.target.value.match(mailRegex) ?
                            setError({...error, email: "Некорректный email", Server: ""})
                            :
                            setError({...error, email: "", Server: ""})
                }}/>
                <p className="error_form_text">{error.email}</p>
                <button disabled={error.name || error.email || !userData.name || !userData.email} className="button_login_auth" onClick={changeHandler}>Изменить</button>
            </div>
        </Modal>
    );
};

export default EditUserData;