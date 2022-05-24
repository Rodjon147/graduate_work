import React, {useState, useEffect} from 'react';
import { BsStar} from "react-icons/bs";
import axios from "axios";
import "./MainPage.css"

const MainPage = () => {

    const [films, setFilms] = useState([])

    useEffect( () => {
        const getFilm = async () => {
            await axios.get("/manager/film").then(response => {
                setFilms(response.data.films)
            })
        }
        getFilm()
    }, [])

    const filmOpenHandler = () => {

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
                                    <div key={film.id} className="main_cart_film">
                                        <img src={"http://localhost:8000/" + film.cover} alt={film.id}/>
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