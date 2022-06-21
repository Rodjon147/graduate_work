import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import config from "../../config";
import "./CurrentColl.css"
import {BsStar} from "react-icons/bs";
import { FiChevronLeft } from "react-icons/fi";
import { BsFilm } from "react-icons/bs";

const CurrentColl = () => {
    const { id_coll } = useParams()
    const [currentColl, setCurrentColl] = useState()
    const [currentContentColl, setCurrentContentColl] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        const getCollFilm = async () => {
            await axios.post(config.url + "/collection/film", {id_coll}).then(response => {
                setCurrentContentColl(response.data.films)
            })
        }
        const getColl= async () => {
            await axios.post(config.url + "/collection/current",{id_coll}).then(response => {
                setCurrentColl(response.data.coll)
            })
        }
        getCollFilm()
        getColl()
    }, [id_coll])

    const filmOpenHandler = (e) => {
        navigate(`/film/${e}`)
    }
    const mainOpenHandler = (e) => {
        navigate('/main')
    }

    return (
        <div className="current-coll-container">
            <div className="current-coll-middle">
                {
                    currentColl?
                        <div className="current-coll-info">
                            <div className="current-coll-info-title">
                                <div className="current-coll-info-action" onClick={mainOpenHandler}>
                                    <FiChevronLeft className="current-coll-info-action-icon"/>
                                    <p>Назад</p>
                                </div>
                                <h1>{currentColl.name}</h1>
                                <div className="current-coll-info-count">
                                    <p>{currentColl.countcontent}</p>
                                    <BsFilm className="current-coll-info-count-icon"/>
                                </div>

                            </div>
                            <p>{currentColl.description}</p>
                        </div>
                        : null
                }
                <div className="current-coll-items">
                    {
                        currentContentColl.map(film => {
                            return(

                                film.content?
                                    <div key={film.id} className="main_film_coll_item" onClick={e => filmOpenHandler(film.id)}>
                                        <img src={config.url + "/" + film.cover} alt={film.id}/>
                                        <p>{film.name}</p>
                                        <div className="cart_estimation">
                                            <p>{film.estimation}</p>
                                            <BsStar/>
                                        </div>
                                    </div>
                                    : null


                            )
                        })
                    }
                </div>

            </div>

        </div>
    );
};

export default CurrentColl;