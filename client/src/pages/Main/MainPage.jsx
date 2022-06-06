import React, {useState, useEffect} from 'react';
import { BsStar} from "react-icons/bs";
import axios from "axios";
import "./MainPage.css"
import {useNavigate} from "react-router-dom";
import config from "../../config"

const MainPage = () => {

    const [films, setFilms] = useState([])
    const navigate = useNavigate()
    useEffect( () => {
        const getFilm = async () => {
            await axios.get(config.url + "/manager/film").then(response => {
                setFilms(response.data.films)
            })
        }
        getFilm()
    }, [])

    const filmOpenHandler = (e) => {
        navigate(`/film/${e}`)
    }

    return (
        <div className="main_container">
            <div className="main_middle">
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