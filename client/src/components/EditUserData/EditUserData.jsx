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
                <input type="text" placeholder="Введите имя" value={userData.name} onChange={event => setUserData({...userData, name: event.target.value})}/>
                <input type="text" placeholder="Введите email" value={userData.email} onChange={event => setUserData({...userData, email: event.target.value})}/>
                <button onClick={changeHandler}>Изменить</button>
            </div>
        </Modal>
    );
};

export default EditUserData;