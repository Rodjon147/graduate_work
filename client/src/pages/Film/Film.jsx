import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import NotFoundPage from "../NotFoundPage";
import "./Film.css"
import {useSelector} from "react-redux";
import FeedbackAdd from "../../components/FeedbackAdd/FeedbackAdd";
import config from "../../config";
import {BsPersonFill} from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";

const Film = () => {
    const {id} = useSelector(state => state.user.currentUser)
    const [films, setFilms] = useState([])
    const [feedbacks, setFeedbacks] = useState([])
    const [modalActive, setModalActive] = useState(false)
    const [currentFilm, setCurrentFilm] = useState(1)
    const { id_film } = useParams();

    useEffect(() => {
        const getFilm = async () => {
            await axios.post(config.url +`/film/get/${id_film}`, {id_user: id}).then(response => {
                setFilms(response.data.film)
            })
            await axios.post(config.url + "/feedback/get", {id_film: id_film, id_user: id}).then(response => {
                setFeedbacks(response.data.feedback)
            })
        }
        getFilm()
    }, [id_film, id])

    useEffect(() => {
        const getFeedback = async () => {
            await axios.post(config.url + "/feedback/get", {id_film: id_film, id_user: id}).then(response => {
                setFeedbacks(response.data.feedback)
            })
        }
        getFeedback()
    }, [id_film, id, modalActive])

    const estHandler = async (e) => {
        await axios.post(config.url + "/film/estimation", {est: e, id_film: id_film, id_user: id}).then(response => {
            setFilms(response.data.film)
        })
    }

    const deleteEstHandler = async () => {
        await axios.post(config.url + "/film/delete", { id_film: id_film, id_user: id}).then(response => {
            setFilms(response.data.film)
        })
    }

    const feedbackAddModalHandler = (e) => {
        setCurrentFilm(e)
        setModalActive(true)
    }

    const deleteFeedbackHandler = async (e) => {
        await axios.post(config.url + "/feedback/delete", {id_feedback: e, id_film: id_film}).then(response => {
            setFeedbacks(response.data.feedback)
        })
    }

    return (
        <div className="film_container">
            {
                films ?
                    <div className="film_middle">
                        <div className="film_title">
                            <img src={films.cover ? config.url + "/" + films.cover : ""} alt={films.id}/>
                            <div className="film_data">
                                <h1>{films.name}</h1>
                                <p><b>Страна:</b> {films.country}</p>
                                <p><b>Жанр:</b> {films.genre}</p>
                                <p><b>Режиссёр:</b> {films.director}</p>
                                <p><b>Премьера:</b> {films.year}</p>
                                <div className="film_allEstimation">
                                    <h3>Общая оценка фильма</h3>
                                    <h1>{films.estimation}</h1>
                                    <FaUserAlt/>
                                    <p>{films.countUsers}</p>
                                </div>
                                {
                                    id?
                                        <>
                                            <div className="film_estimation">
                                                {
                                                    !films.estimations ?
                                                        <p>Как бы вы оценили этот фильм?</p>
                                                        :
                                                        <></>
                                                }

                                                <div className="film_estimation_action">
                                                    {
                                                        films.estimations ?
                                                            <div className="film_currentEstimation">
                                                                <p>Ваша оценка: </p>
                                                                <h1>{films.estimations}</h1>
                                                                <button onClick={event => deleteEstHandler()}>Удалить</button>
                                                            </div>
                                                            :
                                                            <div className="film_correctPrint">
                                                                <p onClick={event => estHandler(1)}>1</p>
                                                                <p onClick={event => estHandler(2)}>2</p>
                                                                <p onClick={event => estHandler(3)}>3</p>
                                                                <p onClick={event => estHandler(4)}>4</p>
                                                                <p onClick={event => estHandler(5)}>5</p>
                                                                <p onClick={event => estHandler(6)}>6</p>
                                                                <p onClick={event => estHandler(7)}>7</p>
                                                                <p onClick={event => estHandler(8)}>8</p>
                                                                <p onClick={event => estHandler(9)}>9</p>
                                                                <p onClick={event => estHandler(10)}>10</p>
                                                            </div>
                                                    }

                                                </div>
                                            </div>
                                        </>
                                        :
                                        <></>
                                }

                            </div>

                        </div>
                        <div className="film_description">
                            <h2>Описание</h2>
                            <p>{films.description}</p>
                        </div>

                        <FeedbackAdd idFilm={currentFilm} modalActive={modalActive} setModalActive={setModalActive}/>

                        <div className="feedback_block">
                            <div className="feedback_title">

                                <h2>Отзывы</h2>
                                {
                                    id && (<p onClick={event => feedbackAddModalHandler(films.id)}>Написать отзыв</p>)
                                }

                            </div>
                            {
                                feedbacks.length > 0 ?
                                    feedbacks.map(
                                        feedback => {
                                            return(
                                                <div key={feedback.id}>
                                                    <div className="feedback_element">
                                                        <div className="feedback_element_info">
                                                            <div className="feedback_avatar_cont">
                                                                {
                                                                    feedback.avatar === "null"?
                                                                        <BsPersonFill className="feedback_not_avatar"/>
                                                                        :
                                                                        <img src={config.url + '/' + feedback.avatar} alt="" className="feedback_avatar"/>
                                                                }

                                                                <p>{feedback.name}</p>
                                                            </div>

                                                            <p>{new Date(feedback.date).getFullYear()}-{new Date(feedback.date).getMonth()+1}-{new Date(feedback.date).getDate()} {new Date(feedback.date).getHours()}:{new Date(feedback.date).getMinutes()}:{new Date(feedback.date).getSeconds()}</p>
                                                        </div>
                                                        <p>
                                                            {feedback.feedback}
                                                        </p>
                                                        {
                                                            feedback.id_user === id?
                                                                <div className="feedback_action">
                                                                    <p onClick={e => deleteFeedbackHandler(feedback.id)}>Удалить</p>
                                                                </div>
                                                                :
                                                                <></>
                                                        }

                                                    </div>
                                                </div>
                                            )
                                        }
                                    )
                                    :
                                    <p>Нет отзывов</p>
                            }

                        </div>
                    </div>
                    :
                    <NotFoundPage/>
            }
        </div>
    );
};

export default Film;