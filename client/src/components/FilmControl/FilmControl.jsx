import React, {useState, useEffect} from 'react';
import "./FilmControl.css"
import AddFilm from "../AddFilm/AddFilm";
import axios from "axios";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import EditFilm from "../EditFilm/EditFilm";

const CreateFilm = () => {
    const [modalActive, setModalActive] = useState(false)
    const [editActive, setEditActive] = useState(false)
    const [films, setFilms] = useState([])
    const [currentFilms, setCurrentFilms] = useState(1)

    useEffect(() => {
        axios.get("/manager/film").then(response => {
            setFilms(response.data.films)
        })
    }, [modalActive, editActive, currentFilms])

    const filmEditHandler = (id) => {
        setCurrentFilms(id)
        setEditActive(true)
    }

    const filmDeleteHandler = async (event) => {
        function deleteFilm(){
            return axios.post("/manager/film/delete", {id_film: event})
        }
        function getFilm(){
            return axios.get("/manager/film").then(response => {
                setFilms(response.data.films)
            })
        }
        await axios.all([deleteFilm(), getFilm()])
    }

    return (
        <div>
            <div className={"createfilm_title"}>
                <h1>Фильмы</h1>
                <button onClick={() => setModalActive(!modalActive)}>Добавить фильм</button>
            </div>
            <AddFilm modalActive={modalActive} setActive={setModalActive}/>
            <EditFilm idFilm={currentFilms} setFilm={setCurrentFilms} modalActive={editActive} setActive={setEditActive}/>
            <div>
                <table border="1" width="100%" cellPadding="5" className="formcontrol_table">
                    <thead>
                        <tr>
                            <th>Обложка</th>
                            <th>Название</th>
                            <th>Описание</th>
                            <th>Жанр</th>
                            <th>Режиссёр</th>
                            <th>Год</th>
                            <th>Страна</th>
                            <th>Оценка</th>
                            <th></th>
                        </tr>
                        {
                            films.map(
                                film => {
                                    return (
                                        <tr key={film.id} className="filmcontrol_tr">
                                            <td> <img src={"http://localhost:8000/" + film.cover} alt={film.id} className="filmcontrol_img"/> </td>
                                            <td>{film.name}</td>
                                            <td className="folmcontrol_description">{film.description}</td>
                                            <td>{film.genre}</td>
                                            <td>{film.director}</td>
                                            <td>{film.year}</td>
                                            <td>{film.country}</td>
                                            <td>{film.estimation}</td>
                                            <td>
                                                <BsFillPencilFill className="formcontrol_button_edit" onClick={event => filmEditHandler(film.id)}/>
                                                <BsFillTrashFill className="formcontrol_button_delete" onClick={event => filmDeleteHandler(film.id)}/>
                                            </td>
                                        </tr>
                                    )
                                }
                            )
                        }
                    </thead>
                </table>
            </div>

        </div>
    );
};

export default CreateFilm;