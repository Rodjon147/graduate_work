import React, {useState} from 'react';
import Modal from "../Modal/Modal";
import "./FeedbackAdd.css"
import axios from "axios";
import {useSelector} from "react-redux";

const FeedbackAdd = ({idFilm, modalActive, setModalActive}) => {
    const {id} = useSelector(state => state.user.currentUser)
    const [feedback, setFeedback] = useState('')

    const FeedbackAdd = async (e) => {
        e.preventDefault()
        await axios.post("/feedback/add", {feedback, id_film: idFilm, id_user: id}).then(() => {
            setModalActive(false)
        })
    }

    return (
        <Modal active={modalActive} setActive={setModalActive}>
            <div className='feedback_modal_container'>
                <h1>Отзыв</h1>
                <form className="feedback_modal_form">
                    <textarea placeholder="Напишите отзыв" onChange={event => setFeedback(event.target.value)}/>
                    <button onClick={FeedbackAdd}>Добавить</button>
                </form>
            </div>
        </Modal>
    );
};

export default FeedbackAdd;