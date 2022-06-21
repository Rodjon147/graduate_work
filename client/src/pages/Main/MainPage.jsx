import React, {useState, useEffect} from 'react';
import { BsStar} from "react-icons/bs";
import axios from "axios";
import "./MainPage.css"
import {useNavigate} from "react-router-dom";
import config from "../../config"

const MainPage = () => {
    const [films, setFilms] = useState([])
    const [collections, setCollections] = useState([])
    const [collectionsFilm, setCollectionsFilm] = useState([])
    const [ratingFilms, setRatingFilms] = useState([])

    const navigate = useNavigate()
    useEffect( () => {
        const getFilm = async () => {
            await axios.get(config.url + "/manager/film").then(response => {
                setFilms(response.data.films)
            })
        }
        const getCollections = async () => {
            await axios.get(config.url + "/collection/get").then(response => {
                setCollections(response.data.collections)
            })
        }
        const getCollectionsFilm = async () => {
            await axios.get(config.url + "/collection/coll-film").then(response => {
                setCollectionsFilm(response.data.films)
            })
        }
        const getRatingFilms = async () => {
            await axios.get(config.url + "/rating/get-main").then(response => {
                setRatingFilms(response.data.films)
            })
        }
        getRatingFilms()
        getCollections()
        getCollectionsFilm()
        getFilm()
    }, [])

    const filmOpenHandler = (e) => {
        navigate(`/film/${e}`)
    }
    const collOpenHandler = (e) => {
        navigate(`/collection/${e}`)
    }

    return (
        <div className="main_container">
            <div className="main_middle">
                <div>
                    <div className="main_film_coll_cont_action">
                        <h1>Популярное</h1>
                        <button onClick={e => navigate("/collection/rating")}>Подробнее</button>
                    </div>

                    <div className="main_film_coll_cont">
                        {
                            ratingFilms.map(
                                film => {
                                    return (
                                        <div key={film.id} className="main_cart_film" onClick={e => filmOpenHandler(film.id)}>
                                            <img src={config.url + "/" + film.cover} alt={film.id}/>
                                            <p>{film.name}</p>
                                            <div className="cart_estimation">
                                                <p>{film.estimation}</p>
                                                <BsStar/>
                                            </div>
                                        </div>
                                    )

                                }
                            )
                        }
                    </div>
                </div>

                {
                    collections?
                        collections.map(coll => {
                                return(

                                        coll.countcontent > 0?

                                        <div key={coll.id}>
                                            <div className="main_film_coll_cont_action">
                                                <h1>{coll.name}</h1>
                                                <button onClick={e => collOpenHandler(coll.id)}>Подробнее</button>
                                            </div>

                                            <div className="main_film_coll_cont">
                                                {
                                                    collectionsFilm.map((item, index) => {
                                                            return(
                                                                <div key={item.id}>
                                                                    {
                                                                        item.idCollection === coll.id ?
                                                                                <div className="main_film_coll_item" onClick={e => filmOpenHandler(item.id)}>
                                                                                    <img src={config.url + "/" + item.cover} alt={item.id}/>
                                                                                    <p>{item.name}</p>
                                                                                    <div className="cart_estimation">
                                                                                        <p>{item.estimation}</p>
                                                                                        <BsStar/>
                                                                                    </div>
                                                                                </div>
                                                                        : null
                                                                    }
                                                                </div>
                                                            )
                                                    })
                                                }
                                            </div>
                                        </div>
                                            : null
                                )
                            }
                        )
                        : null
                }

                <h1>Все фильмы</h1>
                <div className="main_film_container">
                    {
                        films.map(
                            film => {
                                return (
                                    <div key={film.id} className="main_cart_film" onClick={e => filmOpenHandler(film.id)}>
                                        <img src={config.url + "/" + film.cover} alt={film.id}/>
                                        <p>{film.name}</p>
                                        <div className="cart_estimation">
                                            <p>{film.estimation}</p>
                                            <BsStar/>
                                        </div>
                                    </div>
                                )

                            }
                        )
                    }
                </div>

            </div>
        </div>
    );
};

export default MainPage;