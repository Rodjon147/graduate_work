import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import "./Film.css"
import {useSelector} from "react-redux";
import { BsStar} from "react-icons/bs";

const Film = () => {
    const {id} = useSelector(state => state.user.currentUser)
    const [films, setFilms] = useState([])
    const { id_film } = useParams();

    useEffect(() => {
        const getFilm = async () => {
            await axios.post(`/film/get/${id_film}`, {id_user: id}).then(response => {
                setFilms(response.data.film)
            })
        }
        getFilm()
    }, [id_film, id])

    const estHandler = async (e) => {
        await axios.post("/film/estimation", {est: e, id_film: id_film, id_user: id}).then(response => {
            setFilms(response.data.film)
        })
    }

    const deleteEstHandler = async () => {
        await axios.post("/film/delete", { id_film: id_film, id_user: id}).then(response => {
            setFilms(response.data.film)
        })
    }

    return (
        <div className="film_container">
            {
                films ?
                    <div className="film_middle">
                        <div className="film_title">
                            <img src={films.cover ? "http://localhost:8000/" + films.cover : ""} alt={films.id}/>
                            <div className="film_data">
                                <h1>{films.name}</h1>
                                <p><b>Страна:</b> {films.country}</p>
                                <p><b>Жанр:</b> {films.genre}</p>
                                <p><b>Режиссёр:</b> {films.director}</p>
                                <p><b>Премьера:</b> {films.year}</p>
                                <div className="film_allEstimation">
                                    <h3>Общая оценка фильма</h3>
                                    <h1>{films.estimation}</h1>
                                    <p>{films.countUsers}</p>
                                </div>
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
                            </div>

                        </div>
                        <div className="film_description">
                            <h2>Описание</h2>
                            <p>{films.description}</p>
                        </div>
                    </div>
                    :
                    <NotFoundPage/>
            }
        </div>
    );
};

export default Film;