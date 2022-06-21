import React, {useState, useEffect} from 'react';
import {FiChevronLeft} from "react-icons/fi";
import {BsCollectionFill, BsFillPencilFill, BsFillTrashFill, BsFilm, BsStar} from "react-icons/bs";
import config from "../../config";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "./CurrentRatingFilm.css"
import { FaUserAlt } from "react-icons/fa";

const CurrentRatingFilm = () => {
    const [ratingFilms, setRatingFilms] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const getRatingFilm= async () => {
            await axios.get(config.url + "/rating/get-current").then(response => {
                setRatingFilms(response.data.films)
            })
        }
        getRatingFilm()
    }, [])
    const filmOpenHandler = (e) => {
        navigate(`/film/${e}`)
    }
    const mainOpenHandler = (e) => {
        navigate('/main')
    }

    return (
        <div className="current-coll-container">
            <div className="current-coll-middle">
                <div className="current-coll-info">
                    <div className="current-coll-info-title">
                        <div className="current-coll-info-action" onClick={mainOpenHandler}>
                            <FiChevronLeft className="current-coll-info-action-icon"/>
                            <p>Назад</p>
                        </div>
                        <h1>Популярное</h1>

                    </div>
                </div>
                <div className="current-rating-items">
                    {
                        ratingFilms.map((film, index) => {
                            return(
                                    <div key={film.id} className="main_film_rating_item" onClick={e => filmOpenHandler(film.id)}>
                                        <p>{index+1}</p>
                                        <img src={config.url + "/" + film.cover} alt={film.id}/>
                                        <p>{film.name}</p>
                                        <p>{film.genre}</p>
                                        <p>{film.year}</p>
                                        <p>{film.estimation}</p>
                                        <FaUserAlt/>
                                        <p>{film.countUsers}</p>
                                    </div>
                            )
                        })

                    }
                </div>

            </div>

        </div>
    );
};

export default CurrentRatingFilm;